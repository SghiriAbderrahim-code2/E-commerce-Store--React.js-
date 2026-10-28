/** Shimmering placeholder used while products are loading. */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="skeleton aspect-square" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="skeleton h-4 w-full rounded-lg" />
        <div className="skeleton h-4 w-2/3 rounded-lg" />
        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-5 w-16 rounded-lg" />
          <div className="skeleton h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8, className = '' }) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function ProductDetailsSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2" aria-hidden="true">
      <div className="skeleton aspect-square rounded-3xl" />
      <div className="space-y-5">
        <div className="skeleton h-4 w-24 rounded-full" />
        <div className="skeleton h-8 w-4/5 rounded-xl" />
        <div className="skeleton h-4 w-32 rounded-lg" />
        <div className="skeleton h-7 w-24 rounded-lg" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded-lg" />
          <div className="skeleton h-4 w-full rounded-lg" />
          <div className="skeleton h-4 w-3/4 rounded-lg" />
        </div>
        <div className="flex gap-3 pt-4">
          <div className="skeleton h-12 w-36 rounded-xl" />
          <div className="skeleton h-12 w-36 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function HomeSkeleton() {
  return (
    <div className="animate-fade-in">
      <div className="skeleton h-[420px] w-full" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="skeleton mb-8 h-8 w-56 rounded-xl" aria-hidden="true" />
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  )
}
