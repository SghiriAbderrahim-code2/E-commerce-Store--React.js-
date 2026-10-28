import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiHeart, FiMenu, FiMoon, FiShoppingBag, FiSun, FiX } from 'react-icons/fi'
import { LuStore } from 'react-icons/lu'
import SearchBar from './SearchBar'
import useCart from '../../context/CartContext'
import useWishlist from '../../context/WishlistContext'
import useTheme from '../../context/ThemeContext'
import useCategories from '../../hooks/useCategories'
import { formatCategory } from '../../utils/constants'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const linkClasses = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'text-primary-600 dark:text-primary-400'
      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white'
  }`

export default function Navbar() {
  const { itemCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { theme, toggleTheme } = useTheme()
  const { categories } = useCategories()
  const location = useLocation()

  const [mobileMenu, setMobileMenu] = useState({ open: false, at: location.key })
  const [categoriesMenu, setCategoriesMenu] = useState({ open: false, at: location.key })
  const categoriesRef = useRef(null)

  // Menus are scoped to the location where they were opened,
  // so navigating away closes them without needing a setState effect.
  const mobileOpen = mobileMenu.open && mobileMenu.at === location.key
  const categoriesOpen = categoriesMenu.open && categoriesMenu.at === location.key

  // Close the categories dropdown on outside click / Escape
  useEffect(() => {
    const closeMenu = () =>
      setCategoriesMenu((menu) => (menu.open ? { ...menu, open: false } : menu))
    const onClick = (event) => {
      if (!categoriesRef.current?.contains(event.target)) closeMenu()
    }
    const onKeyDown = (event) => event.key === 'Escape' && closeMenu()
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-lg dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight"
          aria-label="NexusMart home"
        >
          <span className="bg-primary-600 flex h-9 w-9 items-center justify-center rounded-xl text-white">
            <LuStore aria-hidden="true" className="text-lg" />
          </span>
          <span className="hidden sm:block">
            Nexus<span className="text-primary-600 dark:text-primary-400">Mart</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="ml-4 hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.slice(0, 2).map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClasses}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Categories dropdown */}
          <div ref={categoriesRef} className="relative">
            <button
              type="button"
              onClick={() =>
                setCategoriesMenu({ open: !categoriesOpen, at: location.key })
              }
              aria-expanded={categoriesOpen}
              aria-haspopup="menu"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              Categories
              <motion.span
                animate={{ rotate: categoriesOpen ? 180 : 0 }}
                className="text-[10px]"
                aria-hidden="true"
              >
                ▾
              </motion.span>
            </button>
            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-56 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  {categories.map((category) => (
                    <Link
                      key={category}
                      role="menuitem"
                      to={`/products?category=${encodeURIComponent(category)}`}
                      className="hover:bg-primary-50 hover:text-primary-700 dark:hover:text-primary-300 block rounded-xl px-3 py-2 text-sm text-zinc-700 transition-colors dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      {formatCategory(category)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(2).map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Search */}
        <SearchBar className="mx-auto hidden w-full max-w-sm md:block" />

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="rounded-xl p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            {theme === 'dark' ? (
              <FiSun aria-hidden="true" />
            ) : (
              <FiMoon aria-hidden="true" />
            )}
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist with ${wishlistItems.length} items`}
            className="relative rounded-xl p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <FiHeart aria-hidden="true" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart with ${itemCount} items`}
            className="relative rounded-xl p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <FiShoppingBag aria-hidden="true" />
            {itemCount > 0 && (
              <motion.span
                key={itemCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="bg-primary-600 absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenu({ open: !mobileOpen, at: location.key })}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="rounded-xl p-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 lg:hidden dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            {mobileOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-950"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <SearchBar mobile className="md:hidden" />
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                            : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                <li className="border-t border-zinc-200 pt-3 dark:border-zinc-800">
                  <p className="px-3 pb-1 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                    Categories
                  </p>
                  <ul className="space-y-1">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          to={`/products?category=${encodeURIComponent(category)}`}
                          className="block rounded-xl px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          {formatCategory(category)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
