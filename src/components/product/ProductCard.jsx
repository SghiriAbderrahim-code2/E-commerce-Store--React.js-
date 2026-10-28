import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiEye, FiShoppingBag } from 'react-icons/fi'
import RatingStars, { CategoryBadge } from '../ui/RatingStars'
import useCart from '../../context/CartContext'
import useWishlist from '../../context/WishlistContext'
import { formatPrice, truncate } from '../../utils/format'

/**
 * Product card with quick view, wishlist toggle and add-to-cart.
 * Memoized to avoid re-renders while filters change sibling state.
 */
const ProductCard = memo(function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart()
  const { toggleWishlist, isWished } = useWishlist()
  const [imageLoaded, setImageLoaded] = useState(false)
  const wished = isWished(product.id)

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.title}`}>
          {!imageLoaded && (
            <div className="skeleton absolute inset-0" aria-hidden="true" />
          )}
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`aspect-square w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </Link>

        <div className="absolute top-3 left-3">
          <CategoryBadge category={product.category} />
        </div>

        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wished}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-colors dark:bg-zinc-800 ${
              wished
                ? 'text-pink-500'
                : 'text-zinc-600 hover:text-pink-500 dark:text-zinc-300'
            }`}
          >
            <FiHeart fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              aria-label="Quick view"
              className="hover:text-primary-600 flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-600 shadow-md transition-colors dark:bg-zinc-800 dark:text-zinc-300"
            >
              <FiEye aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <RatingStars rating={product.rating?.rate || 0} count={product.rating?.count} />
        <h3 className="leading-snug font-medium">
          <Link
            to={`/products/${product.id}`}
            className="hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2 transition-colors"
          >
            {product.title}
          </Link>
        </h3>
        <p className="hidden text-xs text-zinc-400 sm:block dark:text-zinc-500">
          {truncate(product.description, 90)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-white transition-colors"
            aria-label={`Add ${product.title} to cart`}
          >
            <FiShoppingBag aria-hidden="true" /> Add
          </button>
        </div>
      </div>
    </motion.article>
  )
})

export default ProductCard
