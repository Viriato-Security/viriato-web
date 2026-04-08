import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import styles from './Navbar.module.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        toggleRef.current && !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.nav}`} aria-label="Main navigation">
        <Link to="/" className={styles.brand} onClick={closeMenu} aria-label="Viriato Security home">
          <img
            src="/assets/images/Logo.png"
            alt=""
            aria-hidden="true"
            className={styles.logo}
            height={48}
            width="auto"
          />
          <span className={styles.brandName}>VIRIATO SECURITY</span>
        </Link>

        {/* Desktop right side */}
        <div className={styles.desktopRight}>
          <a href="mailto:contact@viriatosecurity.com" className={styles.contactLink}>
            contact@viriatosecurity.com
          </a>
          <Badge variant="outline" className={styles.locationBadge}>
            Lisbon, Portugal
          </Badge>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="container">
          <a href="mailto:contact@viriatosecurity.com" className={styles.mobileLink} onClick={closeMenu}>
            contact@viriatosecurity.com
          </a>
          <Badge variant="outline" className={styles.mobileBadge}>
            Lisbon, Portugal
          </Badge>
        </div>
      </div>
    </header>
  )
}
