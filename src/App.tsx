import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import RouteError from '@/pages/RouteError'

const Index = lazy(() => import('@/pages/Index'))
const SobreNos = lazy(() => import('@/pages/SobreNos'))
const Voluntario = lazy(() => import('@/pages/Voluntario'))
const DoeAgora = lazy(() => import('@/pages/DoeAgora'))
const Parceiros = lazy(() => import('@/pages/Parceiros'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const router = createBrowserRouter([
  { path: '/',          element: <Index />,     errorElement: <RouteError /> },
  { path: '/sobre',     element: <SobreNos />,  errorElement: <RouteError /> },
  { path: '/voluntario',element: <Voluntario />,errorElement: <RouteError /> },
  { path: '/doe-agora', element: <DoeAgora />,  errorElement: <RouteError /> },
  { path: '/parceiros', element: <Parceiros />, errorElement: <RouteError /> },
  { path: '*',          element: <NotFound /> },
])

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  </ErrorBoundary>
)

export default App
