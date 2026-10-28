import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiCheckCircle, FiCreditCard, FiLock } from 'react-icons/fi'
import Breadcrumb from '../components/common/Breadcrumb'
import CartSummary from '../components/cart/CartSummary'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import useCart from '../context/CartContext'
import { STORAGE_KEYS } from '../utils/constants'
import { formatPrice } from '../utils/format'
import { createOrder } from '../utils/order'

const fields = [
  {
    name: 'fullName',
    label: 'Full Name',
    autoComplete: 'name',
    rules: { required: 'Full name is required' },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    rules: {
      required: 'Email is required',
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
    },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    autoComplete: 'tel',
    rules: {
      required: 'Phone is required',
      pattern: {
        value: /^[+]?[\d\s()-]{7,15}$/,
        message: 'Enter a valid phone number',
      },
    },
  },
  {
    name: 'address',
    label: 'Address',
    autoComplete: 'street-address',
    rules: { required: 'Address is required' },
  },
  {
    name: 'city',
    label: 'City',
    autoComplete: 'address-level2',
    rules: { required: 'City is required' },
  },
  {
    name: 'country',
    label: 'Country',
    autoComplete: 'country-name',
    rules: { required: 'Country is required' },
  },
  {
    name: 'postalCode',
    label: 'Postal Code',
    autoComplete: 'postal-code',
    rules: { required: 'Postal code is required' },
  },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { items, itemCount, subtotal, shipping, tax, total, clearCart } = useCart()
  const [placing, setPlacing] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setPlacing(true)
    // Simulate a payment gateway round-trip — no real payment is processed
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const order = createOrder({
      items,
      summary: { itemCount, subtotal, shipping, tax, total },
      customer: data,
    })

    try {
      window.sessionStorage.setItem(STORAGE_KEYS.order, JSON.stringify(order))
    } catch {
      // Session storage unavailable — the success page will fall back gracefully
    }

    clearCart()
    toast.success('Order placed successfully!')
    navigate('/order-success', { state: { order }, replace: true })
    setPlacing(false)
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Nothing to check out"
          description="Your cart is empty. Add some products before placing an order."
          actionLabel="Browse products"
          actionTo="/products"
        />
      </div>
    )
  }

  return (
    <div className="animate-fade-in mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-8"
          aria-label="Checkout form"
        >
          {/* Shipping details */}
          <section
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            aria-labelledby="shipping-heading"
          >
            <h2
              id="shipping-heading"
              className="mb-6 flex items-center gap-2 text-base font-semibold"
            >
              <FiCheckCircle className="text-primary-500" aria-hidden="true" />
              Shipping Details
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field, index) => (
                <div
                  key={field.name}
                  className={
                    index < 3 && field.name !== 'phone' ? 'sm:col-span-2' : undefined
                  }
                >
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type || 'text'}
                    autoComplete={field.autoComplete}
                    placeholder={field.label}
                    aria-invalid={errors[field.name] ? 'true' : 'false'}
                    className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-colors outline-none dark:bg-zinc-800 ${
                      errors[field.name]
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'focus:border-primary-400 focus:ring-primary-500/20 border-zinc-200 focus:ring-2 dark:border-zinc-700'
                    }`}
                    {...register(field.name, field.rules)}
                  />
                  {errors[field.name] && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Payment notice */}
          <section
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            aria-labelledby="payment-heading"
          >
            <h2
              id="payment-heading"
              className="mb-2 flex items-center gap-2 text-base font-semibold"
            >
              <FiCreditCard className="text-primary-500" aria-hidden="true" />
              Payment
            </h2>
            <p className="flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400">
              <FiLock aria-hidden="true" />
              This is a demo store — no real payment will be processed and no card details
              are collected.
            </p>
            <Button type="submit" size="lg" className="mt-6 w-full" disabled={placing}>
              {placing ? 'Placing order…' : `Place Order · ${formatPrice(total)}`}
            </Button>
          </section>
        </form>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary
            summary={{ itemCount, subtotal, shipping, tax, total }}
            actionLabel={undefined}
            actionTo={undefined}
          />
        </div>
      </div>
    </div>
  )
}
