import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'

const Index = lazy(() => import('@/pages/Index'))
const QuemSomos = lazy(() => import('@/pages/QuemSomos'))
const Voluntario = lazy(() => import('@/pages/Voluntario'))
const DoeAgora = lazy(() => import('@/pages/DoeAgora'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/quem-somos' element={<QuemSomos />} />
            <Route path='/voluntario' element={<Voluntario />} />
            <Route path='/doe-agora' element={<DoeAgora />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
