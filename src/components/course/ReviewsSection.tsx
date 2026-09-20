import { FiThumbsUp } from 'react-icons/fi'
import { Rating } from '../common/Rating'
import type { Review } from '../../data/reviews'

interface ReviewsSectionProps {
  reviews: Review[],
  rating: number,  ratingCount: number
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function ReviewsSection({
  reviews,
  rating,
  ratingCount,
}: ReviewsSectionProps) {
  // Compute breakdown from reviews we have. Real app would sum from all reviews.
  const buckets = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length
    const percent = reviews.length ? (count / reviews.length) * 100 : 0
    return { star, count, percent }
  })

  return (
    <section className="card-edulearn">
      <h2 className="text-2xl font-bold mb-6">Student reviews</h2>

      <div className="grid gap-8 md:grid-cols-[200px_1fr] mb-8">
        <div className="flex flex-col items-center justify-center text-center rounded-2xl bg-base-200 p-6">
          <p className="text-5xl font-extrabold text-primary">
            {rating.toFixed(1)}
          </p>
          <div className="mt-2">
            <Rating value={rating} size="md" showValue={false} />
          </div>
          <p className="mt-2 text-xs text-base-content/60">
            {ratingCount.toLocaleString()} ratings
          </p>
        </div>

        <div className="space-y-2">
          {buckets.map((b) => (
            <div key={b.star} className="flex items-center gap-3 text-sm">
              <span className="w-10 text-base-content/70">{b.star} ★</span>
              <div className="flex-1 h-2 rounded-full bg-base-200 overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-500"
                  style={{ width: `${b.percent}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs text-base-content/60">
                {Math.round(b.percent)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <ul className="space-y-6">
        {reviews.map((r) => (
          <li key={r.id} className="border-t border-base-300 pt-6 first:border-0 first:pt-0">
            <div className="flex items-start gap-4">
              <img
                src={r.userAvatar}
                alt=""
                className="h-11 w-11 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-semibold text-sm">{r.userName}</p>
                  <span className="text-xs text-base-content/50">
                    {formatDate(r.createdAt)}
                  </span>
                </div>
                <div className="mt-1">
                  <Rating value={r.rating} size="sm" showValue={false} />
                </div>
                <h3 className="mt-2 font-bold">{r.title}</h3>
                <p className="mt-1 text-sm text-base-content/70">{r.body}</p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 text-xs text-base-content/60 hover:text-primary transition-colors"
                >
                  <FiThumbsUp className="h-3.5 w-3.5" />
                  Helpful ({r.helpfulCount})
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}