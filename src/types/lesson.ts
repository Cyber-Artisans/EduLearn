export interface LessonResource {
  label: string
  url: string
}

export interface Lesson {
  id: string
  title: string
  durationMinutes: number
  isPreview: boolean
  description: string
  videoUrl?: string
  resources: LessonResource[]
}

export interface Module {
  id: string
  courseId: string
  title: string
  order: number
  lessons: Lesson[]
  quizId?: string
}