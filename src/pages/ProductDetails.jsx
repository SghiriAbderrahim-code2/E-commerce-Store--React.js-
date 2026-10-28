import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShield, FiShoppingBag, FiTruck, FiRotateCcw } from 'react-icons/fi'
import Breadcrumb from '../components/common/Breadcrumb'
import Button from '../components/ui/Button'
import QuantitySelector from '../components/ui/QuantitySelector'
import RatingStars, { CategoryBadge } from '../components/ui/RatingStars'
import ErrorState from '../components/ui/ErrorState'
import ProductGrid from '../components/product/ProductGrid'
import { ProductDetailsSkeleton, ProductGridSkeleton } from '../components/ui/Skeletons'
import useProduct from '../hooks/useProduct'
import useProducts from '../hooks/useProducts'
import useCart from '../context/CartContext'
import useWishlist from '../context/WishlistContext'
import useRecentlyViewed from '../context/RecentlyViewedContext'
import { formatPrice } from '../utils/format'
import { formatCategory } from '../utils/constants'

const perks = [
  { icon: FiTruck, label: 'Free shipping over $100' },
  { icon: FiRotateCcw, label: '30-day free returns' },
  { icon: FiShield, label: '2-year warranty' },
]

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading, error, refetch } = useProduct(id)
  const { products, loading: loadingCatalog } = useProducts()
  const { addItem } = useCart()
  const { toggleWishlist, isWished } = useWishlist()
  const { trackProduct } = useRecentlyViewed()

  // Quantity resets automatically when navigating to a different product
  const [quantityState, setQuantityState] = useState({ id, quantity: 1 })
  const quantity = quantityState.id === id ? quantityState.quantity : 1
  const setQuantity = (next) => setQuantityState({ id, quantity: next })

  useEffect(() => {
    if (product) trackProduct(product)
  }, [product, trackProduct])

  const relatedProducts = useMemo(
    () =>
      product
        ? products.filter(
            (item) => item.category === product.category && item.id !== product.id
          )
        : [],
    [products, product]
  )

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ProductDetailsSkeleton />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <ErrorState
          title="Product not found"
          message="This product may have been removed, or the store API is unreachable."
          onRetry={refetch}
        />
        <div className="mt-6 text-center">
          <Link
            to="/products"
            className="text-primary-600 text-sm font-medium hover:underline"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    )
  }

  const wished = isWished(product.id)

  const handleBuyNow = () => {
    addItem(product, quantity)
    navigate('/checkout')
  }

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Products', to: '/products' },
          {
            label: formatCategory(product.category),
            to: `/products?category=${encodeURIComponent(product.category)}`,
          },
          { label: product.title },
        ]}
      />

      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-50 p-10 dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] w-full object-contain"
          />
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center justify-between gap-3">
            <CategoryBadge category={product.category} />
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-pressed={wished}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                wished
                  ? 'border-pink-200 bg-pink-50 text-pink-500 dark:border-pink-900 dark:bg-pink-950/40'
                  : 'border-zinc-200 text-zinc-500 hover:border-pink-200 hover:text-pink-500 dark:border-zinc-700'
              }`}
            >
              <FiHeart fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
            </button>
          </div>

          <h1 className="text-3xl leading-tight font-bold sm:text-4xl">
            {product.title}
          </h1>

          <RatingStars rating={product.rating?.rate || 0} count={product.rating?.count} />

          <p className="text-4xl font-extrabold">{formatPrice(product.price)}</p>

          <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <div className="flex flex-1 flex-wrap gap-3">
              <Button
                onClick={() => addItem(product, quantity)}
                size="lg"
                className="flex-1"
              >
                <FiShoppingBag aria-hidden="true" /> Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleBuyNow}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>
          </div>

          <ul className="mt-4 grid gap-3 rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-600 sm:grid-cols-3 dark:bg-zinc-900/60 dark:text-zinc-300">
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="text-primary-500 shrink-0" aria-hidden="true" /> {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-8 text-2xl font-bold sm:text-3xl">
            You may also like
          </h2>
          {loadingCatalog ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <ProductGrid products={relatedProducts.slice(0, 4)} />
          )}
        </section>
      )}
    </div>
  )
}
