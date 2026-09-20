import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { enrollmentService } from '../services/enrollmentService'
import { computeCourseProgress } from '../utils/courseProgress'
import { mockCourses } from '../data/courses'
import { mockInstructors } from '../data/instructors'
import { useAuth } from '../hooks/useAuth'
import { useCertificate } from '../hooks/useCertificate'
import type { Enrollment } from '../types/enrollment'
import {
  EnrollmentContext,
  type EnrollmentContextValue,
} from './EnrollmentContext'

interface EnrollmentProviderProps {
  children: ReactNode
  userId: string | null
}

export function EnrollmentProvider({
  children,
  userId,
}: EnrollmentProviderProps) {
  const { user } = useAuth()
  const { issue: issueCertificate } = useCertificate()
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() =>
    userId
      ? enrollmentService.list().filter((e) => e.userId === userId)
      : [],
  )

  const refresh = useCallback(() => {
    if (!userId) {
      setEnrollments([])
      return
    }
    setEnrollments(enrollmentService.list().filter((e) => e.userId === userId))
  }, [userId])

  const enroll = useCallback(
    (courseId: string) => {
      if (!userId) return
      enrollmentService.enroll(userId, courseId)
      refresh()
    },
    [userId, refresh],
  )

  const unenroll = useCallback(
    (courseId: string) => {
      if (!userId) return
      enrollmentService.unenroll(userId, courseId)
      refresh()
    },
    [userId, refresh],
  )

  const isEnrolled = useCallback(
    (courseId: string) => enrollments.some((e) => e.courseId === courseId),
    [enrollments],
  )

  const getEnrollment = useCallback(
    (courseId: string) => enrollments.find((e) => e.courseId === courseId),
    [enrollments],
  )

  const issueCertificateFor = useCallback(
    (courseId: string) => {
      if (!userId || !user) return
      const course = mockCourses.find((c) => c.id === courseId)
      if (!course) return

      const instructor =
        mockInstructors.find((i) => i.id === course.instructorId) ??
        mockInstructors[0]

      const cert = issueCertificate({
        userId,
        studentName: user.name,
        courseId,
        courseName: course.title,
        instructorName: instructor.name,
      })

      if (cert) {
        enrollmentService.updateProgress(userId, courseId, {
          certificateId: cert.id,
        })
      }
    },
    [userId, user, issueCertificate],
  )

  const markLessonComplete = useCallback(
    (courseId: string, lessonId: string) => {
      if (!userId) return
      const current = enrollmentService.getByCourse(userId, courseId)
      if (!current) return
      if (current.completedLessonIds.includes(lessonId)) return

      const completedLessonIds = [...current.completedLessonIds, lessonId]
      const progress = computeCourseProgress(courseId, {
        ...current,
        completedLessonIds,
      })

      enrollmentService.updateProgress(userId, courseId, {
        completedLessonIds,
        progressPercent: progress.percent,
        lastLessonId: lessonId,
        completedAt: progress.isComplete
          ? new Date().toISOString()
          : undefined,
      })

      if (progress.isComplete) {
        issueCertificateFor(courseId)
      }

      refresh()
    },
    [userId, refresh, issueCertificateFor],
  )

  const markLessonIncomplete = useCallback(
    (courseId: string, lessonId: string) => {
      if (!userId) return
      const current = enrollmentService.getByCourse(userId, courseId)
      if (!current) return
      if (!current.completedLessonIds.includes(lessonId)) return

      const completedLessonIds = current.completedLessonIds.filter(
        (id) => id !== lessonId,
      )
      const progress = computeCourseProgress(courseId, {
        ...current,
        completedLessonIds,
      })

      enrollmentService.updateProgress(userId, courseId, {
        completedLessonIds,
        progressPercent: progress.percent,
      })

      refresh()
    },
    [userId, refresh],
  )

  const setLastLesson = useCallback(
    (courseId: string, lessonId: string) => {
      if (!userId) return
      enrollmentService.updateProgress(userId, courseId, {
        lastLessonId: lessonId,
      })
      refresh()
    },
    [userId, refresh],
  )

  const value = useMemo<EnrollmentContextValue>(
    () => ({
      enrollments,
      isEnrolled,
      getEnrollment,
      enroll,
      unenroll,
      markLessonComplete,
      markLessonIncomplete,
      setLastLesson,
    }),
    [
      enrollments,
      isEnrolled,
      getEnrollment,
      enroll,
      unenroll,
      markLessonComplete,
      markLessonIncomplete,
      setLastLesson,
    ],
  )

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  )
}