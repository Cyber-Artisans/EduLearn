import { Link, Outlet } from 'react-router-dom'
import { Logo } from '../components/common/Logo'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <header className="p-6">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      <footer className="p-6 text-center text-sm text-base-content/60">
        <Link to="/" className="hover:text-primary">
          ← Back to home
        </Link>
      </footer>
    </div>
  )
}
