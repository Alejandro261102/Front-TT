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
import AyudaSoporte from './pages/ayudaSoporte'
import Configuracion from './pages/configuracion'
import Contactos from './pages/contactosUsuario'
import Nosotros from './pages/nosotros'
import Perfil from './pages/perfilUsuario'
import RecuperacionContrasena from './pages/recuperacionContrasena'
import Registro from './pages/registroUsuario'
import TerminosCondiciones from './pages/terminosCondiciones'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ayuda-soporte" element={<AyudaSoporte />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/recuperacion-contrasena" element={<RecuperacionContrasena />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />

          {/* Rutas Privadas */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/carpetas" element={<Carpetas />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/recientes" element={<Recientes />} />
          <Route path="/carpeta/:id" element={<CarpetaDetalle />} />
          <Route path="/compartidos" element={<Compartidos />} />
          <Route path="/subir-archivo" element={<SubirArchivo />} />
          <Route path="/archivo/:id" element={<ArchivoDetalle />} />
          <Route path="/papelera" element={<Papelera />} />
          <Route path="/busqueda" element={<ResultadosBusqueda />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App