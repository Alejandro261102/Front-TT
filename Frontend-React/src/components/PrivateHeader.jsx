import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Reutilizamos la función de los escudos para la búsqueda
const getSecurityBadge = (status) => {
  if (status === 'password') return <span title="Bloqueado" style={{ fontSize: '0.9rem', marginRight: '4px' }}>🔒</span>;
  if (status === 'encrypted') return <span title="Cifrado" style={{ fontSize: '0.9rem', marginRight: '4px' }}>🛡️</span>;
  return null;
}

// Servicio simulado de Búsqueda Contextual
const fetchLiveSearchResults = async (query, currentPath) => {
  if (!query) return [];
  
  // Simulamos que el backend recibe la ruta actual y filtra en base a eso
  let resultados = [
    { id: 'f-1', type: 'file', name: 'Reporte_Avance.pdf', icon: '📄', security: 'encrypted', section: '/dashboard' },
    { id: 'f-2', type: 'file', name: 'Presupuesto_Final.xlsx', icon: '📊', security: 'password', section: '/recientes' },
    { id: 'fld-2', type: 'folder', name: 'Proyecto terminal', icon: '📁', security: 'public', section: '/carpetas' },
    { id: 'fld-9', type: 'folder', name: 'Borradores de Reporte', icon: '📁', security: 'public', section: '/compartidos' },
    { id: 'del-1', type: 'file', name: 'Reporte_Viejo.docx', icon: '📝', security: 'public', section: '/papelera' }
  ];

  // Filtramos por texto
  let matches = resultados.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  // Filtramos por contexto (Si estoy en papelera, solo busco en papelera. Si estoy en carpetas, busco carpetas, etc.)
  // Nota: En un backend real, pasarías "currentPath" como parámetro en la URL del fetch
  if (currentPath.includes('/papelera')) {
    matches = matches.filter(item => item.section === '/papelera');
  } else if (currentPath.includes('/carpetas')) {
    matches = matches.filter(item => item.type === 'folder');
  } else if (currentPath.includes('/compartidos')) {
    matches = matches.filter(item => item.section === '/compartidos');
  }

  return matches;
}

export default function PrivateHeader({ toggleSidebar }) {
  const navigate = useNavigate()
  const location = useLocation() // <--- Para saber en qué página estamos
  
  // Estados originales
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Estados de Búsqueda
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null) // Para detectar clics fuera del buscador

  // Efecto para hacer la búsqueda en vivo cuando el usuario escribe
  useEffect(() => {
    const doSearch = async () => {
      if (searchTerm.trim().length > 0) {
        const results = await fetchLiveSearchResults(searchTerm, location.pathname);
        setSearchResults(results);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }
    doSearch();
  }, [searchTerm, location.pathname])

  // Efecto para cerrar los resultados si se hace clic fuera del buscador
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  // Si da "Enter", lo mandamos a la página completa de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(false);
      // Navegamos pasando la búsqueda y el contexto por la URL
      navigate(`/busqueda?q=${encodeURIComponent(searchTerm)}&context=${encodeURIComponent(location.pathname)}`);
    }
  }

  return (
    <header className="private-header">
      <div className="private-header-left">
        <button className="menu-toggle-btn" onClick={toggleSidebar}>☰</button>
        <Link to="/dashboard" className="private-logo">Aplicación Web TT2</Link>
      </div>

      <div className="private-header-center" ref={searchRef} style={{ position: 'relative' }}>
        <form className="header-search" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder={`Buscar en ${location.pathname === '/dashboard' ? 'todo tu espacio' : 'esta sección'}...`} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => { if(searchTerm) setShowResults(true) }} // Vuelve a mostrar si hay texto
          />
          <button type="submit">🔍</button>
        </form>

        {/* MENÚ DESPLEGABLE DE BÚSQUEDA EN VIVO */}
        {showResults && (
          <div style={{
            position: 'absolute', top: '110%', left: 0, width: '100%',
            backgroundColor: 'var(--color-white)', boxShadow: 'var(--shadow-medium)',
            borderRadius: '12px', border: '1px solid #eaeaea', zIndex: 1000,
            overflow: 'hidden', textAlign: 'left'
          }}>
            {searchResults.length === 0 ? (
              <div style={{ padding: '16px', color: 'var(--color-medium-dark)', textAlign: 'center' }}>
                No se encontraron coincidencias para "{searchTerm}"
              </div>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div style={{ padding: '8px 16px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eaeaea', fontSize: '0.8rem', color: 'var(--color-medium-dark)' }}>
                  Resultados rápidos
                </div>
                {searchResults.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setShowResults(false);
                      setSearchTerm('');
                      navigate(item.type === 'folder' ? `/carpeta/${item.id}` : `/archivo/${item.id}`);
                    }}
                    style={{ 
                      padding: '12px 16px', borderBottom: '1px solid #f5f5f5', 
                      display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f4f8ff'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <p style={{ margin: 0, color: 'var(--color-dark)', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {getSecurityBadge(item.security)} {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Botón para ver todos los resultados en pantalla completa */}
            {searchResults.length > 0 && (
              <div 
                style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid #eaeaea', backgroundColor: '#fafafa', cursor: 'pointer', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}
                onClick={handleSearchSubmit}
              >
                Ver todos los resultados (Enter)
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- SECCIÓN DERECHA INTACTA (Notificaciones y Perfil) --- */}
      <div className="private-header-right">
        {/* Aquí va tu código idéntico de notificaciones y user-box que ya teníamos */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button className="icon-btn" aria-label="Notificaciones" onClick={() => setShowNotifications(!showNotifications)} style={{ position: 'relative' }}>
            🔔
          </button>
          {showNotifications && (
            <div style={{ position: 'absolute', top: '120%', right: '0', width: '320px', backgroundColor: 'var(--color-white)', boxShadow: 'var(--shadow-medium)', borderRadius: '12px', border: '1px solid #eaeaea', zIndex: 1000, overflow: 'hidden', textAlign: 'left' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #eaeaea' }}><h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-dark)' }}>Notificaciones</h3></div>
              <div style={{ padding: '16px', color: 'var(--color-medium-dark)', textAlign: 'center' }}>No hay notificaciones nuevas.</div>
            </div>
          )}
        </div>
        <Link to="/perfil" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="user-box">
            <div className="user-avatar">AH</div>
            <span className="user-name">Alejandro</span>
          </div>
        </Link>
      </div>
    </header>
  )
}