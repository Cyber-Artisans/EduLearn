import { useState, type FormEvent } from 'react'
import { FiSend, FiCheckCircle } from 'react-icons/fi'
import { Container } from '../common/Container'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
  general?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialForm: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate(): boolean {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    else if (form.name.trim().length < 2) e.name = 'Name is too short.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email))
      e.email = 'Enter a valid email address.'
    if (!form.subject.trim()) e.subject = 'Subject is required.'
    else if (form.subject.trim().length < 4)
      e.subject = 'Subject is too short.'
    if (!form.message.trim()) e.message = 'Message is required.'
    else if (form.message.trim().length < 20)
      e.message = 'Message must be at least 20 characters.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setErrors({})
    // Mock submit — no backend yet. Simulate network + success.
    try {
      await new Promise((resolve) => setTimeout(resolve, 900))
      setSubmitted(true)
      setForm(initialForm)
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="section-y bg-base-200">
        <Container className="max-w-2xl">
          <div className="card-edulearn text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
              <FiCheckCircle className="h-8 w-8" />
            </span>
            <h2 className="mt-5 text-2xl font-extrabold">Message sent</h2>
            <p className="mt-2 text-base-content/70">
              Thanks for reaching out. We typically reply within one business
              day.
            </p>
            <button
              type="button"
              className="btn btn-primary mt-6"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="section-y bg-base-200">
      <Container className="max-w-2xl">
        <div className="card-edulearn">
          <h2 className="text-xl font-bold">Send us a message</h2>
          <p className="mt-1 text-sm text-base-content/60">
            We read every message and reply as soon as we can.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            {errors.general && (
              <div role="alert" className="alert alert-error py-3 text-sm">
                {errors.general}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label htmlFor="cf-name" className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  id="cf-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  autoComplete="name"
                  className={`input input-bordered w-full ${
                    errors.name ? 'input-error' : ''
                  }`}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.name}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="cf-email" className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  id="cf-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  autoComplete="email"
                  className={`input input-bordered w-full ${
                    errors.email ? 'input-error' : ''
                  }`}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="cf-subject" className="label">
                <span className="label-text font-medium">Subject</span>
              </label>
              <input
                id="cf-subject"
                type="text"
                value={form.subject}
                onChange={(e) => set('subject', e.target.value)}
                className={`input input-bordered w-full ${
                  errors.subject ? 'input-error' : ''
                }`}
              />
              {errors.subject && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.subject}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="cf-message" className="label">
                <span className="label-text font-medium">Message</span>
                <span className="label-text-alt text-base-content/60">
                  {form.message.length}/1000
                </span>
              </label>
              <textarea
                id="cf-message"
                rows={6}
                value={form.message}
                onChange={(e) => set('message', e.target.value.slice(0, 1000))}
                className={`textarea textarea-bordered w-full ${
                  errors.message ? 'textarea-error' : ''
                }`}
              />
              {errors.message && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.message}
                  </span>
                </label>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Sending…
                  </>
                ) : (
                  <>
                    <FiSend /> Send message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  )
}