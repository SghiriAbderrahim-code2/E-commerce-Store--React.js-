import { Link } from 'react-router-dom'
import Button from './Button'

/** Reusable empty-state panel with icon, copy and an optional action. */
export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/60 px-6 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900/40 ${className}`}
    >
      {icon && (
        <span className="text-6xl text-zinc-300 dark:text-zinc-600" aria-hidden="true">
          {icon}
        </span>
      )}
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
      {actionLabel &&
        (actionTo ? (
          <Button to={actionTo}>{actionLabel}</Button>
        ) : (
          <Button onClick={onAction}>{actionLabel}</Button>
        ))}
      {!actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline"
        >
          Continue shopping →
        </Link>
      )}
    </div>
  )
}
