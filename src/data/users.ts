import type { UserRecord } from '../types/user'

export const mockUsers: UserRecord[] = [
  {
    id: 'u-student-001',
    name: 'Alex Morgan',
    email: 'student@edulearn.dev',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/200?img=12',
    role: 'student',
    bio: 'Lifelong learner. Currently exploring React and data science.',
    joinedAt: '2024-01-15',
  },
  {
    id: 'u-instructor-001',
    name: 'Sarah Chen',
    email: 'instructor@edulearn.dev',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/200?img=47',
    role: 'instructor',
    instructorId: 'i-001', // ← links to mockInstructors
    bio: 'Senior frontend engineer. Teaching React, TypeScript, and design systems.',
    joinedAt: '2023-08-02',
  },
]

export const DEMO_CREDENTIALS = {
  student: { email: 'student@edulearn.dev', password: 'password123' },
  instructor: { email: 'instructor@edulearn.dev', password: 'password123' },
}