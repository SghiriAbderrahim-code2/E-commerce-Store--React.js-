import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'

/** Thin progress bar at the top of the viewport reflecting scroll position. */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => setVisible(value > 0.02))
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <motion.div
      className="from-primary-500 to-primary-700 fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
    />
  )
}
