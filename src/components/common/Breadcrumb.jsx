import { Link } from 'react-router-dom'

/** Accessible breadcrumb navigation built from react-router location. */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
        <li>
          <Link
            to="/"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li
              key={item.label}
              className="flex items-center gap-1.5"
              aria-current={isLast ? 'page' : undefined}
            >
              <span aria-hidden="true">/</span>
              {isLast || !item.to ? (
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
