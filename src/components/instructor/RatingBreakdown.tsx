import { FiStar } from 'react-icons/fi'
import type { InstructorStats } from '../../hooks/useInstructorStats'

interface RatingBreakdownProps {
  average: number
  buckets: InstructorStats['ratingBuckets']
}

export function RatingBreakdown({ average, buckets }: RatingBreakdownProps) {
  return (
    <section className="card-edulearn">
      <h2 className="text-lg font-bold mb-5">Ratings</h2>

      <div className="flex items-center gap-4 mb-5">
        <div className="text-center">
          <p className="text-4xl font-extrabold text-primary">
            {average.toFixed(1)}
          </p>
          <div className="flex items-center justify-center gap-0.5 text-accent mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} className="h-3.5 w-3.5" />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {buckets.map((b) => (
            <div key={b.star} className="flex items-center gap-2 text-xs">
              <span className="w-6 text-base-content/70">{b.star}★</span>
              <div className="flex-1 h-1.5 rounded-full bg-base-200 overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${b.percent}%` }}
                />
              </div>
              <span className="w-8 text-right text-base-content/50 tabular-nums">
                {Math.round(b.percent)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}