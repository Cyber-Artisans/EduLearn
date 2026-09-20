import { Link } from 'react-router-dom'
import { FiEdit2, FiTool, FiEye, FiStar } from 'react-icons/fi'
import type { InstructorCourseStat } from '../../hooks/useInstructorStats'

interface InstructorCourseRowProps {
  stat: InstructorCourseStat
}

export function InstructorCourseRow({ stat }: InstructorCourseRowProps) {
  const { course, students, revenueEstimate, status } = stat

  return (
    <tr className="hover">
      <td>
        <div className="flex items-center gap-3">
          <img
            src={course.thumbnail}
            alt=""
            className="h-12 w-20 rounded-lg object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="font-semibold text-sm line-clamp-1">
              {course.title}
            </p>
            <p className="text-xs text-base-content/60">
              {course.categoryName} · {course.level}
            </p>
          </div>
        </div>
      </td>
      <td>
        <span
          className={`badge badge-sm font-semibold ${
            status === 'published' ? 'badge-success' : 'badge-ghost'
          }`}
        >
          {status === 'published' ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="text-right tabular-nums text-sm">
        {students.toLocaleString()}
      </td>
      <td className="text-right tabular-nums text-sm">
        <span className="inline-flex items-center gap-1">
          <FiStar className="h-3.5 w-3.5 text-accent" />
          {course.rating.toFixed(1)}
        </span>
      </td>
      <td className="text-right tabular-nums text-sm font-semibold">
        ${revenueEstimate.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </td>
      <td>
        <div className="flex items-center justify-end gap-1">
          <Link
            to={`/courses/${course.id}`}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="View course"
          >
            <FiEye />
          </Link>
          <Link
            to={`/instructor/courses/${course.id}/edit`}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="Edit course"
          >
            <FiEdit2 />
          </Link>
          <Link
            to={`/instructor/courses/${course.id}/builder`}
            className="btn btn-ghost btn-xs btn-circle"
            aria-label="Open builder"
          >
            <FiTool />
          </Link>
        </div>
      </td>
    </tr>
  )
}