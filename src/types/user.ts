export type Role = 'student' | 'instructor' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: Role
  bio?: string
  joinedAt: string
  /** Present only for instructors. Links to the Instructor record in data/instructors.ts */
  instructorId?: string
}

export interface UserRecord extends User {
  password: string
}

export type PublicUser = User