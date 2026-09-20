import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { Logo } from '../common/Logo'
import { Container } from '../common/Container'
import { NavLinks, PUBLIC_NAV_ITEMS } from './NavLinks'
import { SearchBar } from './SearchBar'
import { UserMenu } from './UserMenu'
import { MobileDrawer } from './MobileDrawer'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-lg">
      <Container className="flex h-16 items-center gap-4">
        <Logo />

        <nav
          className="hidden lg:flex items-center gap-1 ml-4"
          aria-label="Main"
        >
          <NavLinks items={PUBLIC_NAV_ITEMS} />
        </nav>

        <div className="hidden md:flex flex-1 justify-end">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {isAuthenticated && user ? (
            <div className="hidden lg:block">
              <UserMenu user={user} />
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="btn btn-ghost btn-circle lg:hidden"
            aria-label="Open menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>
      </Container>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  )
}