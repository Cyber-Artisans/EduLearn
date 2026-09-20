import { Link, useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiXCircle, FiRotateCcw, FiArrowLeft } from 'react-icons/fi'
import type { Quiz, QuizAttempt } from '../../types/quiz'

interface QuizResultProps {
    quiz: Quiz
    attempt: QuizAttempt
    courseId: string
    onRetake: () => void
}

export function QuizResult({ quiz, attempt, courseId, onRetake }: QuizResultProps) {
    const passed = attempt.passed
    const correct = quiz.questions.filter(
        (q, i) => attempt.answers[i] === q.correctIndex,
    ).length

    const navigate = useNavigate()

    return (
        <div className="space-y-8">
            <div
                className={`rounded-3xl border-2 p-8 text-center ${passed
                        ? 'border-success/40 bg-success/5'
                        : 'border-error/40 bg-error/5'
                    }`}
            >
                <span
                    className={`inline-flex h-20 w-20 items-center justify-center rounded-full ${passed
                            ? 'bg-success text-success-content'
                            : 'bg-error text-error-content'
                        }`}
                >
                    {passed ? (
                        <FiCheckCircle className="h-10 w-10" />
                    ) : (
                        <FiXCircle className="h-10 w-10" />
                    )}
                </span>

                <h1 className="mt-5 text-3xl font-extrabold tracking-tight">
                    {passed ? 'Congratulations!' : 'Not quite yet'}
                </h1>

                <p className="mt-2 text-base-content/70">
                    {passed
                        ? `You passed the ${quiz.title.toLowerCase()} with a score of ${attempt.score}%.`
                        : `You scored ${attempt.score}%. You need ${quiz.passingScore}% to pass.`}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
                    <div className="text-center">
                        <p className="text-2xl font-extrabold text-primary">
                            {attempt.score}%
                        </p>
                        <p className="text-base-content/60">Score</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold">
                            {correct}/{quiz.questions.length}
                        </p>
                        <p className="text-base-content/60">Correct</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-extrabold">
                            {quiz.passingScore}%
                        </p>
                        <p className="text-base-content/60">Pass mark</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={onRetake}
                    >
                        <FiRotateCcw /> Retake quiz
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(`/learn/${courseId}`)}
                    >
                        <FiArrowLeft /> Back to course
                    </button>
                </div>
            </div>

            <section>
                <h2 className="text-xl font-bold mb-4">Review your answers</h2>
                <QuizAnswerReview questions={quiz.questions} answers={attempt.answers} />
            </section>

            <div className="text-center">
                <Link
                    to="/dashboard"
                    className="link link-primary text-sm font-semibold"
                >
                    Back to dashboard
                </Link>
            </div>
        </div>
    )
}

// Local import to keep the file self-contained
import { QuizAnswerReview } from './QuizAnswerReview'