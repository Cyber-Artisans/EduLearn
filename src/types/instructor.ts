export interface Instructor {
  id: string
  name: string
  avatar: string
  headline: string
  bio: string
  courseCount: number
  studentCount: number
  rating: number
  socials?: { label: string; url: string }[]
}