import { FiSearch } from 'react-icons/fi'
import { CourseCard } from './CourseCard'
import type { Course } from '../../types/course'

interface CourseGridProps {
  courses: Course[]
  onClear?: () => void
}

export function CourseGrid({ courses, onClear }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-base-200 text-base-content/50">
          <FiSearch className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-xl font-bold">No courses found</h3>
        <p className="mt-2 text-sm text-base-content/60 max-w-md">
          Try adjusting your search or clearing filters to see more results.
        </p>
        {onClear && (
          <button onClick={onClear} className="btn btn-primary mt-6">
            Clear filters
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}