import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi'
import { formatPrice } from '../../utils/format'

const perks = [
  { icon: FiTruck, label: 'Free shipping over $100' },
  { icon: FiShield, label: 'Secure checkout' },
  { icon: FiRotateCcw, label: '30-day returns' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/** Full-width hero with headline, CTAs and floating product previews. */
export default function Hero({ featuredProducts = [] }) {
  const showcase = featuredProducts.slice(0, 3)

  return (
    <section className="from-primary-600 via-primary-700 relative overflow-hidden bg-gradient-to-br to-zinc-900 text-white">
      {/* Soft decorative glow */}
      <div
        aria-hidden="true"
        className="bg-primary-400/30 absolute -top-32 -right-20 h-96 w-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-primary-800/40 absolute -bottom-40 -left-20 h-96 w-96 rounded-full blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.p
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide"
          >
            New season · Up to 40% off
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Discover products
            <br />
            you&apos;ll love.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Electronics, fashion and everyday essentials — curated in one modern store.
            Fast checkout, secure payments and delivery you can track.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="text-primary-700 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold shadow-lg transition-transform hover:scale-[1.03]"
            >
              Shop now <FiArrowRight aria-hidden="true" />
            </Link>
            <Link
              to="/products?category=electronics"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore electronics
            </Link>
          </motion.div>

          <motion.ul
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75"
          >
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon aria-hidden="true" /> {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Floating product showcase */}
        {showcase.length > 0 && (
          <div className="relative hidden h-[380px] lg:block" aria-hidden="true">
            {showcase.map((product, index) => (
              <motion.div
                key={product.id}
                className="absolute w-44 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur dark:bg-zinc-900/95"
                style={{
                  top: `${index * 96}px`,
                  left: `${index * 88}px`,
                  zIndex: showcase.length - index,
                }}
                initial={{ opacity: 0, y: 30, rotate: index % 2 ? 3 : -3 }}
                animate={{ opacity: 1, y: [0, -10, 0], rotate: index % 2 ? 3 : -3 }}
                transition={{
                  opacity: { delay: 0.3 + index * 0.15, duration: 0.5 },
                  y: { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-28 w-full object-contain"
                  loading="lazy"
                />
                <p className="mt-2 line-clamp-1 text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                  {product.title}
                </p>
                <p className="text-primary-600 dark:text-primary-400 text-sm font-bold">
                  {formatPrice(product.price)}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
