import styles from './Divider.module.css'

interface DividerProps {
  variant?: 'horizontal' | 'decorative'
  className?: string
}

export function Divider({ variant = 'horizontal', className = '' }: DividerProps) {
  if (variant === 'decorative') {
    return (
      <div className={`${styles.decorative} ${className}`}>
        <span className={styles.line} />
        <span className={styles.diamond} />
        <span className={styles.line} />
      </div>
    )
  }

  return <hr className={`${styles.horizontal} ${className}`} />
}
