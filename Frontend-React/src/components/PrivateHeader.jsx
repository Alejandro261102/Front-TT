import { Link } from 'react-router-dom'

export default function PrivateHeader({ toggleSidebar }) {
  return (
    <header className="private-header">
      <div className="private-header-left">
        {/* Este botón ejecutará la función para abrir el menú */}
        <button className="menu-toggle-btn" onClick={toggleSidebar}>☰</button>
        <Link to="/dashboard" className="private-logo">Aplicación Web TT2</Link>
      </div>

      <div className="private-header-center">
        <form className="header-search" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Buscar archivos, carpetas o compartidos..." />
          <button type="submit">🔍</button>
        </form>
      </div>

      <div className="private-header-right">
        <button className="icon-btn" aria-label="Notificaciones">🔔</button>
        <div className="user-box">
          <div className="user-avatar">AH</div>
          <span className="user-name">Alejandro</span>
        </div>
      </div>
    </header>
  )
}