import { FiRotateCcw } from 'react-icons/fi'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import RatingFilter from './RatingFilter'

/** Composes all product filters into a single sidebar panel. */
export default function FiltersSidebar({
  categories,
  filters,
  priceBounds,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onReset,
}) {
  return (
    <aside
      aria-label="Product filters"
      className="space-y-8 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center gap-1 text-xs font-medium text-zinc-500 transition-colors"
        >
          <FiRotateCcw aria-hidden="true" /> Reset
        </button>
      </div>

      <CategoryFilter
        categories={categories}
        selected={filters.category}
        onSelect={onCategoryChange}
      />
      <div className="border-t border-zinc-200 dark:border-zinc-800" />
      <PriceFilter
        min={filters.minPrice}
        max={filters.maxPrice}
        bounds={priceBounds}
        onChange={onPriceChange}
      />
      <div className="border-t border-zinc-200 dark:border-zinc-800" />
      <RatingFilter selected={filters.minRating} onSelect={onRatingChange} />
    </aside>
  )
}
