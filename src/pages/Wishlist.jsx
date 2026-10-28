import { FiHeart } from 'react-icons/fi'
import Breadcrumb from '../components/common/Breadcrumb'
import EmptyState from '../components/ui/EmptyState'
import ProductGrid from '../components/product/ProductGrid'
import useWishlist from '../context/WishlistContext'

export default function Wishlist() {
  const { items } = useWishlist()

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Wishlist' }]} />
      <h1 className="mb-8 text-3xl font-bold">
        My Wishlist{' '}
        <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">
          ({items.length} item{items.length === 1 ? '' : 's'})
        </span>
      </h1>

      {items.length === 0 ? (
        <EmptyState
          icon={<FiHeart />}
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it for later."
          actionLabel="Discover products"
          actionTo="/products"
        />
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  )
}
