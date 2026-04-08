export interface NavLink {
  label: string
  href: string
}

export interface PillarCard {
  icon: React.ReactNode
  title: string
  body: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
