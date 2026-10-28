import { createContext, useCallback, useContext, useMemo } from 'react'
import toast from 'react-hot-toast'
import useLocalStorage from '../hooks/useLocalStorage'
import { MAX_QUANTITY_PER_ITEM, STORAGE_KEYS } from '../utils/constants'
import { calculateCartSummary } from '../utils/cartSummary'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.cart, [])

  const addItem = useCallback(
    (product, quantity = 1) => {
      const safeQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY_PER_ITEM))
      let added = false

      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id)
        if (existing) {
          added = true
          return current.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + safeQuantity, MAX_QUANTITY_PER_ITEM),
                }
              : item
          )
        }
        added = true
        return [...current, { product, quantity: safeQuantity }]
      })

      if (added) toast.success(`${product.title.slice(0, 40)} added to cart`)
    },
    [setItems]
  )

  const removeItem = useCallback(
    (productId) => {
      setItems((current) => {
        const item = current.find((entry) => entry.product.id === productId)
        if (item) toast.success('Item removed from cart')
        return current.filter((entry) => entry.product.id !== productId)
      })
    },
    [setItems]
  )

  const updateQuantity = useCallback(
    (productId, quantity) => {
      const safeQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY_PER_ITEM))
      setItems((current) =>
        current.map((item) =>
          item.product.id === productId ? { ...item, quantity: safeQuantity } : item
        )
      )
    },
    [setItems]
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [setItems])

  const summary = useMemo(() => calculateCartSummary(items), [items])

  const value = useMemo(
    () => ({
      items,
      ...summary,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart: (productId) => items.some((item) => item.product.id === productId),
    }),
    [items, summary, addItem, removeItem, updateQuantity, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
