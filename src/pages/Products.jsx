import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiFilter, FiSearch } from 'react-icons/fi'
import ProductGrid from '../components/product/ProductGrid'
import FiltersSidebar from '../components/product/FiltersSidebar'
import SortSelect from '../components/product/SortSelect'
import Pagination from '../components/product/Pagination'
import QuickViewModal from '../components/product/QuickViewModal'
import Breadcrumb from '../components/common/Breadcrumb'
import ErrorState from '../components/ui/ErrorState'
import Modal from '../components/ui/Modal'
import { ProductGridSkeleton } from '../components/ui/Skeletons'
import useProducts from '../hooks/useProducts'
import useCategories from '../hooks/useCategories'
import useLocalStorage from '../hooks/useLocalStorage'
import { PRODUCTS_PER_PAGE, STORAGE_KEYS, formatCategory } from '../utils/constants'
import { filterAndSortProducts } from '../utils/productFilters'

export default function Products() {
  const { products, loading, error, refetch } = useProducts()
  const { categories } = useCategories()
  const [searchParams, setSearchParams] = useSearchParams()
  // Keep filter preferences (sort, price, rating) across visits
  const [prefs, setPrefs] = useLocalStorage(STORAGE_KEYS.filterPrefs, {
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    sort: 'default',
  })

  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'all'
  const { minPrice, maxPrice, minRating, sort } = prefs
  const filters = { category, ...prefs }

  const priceBounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 1000 }
    const prices = products.map((product) => product.price)
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }, [products])

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        query,
        category,
        minPrice,
        maxPrice,
        minRating,
        sort,
      }),
    [products, query, category, minPrice, maxPrice, minRating, sort]
  )

  // The current page is derived: any filter change resets pagination to page 1
  const filterKey = `${query}|${category}|${minPrice}|${maxPrice}|${minRating}|${sort}`
  const [pageState, setPageState] = useState({ key: filterKey, page: 1 })
  const page = pageState.key === filterKey ? pageState.page : 1
  const setPage = (nextPage) => setPageState({ key: filterKey, page: nextPage })

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const visibleProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  )

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value === 'all') next.delete('category')
    else next.set('category', value)
    setSearchParams(next)
    setMobileFiltersOpen(false)
  }

  const setPref = (key, value) => setPrefs((current) => ({ ...current, [key]: value }))
  const setPrice = ({ min, max }) =>
    setPrefs((current) => ({ ...current, minPrice: min, maxPrice: max }))
  const resetFilters = () => {
    setSearchParams({})
    setPrefs({
      minPrice: '',
      maxPrice: '',
      minRating: 0,
      sort: 'default',
    })
  }

  const filterPanel = (
    <FiltersSidebar
      categories={categories}
      filters={filters}
      priceBounds={priceBounds}
      onCategoryChange={setCategory}
      onPriceChange={setPrice}
      onRatingChange={(value) => setPref('minRating', value)}
      onReset={resetFilters}
    />
  )

  const heading = query
    ? `Results for “${query}”`
    : filters.category !== 'all'
      ? formatCategory(filters.category)
      : 'All Products'

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Products', to: '/products' },
          ...(filters.category !== 'all'
            ? [{ label: formatCategory(filters.category) }]
            : []),
        ]}
      />

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
            {loading
              ? 'Loading products…'
              : `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} found`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-zinc-300 lg:hidden dark:border-zinc-700 dark:bg-zinc-900"
          >
            <FiFilter aria-hidden="true" /> Filters
          </button>
          <SortSelect value={filters.sort} onChange={(value) => setPref('sort', value)} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">{filterPanel}</div>
        </div>

        <div>
          {loading ? (
            <ProductGridSkeleton count={PRODUCTS_PER_PAGE} />
          ) : error ? (
            <ErrorState onRetry={refetch} />
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-zinc-300 py-20 text-center dark:border-zinc-700">
              <span className="text-5xl" aria-hidden="true">
                <FiSearch />
              </span>
              <div>
                <h2 className="text-lg font-semibold">No products match your filters</h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Try adjusting your search or clearing some filters.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="bg-primary-600 hover:bg-primary-700 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${query}-${category}-${page}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProductGrid
                  products={visibleProducts}
                  onQuickView={setQuickViewProduct}
                />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onChange={(nextPage) => {
                    setPage(nextPage)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      <Modal
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        title="Filter Products"
        size="sm"
      >
        {filterPanel}
      </Modal>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}
