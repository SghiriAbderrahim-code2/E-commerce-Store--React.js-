import { createContext, useCallback, useContext, useMemo } from 'react'
import toast from 'react-hot-toast'
import useLocalStorage from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/constants'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.wishlist, [])

  const toggleWishlist = useCallback(
    (product) => {
      setItems((current) => {
        const exists = current.some((item) => item.id === product.id)
        toast.success(exists ? 'Removed from wishlist' : 'Saved to wishlist')
        return exists
          ? current.filter((item) => item.id !== product.id)
          : [...current, product]
      })
    },
    [setItems]
  )

  const value = useMemo(
    () => ({
      items,
      toggleWishlist,
      isWished: (productId) => items.some((item) => item.id === productId),
    }),
    [items, toggleWishlist]
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export default function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider')
  return context
}
