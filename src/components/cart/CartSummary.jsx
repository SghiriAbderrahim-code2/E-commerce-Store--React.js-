import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Button from '../ui/Button'
import { formatPrice } from '../../utils/format'
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants'

/** Price breakdown panel shared by the Cart and Checkout pages. */
export default function CartSummary({
  summary,
  actionLabel = 'Proceed to Checkout',
  actionTo = '/checkout',
  children,
}) {
  const { subtotal, shipping, tax, total, itemCount } = summary
  const freeShippingProgress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1)

  const rows = [
    {
      label: `Subtotal (${itemCount} item${itemCount === 1 ? '' : 's'})`,
      value: formatPrice(subtotal),
    },
    { label: 'Shipping', value: shipping === 0 ? 'Free' : formatPrice(shipping) },
    { label: 'Tax (8%)', value: formatPrice(tax) },
  ]

  return (
    <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-base font-semibold">Order Summary</h2>

      {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping
          </p>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
            role="progressbar"
            aria-valuenow={Math.round(freeShippingProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Free shipping progress"
          >
            <div
              className="bg-primary-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress * 100}%` }}
            />
          </div>
        </div>
      )}

      <dl className="space-y-3 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <dt className="text-zinc-500 dark:text-zinc-400">{row.label}</dt>
            <dd className="font-medium">{row.value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-zinc-200 pt-3 text-base font-bold dark:border-zinc-800">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>

      {actionTo && (
        <Button to={actionTo} className="w-full" size="lg">
          {actionLabel} <FiArrowRight aria-hidden="true" />
        </Button>
      )}

      {children}

      <p className="text-center text-xs text-zinc-400">
        Taxes are calculated for demo purposes.{' '}
        <Link to="/products" className="hover:text-primary-500 underline">
          Continue shopping
        </Link>
      </p>
    </div>
  )
}
