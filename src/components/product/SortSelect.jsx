import { SORT_OPTIONS } from '../../utils/constants'

/** Sort dropdown for the products page. */
export default function SortSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400"
      >
        Sort by
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus:border-primary-400 focus:ring-primary-500/20 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition-colors outline-none focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
