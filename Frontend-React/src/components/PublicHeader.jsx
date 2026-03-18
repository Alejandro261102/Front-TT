import { Link } from 'react-router-dom'

export default function PublicHeader() {
  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="site-logo">Aplicación Web TT2</Link>

        <nav className="site-nav" aria-label="Navegación principal">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/login" className="nav-btn">Iniciar sesión</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}