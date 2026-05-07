import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Index = lazy(() => import('@/pages/Index'))
const SobreNos = lazy(() => import('@/pages/SobreNos'))
const Voluntario = lazy(() => import('@/pages/Voluntario'))
const DoeAgora = lazy(() => import('@/pages/DoeAgora'))
const Parceiros = lazy(() => import('@/pages/Parceiros'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const router = createBrowserRouter([
  { path: '/', element: <Index /> },
  { path: '/sobre', element: <SobreNos /> },
  { path: '/voluntario', element: <Voluntario /> },
  { path: '/doe-agora', element: <DoeAgora /> },
  { path: '/parceiros', element: <Parceiros /> },
  { path: '*', element: <NotFound /> },
])

const App = () => (
  <Suspense fallback={null}>
    <RouterProvider router={router} />
  </Suspense>
)

export default App
