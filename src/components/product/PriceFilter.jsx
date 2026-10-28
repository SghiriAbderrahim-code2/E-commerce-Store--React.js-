/** Min / max price range filter. */
export default function PriceFilter({ min, max, bounds, onChange }) {
  const clamp = (value, fallback) => {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback
  }

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">Price Range</legend>
      <div className="flex items-center gap-2">
        <label htmlFor="price-min" className="sr-only">
          Minimum price
        </label>
        <input
          id="price-min"
          type="number"
          min={0}
          placeholder={`$${Math.floor(bounds.min)}`}
          value={min}
          onChange={(event) => onChange({ min: clamp(event.target.value, ''), max })}
          className="focus:border-primary-400 focus:ring-primary-500/20 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800"
        />
        <span className="text-zinc-400" aria-hidden="true">
          –
        </span>
        <label htmlFor="price-max" className="sr-only">
          Maximum price
        </label>
        <input
          id="price-max"
          type="number"
          min={0}
          placeholder={`$${Math.ceil(bounds.max)}`}
          value={max}
          onChange={(event) => onChange({ min, max: clamp(event.target.value, '') })}
          className="focus:border-primary-400 focus:ring-primary-500/20 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
    </fieldset>
  )
}
