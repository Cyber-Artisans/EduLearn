import { FiArrowLeft, FiArrowRight, FiSend } from 'react-icons/fi'

interface QuizNavigationProps {
    hasPrev: boolean
    hasNext: boolean
    allAnswered: boolean
    onPrev: () => void
    onNext: () => void
    onSubmit: () => void
}

export function QuizNavigation({
    hasPrev,
    hasNext,
    allAnswered,
    onPrev,
    onNext,
    onSubmit,
}: QuizNavigationProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-base-300 pt-5">
            <button
                type="button"
                className="btn btn-outline"
                onClick={onPrev}
                disabled={!hasPrev}
            >
                <FiArrowLeft /> Previous
            </button>

            {hasNext ? (
                <button type="button" className="btn btn-primary" onClick={onNext}>
                    Next <FiArrowRight />
                </button>
            ) : (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}
                    disabled={!allAnswered}
                    title={!allAnswered ? 'Answer all questions to submit' : undefined}
                >
                    <FiSend /> Submit quiz
                </button>
            )}
        </div>
    )
}