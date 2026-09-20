export type Level = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  /** Detailed description shown on the course details page. */
  longDescription?: string
  thumbnail: string
  instructorId: string
  instructorName: string
  categoryId: string
  categoryName: string
  level: Level
  rating: number
  ratingCount: number
  students: number
  lessonCount: number
  durationHours: number
  price: number
  isFree: boolean
  tags: string[]
  /** Course-level bullet list shown under "What you'll learn". Optional. */
  outcomes?: string[]
  /** Course-level bullet list shown under "Requirements". Optional. */
  requirements?: string[]
  createdAt: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'neutral'
  courseCount: number
}