import type { Enrollment } from '../types/enrollment'

const STORAGE_KEY = 'edulearn.enrollments'

function readAll(): Enrollment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Enrollment[]) : []
  } catch {
    return []
  }
}

function writeAll(list: Enrollment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

export const enrollmentService = {
  list(): Enrollment[] {
    return readAll()
  },

  isEnrolled(userId: string, courseId: string): boolean {
    return readAll().some((e) => e.userId === userId && e.courseId === courseId)
  },

  enroll(userId: string, courseId: string): Enrollment {
    const list = readAll()
    const existing = list.find((e) => e.userId === userId && e.courseId === courseId)
    if (existing) return existing

    const enrollment: Enrollment = {
      id: `enr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progressPercent: 0,
      completedLessonIds: [],
    }
    writeAll([...list, enrollment])
    return enrollment
  },

  unenroll(userId: string, courseId: string): void {
    const list = readAll().filter(
      (e) => !(e.userId === userId && e.courseId === courseId),
    )
    writeAll(list)
  },

  getByCourse(userId: string, courseId: string): Enrollment | undefined {
    return readAll().find((e) => e.userId === userId && e.courseId === courseId)
  },

  /** Persist updated progress fields for an enrollment. */
  updateProgress(
    userId: string,
    courseId: string,
    patch: {
      completedLessonIds?: string[]
      progressPercent?: number
      lastLessonId?: string
      completedAt?: string
      certificateId?: string
    },
  ): Enrollment | undefined {
    const list = readAll()
    const idx = list.findIndex(
      (e) => e.userId === userId && e.courseId === courseId,
    )
    if (idx === -1) return undefined

    const next: Enrollment = { ...list[idx], ...patch }
    list[idx] = next
    writeAll(list)
    return next
  },
}