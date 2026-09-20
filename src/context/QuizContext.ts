import { createContext } from 'react'
import type { Quiz, QuizAttempt } from '../types/quiz'

export interface QuizContextValue {
  attempts: QuizAttempt[]
  getLatest: (quizId: string) => QuizAttempt | undefined
  getBestScore: (quizId: string) => number
  submitQuiz: (quiz: Quiz, answers: number[]) => QuizAttempt
}

export const QuizContext = createContext<QuizContextValue | undefined>(undefined)