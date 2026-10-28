import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import CategoriesSection from '../components/home/CategoriesSection'
import PromoBanner from '../components/home/PromoBanner'
import ProductGrid from '../components/product/ProductGrid'
import Newsletter from '../components/common/Newsletter'
import ErrorState from '../components/ui/ErrorState'
import { HomeSkeleton, ProductGridSkeleton } from '../components/ui/Skeletons'
import useProducts from '../hooks/useProducts'
import useCategories from '../hooks/useCategories'
import useRecentlyViewed from '../context/RecentlyViewedContext'

function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}

const viewAllLink = (
  <Link
    to="/products"
    className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
  >
    View all →
  </Link>
)

export default function Home() {
  const { products, loading, error, refetch } = useProducts()
  const { categories } = useCategories()
  const { items: recentlyViewed } = useRecentlyViewed()

  const featured = useMemo(() => products.slice(0, 8), [products])
  const bestSelling = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.rating.rate * b.rating.count - a.rating.rate * a.rating.count)
        .slice(0, 4),
    [products]
  )

  if (loading) return <HomeSkeleton />

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <ErrorState onRetry={refetch} />
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <Hero featuredProducts={bestSelling} />

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          aria-labelledby="featured-heading"
        >
          <SectionHeading
            title="Featured Products"
            subtitle="Hand-picked favorites from our catalog."
            action={viewAllLink}
          />
          <h2 id="featured-heading" className="sr-only">
            Featured Products
          </h2>
          <ProductGrid products={featured} />
        </motion.section>

        <CategoriesSection categories={categories} products={products} />

        <section aria-labelledby="best-selling-heading">
          <SectionHeading
            title="Best Selling"
            subtitle="What shoppers are loving right now."
          />
          <h2 id="best-selling-heading" className="sr-only">
            Best Selling
          </h2>
          <ProductGrid products={bestSelling} />
        </section>

        <PromoBanner />

        {recentlyViewed.length > 0 && (
          <section aria-labelledby="recent-heading">
            <SectionHeading
              title="Recently Viewed"
              subtitle="Pick up where you left off."
            />
            <h2 id="recent-heading" className="sr-only">
              Recently Viewed
            </h2>
            <ProductGrid products={recentlyViewed.slice(0, 4)} />
          </section>
        )}

        <section
          className="flex flex-col items-center gap-6 rounded-3xl border border-zinc-200 bg-zinc-50 px-6 py-14 text-center dark:border-zinc-800 dark:bg-zinc-900/50"
          aria-labelledby="newsletter-heading"
        >
          <div>
            <h2 id="newsletter-heading" className="text-2xl font-bold sm:text-3xl">
              Join the NexusMart newsletter
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Deals, new arrivals and inspiration — straight to your inbox.
            </p>
          </div>
          <Newsletter variant="home" />
        </section>
      </div>
    </div>
  )
}
