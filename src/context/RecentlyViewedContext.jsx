import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/constants'

const MAX_RECENT_ITEMS = 8

const RecentlyViewedContext = createContext(null)

export function RecentlyViewedProvider({ children }) {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.recentlyViewed, [])

  const trackProduct = useCallback(
    (product) => {
      if (!product?.id) return
      setItems((current) =>
        [product, ...current.filter((item) => item.id !== product.id)].slice(
          0,
          MAX_RECENT_ITEMS
        )
      )
    },
    [setItems]
  )

  const value = useMemo(() => ({ items, trackProduct }), [items, trackProduct])

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export default function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (!context)
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider')
  return context
}
