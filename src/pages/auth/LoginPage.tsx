import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthSubmitButton } from '../../components/auth/AuthSubmitButton'
import { useAuth } from '../../hooks/useAuth'
import { AuthError } from '../../services/authService'
import { DEMO_CREDENTIALS } from '../../data/users'

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): boolean {
    const next: FormErrors = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6)
      next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setErrors({})
    try {
      await login(email, password)
      navigate(redirect, { replace: true })
    } catch (err) {
      if (err instanceof AuthError) setErrors({ general: err.message })
      else setErrors({ general: 'Something went wrong. Please try again.' })
    }
  }

  function fillDemo(kind: 'student' | 'instructor') {
    setEmail(DEMO_CREDENTIALS[kind].email)
    setPassword(DEMO_CREDENTIALS[kind].password)
    setErrors({})
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to continue your learning journey."
      footer={
        <>
          Don't have an account?{' '}
          <Link to="/register" className="link link-primary font-semibold">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {errors.general && (
          <div role="alert" className="alert alert-error py-3 text-sm">
            {errors.general}
          </div>
        )}

        <AuthInput
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <AuthInput
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-sm" />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="link link-primary font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <AuthSubmitButton loading={isLoading}>Log in</AuthSubmitButton>
      </form>

      <div className="mt-6 rounded-xl border border-dashed border-base-300 p-4 text-xs">
        <p className="font-semibold mb-2">Try a demo account:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-xs btn-outline"
            onClick={() => fillDemo('student')}
          >
            Student
          </button>
          <button
            type="button"
            className="btn btn-xs btn-outline"
            onClick={() => fillDemo('instructor')}
          >
            Instructor
          </button>
        </div>
        <p className="mt-2 text-base-content/60">
          Password for both: <code>password123</code>
        </p>
      </div>
    </AuthCard>
  )
}