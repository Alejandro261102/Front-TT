import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Importamos las páginas que acabamos de crear
import Home from './pages/home'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Carpetas from './pages/carpetas'

function App() {
  return (
    <BrowserRouter>
      {/* Todo lo que esté dentro de <Routes> cambiará según la URL */}
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas Privadas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carpetas" element={<Carpetas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App