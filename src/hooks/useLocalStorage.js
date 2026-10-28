import { useCallback, useEffect, useState } from 'react'

/**
 * State that is persisted to localStorage and kept in sync across renders.
 * Falls back gracefully when storage is unavailable (e.g. private browsing).
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or unavailable — keep working in memory
    }
  }, [key, value])

  const removeValue = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, removeValue]
}
