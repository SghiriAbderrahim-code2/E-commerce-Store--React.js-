import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

/** Promotional CTA banner shown between product sections. */
export default function PromoBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-14 text-white sm:px-14 dark:bg-zinc-800"
      aria-labelledby="promo-heading"
    >
      <div
        aria-hidden="true"
        className="bg-primary-500/30 absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
      />
      <div className="relative max-w-xl">
        <p className="text-primary-300 text-sm font-semibold tracking-widest uppercase">
          Limited time offer
        </p>
        <h2 id="promo-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
          Get 20% off your first order
        </h2>
        <p className="mt-3 text-white/70">
          Sign up for the newsletter and unlock members-only deals on electronics, fashion
          and everyday essentials.
        </p>
        <Link
          to="/products"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-transform hover:scale-[1.03]"
        >
          Claim the deal <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </motion.section>
  )
}
