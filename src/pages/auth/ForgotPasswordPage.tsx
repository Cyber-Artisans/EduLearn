import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import { AuthCard } from '../../components/auth/AuthCard'
import { AuthInput } from '../../components/auth/AuthInput'
import { AuthSubmitButton } from '../../components/auth/AuthSubmitButton'
import { authService } from '../../services/authService'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return setError('Email is required.')
    if (!EMAIL_RE.test(email)) return setError('Enter a valid email address.')
    setError(undefined)
    setLoading(true)
    try {
      await authService.requestPasswordReset(email)
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <AuthCard
        title="Check your inbox"
        subtitle="If an account exists with that email, we've sent a reset link."
        footer={
          <Link to="/login" className="link link-primary font-semibold">
            Back to login
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <FiMail className="h-7 w-7" />
          </span>
          <p className="text-sm text-base-content/70">
            We sent a link to <span className="font-semibold">{email}</span>.
            Check your spam folder if you don't see it within a minute.
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="link link-primary font-semibold">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthInput
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <AuthSubmitButton loading={loading}>Send reset link</AuthSubmitButton>
      </form>
    </AuthCard>
  )
}