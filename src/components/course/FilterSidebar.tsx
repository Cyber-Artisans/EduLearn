import { FiX } from 'react-icons/fi'
import { LEVELS, type CourseFilters, type PriceFilter } from '../../utils/filterCourses'
import type { Category } from '../../types/course'
import type { Level } from '../../types/course'

interface FilterSidebarProps {
  filters: CourseFilters
  categories: Category[]
  onUpdate: (next: Partial<CourseFilters>) => void
  onClear: () => void
}

const RATINGS = [4.5, 4, 3.5, 3]
const PRICE_OPTIONS: { value: PriceFilter; label: string }[] = [
  { value: 'all', label: 'All prices' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
]

export function FilterSidebar({
  filters,
  categories,
  onUpdate,
  onClear,
}: FilterSidebarProps) {
  function toggleArrayValue<T extends string>(arr: T[], value: T): T[] {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
  }

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="btn btn-ghost btn-xs text-primary hover:bg-primary/10"
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div className="border-t border-base-300 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-3">Category</h3>
        <ul className="space-y-2">
          {categories.map((c) => (
            <li key={c.id}>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  checked={filters.categories.includes(c.id)}
                  onChange={() =>
                    onUpdate({
                      categories: toggleArrayValue(filters.categories, c.id),
                    })
                  }
                />
                <span>{c.name}</span>
                <span className="ml-auto text-xs text-base-content/50">
                  {c.courseCount}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Level */}
      <div className="border-t border-base-300 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-3">Level</h3>
        <ul className="space-y-2">
          {LEVELS.map((level) => (
            <li key={level}>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  checked={filters.levels.includes(level as Level)}
                  onChange={() =>
                    onUpdate({
                      levels: toggleArrayValue<Level>(filters.levels, level),
                    })
                  }
                />
                <span>{level}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div className="border-t border-base-300 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-3">Rating</h3>
        <ul className="space-y-2">
          {RATINGS.map((r) => (
            <li key={r}>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="rating"
                  className="radio radio-sm radio-primary"
                  checked={filters.minRating === r}
                  onChange={() => onUpdate({ minRating: r })}
                />
                <span>{r} & up</span>
              </label>
            </li>
          ))}
          {filters.minRating > 0 && (
            <li>
              <button
                type="button"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
                onClick={() => onUpdate({ minRating: 0 })}
              >
                <FiX /> Clear rating
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Price */}
      <div className="border-t border-base-300 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-3">Price</h3>
        <ul className="space-y-2">
          {PRICE_OPTIONS.map((opt) => (
            <li key={opt.value}>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="price"
                  className="radio radio-sm radio-primary"
                  checked={filters.price === opt.value}
                  onChange={() => onUpdate({ price: opt.value })}
                />
                <span>{opt.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}