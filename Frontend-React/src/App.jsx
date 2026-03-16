import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

// Importamos las páginas
import Home from './pages/home'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Carpetas from './pages/carpetas'
import NotFound from './pages/NotFound'
import Notificaciones from './pages/notificaciones'
import Recientes from './pages/recientes'
import CarpetaDetalle from './pages/carpetaDetalle'
import Compartidos from './pages/compartidos'
import SubirArchivo from './pages/subirArchivo'
import ArchivoDetalle from './pages/archivoDetalle'
import Papelera from './pages/papelera'
import ResultadosBusqueda from './pages/resultadosBusqueda'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas Privadas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/carpetas" element={<Carpetas />} />
          <Route path="/perfil" element={<div>Vista de Perfil en construcción</div>} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/recientes" element={<Recientes />} />
          <Route path="/carpeta/:id" element={<CarpetaDetalle />} />
          <Route path="/compartidos" element={<Compartidos />} />
          <Route path="/subir-archivo" element={<SubirArchivo />} />
          <Route path="/archivo/:id" element={<ArchivoDetalle />} />
          <Route path="/papelera" element={<Papelera />} />
          <Route path="/busqueda" element={<ResultadosBusqueda />} />
          

          {/* Ruta 404: Va SIEMPRE al final */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App