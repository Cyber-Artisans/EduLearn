export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: string
  progressPercent: number
  completedLessonIds: string[]
  lastLessonId?: string
  completedAt?: string
  certificateId?: string
}