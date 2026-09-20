import type { Module, Lesson } from '../types/lesson'
import { courseService } from '../services/courseService'

function makeLesson(
  id: string,
  title: string,
  durationMinutes: number,
  isPreview = false,
): Lesson {
  return {
    id,
    title,
    durationMinutes,
    isPreview,
    description: `In this lesson we cover ${title.toLowerCase()}. By the end you'll have a working example you can build on.`,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    resources: [
      { label: 'Lesson slides', url: '#' },
      { label: 'Starter code', url: '#' },
    ],
  }
}

function makeModules(courseId: string): Module[] {
  return [
    {
      id: `${courseId}-m1`,
      courseId,
      title: 'Introduction & Setup',
      order: 1,
      lessons: [
        makeLesson(`${courseId}-m1-l1`, 'Welcome and course overview', 6, true),
        makeLesson(`${courseId}-m1-l2`, 'Installing the tools', 9, true),
        makeLesson(`${courseId}-m1-l3`, 'Your first project', 14),
      ],
      quizId: `${courseId}-quiz-m1`,
    },
    {
      id: `${courseId}-m2`,
      courseId,
      title: 'Core Fundamentals',
      order: 2,
      lessons: [
        makeLesson(`${courseId}-m2-l1`, 'Core concepts explained', 18),
        makeLesson(`${courseId}-m2-l2`, 'Hands-on practice', 22),
        makeLesson(`${courseId}-m2-l3`, 'Common pitfalls', 12),
        makeLesson(`${courseId}-m2-l4`, 'Mini project', 26),
      ],
      quizId: `${courseId}-quiz-m2`,
    },
    {
      id: `${courseId}-m3`,
      courseId,
      title: 'Advanced Patterns',
      order: 3,
      lessons: [
        makeLesson(`${courseId}-m3-l1`, 'Advanced techniques', 24),
        makeLesson(`${courseId}-m3-l2`, 'Performance and scaling', 19),
        makeLesson(`${courseId}-m3-l3`, 'Real-world case study', 28),
      ],
      quizId: `${courseId}-quiz-m3`,
    },
    {
      id: `${courseId}-m4`,
      courseId,
      title: 'Wrap-up & Next Steps',
      order: 4,
      lessons: [
        makeLesson(`${courseId}-m4-l1`, 'Putting it all together', 16),
        makeLesson(`${courseId}-m4-l2`, 'Where to go from here', 10),
      ],
      quizId: `${courseId}-quiz-m4`,
    },
  ]
}

const cache = new Map<string, Module[]>()

function generateModules(courseId: string): Module[] {
  if (!cache.has(courseId)) {
    cache.set(courseId, makeModules(courseId))
  }
  return cache.get(courseId)!
}

export function getModulesForCourse(courseId: string): Module[] {
  // Instructor-created modules take priority.
  const instructorModules =
    courseService.getModulesForInstructorCourse(courseId)
  if (instructorModules && instructorModules.length > 0) {
    return instructorModules
  }
  return generateModules(courseId)
}