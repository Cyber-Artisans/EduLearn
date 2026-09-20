import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { FilterSidebar } from './FilterSidebar'
import type { CourseFilters } from '../../utils/filterCourses'
import type { Category } from '../../types/course'

interface MobileFilterDrawerProps {
  open: boolean
  onClose: () => void
  filters: CourseFilters
  categories: Category[]
  onUpdate: (next: Partial<CourseFilters>) => void
  onClear: () => void
  resultCount: number
}

export function MobileFilterDrawer({
  open,
  onClose,
  filters,
  categories,
  onUpdate,
  onClear,
  resultCount,
}: MobileFilterDrawerProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        aria-label="Filters"
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-base-100 p-6 shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-bold">Filters</span>
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-circle"
            onClick={onClose}
            aria-label="Close filters"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <FilterSidebar
          filters={filters}
          categories={categories}
          onUpdate={onUpdate}
          onClear={onClear}
        />
        <div className="mt-6 sticky bottom-0 bg-base-100 pt-4 border-t border-base-300">
          <button className="btn btn-primary btn-block" onClick={onClose}>
            Show {resultCount} results
          </button>
        </div>
      </aside>
    </>
  )
}