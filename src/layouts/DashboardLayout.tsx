import { NavLink, Outlet } from 'react-router-dom'
import {
  FiGrid,
  FiBook,
  FiHeart,
  FiAward,
  FiUser,
  FiVideo,
  FiPlusCircle,
} from 'react-icons/fi'
import { Navbar } from '../components/navbar/Navbar'
import { Container } from '../components/common/Container'
import { useAuth } from '../hooks/useAuth'

const studentNav = [
  { to: '/dashboard', label: 'Overview', Icon: FiGrid },
  { to: '/my-courses', label: 'My Courses', Icon: FiBook },
  { to: '/wishlist', label: 'Wishlist', Icon: FiHeart },
  { to: '/certificates', label: 'Certificates', Icon: FiAward },
  { to: '/profile', label: 'Profile', Icon: FiUser },
]

const instructorNav = [
  { to: '/instructor/dashboard', label: 'Instructor Home', Icon: FiGrid },
  { to: '/instructor/courses', label: 'My Courses', Icon: FiVideo },
  { to: '/instructor/courses/create', label: 'Create Course', Icon: FiPlusCircle },
]

export function DashboardLayout() {
  const { isInstructor } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-base-100">
      <Navbar />
      <Container className="flex flex-1 gap-8 py-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-1" aria-label="Dashboard">
            {studentNav.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/dashboard'}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-content'
                      : 'text-base-content/70 hover:bg-base-200 hover:text-base-content',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}

            {isInstructor && (
              <>
                <div className="pt-4 pb-1 px-3 text-xs font-bold uppercase tracking-wider text-base-content/50">
                  Instructor
                </div>
                {instructorNav.map(({ to, label, Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/instructor/dashboard'}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-secondary text-secondary-content'
                          : 'text-base-content/70 hover:bg-base-200 hover:text-base-content',
                      ].join(' ')
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </NavLink>
                ))}
              </>
            )}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </Container>
    </div>
  )
}