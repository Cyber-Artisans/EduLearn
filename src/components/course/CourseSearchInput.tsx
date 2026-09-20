import { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useDebounce } from '../../hooks/useDebounce'

interface CourseSearchInputProps {
  initialValue: string
  onDebouncedChange: (value: string) => void
}

export function CourseSearchInput({
  initialValue,
  onDebouncedChange,
}: CourseSearchInputProps) {
  const [value, setValue] = useState(initialValue)
  const debounced = useDebounce(value, 300)
  const lastEmitted = useRef(initialValue)

  // Sync React state → URL (external system). This is what effects are for.
  useEffect(() => {
    if (debounced !== lastEmitted.current) {
      lastEmitted.current = debounced
      onDebouncedChange(debounced)
    }
  }, [debounced, onDebouncedChange])

  return (
    <label className="flex-1 relative">
      <span className="sr-only">Search courses</span>
      <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search courses by title, topic, or tag…"
        className="input input-bordered w-full pl-9"
      />
    </label>
  )
}