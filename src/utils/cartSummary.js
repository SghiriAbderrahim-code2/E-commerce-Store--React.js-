import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE, TAX_RATE } from './constants'

const round2 = (value) => Math.round(value * 100) / 100

/**
 * Derives the full price breakdown from the cart items.
 * Shipping is free for orders above the free-shipping threshold.
 */
export const calculateCartSummary = (items = []) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = round2(
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE
  const tax = round2(subtotal * TAX_RATE)
  const total = round2(subtotal + shipping + tax)

  return { itemCount, subtotal, shipping, tax, total }
}
