import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatCategory } from '../../utils/constants'

/** Category showcase built from API categories with a representative product image. */
export default function CategoriesSection({ categories, products }) {
  const cards = categories.map((category) => ({
    name: category,
    image: products.find((product) => product.category === category)?.image,
  }))

  return (
    <section aria-labelledby="categories-heading">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 id="categories-heading" className="text-2xl font-bold sm:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Find exactly what you need, faster.
          </p>
        </div>
        <Link
          to="/products"
          className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
          >
            <Link
              to={`/products?category=${encodeURIComponent(card.name)}`}
              className="group hover:border-primary-300 dark:hover:border-primary-700 flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-zinc-50 p-4 dark:bg-zinc-800/60">
                {card.image ? (
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-4xl" aria-hidden="true">
                    🛍️
                  </span>
                )}
              </span>
              <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold transition-colors">
                {formatCategory(card.name)}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
