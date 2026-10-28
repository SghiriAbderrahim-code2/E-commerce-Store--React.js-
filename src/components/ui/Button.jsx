import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary:
    'bg-primary-600 text-white shadow-sm shadow-primary-600/20 hover:bg-primary-700 active:bg-primary-800',
  secondary:
    'bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 active:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200',
  outline:
    'border border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800',
  ghost: 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800',
  danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
}

const getClasses = (variant = 'primary', size = 'md', className = '') =>
  `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`

/**
 * Polymorphic button: renders a router `Link` when `to` is provided,
 * otherwise a native button. Tapping into framer-motion for hover feedback.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  className = '',
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.97 },
  ...props
}) {
  const classes = getClasses(variant, size, className)

  if (to) {
    return (
      <motion.div whileHover={whileHover} whileTap={whileTap} className="inline-block">
        <Link to={to} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      whileHover={whileHover}
      whileTap={whileTap}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  )
}
