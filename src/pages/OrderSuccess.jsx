import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import Button from '../components/ui/Button'
import { STORAGE_KEYS } from '../utils/constants'
import { formatPrice } from '../utils/format'

export default function OrderSuccess() {
  const location = useLocation()
  const [order] = useState(() => {
    if (location.state?.order) return location.state.order
    try {
      const stored = window.sessionStorage.getItem(STORAGE_KEYS.order)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">No recent order</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Place an order and it will show up here.
        </p>
        <Button to="/products" className="mt-6">
          Browse products
        </Button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500 dark:bg-green-950/50"
        >
          <FiCheckCircle className="text-4xl" aria-hidden="true" />
        </motion.span>

        <h1 className="mt-6 text-3xl font-bold">Thank you for your order! 🎉</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Your order{' '}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {order.id}
          </span>{' '}
          has been placed successfully. A confirmation email would be sent to{' '}
          <span className="font-medium">{order.customer?.email}</span>.
        </p>

        <dl className="mx-auto mt-8 max-w-sm space-y-3 rounded-2xl bg-zinc-50 p-6 text-left text-sm dark:bg-zinc-800/60">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3">
              <dt className="line-clamp-1 text-zinc-600 dark:text-zinc-300">
                {item.title} <span className="text-zinc-400">× {item.quantity}</span>
              </dt>
              <dd className="shrink-0 font-medium">
                {formatPrice(item.price * item.quantity)}
              </dd>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-zinc-200 pt-3 font-bold dark:border-zinc-700">
            <dt>Total paid</dt>
            <dd>{formatPrice(order.summary?.total)}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/products">Continue shopping</Button>
          <Button variant="outline" to="/">
            Back to home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
