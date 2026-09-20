export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  courseId: string
  moduleId: string
  moduleOrder: number
  title: string
  questions: QuizQuestion[]
  passingScore: number // percent 0-100
}

export interface QuizAttempt {
  id: string
  quizId: string
  userId: string
  answers: number[] // index per question, -1 for unanswered
  score: number // percent 0-100
  passed: boolean
  attemptedAt: string
}