import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface AuthSubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: ReactNode
}

export function AuthSubmitButton({
  loading = false,
  children,
  className = '',
  disabled,
  ...rest
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`btn btn-primary btn-block ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm" />
          Please wait…
        </>
      ) : (
        children
      )}
    </button>
  )
}