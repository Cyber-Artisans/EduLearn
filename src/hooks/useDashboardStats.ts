import { useMemo } from 'react'
import { useEnrollment } from './useEnrollment'
import { useCertificate } from './useCertificate'
import { computeCourseProgress } from '../utils/courseProgress'
import { mockCourses } from '../data/courses'
import type { Course } from '../types/course'
import type { Enrollment } from '../types/enrollment'

export interface EnrolledCourse {
  course: Course
  enrollment: Enrollment
  percent: number
  nextLessonId: string | null
  isComplete: boolean
  completedMinutes: number
}

export interface DashboardStats {
  enrolledCount: number
  completedCount: number
  inProgressCount: number
  totalLearningMinutes: number
  certificatesCount: number
  enrolled: EnrolledCourse[]
  inProgress: EnrolledCourse[]
  completed: EnrolledCourse[]
}

export function useDashboardStats(): DashboardStats {
  const { enrollments } = useEnrollment()
  const { certificates } = useCertificate()

  return useMemo(() => {
    const items: EnrolledCourse[] = []

    for (const enrollment of enrollments) {
      const course = mockCourses.find((c) => c.id === enrollment.courseId)
      if (!course) continue

      const progress = computeCourseProgress(course.id, enrollment)
      items.push({
        course,
        enrollment,
        percent: progress.percent,
        nextLessonId: progress.nextLessonId,
        isComplete: progress.isComplete,
        completedMinutes: progress.completedMinutes,
      })
    }

    const inProgress = items.filter(
      (i) => !i.isComplete && i.percent > 0,
    )
    const completed = items.filter((i) => i.isComplete)
    const notStarted = items.filter(
      (i) => !i.isComplete && i.percent === 0,
    )

    const totalLearningMinutes = items.reduce(
      (s, i) => s + i.completedMinutes,
      0,
    )

    return {
      enrolledCount: items.length,
      completedCount: completed.length,
      inProgressCount: inProgress.length,
      totalLearningMinutes,
      certificatesCount: certificates.length,
      // "Continue Learning" = in-progress + not-started, then completed
      enrolled: [...inProgress, ...notStarted, ...completed],
      inProgress,
      completed,
    }
  }, [enrollments, certificates])
}

export function formatLearningTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`
}