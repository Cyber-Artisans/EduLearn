import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

interface SearchBarProps {
  onSubmitted?: () => void
}

export function SearchBar({ onSubmitted }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/courses?search=${encodeURIComponent(trimmed)}` : '/courses')
    onSubmitted?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="relative w-full max-w-xs"
    >
      <label htmlFor="navbar-search" className="sr-only">
        Search courses
      </label>
      <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-base-content/40" />
      <input
        id="navbar-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses…"
        className="input input-bordered input-sm w-full pl-9 bg-base-100"
      />
    </form>
  )
}