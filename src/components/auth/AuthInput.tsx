import { forwardRef, type InputHTMLAttributes } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput({ label, error, hint, id, className = '', ...rest }, ref) {
    const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`

    return (
      <div className="form-control w-full">
        <label htmlFor={inputId} className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`input input-bordered w-full ${
            error ? 'input-error' : ''
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error ? (
          <label className="label" id={`${inputId}-error`}>
            <span className="label-text-alt text-error">{error}</span>
          </label>
        ) : hint ? (
          <label className="label">
            <span className="label-text-alt text-base-content/60">{hint}</span>
          </label>
        ) : null}
      </div>
    )
  },
)