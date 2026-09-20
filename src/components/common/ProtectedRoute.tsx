import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface ProtectedRouteProps {
  /** If set, non-matching roles are redirected to /dashboard. */
  requiredRole?: 'student' | 'instructor' | 'admin'
}

export function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />
  }

  if (requiredRole && user?.role !== requiredRole && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}