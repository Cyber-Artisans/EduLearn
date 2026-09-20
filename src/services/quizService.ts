import type { Quiz, QuizAttempt } from '../types/quiz'

const STORAGE_KEY = 'edulearn.quizAttempts'

function readAll(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as QuizAttempt[]) : []
  } catch {
    return []
  }
}

function writeAll(list: QuizAttempt[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ignore
  }
}

export function scoreQuiz(quiz: Quiz, answers: number[]): number {
  let correct = 0
  quiz.questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) correct++
  })
  return Math.round((correct / quiz.questions.length) * 100)
}

export const quizService = {
  listForUser(userId: string): QuizAttempt[] {
    return readAll().filter((a) => a.userId === userId)
  },

  listForQuiz(userId: string, quizId: string): QuizAttempt[] {
    return readAll()
      .filter((a) => a.userId === userId && a.quizId === quizId)
      .sort(
        (a, b) =>
          new Date(b.attemptedAt).getTime() -
          new Date(a.attemptedAt).getTime(),
      )
  },

  latestAttempt(userId: string, quizId: string): QuizAttempt | undefined {
    return this.listForQuiz(userId, quizId)[0]
  },

  bestScore(userId: string, quizId: string): number {
    const attempts = this.listForQuiz(userId, quizId)
    return attempts.reduce((max, a) => Math.max(max, a.score), 0)
  },

  submit(
    userId: string,
    quiz: Quiz,
    answers: number[],
  ): QuizAttempt {
    const score = scoreQuiz(quiz, answers)
    const attempt: QuizAttempt = {
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      quizId: quiz.id,
      userId,
      answers,
      score,
      passed: score >= quiz.passingScore,
      attemptedAt: new Date().toISOString(),
    }
    writeAll([attempt, ...readAll()])
    return attempt
  },
}