import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link to="/" aria-label="Viriato Security home">
            <img
              src="/assets/images/Logo.png"
              alt="Viriato Security logo"
              className={styles.logo}
              height={40}
            />
          </Link>
          <span className={styles.brandName}>VIRIATO SECURITY</span>
        </div>

        <div className={styles.contact}>
          <a href="mailto:contact@viriatosecurity.com" className={styles.email}>
            contact@viriatosecurity.com
          </a>
          <a href="mailto:security@viriatosecurity.com" className={styles.email}>
            security@viriatosecurity.com
          </a>
        </div>

        <div className={styles.legal}>
          <span>© 2026 Viriato Security</span>
          <span className={styles.separator}>·</span>
          <span>Lisbon, Portugal</span>
        </div>
      </div>
    </footer>
  )
}
