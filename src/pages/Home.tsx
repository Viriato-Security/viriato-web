import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import styles from './Home.module.css'

// SVG icons
function KernelIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function EUIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 4c0 0-4 4-4 12s4 12 4 12M16 4c0 0 4 4 4 12s-4 12-4 12M4 16h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 3L5 7.5v8c0 6.075 4.7 11.75 11 13.5 6.3-1.75 11-7.425 11-13.5v-8L16 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 16l3.5 3.5L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle' }}>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const PILLARS = [
  {
    icon: <KernelIcon />,
    title: 'Kernel-level truth',
    body: 'eBPF-based syscall observation. Not API wrappers — ground-truth logs that cannot be tampered with at the application layer.',
  },
  {
    icon: <EUIcon />,
    title: 'EU AI Act native',
    body: 'Articles 12, 13, 15 and 72 compliance automation. Built from day one for August 2026 enforcement — not retrofitted.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Data sovereignty',
    body: 'Air-gapped deployment. Your logs never leave your environment. WORM cryptographic vault with AES-256-GCM immutability.',
  },
]

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function Home() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroTag}>
            <span className={styles.tagLine} aria-hidden="true" />
            <span className={styles.tagText}>AI Observability Platform</span>
            <span className={styles.tagLine} aria-hidden="true" />
          </div>

          <h1 id="hero-heading" className={styles.heroHeading}>
            Guard your AI.
            <br />
            <em className={styles.heroHeadingAccent}>Own your compliance.</em>
          </h1>

          <p className={styles.heroSubtitle}>
            Kernel-level observability for AI systems — built for the EU AI Act. Immutable audit logs,
            automated compliance reports, and complete data sovereignty.
          </p>

          <Divider variant="decorative" className={styles.heroDivider} />

          <div className={styles.heroFooter}>
            <Badge variant="dark" className={styles.deadlineBadge}>
              <ClockIcon />
              {' '}EU AI Act · Full enforcement August 2, 2026
            </Badge>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className={styles.pillars} aria-labelledby="pillars-heading">
        <h2 id="pillars-heading" className="sr-only">Core capabilities</h2>
        <div className={styles.pillarsGrid}>
          {PILLARS.map((pillar, i) => (
            <article
              key={pillar.title}
              className={`${styles.pillarCard} ${i < PILLARS.length - 1 ? styles.pillarCardBorder : ''}`}
            >
              <div className={styles.pillarIcon}>{pillar.icon}</div>
              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <p className={styles.pillarBody}>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission} aria-labelledby="mission-heading">
        <div className={`container ${styles.missionInner}`}>
          <span className={styles.sectionLabel}>Our mission</span>
          <h2 id="mission-heading" className={styles.missionHeading}>
            Built in Lisbon. Built for Europe.
          </h2>
          <p className={styles.missionBody}>
            Viriato Security was founded to give AI-deploying organizations the infrastructure to operate
            with confidence under the EU AI Act. Like the Lusitani warrior who defended his land with
            intelligence over brute force, we believe the right tools — not bureaucracy — are what make
            AI trustworthy.
          </p>
        </div>
      </section>

      {/* Waitlist */}
      <section className={styles.waitlist} aria-labelledby="waitlist-heading">
        <div className={`container ${styles.waitlistInner}`}>
          <span className={styles.waitlistLabel}>Early access</span>
          <h2 id="waitlist-heading" className={styles.waitlistHeading}>Coming soon</h2>
          <p className={styles.waitlistBody}>
            We are building in public. Join the waitlist to be among the first to access Viriato Core —
            the open-source eBPF observability layer — when it launches.
          </p>

          {submitted ? (
            <div className={styles.thankYou} role="status" aria-live="polite">
              <p className={styles.thankYouText}>
                You're on the list. We'll reach out when Viriato Core is ready.
              </p>
            </div>
          ) : (
            <form
              className={styles.waitlistForm}
              onSubmit={handleWaitlist}
              noValidate
              aria-label="Join waitlist"
            >
              <div className={styles.inputWrapper}>
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input
                  id="waitlist-email"
                  type="email"
                  className={`${styles.emailInput} ${emailError ? styles.emailInputError : ''}`}
                  placeholder="your@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError('')
                  }}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  autoComplete="email"
                  required
                />
                <Button type="submit" variant="primary" size="md" className={styles.notifyBtn}>
                  Notify me
                </Button>
              </div>
              {emailError && (
                <p id="email-error" className={styles.errorMsg} role="alert">
                  {emailError}
                </p>
              )}
            </form>
          )}

          <p className={styles.noSpam}>No spam. One email when we launch.</p>
        </div>
      </section>
    </>
  )
}
