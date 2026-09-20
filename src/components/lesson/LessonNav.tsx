import { FiArrowLeft, FiArrowRight, FiCheck, FiRotateCcw } from 'react-icons/fi'

interface LessonNavProps {
    isCompleted: boolean
    hasPrev: boolean
    hasNext: boolean
    onPrev: () => void
    onNext: () => void
    onToggleComplete: () => void
}

export function LessonNav({
    isCompleted,
    hasPrev,
    hasNext,
    onPrev,
    onNext,
    onToggleComplete,
}: LessonNavProps) {
    return (
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-base-300 pt-6">
            <div className="flex gap-2">
                <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={onPrev}
                    disabled={!hasPrev}
                >
                    <FiArrowLeft /> Previous
                </button>
                <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={onNext}
                    disabled={!hasNext}
                >
                    Next <FiArrowRight />
                </button>
            </div>

            <button
                type="button"
                onClick={onToggleComplete}
                className={`btn ${isCompleted
                        ? 'btn-outline border-success text-success hover:bg-success/10'
                        : 'btn-success'
                    }`}
            >
                {isCompleted ? (
                    <>
                        <FiRotateCcw /> Mark as Incomplete
                    </>
                ) : (
                    <>
                        <FiCheck /> Mark as Complete
                    </>
                )}
            </button>
        </div>
    )
}