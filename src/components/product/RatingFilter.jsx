import { FaStar } from 'react-icons/fa'

const options = [0, 3, 4, 4.5]

/** Minimum-rating filter. */
export default function RatingFilter({ selected, onSelect }) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">Minimum Rating</legend>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label="Filter by rating"
      >
        {options.map((rating) => (
          <button
            key={rating}
            type="button"
            role="radio"
            aria-checked={selected === rating}
            onClick={() => onSelect(rating)}
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              selected === rating
                ? 'border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-300'
            }`}
          >
            {rating === 0 ? 'Any' : `${rating}+`}
            {rating !== 0 && <FaStar className="text-amber-400" aria-hidden="true" />}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
