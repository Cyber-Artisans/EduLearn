import { useState, type FormEvent } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="join w-full">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="input input-bordered join-item w-full bg-base-100"
        />
        <button type="submit" className="btn btn-primary join-item">
          Subscribe
        </button>
      </div>
      {status === 'success' && (
        <p className="mt-2 text-sm text-success" role="status">
          Thanks! Check your inbox.
        </p>
      )}
    </form>
  )
}