import { formatCategory } from '../../utils/constants'

/** Category filter rendered as a selectable list. */
export default function CategoryFilter({ categories, selected, onSelect }) {
  const options = [
    { value: 'all', label: 'All Categories' },
    ...categories.map((c) => ({ value: c, label: formatCategory(c) })),
  ]

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">Category</legend>
      <div className="space-y-1" role="radiogroup" aria-label="Filter by category">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected === option.value}
            onClick={() => onSelect(option.value)}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selected === option.value
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 font-medium'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
