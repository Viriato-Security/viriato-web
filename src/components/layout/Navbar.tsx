import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import styles from './Navbar.module.css'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.nav}`} aria-label="Main navigation">
        <Link to="/" className={styles.brand} onClick={closeMenu} aria-label="Viriato Security home">
          <img
            src="/assets/images/Logo.png"
            alt="Viriato Security logo"
            className={styles.logo}
            height={48}
          />
          <span className={styles.brandName}>VIRIATO SECURITY</span>
        </Link>

        <div className={styles.right}>
          <Badge variant="outline" className={styles.locationBadge}>
            Lisbon, Portugal
          </Badge>

          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>

        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} role="dialog" aria-label="Navigation menu">
          <Link to="/" className={styles.mobileLink} onClick={closeMenu}>Home</Link>
          <a href="mailto:contact@viriatosecurity.com" className={styles.mobileLink} onClick={closeMenu}>Contact</a>
          <Badge variant="outline" className={styles.mobileBadge}>Lisbon, Portugal</Badge>
        </div>
      </nav>
    </header>
  )
}
