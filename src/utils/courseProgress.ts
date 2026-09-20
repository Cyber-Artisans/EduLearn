import { getModulesForCourse } from '../data/modules'
import type { Enrollment } from '../types/enrollment'
import type { Lesson, Module } from '../types/lesson'

export interface FlatLesson {
  lesson: Lesson
  module: Module
  index: number // global index across all modules
}

/** Flatten all lessons of a course into a single ordered list. */
export function flattenLessons(courseId: string): FlatLesson[] {
  const modules = getModulesForCourse(courseId)
  const flat: FlatLesson[] = []
  let index = 0
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      flat.push({ lesson, module: mod, index })
      index++
    }
  }
  return flat
}

export interface CourseProgress {
  totalLessons: number
  completedLessons: number
  percent: number
  nextLessonId: string | null
  lastCompletedLessonId: string | null
  isComplete: boolean
  totalMinutes: number
  completedMinutes: number
}

export function computeCourseProgress(
  courseId: string,
  enrollment: Enrollment | undefined,
): CourseProgress {
  const flat = flattenLessons(courseId)
  const totalLessons = flat.length
  const totalMinutes = flat.reduce((s, f) => s + f.lesson.durationMinutes, 0)

  if (!enrollment) {
    return {
      totalLessons,
      completedLessons: 0,
      percent: 0,
      nextLessonId: flat[0]?.lesson.id ?? null,
      lastCompletedLessonId: null,
      isComplete: false,
      totalMinutes,
      completedMinutes: 0,
    }
  }

  const completed = new Set(enrollment.completedLessonIds)
  const completedLessons = flat.filter((f) => completed.has(f.lesson.id)).length
  const completedMinutes = flat
    .filter((f) => completed.has(f.lesson.id))
    .reduce((s, f) => s + f.lesson.durationMinutes, 0)

  const next = flat.find((f) => !completed.has(f.lesson.id))
  const percent =
    totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100)

  return {
    totalLessons,
    completedLessons,
    percent,
    nextLessonId: next?.lesson.id ?? null,
    lastCompletedLessonId:
      flat
        .slice()
        .reverse()
        .find((f) => completed.has(f.lesson.id))?.lesson.id ?? null,
    isComplete: completedLessons === totalLessons && totalLessons > 0,
    totalMinutes,
    completedMinutes,
  }
}