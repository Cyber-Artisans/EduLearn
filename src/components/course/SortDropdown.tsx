import { SORT_LABELS, type SortOption } from '../../utils/filterCourses'

interface SortDropdownProps {
  value: SortOption
  onChange: (sort: SortOption) => void
}

const OPTIONS = Object.keys(SORT_LABELS) as SortOption[]

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm text-base-content/60 hidden sm:inline">Sort by:</span>
      <select
        className="select select-bordered select-sm w-full max-w-48"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        aria-label="Sort courses"
      >
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {SORT_LABELS[opt]}
          </option>
        ))}
      </select>
    </label>
  )
}