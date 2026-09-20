interface QuizQuestionGridProps {
  total: number
  currentIndex: number
  answers: (number | null)[]
  onJump: (index: number) => void
}

export function QuizQuestionGrid({
  total,
  currentIndex,
  answers,
  onJump,
}: QuizQuestionGridProps) {
  return (
    <div className="rounded-2xl border border-base-300 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-base-content/60 mb-3">
        Jump to question
      </p>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const answered = answers[i] !== null
          const current = i === currentIndex
          return (
            <button
              key={i}
              type="button"
              onClick={() => onJump(i)}
              aria-label={`Question ${i + 1}${answered ? ', answered' : ', not answered'}`}
              aria-current={current ? 'true' : undefined}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                current
                  ? 'bg-primary text-primary-content'
                  : answered
                    ? 'bg-success/15 text-success hover:bg-success/25'
                    : 'bg-base-200 text-base-content/60 hover:bg-base-300'
              }`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}