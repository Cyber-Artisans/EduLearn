import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiPlusCircle,
  FiSearch,
  FiEdit2,
  FiTool,
  FiEye,
  FiTrash2,
} from 'react-icons/fi'
import { EmptyState } from '../../components/common/EmptyState'
import { useInstructorCourses } from '../../hooks/useInstructorCourses'
import type { Course } from '../../types/course'

type Filter = 'all' | 'free' | 'paid'

export default function InstructorCoursesPage() {
  const { courses, deleteCourse } = useInstructorCourses()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [confirmDelete, setConfirmDelete] = useState<Course | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courses.filter((c) => {
      if (filter === 'free' && !c.isFree) return false
      if (filter === 'paid' && c.isFree) return false
      if (!q) return true
      return (
        c.title.toLowerCase().includes(q) ||
        c.categoryName.toLowerCase().includes(q)
      )
    })
  }, [courses, query, filter])

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            My Courses
          </h1>
          <p className="mt-2 text-base-content/60">
            Manage your published and draft courses.
          </p>
        </div>
        <Link to="/instructor/courses/create" className="btn btn-primary">
          <FiPlusCircle /> Create course
        </Link>
      </header>

      {courses.length === 0 ? (
        <EmptyState
          icon={FiPlusCircle}
          title="No courses yet"
          description="Create your first course and share your knowledge with the world."
          action={
            <Link
              to="/instructor/courses/create"
              className="btn btn-primary"
            >
              Create your first course
            </Link>
          }
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex-1 relative">
              <span className="sr-only">Search courses</span>
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or category…"
                className="input input-bordered w-full pl-9"
              />
            </label>

            <div role="tablist" className="tabs tabs-boxed w-fit">
              {(['all', 'free', 'paid'] as Filter[]).map((f) => (
                <button
                  key={f}
                  role="tab"
                  type="button"
                  aria-selected={filter === f}
                  className={`tab capitalize ${
                    filter === f ? 'tab-active' : ''
                  }`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={FiSearch}
              title="No matching courses"
              description="Try a different search or filter."
            />
          ) : (
            <div className="card-edulearn p-0! overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Level</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Lessons</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((course) => (
                      <tr key={course.id} className="hover">
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
                                {course.categoryName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-ghost badge-sm">
                            {course.level}
                          </span>
                        </td>
                        <td className="text-right tabular-nums text-sm">
                          {course.isFree
                            ? 'Free'
                            : `$${course.price.toFixed(2)}`}
                        </td>
                        <td className="text-right tabular-nums text-sm">
                          {course.lessonCount}
                        </td>
                        <td>
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              to={`/courses/${course.id}`}
                              className="btn btn-ghost btn-xs btn-circle"
                              aria-label="Preview"
                            >
                              <FiEye />
                            </Link>
                            <Link
                              to={`/instructor/courses/${course.id}/edit`}
                              className="btn btn-ghost btn-xs btn-circle"
                              aria-label="Edit details"
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
                            <button
                              type="button"
                              onClick={() => setConfirmDelete(course)}
                              className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
                              aria-label="Delete course"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {confirmDelete && (
        <div
          className="modal modal-open"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm delete"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete course?</h3>
            <p className="py-3 text-sm text-base-content/70">
              This will permanently delete{' '}
              <strong>{confirmDelete.title}</strong> and all its lessons.
              Students who enrolled will lose access. This cannot be undone.
            </p>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={() => {
                  deleteCourse(confirmDelete.id)
                  setConfirmDelete(null)
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/40"
            onClick={() => setConfirmDelete(null)}
          />
        </div>
      )}
    </div>
  )
}