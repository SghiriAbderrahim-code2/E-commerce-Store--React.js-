import { FiMinus, FiPlus } from 'react-icons/fi'
import { MAX_QUANTITY_PER_ITEM } from '../../utils/constants'

/** Accessible quantity stepper with + / − controls and direct input. */
export default function QuantitySelector({
  quantity,
  onChange,
  max = MAX_QUANTITY_PER_ITEM,
  size = 'md',
}) {
  const controlClasses =
    'flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white'
  const dimension = size === 'sm' ? 'h-8' : 'h-10'

  const handleChange = (nextValue) => {
    const clamped = Math.max(1, Math.min(nextValue, max))
    onChange(clamped)
  }

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 ${dimension}`}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        className={controlClasses}
        onClick={() => handleChange(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <FiMinus aria-hidden="true" />
      </button>
      <input
        type="number"
        min={1}
        max={max}
        value={quantity}
        onChange={(event) => handleChange(Number(event.target.value) || 1)}
        aria-label="Quantity"
        className={`w-10 bg-transparent text-center text-sm font-semibold outline-none ${size === 'sm' ? 'h-8' : 'h-10'}`}
      />
      <button
        type="button"
        className={controlClasses}
        onClick={() => handleChange(quantity + 1)}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <FiPlus aria-hidden="true" />
      </button>
    </div>
  )
}
