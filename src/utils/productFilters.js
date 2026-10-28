const sorters = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'rating-desc': (a, b) => b.rating.rate - a.rating.rate,
  'title-asc': (a, b) => a.title.localeCompare(b.title),
  'title-desc': (a, b) => b.title.localeCompare(a.title),
}

/**
 * Applies the full filter + sort pipeline to the product catalog.
 * Pure function so it can be memoized safely in the Products page.
 */
export const filterAndSortProducts = (
  products,
  {
    query = '',
    category = 'all',
    minPrice = '',
    maxPrice = '',
    minRating = 0,
    sort = 'default',
  }
) => {
  const min = minPrice === '' ? -Infinity : Number(minPrice)
  const max = maxPrice === '' ? Infinity : Number(maxPrice)
  const normalizedQuery = query.trim().toLowerCase()

  const result = products.filter((product) => {
    const matchesQuery =
      !normalizedQuery ||
      product.title.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    const matchesCategory = category === 'all' || product.category === category
    const matchesPrice = product.price >= min && product.price <= max
    const matchesRating = product.rating.rate >= minRating
    return matchesQuery && matchesCategory && matchesPrice && matchesRating
  })

  const sorter = sorters[sort]
  return sorter ? [...result].sort(sorter) : result
}
