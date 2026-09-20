import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

interface RatingProps {
  value: number
  count?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export function Rating({
  value,
  count,
  size = 'sm',
  showValue = true,
}: RatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const pos = i + 1
    if (value >= pos) return 'full'
    if (value >= pos - 0.5) return 'half'
    return 'empty'
  })

  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating ${value} out of 5`}>
      <div className="flex items-center gap-0.5 text-accent">
        {stars.map((type, i) => {
          if (type === 'full') return <FaStar key={i} className={iconSize} />
          if (type === 'half') return <FaStarHalfAlt key={i} className={iconSize} />
          return <FaRegStar key={i} className={iconSize} />
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-base-content/60">({count.toLocaleString()})</span>
      )}
    </div>
  )
}