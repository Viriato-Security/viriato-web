/**
 * POST /api/waitlist
 *
 * Accepts { email: string }, validates, deduplicates, stores in KV,
 * rate-limits per IP (3 requests/hour), and fires a notification email.
 *
 * KV key scheme:
 *   waitlist:<email>         → JSON WaitlistEntry (permanent)
 *   rate:<ip>:<hourBucket>   → stringified integer, TTL 3600s
 */

import { EmailMessage } from 'cloudflare:email'

interface Env {
  WAITLIST: KVNamespace
  /** send_email binding — optional so local dev without binding still works */
  NOTIFY_EMAIL?: SendEmail
}

interface WaitlistEntry {
  email: string
  timestamp: string
  ip: string
}

interface RequestBody {
  email?: unknown
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ALLOWED_ORIGINS = [
  'https://viriatosecurity.com',
  'https://www.viriatosecurity.com',
]

const RATE_LIMIT = 3
const RATE_WINDOW_SECONDS = 3600

// ─── Helpers ──────────────────────────────────────────────────────────────────

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') ?? ''
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0]

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function json(
  body: Record<string, unknown>,
  status: number,
  extraHeaders: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}

function hourBucket(): number {
  return Math.floor(Date.now() / (RATE_WINDOW_SECONDS * 1000))
}

async function checkRateLimit(
  kv: KVNamespace,
  ip: string,
): Promise<{ limited: boolean; count: number }> {
  const key = `rate:${ip}:${hourBucket()}`
  const raw = await kv.get(key)
  const count = raw !== null ? parseInt(raw, 10) : 0
  return { limited: count >= RATE_LIMIT, count }
}

async function incrementRateLimit(kv: KVNamespace, ip: string): Promise<void> {
  const key = `rate:${ip}:${hourBucket()}`
  const raw = await kv.get(key)
  const count = raw !== null ? parseInt(raw, 10) : 0
  await kv.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_SECONDS })
}

async function sendNotification(
  binding: SendEmail,
  email: string,
): Promise<void> {
  const now = new Date().toISOString()
  const raw = [
    'From: Viriato Waitlist <waitlist@viriatosecurity.com>',
    'To: contact@viriatosecurity.com',
    'Subject: New waitlist signup',
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    'A new signup has been added to the Viriato Core waitlist.',
    '',
    `Email:     ${email}`,
    `Timestamp: ${now}`,
  ].join('\r\n')

  const msg = new EmailMessage(
    'waitlist@viriatosecurity.com',
    'contact@viriatosecurity.com',
    raw,
  )

  await binding.send(msg)
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request),
  })
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const cors = corsHeaders(context.request)

  // Parse body
  let body: RequestBody
  try {
    body = await context.request.json<RequestBody>()
  } catch {
    return json({ error: 'Invalid request body.' }, 400, cors)
  }

  // Validate email
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!EMAIL_RE.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400, cors)
  }

  // Rate limit by IP
  const ip = context.request.headers.get('CF-Connecting-IP') ?? 'unknown'
  const { limited } = await checkRateLimit(context.env.WAITLIST, ip)
  if (limited) {
    return json(
      { error: 'Too many requests. Please try again later.' },
      429,
      { ...cors, 'Retry-After': String(RATE_WINDOW_SECONDS) },
    )
  }

  // Duplicate check — return silent success to avoid enumeration
  const existing = await context.env.WAITLIST.get(`waitlist:${email}`)
  if (existing !== null) {
    return json({ success: true }, 200, cors)
  }

  // Store entry
  const entry: WaitlistEntry = {
    email,
    timestamp: new Date().toISOString(),
    ip,
  }
  await context.env.WAITLIST.put(`waitlist:${email}`, JSON.stringify(entry))

  // Increment rate counter after successful write
  await incrementRateLimit(context.env.WAITLIST, ip)

  // Notify — best-effort, non-blocking, never fails the response
  if (context.env.NOTIFY_EMAIL) {
    context.waitUntil(
      sendNotification(context.env.NOTIFY_EMAIL, email).catch(() => {
        // Notification failure is non-fatal — entry is already stored
      }),
    )
  }

  return json({ success: true }, 200, cors)
}
