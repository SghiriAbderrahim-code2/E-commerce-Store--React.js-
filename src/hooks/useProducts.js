import { useCallback, useEffect, useState } from 'react'
import { getProducts } from '../services/productApi'

const initialState = { products: [], loading: true, error: null }

/** Fetches the full product catalog with loading / error / retry support. */
export default function useProducts() {
  const [state, setState] = useState(initialState)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    getProducts()
      .then((data) => active && setState({ products: data, loading: false, error: null }))
      .catch(
        (error) =>
          active && setState({ products: [], loading: false, error: error?.message })
      )
    return () => {
      active = false
    }
  }, [reloadKey])

  const refetch = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }))
    setReloadKey((key) => key + 1)
  }, [])

  return { products: state.products, loading: state.loading, error: state.error, refetch }
}
