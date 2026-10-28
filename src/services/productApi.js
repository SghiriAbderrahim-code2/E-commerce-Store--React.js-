import apiClient from './apiClient'

export const getProducts = async () => {
  const { data } = await apiClient.get('/products')
  return data
}

export const getProduct = async (id) => {
  const { data } = await apiClient.get(`/products/${id}`)
  return data
}

export const getCategories = async () => {
  const { data } = await apiClient.get('/products/categories')
  return data
}

export const getProductsByCategory = async (category) => {
  const { data } = await apiClient.get(
    `/products/category/${encodeURIComponent(category)}`
  )
  return data
}
