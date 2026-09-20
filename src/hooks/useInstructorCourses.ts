import { useCallback, useState } from 'react'
import { useAuth } from './useAuth'
import { courseService, type CreateCourseInput } from '../services/courseService'
import type { Course } from '../types/course'
import type { Module } from '../types/lesson'

export function useInstructorCourses() {
  const { user } = useAuth()

  const instructorKey = user?.instructorId ?? user?.id ?? null

  const [courses, setCourses] = useState<Course[]>(() =>
    instructorKey ? courseService.listByInstructor(instructorKey) : [],
  )

  const refresh = useCallback(() => {
    if (!instructorKey) {
      setCourses([])
      return
    }
    setCourses(courseService.listByInstructor(instructorKey))
  }, [instructorKey])

  const createCourse = useCallback(
    (input: Omit<CreateCourseInput, 'instructorId' | 'instructorName'>) => {
      if (!user) return null
      const instructorId = user.instructorId ?? user.id
      const course = courseService.createCourse({
        ...input,
        instructorId,
        instructorName: user.name,
      })
      refresh()
      return course
    },
    [user, refresh],
  )

  const updateCourse = useCallback(
    (id: string, patch: Partial<Course>) => {
      const next = courseService.updateCourse(id, patch)
      refresh()
      return next
    },
    [refresh],
  )

  const deleteCourse = useCallback(
    (id: string) => {
      courseService.deleteCourse(id)
      refresh()
    },
    [refresh],
  )

  const getCourse = useCallback(
    (id: string): Course | undefined => {
      return courses.find((c) => c.id === id)
    },
    [courses],
  )

  const getModules = useCallback(
    (id: string): Module[] =>
      courseService.getModulesForInstructorCourse(id) ?? [],
    [],
  )

  const saveModules = useCallback(
    (id: string, modules: Module[]) => {
      courseService.saveModules(id, modules)
      refresh()
    },
    [refresh],
  )

  return {
    courses,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
    getModules,
    saveModules,
    refresh,
  }
}