import { createContext } from 'react'
import type { Enrollment } from '../types/enrollment'

export interface EnrollmentContextValue {
  enrollments: Enrollment[]
  isEnrolled: (courseId: string) => boolean
  getEnrollment: (courseId: string) => Enrollment | undefined
  enroll: (courseId: string) => void
  unenroll: (courseId: string) => void
  markLessonComplete: (courseId: string, lessonId: string) => void
  markLessonIncomplete: (courseId: string, lessonId: string) => void
  setLastLesson: (courseId: string, lessonId: string) => void
}

export const EnrollmentContext = createContext<
  EnrollmentContextValue | undefined
>(undefined)