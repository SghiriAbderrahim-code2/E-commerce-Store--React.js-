import { useCallback, useEffect, useState } from 'react'
import { getCategories } from '../services/productApi'

const initialState = { categories: [], loading: true, error: null }

/** Fetches the list of product categories. */
export default function useCategories() {
  const [state, setState] = useState(initialState)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    getCategories()
      .then(
        (data) => active && setState({ categories: data, loading: false, error: null })
      )
      .catch(
        (error) =>
          active && setState({ categories: [], loading: false, error: error?.message })
      )
    return () => {
      active = false
    }
  }, [reloadKey])

  const refetch = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }))
    setReloadKey((key) => key + 1)
  }, [])

  return {
    categories: state.categories,
    loading: state.loading,
    error: state.error,
    refetch,
  }
}
