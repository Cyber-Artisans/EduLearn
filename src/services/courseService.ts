import { mockCourses } from '../data/courses'
import { mockCategories } from '../data/categories'
import type { Course, Level } from '../types/course'
import type { Module } from '../types/lesson'

const INSTRUCTOR_COURSES_KEY = 'edulearn.instructorCourses'
const INSTRUCTOR_MODULES_KEY = 'edulearn.instructorModules'

function readInstructorCourses(): Course[] {
  try {
    const raw = localStorage.getItem(INSTRUCTOR_COURSES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Course[]) : []
  } catch {
    return []
  }
}

function writeInstructorCourses(list: Course[]): void {
  try {
    localStorage.setItem(INSTRUCTOR_COURSES_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

function readInstructorModules(): Record<string, Module[]> {
  try {
    const raw = localStorage.getItem(INSTRUCTOR_MODULES_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object'
      ? (parsed as Record<string, Module[]>)
      : {}
  } catch {
    return {}
  }
}

function writeInstructorModules(data: Record<string, Module[]>): void {
  try {
    localStorage.setItem(INSTRUCTOR_MODULES_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

export interface CreateCourseInput {
  instructorId: string
  instructorName: string
  title: string
  description: string
  longDescription?: string
  thumbnail: string
  categoryId: string
  level: Level
  price: number
  isFree: boolean
  tags: string[]
  requirements: string[]
  outcomes: string[]
  durationHours?: number
}

export const courseService = {
  /** Full catalog: seed mock courses + instructor-created courses. */
  list(): Course[] {
    return [...mockCourses, ...readInstructorCourses()]
  },

  getById(id: string): Course | undefined {
    return this.list().find((c) => c.id === id)
  },

  listByInstructor(instructorId: string): Course[] {
    return this.list().filter((c) => c.instructorId === instructorId)
  },

  /** Create a new instructor course. Returns the created Course. */
  createCourse(input: CreateCourseInput): Course {
    const now = new Date().toISOString()
    const category =
      mockCategories.find((c) => c.id === input.categoryId) ??
      mockCategories[0]

    const course: Course = {
      id: `c-user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      slug: slugify(input.title) || `course-${Date.now()}`,
      title: input.title.trim(),
      description: input.description.trim(),
      longDescription: (input.longDescription ?? input.description).trim(),
      thumbnail:
        input.thumbnail.trim() ||
        `https://picsum.photos/seed/${Date.now()}/600/400`,
      instructorId: input.instructorId,
      instructorName: input.instructorName,
      categoryId: input.categoryId,
      categoryName: category.name,
      level: input.level,
      rating: 0,
      ratingCount: 0,
      students: 0,
      lessonCount: 0,
      durationHours: input.durationHours ?? 0,
      price: input.isFree ? 0 : input.price,
      isFree: input.isFree,
      tags: input.tags,
      requirements: input.requirements,
      outcomes: input.outcomes,
      createdAt: now.slice(0, 10),
    }

    writeInstructorCourses([...readInstructorCourses(), course])
    return course
  },

  /** Update an existing instructor course. */
  updateCourse(id: string, patch: Partial<Course>): Course | undefined {
    const list = readInstructorCourses()
    const idx = list.findIndex((c) => c.id === id)
    if (idx === -1) return undefined

    const next: Course = { ...list[idx], ...patch }
    // Keep price/currency consistent with isFree
    if (patch.isFree !== undefined) {
      next.price = patch.isFree ? 0 : (patch.price ?? list[idx].price)
    }
    list[idx] = next
    writeInstructorCourses(list)
    return next
  },

  /** Delete an instructor course + its modules. */
  deleteCourse(id: string): void {
    writeInstructorCourses(readInstructorCourses().filter((c) => c.id !== id))
    const modules = readInstructorModules()
    delete modules[id]
    writeInstructorModules(modules)
  },

  /** Instructor-created modules for a course, or null if none. */
  getModulesForInstructorCourse(courseId: string): Module[] | null {
    const data = readInstructorModules()
    return data[courseId] ?? null
  },

  /** Persist modules for an instructor course. Also updates lessonCount + durationHours. */
  saveModules(courseId: string, modules: Module[]): void {
    const data = readInstructorModules()
    data[courseId] = modules
    writeInstructorModules(data)

    const totalMinutes = modules.reduce(
      (s, m) => s + m.lessons.reduce((ss, l) => ss + l.durationMinutes, 0),
      0,
    )
    const lessonCount = modules.reduce((s, m) => s + m.lessons.length, 0)
    this.updateCourse(courseId, {
      lessonCount,
      durationHours: Math.round((totalMinutes / 60) * 10) / 10,
    })
  },
}