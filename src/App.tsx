import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from '@/pages/Index'
import QuemSomos from '@/pages/QuemSomos'
import NotFound from '@/pages/NotFound'
import Voluntario from '@/pages/Voluntario'
import DoeAgora from '@/pages/DoeAgora'





const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/quem-somos' element={<QuemSomos />} />
        <Route path='/voluntario' element={<Voluntario />} />
        <Route path='/doe-agora' element={<DoeAgora />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
