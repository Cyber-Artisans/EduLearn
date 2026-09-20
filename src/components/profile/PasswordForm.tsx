import { useState, type FormEvent } from 'react'
import { FiLock } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { AuthError } from '../../services/authService'

interface FormErrors {
  current?: string
  next?: string
  confirm?: string
  general?: string
}

export function PasswordForm() {
  const { user } = useAuth()

  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function validate(): boolean {
    const e: FormErrors = {}
    if (!current) e.current = 'Current password is required.'
    if (!next) e.next = 'New password is required.'
    else if (next.length < 6) e.next = 'Password must be at least 6 characters.'
    else if (next === current)
      e.next = 'New password must be different from the current one.'
    if (confirm !== next) e.confirm = 'Passwords do not match.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setSaving(true)
    setErrors({})

    // Mock: no backend to actually verify or persist the change. We just
    // simulate the request/response cycle so the UI flow is complete.
    try {
      await new Promise((resolve) => setTimeout(resolve, 700))
      if (!user) throw new AuthError('You must be logged in.')
      setSaved(true)
      setCurrent('')
      setNext('')
      setConfirm('')
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setErrors({
        general:
          err instanceof Error ? err.message : 'Could not update password.',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="card-edulearn">
      <h2 className="text-lg font-bold mb-1">Change password</h2>
      <p className="text-sm text-base-content/60 mb-5">
        Use at least 6 characters. This is a mock — no password is stored.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {errors.general && (
          <div role="alert" className="alert alert-error py-3 text-sm">
            {errors.general}
          </div>
        )}

        <div className="form-control">
          <label htmlFor="pw-current" className="label">
            <span className="label-text font-medium">Current password</span>
          </label>
          <input
            id="pw-current"
            type="password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            autoComplete="current-password"
            className={`input input-bordered w-full ${
              errors.current ? 'input-error' : ''
            }`}
          />
          {errors.current && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.current}
              </span>
            </label>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label htmlFor="pw-next" className="label">
              <span className="label-text font-medium">New password</span>
            </label>
            <input
              id="pw-next"
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              autoComplete="new-password"
              className={`input input-bordered w-full ${
                errors.next ? 'input-error' : ''
              }`}
            />
            {errors.next && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.next}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="pw-confirm" className="label">
              <span className="label-text font-medium">Confirm new password</span>
            </label>
            <input
              id="pw-confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              className={`input input-bordered w-full ${
                errors.confirm ? 'input-error' : ''
              }`}
            />
            {errors.confirm && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.confirm}
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-sm text-success font-medium">
              ✓ Password updated
            </span>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Updating…
              </>
            ) : (
              <>
                <FiLock /> Update password
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}