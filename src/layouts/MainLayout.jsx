import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import ScrollProgressBar from '../components/common/ScrollProgressBar'
import BackToTop from '../components/common/BackToTop'
import { ProductGridSkeleton } from '../components/ui/Skeletons'

function PageFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-busy="true">
      <ProductGridSkeleton count={4} />
    </div>
  )
}

/** Shared shell: sticky navbar, routed content, footer and global affordances. */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      <ScrollRestoration />
    </div>
  )
}
