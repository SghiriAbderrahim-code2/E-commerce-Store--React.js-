import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'
import Button from './Button'

/** Friendly error panel with a retry action, used whenever an API call fails. */
export default function ErrorState({
  title = 'Something went wrong',
  message = 'We could not reach the store right now. Please check your connection and try again.',
  onRetry,
  className = '',
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-950/50">
        <FiAlertTriangle className="text-2xl" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          {message}
        </p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <FiRefreshCw aria-hidden="true" /> Try again
        </Button>
      )}
    </div>
  )
}
