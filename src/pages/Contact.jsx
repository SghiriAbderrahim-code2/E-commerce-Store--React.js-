import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiSend, FiClock } from 'react-icons/fi'
import Breadcrumb from '../components/common/Breadcrumb'

const contactInfo = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'support@nexusmart.demo',
    href: 'mailto:support@nexusmart.demo',
  },
  { icon: FiPhone, label: 'Phone', value: '+1 (555) 012-3456', href: 'tel:+15550123456' },
  { icon: FiMapPin, label: 'Address', value: '42 Market Street, San Francisco, CA' },
  { icon: FiClock, label: 'Support hours', value: 'Mon – Fri, 9:00 – 18:00' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success('Message sent! We will get back to you soon.')
    setSent(true)
    reset()
  }

  const inputClasses = (hasError) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition-colors dark:bg-zinc-800 ${
      hasError
        ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
        : 'border-zinc-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:border-zinc-700'
    }`

  return (
    <div className="animate-fade-in mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">Get in touch</h1>
          <p className="mt-3 max-w-md leading-relaxed text-zinc-600 dark:text-zinc-300">
            Have a question about an order, a product or this demo project? Fill in the
            form and we&apos;ll get back to you as soon as possible.
          </p>

          <ul className="mt-10 space-y-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="hover:text-primary-600 text-sm text-zinc-500 transition-colors dark:text-zinc-400"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Contact form"
          className="space-y-5 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              aria-invalid={errors.name ? 'true' : 'false'}
              className={inputClasses(errors.name)}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={inputClasses(errors.email)}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              placeholder="How can we help?"
              aria-invalid={errors.subject ? 'true' : 'false'}
              className={inputClasses(errors.subject)}
              {...register('subject', { required: 'Subject is required' })}
            />
            {errors.subject && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Write your message…"
              aria-invalid={errors.message ? 'true' : 'false'}
              className={inputClasses(errors.message)}
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
              })}
            />
            {errors.message && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-colors disabled:opacity-50"
          >
            <FiSend aria-hidden="true" />
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>

          {sent && (
            <p
              role="status"
              className="text-center text-sm font-medium text-green-600 dark:text-green-400"
            >
              Thanks — your message has been received!
            </p>
          )}
        </motion.form>
      </div>
    </div>
  )
}
