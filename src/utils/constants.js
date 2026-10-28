export const API_BASE_URL = 'https://fakestoreapi.com'

export const STORAGE_KEYS = {
  theme: 'nexusmart-theme',
  cart: 'nexusmart-cart',
  wishlist: 'nexusmart-wishlist',
  recentlyViewed: 'nexusmart-recently-viewed',
  order: 'nexusmart-last-order',
  filterPrefs: 'nexusmart-filter-prefs',
}

export const SHIPPING_FLAT_RATE = 9.99
export const FREE_SHIPPING_THRESHOLD = 100
export const TAX_RATE = 0.08

export const PRODUCTS_PER_PAGE = 8

export const MAX_QUANTITY_PER_ITEM = 10

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Top Rated' },
  { value: 'title-asc', label: 'Name: A to Z' },
  { value: 'title-desc', label: 'Name: Z to A' },
]

// "men's clothing" -> "Men's Clothing"
export const formatCategory = (category = '') =>
  category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
