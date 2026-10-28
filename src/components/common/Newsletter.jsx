import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiMail, FiSend } from 'react-icons/fi'

/** Newsletter signup with validated email, shown in the footer and on Home. */
export default function Newsletter({ variant = 'card' }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [subscribed, setSubscribed] = useState(false)

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    toast.success('You are subscribed to the NexusMart newsletter!')
    setSubscribed(true)
    reset()
  }

  const inputId = `newsletter-email-${variant}`

  if (subscribed) {
    return (
      <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
        Thanks for subscribing — watch your inbox for deals. 🎉
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <FiMail
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            placeholder="Enter your email"
            aria-invalid={errors.email ? 'true' : 'false'}
            className={`w-full rounded-xl border bg-white py-2.5 pr-4 pl-9 text-sm transition-colors outline-none placeholder:text-zinc-400 focus:ring-2 dark:bg-zinc-900 ${
              errors.email
                ? 'border-red-500 focus:ring-red-500/20'
                : 'focus:border-primary-400 focus:ring-primary-500/20 border-zinc-200 dark:border-zinc-700'
            }`}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-600 hover:bg-primary-700 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
        >
          <FiSend aria-hidden="true" />
          {isSubmitting ? 'Joining…' : 'Subscribe'}
        </button>
      </div>
      {errors.email && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-500">
          {errors.email.message}
        </p>
      )}
    </form>
  )
}
