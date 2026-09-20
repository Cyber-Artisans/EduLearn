import { Link } from 'react-router-dom'
import {
  FiBookOpen,
  FiUsers,
  FiTrendingUp,
  FiStar,
  FiPlusCircle,
  FiEdit3,
} from 'react-icons/fi'
import { InstructorStatCard } from '../../components/instructor/InstructorStatCard'
import { InstructorCourseRow } from '../../components/instructor/InstructorCourseRow'
import { RecentEnrollmentsList } from '../../components/instructor/RecentEnrollmentsList'
import { TopCourseCard } from '../../components/instructor/TopCourseCard'
import { RatingBreakdown } from '../../components/instructor/RatingBreakdown'
import { useInstructorStats } from '../../hooks/useInstructorStats'
import { useAuth } from '../../hooks/useAuth'

export default function InstructorDashboardPage() {
  const { user } = useAuth()
  const stats = useInstructorStats()

  const firstName = user?.name.split(' ')[0] ?? 'there'
  const hasCourses = stats.courses.length > 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome, {firstName}
          </h1>
          <p className="mt-2 text-base-content/60">
            {hasCourses
              ? "Here's how your courses are performing."
              : 'Publish your first course to start teaching on EduLearn.'}
          </p>
        </div>
        <Link to="/instructor/courses/create" className="btn btn-primary">
          <FiPlusCircle /> Create course
        </Link>
      </header>

      {/* Overview cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InstructorStatCard
          icon={FiBookOpen}
          label="Total Courses"
          value={stats.courses.length}
          color="primary"
          hint={hasCourses ? 'All published' : 'None yet'}
        />
        <InstructorStatCard
          icon={FiUsers}
          label="Total Students"
          value={stats.totalStudents.toLocaleString()}
          color="secondary"
          hint={`${stats.totalEnrollments} enrollments`}
        />
        <InstructorStatCard
          icon={FiTrendingUp}
          label="Estimated Revenue"
          value={`$${Math.round(stats.totalRevenueEstimate).toLocaleString()}`}
          color="success"
          hint="Based on current enrollments"
        />
        <InstructorStatCard
          icon={FiStar}
          label="Average Rating"
          value={stats.averageRating.toFixed(1)}
          color="accent"
          hint={
            stats.averageRating >= 4.5
              ? 'Excellent'
              : stats.averageRating > 0
                ? 'Good'
                : 'No ratings yet'
          }
        />
      </section>

      {/* Empty state for new instructors */}
      {!hasCourses && (
        <section className="rounded-3xl border border-base-300 bg-base-200 p-10 md:p-14 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FiEdit3 className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-2xl md:text-3xl font-extrabold tracking-tight">
            You haven't created any courses yet
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base-content/70">
            Share your expertise with thousands of learners. It takes just a
            few minutes to publish your first course.
          </p>
          <Link
            to="/instructor/courses/create"
            className="btn btn-primary btn-lg mt-8"
          >
            <FiPlusCircle /> Create your first course
          </Link>
        </section>
      )}

      {hasCourses && (
        <>
          {/* Top course + rating breakdown */}
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {stats.topCourse && <TopCourseCard stat={stats.topCourse} />}
            <RatingBreakdown
              average={stats.averageRating}
              buckets={stats.ratingBuckets}
            />
          </div>

          {/* Recent enrollments */}
          <RecentEnrollmentsList items={stats.recentEnrollments} />

          {/* My Courses table */}
          <section className="card-edulearn p-0! overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-base-300">
              <h2 className="text-lg font-bold">My Courses</h2>
              <Link
                to="/instructor/courses"
                className="text-sm text-primary hover:underline font-medium"
              >
                View all →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Status</th>
                    <th className="text-right">Students</th>
                    <th className="text-right">Rating</th>
                    <th className="text-right">Est. revenue</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.courseStats.map((stat) => (
                    <InstructorCourseRow
                      key={stat.course.id}
                      stat={stat}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  )
}