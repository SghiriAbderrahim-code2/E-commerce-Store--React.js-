import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ErrorState from '../components/ui/ErrorState'
import NotFound from '../pages/NotFound'

// Code-split every page for smaller initial bundles
const Home = lazy(() => import('../pages/Home'))
const Products = lazy(() => import('../pages/Products'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))
const Cart = lazy(() => import('../pages/Cart'))
const Checkout = lazy(() => import('../pages/Checkout'))
const OrderSuccess = lazy(() => import('../pages/OrderSuccess'))
const Wishlist = lazy(() => import('../pages/Wishlist'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <ErrorState title="Unexpected error" />
      </div>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/products/:id', element: <ProductDetails /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/order-success', element: <OrderSuccess /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
