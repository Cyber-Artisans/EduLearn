import { useEffect, useMemo, useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import { Container } from '../../components/common/Container'
import { CourseGrid } from '../../components/course/CourseGrid'
import { CourseGridSkeleton } from '../../components/course/CourseGridSkeleton'
import { CourseSearchInput } from '../../components/course/CourseSearchInput'
import { FilterSidebar } from '../../components/course/FilterSidebar'
import { MobileFilterDrawer } from '../../components/course/MobileFilterDrawer'
import { SortDropdown } from '../../components/course/SortDropdown'
import { ActiveFilters } from '../../components/course/ActiveFilters'
import { useCourseFilters } from '../../hooks/useCourseFilters'
import { filterCourses } from '../../utils/filterCourses'
import { mockCourses } from '../../data/courses'
import { mockCategories } from '../../data/categories'

export default function CoursesPage() {
  const { filters, update, clear, activeCount } = useCourseFilters()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const results = useMemo(() => filterCourses(mockCourses, filters), [filters])

  return (
    <div className="bg-base-100 min-h-screen">
      <Container className="py-10 md:py-14">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Explore Courses
          </h1>
          <p className="mt-2 text-base-content/60">
            {results.length} course{results.length === 1 ? '' : 's'} available
          </p>
        </header>

        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                categories={mockCategories}
                onUpdate={update}
                onClear={clear}
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
              <CourseSearchInput
                // Remount on external URL changes (back button, clear-all,
                // deep link) to reset the input to the URL's value.
                key={filters.search}
                initialValue={filters.search}
                onDebouncedChange={(search) => update({ search })}
              />

              <SortDropdown
                value={filters.sort}
                onChange={(sort) => update({ sort })}
              />

              <button
                type="button"
                className="btn btn-outline lg:hidden"
                onClick={() => setDrawerOpen(true)}
              >
                <FiFilter />
                Filters
                {activeCount > 0 && (
                  <span className="badge badge-primary badge-sm">
                    {activeCount}
                  </span>
                )}
              </button>
            </div>

            <ActiveFilters
              filters={filters}
              categories={mockCategories}
              onUpdate={update}
              onClear={clear}
            />

            {loading ? (
              <CourseGridSkeleton count={8} />
            ) : (
              <CourseGrid courses={results} onClear={clear} />
            )}
          </div>
        </div>
      </Container>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        categories={mockCategories}
        onUpdate={update}
        onClear={clear}
        resultCount={results.length}
      />
    </div>
  )
}