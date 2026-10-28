import { AnimatePresence } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
import { LuShoppingBasket } from 'react-icons/lu'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import Breadcrumb from '../components/common/Breadcrumb'
import EmptyState from '../components/ui/EmptyState'
import useCart from '../context/CartContext'

export default function Cart() {
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart()

  if (items.length === 0) {
    return (
      <div className="animate-fade-in mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          icon={<LuShoppingBasket />}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Explore our catalog and find something you love."
          actionLabel="Start shopping"
          actionTo="/products"
        />
      </div>
    )
  }

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Cart' }]} />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">
          Shopping Cart{' '}
          <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">
            ({itemCount} item{itemCount === 1 ? '' : 's'})
          </span>
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-medium text-red-500 transition-colors hover:text-red-600"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </AnimatePresence>

          <div className="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm">
            <FiShoppingCart aria-hidden="true" />
            {shipping === 0
              ? 'You have unlocked free shipping! 🎉'
              : 'Spend over $100 to unlock free shipping.'}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary summary={{ itemCount, subtotal, shipping, tax, total }} />
        </div>
      </div>
    </div>
  )
}
