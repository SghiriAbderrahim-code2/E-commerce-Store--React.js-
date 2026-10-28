import { useCallback, useEffect, useState } from 'react'
import { getProduct } from '../services/productApi'

const initialState = { product: null, loading: true, error: null }

/** Fetches a single product by id, resetting whenever the id changes. */
export default function useProduct(id) {
  const [state, setState] = useState(initialState)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    getProduct(id)
      .then((data) => active && setState({ product: data, loading: false, error: null }))
      .catch(
        (error) =>
          active && setState({ product: null, loading: false, error: error?.message })
      )
    return () => {
      active = false
    }
  }, [id, reloadKey])

  const refetch = useCallback(() => {
    setState((current) => ({ ...current, loading: true, error: null }))
    setReloadKey((key) => key + 1)
  }, [])

  return { product: state.product, loading: state.loading, error: state.error, refetch }
}
