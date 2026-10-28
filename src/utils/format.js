const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const formatPrice = (value) => priceFormatter.format(Number(value) || 0)

export const truncate = (text = '', maxLength = 80) =>
  text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text
