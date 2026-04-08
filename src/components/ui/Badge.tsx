import styles from './Badge.module.css'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'outline' | 'dark'
  className?: string
}

export function Badge({ children, variant = 'outline', className = '' }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </span>
  )
}
