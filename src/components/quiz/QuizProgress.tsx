interface QuizProgressProps {
  current: number
  total: number
  answered: number
}

export function QuizProgress({ current, total, answered }: QuizProgressProps) {
  const percent = total === 0 ? 0 : Math.round((answered / total) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold">
          Question {current} of {total}
        </span>
        <span className="text-base-content/60">{answered} answered</span>
      </div>
      <progress
        className="progress progress-primary w-full"
        value={percent}
        max={100}
        aria-label={`Quiz progress ${percent}%`}
      />
    </div>
  )
}