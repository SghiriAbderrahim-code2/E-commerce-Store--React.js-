import { motion } from 'framer-motion'
import { FiPackage, FiUsers, FiAward, FiHeart } from 'react-icons/fi'
import Breadcrumb from '../components/common/Breadcrumb'

const values = [
  {
    icon: FiPackage,
    title: 'Curated Catalog',
    text: 'Every product in our store is reviewed for quality before it reaches your screen.',
  },
  {
    icon: FiUsers,
    title: 'Customer First',
    text: 'Support, returns and guarantees designed around real people, not policies.',
  },
  {
    icon: FiAward,
    title: 'Fair Pricing',
    text: 'Transparent prices with regular deals — no hidden fees at checkout.',
  },
  {
    icon: FiHeart,
    title: 'Built With Care',
    text: 'A fast, accessible and delightful shopping experience on every device.',
  },
]

const stats = [
  { value: '20+', label: 'Products' },
  { value: '4', label: 'Categories' },
  { value: '10k+', label: 'Happy shoppers' },
  { value: '99%', label: 'Satisfaction' },
]

export default function About() {
  return (
    <div className="animate-fade-in mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'About' }]} />

      <section className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-extrabold sm:text-5xl"
        >
          We make shopping{' '}
          <span className="text-primary-600 dark:text-primary-400">simple</span>
        </motion.h1>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-300">
          NexusMart is a modern e-commerce storefront built with React, demonstrating
          production-grade frontend architecture: reusable components, Context API state
          management, REST API consumption and thoughtful UX. The catalog is powered by
          the Fake Store API — every product you see is fetched live.
        </p>
      </section>

      <section
        className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
        aria-label="Company stats"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-zinc-200 bg-white py-8 text-center dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-primary-600 dark:text-primary-400 text-3xl font-extrabold">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-20" aria-labelledby="values-heading">
        <h2 id="values-heading" className="text-center text-2xl font-bold sm:text-3xl">
          Our values
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
