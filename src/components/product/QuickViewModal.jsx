import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import RatingStars, { CategoryBadge } from '../ui/RatingStars'
import useCart from '../../context/CartContext'
import { formatPrice, truncate } from '../../utils/format'

/** Quick product preview shown in a modal from any product grid. */
export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart()

  return (
    <Modal open={Boolean(product)} onClose={onClose} title="Quick View">
      {product && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-center justify-center rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-800/60">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-64 object-contain"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-3">
            <CategoryBadge category={product.category} className="self-start" />
            <h3 className="text-xl leading-snug font-semibold">{product.title}</h3>
            <RatingStars
              rating={product.rating?.rate || 0}
              count={product.rating?.count}
            />
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {truncate(product.description, 180)}
            </p>
            <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button onClick={() => addItem(product)}>
                <FiShoppingBag aria-hidden="true" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                to={`/products/${product.id}`}
                whileHover={{ scale: 1.02 }}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
