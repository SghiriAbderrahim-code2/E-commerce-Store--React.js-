import { Link } from 'react-router-dom'
import { FiFacebook, FiGithub, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'
import { LuStore } from 'react-icons/lu'
import Newsletter from './Newsletter'
import useCategories from '../../hooks/useCategories'
import { formatCategory } from '../../utils/constants'

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/products', label: 'Shop' },
]

const quickLinks = [
  { to: '/cart', label: 'Cart' },
  { to: '/checkout', label: 'Checkout' },
  { to: '/wishlist', label: 'Wishlist' },
]

const socialLinks = [
  { href: 'https://facebook.com', label: 'Facebook', icon: FiFacebook },
  { href: 'https://instagram.com', label: 'Instagram', icon: FiInstagram },
  { href: 'https://twitter.com', label: 'Twitter', icon: FiTwitter },
  { href: 'https://youtube.com', label: 'YouTube', icon: FiYoutube },
  { href: 'https://github.com', label: 'GitHub', icon: FiGithub },
]

export default function Footer() {
  const { categories } = useCategories()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
              <span className="bg-primary-600 flex h-9 w-9 items-center justify-center rounded-xl text-white">
                <LuStore aria-hidden="true" />
              </span>
              Nexus<span className="text-primary-600 dark:text-primary-400">Mart</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              A modern e-commerce experience built with React. Curated electronics,
              fashion and more — powered by the Fake Store API.
            </p>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold">Stay in the loop</p>
              <Newsletter variant="footer" />
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Categories</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {formatCategory(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {year} NexusMart. Built for portfolio purposes.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="hover:text-primary-600 dark:hover:text-primary-400 flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition-colors hover:bg-white hover:shadow-sm dark:hover:bg-zinc-800"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
