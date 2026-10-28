import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'
import QuantitySelector from '../ui/QuantitySelector'
import { CategoryBadge } from '../ui/RatingStars'
import { formatPrice } from '../../utils/format'

/** Single cart line item with quantity controls and removal. */
export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900"
    >
      <Link
        to={`/products/${product.id}`}
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60"
        aria-label={`View ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <CategoryBadge category={product.category} />
        <h2 className="mt-1.5 line-clamp-2 font-medium">
          <Link
            to={`/products/${product.id}`}
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {product.title}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {formatPrice(product.price)} each
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <QuantitySelector
          quantity={quantity}
          onChange={(next) => onUpdateQuantity(product.id, next)}
          size="sm"
        />
        <div className="flex items-center gap-4">
          <span className="min-w-20 text-right font-bold">
            {formatPrice(product.price * quantity)}
          </span>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Remove ${product.title} from cart`}
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
          >
            <FiTrash2 aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
