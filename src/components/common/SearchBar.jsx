import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import useDebounce from '../../hooks/useDebounce'

/**
 * Live search box. Typing updates the `q` query param on the Products page
 * (navigating there when needed) so search state survives navigation.
 */
export default function SearchBar({ className = '', mobile = false }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebounce(query, 350)

  // Live search: sync the input with the `q` query param on the Products page.
  // The effect is idempotent (it only navigates when the values differ), so
  // StrictMode double-invocation and repeated renders are harmless.
  useEffect(() => {
    const current = searchParams.get('q') || ''
    const target = debouncedQuery.trim()
    if (target === current) return
    navigate(target ? `/products?q=${encodeURIComponent(target)}` : '/products', {
      replace: true,
    })
  }, [debouncedQuery, navigate, searchParams])

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        navigate(
          query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products'
        )
      }}
      className={`relative ${className}`}
    >
      <label htmlFor={mobile ? 'mobile-search' : 'navbar-search'} className="sr-only">
        Search products
      </label>
      <FiSearch
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
        aria-hidden="true"
      />
      <input
        id={mobile ? 'mobile-search' : 'navbar-search'}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products…"
        className="focus:border-primary-400 focus:ring-primary-500/20 dark:focus:border-primary-500 w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2 pr-4 pl-9 text-sm transition-colors outline-none placeholder:text-zinc-400 focus:bg-white focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:bg-zinc-900"
      />
    </form>
  )
}
