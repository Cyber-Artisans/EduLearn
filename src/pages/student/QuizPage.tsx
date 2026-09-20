import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import { Container } from '../../components/common/Container'
import { EmptyState } from '../../components/common/EmptyState'
import { QuizProgress } from '../../components/quiz/QuizProgress'
import { QuizQuestionView } from '../../components/quiz/QuizQuestionView'
import { QuizQuestionGrid } from '../../components/quiz/QuizQuestionGrid'
import { QuizNavigation } from '../../components/quiz/QuizNavigation'
import { QuizResult } from '../../components/quiz/QuizResult'
import { getQuiz } from '../../data/quizzes'
import { useQuiz } from '../../hooks/useQuiz'
import type { Quiz, QuizAttempt } from '../../types/quiz'

export default function QuizPage() {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>()
  const quiz = useMemo(() => (quizId ? getQuiz(quizId) : null), [quizId])

  if (!quiz || !courseId) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={FiAlertCircle}
          title="Quiz not found"
          description="This quiz doesn't exist or has been removed."
          action={
            <Link to="/dashboard" className="btn btn-primary">
              Back to dashboard
            </Link>
          }
        />
      </Container>
    )
  }

  // Keying by quiz.id resets all internal state when the quiz changes,
  // so QuizRunner never needs a reset effect. This is the React-recommended
  // pattern for "reset state when a prop changes".
  return <QuizRunner key={quiz.id} quiz={quiz} courseId={courseId} />
}

interface QuizRunnerProps {
  quiz: Quiz
  courseId: string
}

function QuizRunner({ quiz, courseId }: QuizRunnerProps) {
  const { submitQuiz } = useQuiz()

  // Initial state via lazy initializers — no reset effect needed because
  // React remounts this component whenever quiz.id changes.
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    new Array(quiz.questions.length).fill(null),
  )
  const [submittedAttempt, setSubmittedAttempt] =
    useState<QuizAttempt | null>(null)

  // ----- Result view (short-circuits the question flow) -----
  if (submittedAttempt) {
    return (
      <Container className="py-10 md:py-14 max-w-4xl">
        <QuizResult
          quiz={quiz}
          attempt={submittedAttempt}
          courseId={courseId}
          onRetake={() => {
            setAnswers(new Array(quiz.questions.length).fill(null))
            setCurrentIndex(0)
            setSubmittedAttempt(null)
          }}
        />
      </Container>
    )
  }

  // ----- Question flow -----
  const currentQuestion = quiz.questions[currentIndex]
  const allAnswered = answers.every((a) => a !== null)
  const answeredCount = answers.filter((a) => a !== null).length

  function selectOption(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev]
      next[currentIndex] = optionIndex
      return next
    })
  }

  function handleSubmit() {
    if (!allAnswered) return
    const normalizedAnswers = answers.map((a) => (a === null ? -1 : a))
    const attempt = submitQuiz(quiz, normalizedAnswers)
    setSubmittedAttempt(attempt)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Container className="py-10 md:py-14 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/learn/${courseId}`}
          className="text-sm text-base-content/60 hover:text-primary transition-colors"
        >
          ← Back to course
        </Link>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
          {quiz.title}
        </h1>
        <p className="mt-1 text-base-content/60">
          Answer all questions, then submit. You need {quiz.passingScore}% to
          pass.
        </p>
      </div>

      <div className="space-y-8">
        <QuizProgress
          current={currentIndex + 1}
          total={quiz.questions.length}
          answered={answeredCount}
        />

        <QuizQuestionView
          question={currentQuestion}
          index={currentIndex}
          total={quiz.questions.length}
          selectedIndex={answers[currentIndex]}
          onSelect={selectOption}
        />

        <QuizQuestionGrid
          total={quiz.questions.length}
          currentIndex={currentIndex}
          answers={answers}
          onJump={setCurrentIndex}
        />

        <QuizNavigation
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < quiz.questions.length - 1}
          allAnswered={allAnswered}
          onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          onNext={() =>
            setCurrentIndex((i) => Math.min(quiz.questions.length - 1, i + 1))
          }
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  )
}