import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthSubmitButton } from '../../components/auth/AuthSubmitButton'
import { useAuth } from '../../hooks/useAuth'
import { AuthError } from '../../services/authService'
import type { Role } from '../../types/user'

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirm?: string
  terms?: string
  general?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RegisterPage() {
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const initialRole: Role =
    params.get('role') === 'instructor' ? 'instructor' : 'student'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [role, setRole] = useState<Role>(initialRole)
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): boolean {
    const next: FormErrors = {}
    if (!name.trim()) next.name = 'Name is required.'
    else if (name.trim().length < 2) next.name = 'Name is too short.'
    if (!email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6)
      next.password = 'Password must be at least 6 characters.'
    if (confirm !== password) next.confirm = 'Passwords do not match.'
    if (!terms) next.terms = 'You must accept the terms to continue.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setErrors({})
    try {
      await register({ name, email, password, role })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      if (err instanceof AuthError) setErrors({ general: err.message })
      else setErrors({ general: 'Something went wrong. Please try again.' })
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start learning in seconds — no credit card required."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="link link-primary font-semibold">
            Log in
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

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`btn ${
              role === 'student' ? 'btn-primary' : 'btn-outline'
            }`}
          >
            I'm a student
          </button>
          <button
            type="button"
            onClick={() => setRole('instructor')}
            className={`btn ${
              role === 'instructor' ? 'btn-primary' : 'btn-outline'
            }`}
          >
            I'm an instructor
          </button>
        </div>

        <AuthInput
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Alex Morgan"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

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
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <AuthInput
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
        />

        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3 p-0">
            <input
              type="checkbox"
              className={`checkbox checkbox-sm ${
                errors.terms ? 'checkbox-error' : ''
              }`}
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <span className="label-text text-sm">
              I agree to the{' '}
              <Link to="/about" className="link link-primary">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/about" className="link link-primary">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.terms && (
            <span className="text-xs text-error mt-1">{errors.terms}</span>
          )}
        </div>

        <AuthSubmitButton loading={isLoading}>
          Create account
        </AuthSubmitButton>
      </form>
    </AuthCard>
  )
}