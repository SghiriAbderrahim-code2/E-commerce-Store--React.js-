import { motion } from 'framer-motion'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 16 }}
        className="from-primary-600 to-primary-400 bg-gradient-to-br bg-clip-text text-8xl font-extrabold text-transparent sm:text-9xl"
      >
        404
      </motion.p>

      {/* Lost shopping cart illustration */}
      <motion.svg
        viewBox="0 0 200 140"
        className="mt-4 w-64 text-zinc-300 dark:text-zinc-700"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        aria-hidden="true"
      >
        <path
          d="M20 25h18l16 70h84l16-52H52"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="78"
          cy="118"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
        />
        <circle
          cx="136"
          cy="118"
          r="9"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
        />
        <path
          d="M150 20c8-10 22-6 20 6-1 8-10 12-10 12s-9-9-10-18z"
          fill="currentColor"
          opacity="0.5"
        />
        <circle cx="150" cy="55" r="5" fill="currentColor" opacity="0.35" />
        <circle cx="165" cy="70" r="3" fill="currentColor" opacity="0.25" />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <h1 className="mt-6 text-2xl font-bold sm:text-3xl">Page not found</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s
          get you back to shopping.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Return Home</Button>
          <Button variant="outline" to="/products">
            Browse products
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
