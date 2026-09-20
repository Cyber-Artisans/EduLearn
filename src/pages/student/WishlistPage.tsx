import { Link } from 'react-router-dom'
import { FiHeart, FiTrash2 } from 'react-icons/fi'
import { CourseCard } from '../../components/course/CourseCard'
import { EmptyState } from '../../components/common/EmptyState'
import { useWishlist } from '../../hooks/useWishlist'
import { mockCourses } from '../../data/courses'
import type { Course } from '../../types/course'

export default function WishlistPage() {
  const { wishlistIds, clear } = useWishlist()

  const wishlistedCourses: Course[] = wishlistIds
    .map((id) => mockCourses.find((c) => c.id === id))
    .filter((c): c is Course => Boolean(c))

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            My Wishlist
          </h1>
          <p className="mt-2 text-base-content/60">
            {wishlistedCourses.length > 0
              ? `${wishlistedCourses.length} saved ${
                  wishlistedCourses.length === 1 ? 'course' : 'courses'
                }.`
              : 'Save courses to revisit them later.'}
          </p>
        </div>
        {wishlistedCourses.length > 0 && (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-error hover:bg-error/10"
            onClick={clear}
          >
            <FiTrash2 /> Clear wishlist
          </button>
        )}
      </header>

      {wishlistedCourses.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="Your wishlist is empty"
          description="Tap the heart on any course to save it here for later."
          action={
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}