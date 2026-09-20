import { mockCategories } from '../../data/categories'
import type { Course, Level } from '../../types/course'
import type { CreateCourseInput } from '../../services/courseService'

export interface CourseFormValues {
  title: string
  description: string
  longDescription: string
  thumbnail: string
  categoryId: string
  level: Level
  price: number
  isFree: boolean
  tags: string
  requirements: string
  outcomes: string
}

export function emptyFormValues(): CourseFormValues {
  return {
    title: '',
    description: '',
    longDescription: '',
    thumbnail: '',
    categoryId: mockCategories[0]?.id ?? '',
    level: 'Beginner',
    price: 0,
    isFree: false,
    tags: '',
    requirements: '',
    outcomes: '',
  }
}

export function courseToFormValues(course: Course): CourseFormValues {
  return {
    title: course.title,
    description: course.description,
    longDescription: course.longDescription ?? '',
    thumbnail: course.thumbnail,
    categoryId: course.categoryId,
    level: course.level,
    price: course.price,
    isFree: course.isFree,
    tags: course.tags.join(', '),
    requirements: (course.requirements ?? []).join('\n'),
    outcomes: (course.outcomes ?? []).join('\n'),
  }
}

export function formValuesToInput(
  values: CourseFormValues,
): Omit<CreateCourseInput, 'instructorId' | 'instructorName'> {
  return {
    title: values.title,
    description: values.description,
    longDescription: values.longDescription,
    thumbnail: values.thumbnail,
    categoryId: values.categoryId,
    level: values.level,
    price: Number(values.price) || 0,
    isFree: values.isFree,
    tags: values.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    requirements: values.requirements
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean),
    outcomes: values.outcomes
      .split('\n')
      .map((o) => o.trim())
      .filter(Boolean),
  }
}