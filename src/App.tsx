import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from '@/pages/Index'
import SobreNos from '@/pages/SobreNos'
import NotFound from '@/pages/NotFound'
import Voluntario from '@/pages/Voluntario'
import DoeAgora from '@/pages/DoeAgora'
import Parceiros from '@/pages/Parceiros'





const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/sobre' element={<SobreNos />} />
        <Route path='/voluntario' element={<Voluntario />} />
        <Route path='/doe-agora' element={<DoeAgora />} />
        <Route path='/parceiros' element={<Parceiros />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
