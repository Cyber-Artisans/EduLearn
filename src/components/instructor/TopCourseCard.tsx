import { Link } from 'react-router-dom'
import { FiAward, FiUsers, FiStar, FiArrowRight } from 'react-icons/fi'
import type { InstructorCourseStat } from '../../hooks/useInstructorStats'

interface TopCourseCardProps {
  stat: InstructorCourseStat
}

export function TopCourseCard({ stat }: TopCourseCardProps) {
  const { course, students, revenueEstimate } = stat

  return (
    <section className="card-edulearn">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <FiAward className="h-4 w-4" />
        </span>
        <h2 className="text-lg font-bold">Top Performing Course</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={course.thumbnail}
          alt=""
          className="w-full sm:w-40 aspect-video object-cover rounded-xl shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold leading-snug line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs text-base-content/60 mt-1">
            {course.categoryName} · {course.level}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-lg font-extrabold">{students}</p>
              <p className="text-xs text-base-content/60 flex items-center gap-1 justify-center">
                <FiUsers className="h-3 w-3" /> Students
              </p>
            </div>
            <div>
              <p className="text-lg font-extrabold">{course.rating.toFixed(1)}</p>
              <p className="text-xs text-base-content/60 flex items-center gap-1 justify-center">
                <FiStar className="h-3 w-3" /> Rating
              </p>
            </div>
            <div>
              <p className="text-lg font-extrabold">
                ${Math.round(revenueEstimate).toLocaleString()}
              </p>
              <p className="text-xs text-base-content/60">Est. revenue</p>
            </div>
          </div>

          <Link
            to={`/instructor/courses/${course.id}/builder`}
            className="btn btn-outline btn-sm mt-4"
          >
            Manage course <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}