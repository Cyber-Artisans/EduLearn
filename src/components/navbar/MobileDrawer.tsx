import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FiX,
  FiUser,
  FiBook,
  FiHeart,
  FiAward,
  FiLogOut,
  FiGrid,
  FiLogIn,
  FiUserPlus,
  FiHome,
  FiVideo,
  FiTag,
  FiInfo,
  FiMail,
  FiSearch,
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

const PRIMARY_LINKS = [
  { to: '/', label: 'Home', icon: FiHome, end: true },
  { to: '/courses', label: 'Courses', icon: FiBook, end: false },
  { to: '/categories', label: 'Categories', icon: FiTag, end: false },
  { to: '/about', label: 'About', icon: FiInfo, end: false },
  { to: '/contact', label: 'Contact', icon: FiMail, end: false },
]

const ACCOUNT_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/my-courses', label: 'My Courses', icon: FiBook },
  { to: '/wishlist', label: 'Wishlist', icon: FiHeart },
  { to: '/certificates', label: 'Certificates', icon: FiAward },
  { to: '/profile', label: 'Profile', icon: FiUser },
]

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { isAuthenticated, user, logout, isInstructor } = useAuth()

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Lock body scroll while open — the drawer itself scrolls
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const rowBase =
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors'
  const rowIdle =
    'text-base-content/80 hover:bg-base-200 hover:text-base-content'
  const rowActive = 'bg-primary/10 text-primary'

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — auto-height, top-right, whole thing scrolls */}
      <aside
        className={`fixed right-0 top-0 z-50 w-80 max-w-[85vw] bg-base-100 shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
        style={{ maxHeight: '100dvh' }}
      >
        <div className="h-full overflow-y-auto overscroll-contain">
          {/* Header — scrolls with content, not pinned */}
          <div className="flex items-center justify-between border-b border-base-300 p-4 pt-[calc(1rem+env(safe-area-inset-top))]">
            <span className="font-bold">Menu</span>
            <button
              type="button"
              className="btn btn-ghost btn-sm btn-circle"
              onClick={onClose}
              aria-label="Close menu"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <nav
            className="flex flex-col gap-1 px-2 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
            aria-label="Mobile"
          >
            {/* Search */}
            <div className="relative mb-2 px-1">
              <label htmlFor="mobile-search" className="sr-only">
                Search courses
              </label>
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/40" />
              <input
                id="mobile-search"
                type="search"
                placeholder="Search courses…"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = (e.target as HTMLInputElement).value.trim()
                    onClose()
                    window.location.href = q
                      ? `/courses?search=${encodeURIComponent(q)}`
                      : '/courses'
                  }
                }}
                className="input input-bordered input-sm w-full pl-9"
              />
            </div>

            {/* Primary nav */}
            <ul className="flex flex-col">
              {PRIMARY_LINKS.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `${rowBase} ${isActive ? rowActive : rowIdle}`
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Authenticated user */}
            {isAuthenticated && user && (
              <>
                <p className="mt-5 mb-1 px-3 text-[11px] font-bold uppercase tracking-widest text-base-content/40">
                  My learning
                </p>
                <ul className="flex flex-col">
                  {ACCOUNT_LINKS.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `${rowBase} ${isActive ? rowActive : rowIdle}`
                        }
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>

                {isInstructor && (
                  <>
                    <p className="mt-5 mb-1 px-3 text-[11px] font-bold uppercase tracking-widest text-base-content/40">
                      Instructor
                    </p>
                    <ul className="flex flex-col">
                      <li>
                        <NavLink
                          to="/instructor/dashboard"
                          onClick={onClose}
                          className={({ isActive }) =>
                            `${rowBase} ${isActive ? rowActive : rowIdle}`
                          }
                        >
                          <FiVideo className="h-4 w-4 shrink-0" />
                          <span>Instructor Panel</span>
                        </NavLink>
                      </li>
                    </ul>
                  </>
                )}

                <p className="mt-5 mb-1 px-3 text-[11px] font-bold uppercase tracking-widest text-base-content/40">
                  Account
                </p>
                <ul className="flex flex-col">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        logout()
                        onClose()
                      }}
                      className={`${rowBase} w-full text-left text-error hover:bg-error/10`}
                    >
                      <FiLogOut className="h-4 w-4 shrink-0" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </>
            )}

            {/* Guest */}
            {!isAuthenticated && (
              <>
                <p className="mt-5 mb-1 px-3 text-[11px] font-bold uppercase tracking-widest text-base-content/40">
                  Account
                </p>
                <ul className="flex flex-col">
                  <li>
                    <NavLink
                      to="/login"
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${rowBase} ${isActive ? rowActive : rowIdle}`
                      }
                    >
                      <FiLogIn className="h-4 w-4 shrink-0" />
                      <span>Login</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${rowBase} ${isActive ? rowActive : rowIdle}`
                      }
                    >
                      <FiUserPlus className="h-4 w-4 shrink-0" />
                      <span>Register</span>
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </nav>
        </div>
      </aside>
    </>
  )
}