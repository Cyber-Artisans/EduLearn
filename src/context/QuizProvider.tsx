import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { quizService } from '../services/quizService'
import type { Quiz, QuizAttempt } from '../types/quiz'
import { QuizContext, type QuizContextValue } from './QuizContext'

interface QuizProviderProps {
  children: ReactNode
  userId: string | null
}

export function QuizProvider({ children, userId }: QuizProviderProps) {
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() =>
    userId ? quizService.listForUser(userId) : [],
  )

  const submitQuiz = useCallback(
    (quiz: Quiz, answers: number[]): QuizAttempt => {
      if (!userId) {
        // Return an unsaved attempt so the UI still works.
        const score = scoreBestEffort(quiz, answers)
        return {
          id: 'anon',
          quizId: quiz.id,
          userId: 'anon',
          answers,
          score,
          passed: score >= quiz.passingScore,
          attemptedAt: new Date().toISOString(),
        }
      }
      const attempt = quizService.submit(userId, quiz, answers)
      setAttempts(quizService.listForUser(userId))
      return attempt
    },
    [userId],
  )

  const getLatest = useCallback(
    (quizId: string) =>
      attempts.find((a) => a.quizId === quizId) ??
      (userId ? quizService.latestAttempt(userId, quizId) : undefined),
    [attempts, userId],
  )

  const getBestScore = useCallback(
    (quizId: string) =>
      attempts
        .filter((a) => a.quizId === quizId)
        .reduce((max, a) => Math.max(max, a.score), 0),
    [attempts],
  )

  const value = useMemo<QuizContextValue>(
    () => ({ attempts, getLatest, getBestScore, submitQuiz }),
    [attempts, getLatest, getBestScore, submitQuiz],
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

function scoreBestEffort(quiz: Quiz, answers: number[]): number {
  let correct = 0
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) correct++
  })
  return Math.round((correct / quiz.questions.length) * 100)
}