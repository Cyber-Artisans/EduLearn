import { Link } from 'react-router-dom'
import {
  FiUser,
  FiBook,
  FiHeart,
  FiAward,
  FiLogOut,
  FiGrid,
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import type { User } from '../../types/user'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const { logout, isInstructor } = useAuth()

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar"
        aria-label="Open user menu"
      >
        <div className="w-9 rounded-full ring-2 ring-primary/30">
          <img src={user.avatar} alt="" />
        </div>
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-3 w-56 rounded-box bg-base-100 p-2 shadow-lg border border-base-300"
      >
        <li className="menu-title">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="text-xs text-base-content/60 truncate">
              {user.email}
            </span>
          </div>
        </li>
        <li>
          <Link to="/dashboard">
            <FiGrid /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/my-courses">
            <FiBook /> My Courses
          </Link>
        </li>
        <li>
          <Link to="/wishlist">
            <FiHeart /> Wishlist
          </Link>
        </li>
        <li>
          <Link to="/certificates">
            <FiAward /> Certificates
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FiUser /> Profile
          </Link>
        </li>
        {isInstructor && (
          <li>
            <Link to="/instructor/dashboard">
              <FiGrid /> Instructor Panel
            </Link>
          </li>
        )}
        <li className="mt-1 border-t border-base-300 pt-1">
          <button type="button" onClick={logout} className="text-error">
            <FiLogOut /> Logout
          </button>
        </li>
      </ul>
    </div>
  )
}