import { useMemo } from 'react'
import { useAuth } from './useAuth'
import { courseService } from '../services/courseService'
import { enrollmentService } from '../services/enrollmentService'
import { mockUsers } from '../data/users'
import type { Course } from '../types/course'
import type { Enrollment } from '../types/enrollment'

export interface InstructorCourseStat {
  course: Course
  students: number
  enrollments: number
  revenueEstimate: number
  status: 'published' | 'draft' // mock: everything is published
}

export interface RecentEnrollment {
  enrollment: Enrollment
  courseTitle: string
  studentName: string
  studentAvatar: string
  at: string
}

export interface InstructorStats {
  courses: Course[]
  courseStats: InstructorCourseStat[]
  totalStudents: number
  totalEnrollments: number
  totalRevenueEstimate: number
  averageRating: number
  ratingBuckets: { star: number; count: number; percent: number }[]
  recentEnrollments: RecentEnrollment[]
  topCourse: InstructorCourseStat | null
}

function findUserName(userId: string): { name: string; avatar: string } {
  const user = mockUsers.find((u) => u.id === userId)
  if (user) return { name: user.name, avatar: user.avatar }

  // Fall back to registered users stored in localStorage
  try {
    const raw = localStorage.getItem('edulearn.registeredUsers')
    if (raw) {
      const list = JSON.parse(raw) as {
        id: string
        name: string
        avatar: string
      }[]
      const found = list.find((u) => u.id === userId)
      if (found) return { name: found.name, avatar: found.avatar }
    }
  } catch {
    // ignore
  }
  return { name: 'Anonymous learner', avatar: 'https://i.pravatar.cc/80?u=anon' }
}

export function useInstructorStats(): InstructorStats {
  const { user } = useAuth()

  return useMemo(() => {
    if (!user) {
      return {
        courses: [],
        courseStats: [],
        totalStudents: 0,
        totalEnrollments: 0,
        totalRevenueEstimate: 0,
        averageRating: 0,
        ratingBuckets: [5, 4, 3, 2, 1].map((star) => ({
          star,
          count: 0,
          percent: 0,
        })),
        recentEnrollments: [],
        topCourse: null,
      }
    }

    // Prefer the linked instructorId (i-001 etc.); fall back to the user's id.
    const instructorKey = user.instructorId ?? user.id
    const courses = courseService.listByInstructor(instructorKey)

    const courseIds = new Set(courses.map((c) => c.id))
    const allEnrollments = enrollmentService
      .list()
      .filter((e) => courseIds.has(e.courseId))

    // Group enrollments per course
    const enrollmentsByCourse = new Map<string, Enrollment[]>()
    for (const e of allEnrollments) {
      const list = enrollmentsByCourse.get(e.courseId) ?? []
      list.push(e)
      enrollmentsByCourse.set(e.courseId, list)
    }

    const courseStats: InstructorCourseStat[] = courses.map((course) => {
      const list = enrollmentsByCourse.get(course.id) ?? []
      const uniqueStudents = new Set(list.map((e) => e.userId)).size
      // Revenue = students × price (one-time purchase mock)
      const revenueEstimate = uniqueStudents * course.price
      return {
        course,
        students: uniqueStudents,
        enrollments: list.length,
        revenueEstimate,
        status: 'published',
      }
    })

    const totalStudents = new Set(
      allEnrollments.map((e) => e.userId),
    ).size
    const totalEnrollments = allEnrollments.length
    const totalRevenueEstimate = courseStats.reduce(
      (s, c) => s + c.revenueEstimate,
      0,
    )

    const averageRating =
      courses.length > 0
        ? courses.reduce((s, c) => s + c.rating, 0) / courses.length
        : 0

    // Rating buckets based on course.rating rounded to nearest star
    const bucketsRaw = [5, 4, 3, 2, 1].map((star) => {
      const count = courses.filter((c) => Math.round(c.rating) === star).length
      return { star, count, percent: 0 }
    })
    const totalRated = bucketsRaw.reduce((s, b) => s + b.count, 0)
    const ratingBuckets = bucketsRaw.map((b) => ({
      ...b,
      percent: totalRated ? (b.count / totalRated) * 100 : 0,
    }))

    // Recent enrollments sorted descending
    const recentEnrollments: RecentEnrollment[] = [...allEnrollments]
      .sort(
        (a, b) =>
          new Date(b.enrolledAt).getTime() -
          new Date(a.enrolledAt).getTime(),
      )
      .slice(0, 8)
      .map((e) => {
        const course = courses.find((c) => c.id === e.courseId)
        const student = findUserName(e.userId)
        return {
          enrollment: e,
          courseTitle: course?.title ?? 'Unknown course',
          studentName: student.name,
          studentAvatar: student.avatar,
          at: e.enrolledAt,
        }
      })

    const topCourse =
      courseStats.length > 0
        ? courseStats.reduce((best, c) =>
            c.students * c.course.rating > best.students * best.course.rating
              ? c
              : best,
          )
        : null

    return {
      courses,
      courseStats,
      totalStudents,
      totalEnrollments,
      totalRevenueEstimate,
      averageRating,
      ratingBuckets,
      recentEnrollments,
      topCourse,
    }
  }, [user])
}