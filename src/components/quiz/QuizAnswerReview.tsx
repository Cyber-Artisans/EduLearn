import { FiCheck, FiX } from 'react-icons/fi'
import type { QuizQuestion } from '../../types/quiz'

interface QuizAnswerReviewProps {
    questions: QuizQuestion[]
    answers: number[]
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export function QuizAnswerReview({ questions, answers }: QuizAnswerReviewProps) {
    return (
        <ol className="space-y-5">
            {questions.map((q, i) => {
                const userAnswer = answers[i] ?? -1
                const isCorrect = userAnswer === q.correctIndex

                return (
                    <li
                        key={q.id}
                        className={`rounded-2xl border-2 p-5 ${isCorrect
                                ? 'border-success/40 bg-success/5'
                                : 'border-error/40 bg-error/5'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span
                                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${isCorrect
                                        ? 'bg-success text-success-content'
                                        : 'bg-error text-error-content'
                                    }`}
                            >
                                {isCorrect ? <FiCheck /> : <FiX />}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold">
                                    {i + 1}. {q.question}
                                </p>

                                <ul className="mt-3 space-y-1.5 text-sm">
                                    {q.options.map((opt, oi) => {
                                        const isUserAnswer = oi === userAnswer
                                        const isCorrectOption = oi === q.correctIndex
                                        return (
                                            <li
                                                key={oi}
                                                className={`flex items-start gap-3 rounded-lg px-3 py-2 ${isCorrectOption
                                                        ? 'bg-success/15 font-medium text-success'
                                                        : isUserAnswer
                                                            ? 'bg-error/15 text-error'
                                                            : ''
                                                    }`}
                                            >
                                                <span className="w-4 font-mono text-xs pt-1">
                                                    {LETTERS[oi]}
                                                </span>
                                                <span className="flex-1">
                                                    {opt}
                                                    {isCorrectOption && (
                                                        <span className="ml-2 text-xs font-bold uppercase tracking-wide">
                                                            ✓ Correct
                                                        </span>
                                                    )}
                                                    {isUserAnswer && !isCorrectOption && (
                                                        <span className="ml-2 text-xs font-bold uppercase tracking-wide">
                                                            Your answer
                                                        </span>
                                                    )}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ul>

                                <div className="mt-3 rounded-lg bg-base-200 p-3 text-sm">
                                    <p className="font-bold text-xs uppercase tracking-wide text-base-content/60 mb-1">
                                        Explanation
                                    </p>
                                    <p className="text-base-content/80">{q.explanation}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ol>
    )
}