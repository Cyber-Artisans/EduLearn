import { NavLink } from 'react-router-dom'

export interface NavItem {
  label: string
  to: string
}

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Categories', to: '/categories' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

interface NavLinksProps {
  items: NavItem[]
  onNavigate?: () => void
}

export function NavLinks({ items, onNavigate }: NavLinksProps) {
  return (
    <>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          end={item.to === '/'}
          className={({ isActive }) =>
            [
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'text-primary bg-primary/10'
                : 'text-base-content/70 hover:text-base-content hover:bg-base-200',
            ].join(' ')
          }
        >
          {item.label}
        </NavLink>
      ))}
    </>
  )
}