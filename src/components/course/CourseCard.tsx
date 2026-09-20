import { Link } from 'react-router-dom'
import { FiUsers, FiClock, FiBarChart2, FiHeart } from 'react-icons/fi'
import { Rating } from '../common/Rating'
import { useWishlist } from '../../hooks/useWishlist'
import { useAuth } from '../../hooks/useAuth'
import type { Course } from '../../types/course'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const priceLabel = course.isFree ? 'Free' : `$${course.price.toFixed(2)}`
  const { isWishlisted, toggle } = useWishlist()
  const { isAuthenticated } = useAuth()
  const wishlisted = isWishlisted(course.id)

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) return
    toggle(course.id)
  }

  return (
    <article className="group card-edulearn p-0! overflow-hidden flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <Link to={`/courses/${course.id}`} className="block h-full w-full">
          <img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <span className="pointer-events-none absolute left-3 top-3 badge badge-primary badge-sm font-semibold">
          {course.categoryName}
        </span>
        {course.isFree && (
          <span className="pointer-events-none absolute right-3 top-3 badge badge-success badge-sm font-semibold">
            Free
          </span>
        )}

        {isAuthenticated && (
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              wishlisted ? 'Remove from wishlist' : 'Add to wishlist'
            }
            aria-pressed={wishlisted}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-base-100/95 backdrop-blur shadow-md hover:bg-base-100 transition-colors"
          >
            <FiHeart
              className={`h-4 w-4 transition-colors ${
                wishlisted ? 'fill-error text-error' : 'text-base-content/60'
              }`}
            />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-center gap-3 text-xs text-base-content/60">
          <span className="badge badge-ghost badge-sm">{course.level}</span>
          <Rating value={course.rating} size="sm" showValue />
        </div>

        <Link to={`/courses/${course.id}`} className="block">
          <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
        </Link>

        <p className="text-sm text-base-content/60 line-clamp-2">
          {course.description}
        </p>

        <p className="text-sm text-base-content/70 mt-auto">
          By <span className="font-semibold">{course.instructorName}</span>
        </p>

        <div className="flex items-center gap-4 text-xs text-base-content/60">
          <span className="flex items-center gap-1">
            <FiUsers className="h-3.5 w-3.5" />
            {course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <FiClock className="h-3.5 w-3.5" />
            {course.durationHours}h
          </span>
          <span className="flex items-center gap-1">
            <FiBarChart2 className="h-3.5 w-3.5" />
            {course.lessonCount} lessons
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-base-300 pt-3">
          <span
            className={`text-lg font-bold ${
              course.isFree ? 'text-success' : 'text-base-content'
            }`}
          >
            {priceLabel}
          </span>
          <Link
            to={`/courses/${course.id}`}
            className="btn btn-primary btn-sm"
          >
            View Course
          </Link>
        </div>
      </div>
    </article>
  )
}