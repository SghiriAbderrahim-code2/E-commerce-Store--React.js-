import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

/** Accessible pagination control. */
export default function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Products pagination" className="mt-10 flex justify-center">
      <ul className="flex items-center gap-1.5">
        <li>
          <button
            type="button"
            onClick={() => onChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="hover:border-primary-400 hover:text-primary-600 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition-colors disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              onClick={() => onChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-2 text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'hover:border-primary-400 hover:text-primary-600 border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => onChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="hover:border-primary-400 hover:text-primary-600 flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition-colors disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
