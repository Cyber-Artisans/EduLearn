import { FiX } from 'react-icons/fi'
import type { CourseFilters } from '../../utils/filterCourses'
import type { Category } from '../../types/course'

interface ActiveFiltersProps {
  filters: CourseFilters
  categories: Category[]
  onUpdate: (next: Partial<CourseFilters>) => void
  onClear: () => void
}

interface Chip {
  key: string
  label: string
  onRemove: () => void
}

export function ActiveFilters({
  filters,
  categories,
  onUpdate,
  onClear,
}: ActiveFiltersProps) {
  const chips: Chip[] = []

  if (filters.search) {
    chips.push({
      key: 'search',
      label: `"${filters.search}"`,
      onRemove: () => onUpdate({ search: '' }),
    })
  }

  filters.categories.forEach((id) => {
    const cat = categories.find((c) => c.id === id)
    chips.push({
      key: `cat-${id}`,
      label: cat?.name ?? id,
      onRemove: () =>
        onUpdate({ categories: filters.categories.filter((c) => c !== id) }),
    })
  })

  filters.levels.forEach((level) => {
    chips.push({
      key: `lvl-${level}`,
      label: level,
      onRemove: () =>
        onUpdate({ levels: filters.levels.filter((l) => l !== level) }),
    })
  })

  if (filters.minRating > 0) {
    chips.push({
      key: 'rating',
      label: `${filters.minRating}★ & up`,
      onRemove: () => onUpdate({ minRating: 0 }),
    })
  }

  if (filters.price !== 'all') {
    chips.push({
      key: 'price',
      label: filters.price === 'free' ? 'Free' : 'Paid',
      onRemove: () => onUpdate({ price: 'all' }),
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-base-content/60">Active:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="badge badge-primary badge-outline gap-2 hover:bg-primary hover:text-primary-content transition-colors"
        >
          {chip.label}
          <FiX className="h-3 w-3" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClear}
        className="text-sm text-error hover:underline ml-2"
      >
        Clear all
      </button>
    </div>
  )
}