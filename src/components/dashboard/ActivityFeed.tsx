import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FiBookOpen,
  FiCheckCircle,
  FiAward,
  FiHelpCircle,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { mockCourses } from '../../data/courses'
import { useEnrollment } from '../../hooks/useEnrollment'
import { useCertificate } from '../../hooks/useCertificate'
import { computeCourseProgress } from '../../utils/courseProgress'
import type { Enrollment } from '../../types/enrollment'
import type { Certificate } from '../../types/certificate'

interface Activity {
  id: string
  icon: IconType
  color: string
  title: string
  subtitle: string
  at: string
  to: string
}

/**
 * Derives a plausible activity feed from enrollments + certificates.
 * In a real backend, this would be `activityService.list(userId)`.
 * The UI shape stays the same.
 */
function buildFeed(
  enrollments: Enrollment[],
  getByCourse: (courseId: string) => Certificate | undefined,
): Activity[] {
  const events: Activity[] = []

  for (const enrollment of enrollments) {
    const course = mockCourses.find((c) => c.id === enrollment.courseId)
    if (!course) continue

    const progress = computeCourseProgress(course.id, enrollment)
    const enrollDate = new Date(enrollment.enrolledAt).getTime()

    events.push({
      id: `${enrollment.id}-enroll`,
      icon: FiBookOpen,
      color: 'bg-primary/10 text-primary',
      title: 'Enrolled in a course',
      subtitle: course.title,
      at: enrollment.enrolledAt,
      to: `/courses/${course.id}`,
    })

    if (progress.completedLessons > 0) {
      const at = new Date(
        enrollDate + progress.completedMinutes * 60_000,
      ).toISOString()
      events.push({
        id: `${enrollment.id}-lessons`,
        icon: FiCheckCircle,
        color: 'bg-success/10 text-success',
        title: `Completed ${progress.completedLessons} ${
          progress.completedLessons === 1 ? 'lesson' : 'lessons'
        }`,
        subtitle: course.title,
        at,
        to: `/learn/${course.id}`,
      })
    }

    if (progress.completedLessons >= progress.totalLessons / 2) {
      const at = new Date(
        enrollDate + progress.completedMinutes * 60_000 + 60_000,
      ).toISOString()
      events.push({
        id: `${enrollment.id}-quiz`,
        icon: FiHelpCircle,
        color: 'bg-accent/10 text-accent',
        title: 'Passed a module quiz',
        subtitle: course.title,
        at,
        to: `/learn/${course.id}`,
      })
    }

    if (progress.isComplete) {
      const cert = getByCourse(course.id)
      const at = cert?.issuedAt
        ? cert.issuedAt
        : new Date(
            enrollDate + progress.completedMinutes * 60_000 + 120_000,
          ).toISOString()
      events.push({
        id: `${enrollment.id}-cert`,
        icon: FiAward,
        color: 'bg-secondary/10 text-secondary',
        title: 'Earned a certificate',
        subtitle: course.title,
        at,
        to: cert ? `/certificates/${cert.id}` : '/certificates',
      })
    }
  }

  return events
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 8)
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.round(days / 7)
  if (weeks < 4) return `${weeks}w ago`
  return new Date(iso).toLocaleDateString()
}

export function ActivityFeed() {
  const { enrollments } = useEnrollment()
  const { getByCourse } = useCertificate()

  const feed = useMemo(
    () => buildFeed(enrollments, getByCourse),
    [enrollments, getByCourse],
  )

  if (feed.length === 0) {
    return (
      <section className="card-edulearn">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        <p className="text-sm text-base-content/60">
          Your activity will appear here once you enroll in a course.
        </p>
      </section>
    )
  }

  return (
    <section className="card-edulearn">
      <h2 className="text-lg font-bold mb-5">Recent Activity</h2>
      <ol className="relative space-y-5 pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-base-300">
        {feed.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.id} className="relative">
              <span
                className={`absolute -left-6 top-0 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-base-100 ${item.color}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <Link to={item.to} className="group block">
                <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                <p className="text-xs text-base-content/60 line-clamp-1">
                  {item.subtitle}
                </p>
                <p className="text-[11px] text-base-content/40 mt-0.5">
                  {formatRelative(item.at)}
                </p>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}