import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { formatCategory } from '../../utils/constants'

/** Accessible star rating with optional review count. Renders full, half and empty stars. */
export default function RatingStars({ rating = 0, count, className = '' }) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const position = index + 1
    if (rating >= position) return <FaStar key={position} />
    if (rating >= position - 0.5) return <FaStarHalfAlt key={position} />
    return <FaRegStar key={position} />
  })

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role="img"
      aria-label={`Rated ${rating} out of 5 stars${count ? ` from ${count} reviews` : ''}`}
    >
      <span className="flex items-center gap-0.5 text-amber-400">{stars}</span>
      <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {rating.toFixed(1)}
        {typeof count === 'number' && (
          <span className="text-zinc-400 dark:text-zinc-500"> ({count})</span>
        )}
      </span>
    </div>
  )
}

export function CategoryBadge({ category, className = '' }) {
  return (
    <span
      className={`bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {formatCategory(category)}
    </span>
  )
}
