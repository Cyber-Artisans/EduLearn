import { useMemo } from 'react'
import { getModulesForCourse } from '../data/modules'
import { computeCourseProgress, flattenLessons } from '../utils/courseProgress'
import { useEnrollment } from './useEnrollment'
import type { Lesson, Module } from '../types/lesson'

export interface CourseLessonsResult {
  modules: Module[]
  flatLessons: Lesson[]
  currentLesson: Lesson | null
  currentIndex: number
  prevLessonId: string | null
  nextLessonId: string | null
  completedSet: Set<string>
  progressPercent: number
}

export function useCourseLessons(
  courseId: string,
  requestedLessonId: string | null,
): CourseLessonsResult {
  const { getEnrollment } = useEnrollment()
  const enrollment = getEnrollment(courseId)

  return useMemo(() => {
    const modules = getModulesForCourse(courseId)
    const flat = flattenLessons(courseId)
    const flatLessons = flat.map((f) => f.lesson)
    const completedSet = new Set(enrollment?.completedLessonIds ?? [])

    // Decide which lesson to show:
    // 1. Explicit ?lesson= in URL
    // 2. Otherwise: last visited, then first incomplete, then first
    let index = -1
    if (requestedLessonId) {
      index = flatLessons.findIndex((l) => l.id === requestedLessonId)
    }
    if (index === -1 && enrollment?.lastLessonId) {
      index = flatLessons.findIndex((l) => l.id === enrollment.lastLessonId)
    }
    if (index === -1) {
      index = flatLessons.findIndex((l) => !completedSet.has(l.id))
    }
    if (index === -1) index = 0

    const currentLesson = flatLessons[index] ?? null
    const prevLessonId = index > 0 ? flatLessons[index - 1].id : null
    const nextLessonId =
      index < flatLessons.length - 1 ? flatLessons[index + 1].id : null

    const progress = computeCourseProgress(courseId, enrollment)

    return {
      modules,
      flatLessons,
      currentLesson,
      currentIndex: index,
      prevLessonId,
      nextLessonId,
      completedSet,
      progressPercent: progress.percent,
    }
  }, [courseId, requestedLessonId, enrollment])
}