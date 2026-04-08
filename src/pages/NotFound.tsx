import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="notfound-heading">
      <div className={`container ${styles.inner}`}>
        <span className={styles.code} aria-hidden="true">404</span>
        <h1 id="notfound-heading" className={styles.heading}>Page not found</h1>
        <p className={styles.body}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.link}>
          Return home
        </Link>
      </div>
    </section>
  )
}
