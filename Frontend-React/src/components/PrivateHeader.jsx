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
  
  let resultados = [
    { id: 'f-1', type: 'file', name: 'Reporte_Avance.pdf', icon: '📄', security: 'encrypted', section: '/dashboard' },
    { id: 'f-2', type: 'file', name: 'Presupuesto_Final.xlsx', icon: '📊', security: 'password', section: '/recientes' },
    { id: 'fld-2', type: 'folder', name: 'Proyecto terminal', icon: '📁', security: 'public', section: '/carpetas' },
    { id: 'fld-9', type: 'folder', name: 'Borradores de Reporte', icon: '📁', security: 'public', section: '/compartidos' },
    { id: 'del-1', type: 'file', name: 'Reporte_Viejo.docx', icon: '📝', security: 'public', section: '/papelera' }
  ];

  let matches = resultados.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

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
  const location = useLocation()
  
  // Estados de Búsqueda y Notificaciones
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)

  // NUEVOS ESTADOS: Menú de Usuario
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

  // Efecto para hacer la búsqueda en vivo
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

  // Efecto para cerrar menús al hacer clic fuera (Buscador y Perfil)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar buscador
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
      // Cerrar menú de usuario
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(false);
      navigate(`/busqueda?q=${encodeURIComponent(searchTerm)}&context=${encodeURIComponent(location.pathname)}`);
    }
  }

  const handleLogout = () => {
    // Aquí puedes limpiar estados globales o tokens si los tuvieras
    setShowUserMenu(false);
    navigate('/'); // Redirige a la página principal (Nosotros)
  };

  return (
    <header className="private-header">
      <div className="private-header-left">
        <button className="menu-toggle-btn" onClick={toggleSidebar}>☰</button>
        <Link to="/dashboard" className="private-logo">Aplicación Web TT2</Link>
      </div>

      {/* --- BUSCADOR --- */}
      <div className="private-header-center" ref={searchRef} style={{ position: 'relative' }}>
        <form className="header-search" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder={`Buscar en ${location.pathname === '/dashboard' ? 'todo tu espacio' : 'esta sección'}...`} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => { if(searchTerm) setShowResults(true) }}
          />
          <button type="submit">🔍</button>
        </form>

        {showResults && (
          <div className="search-results-dropdown" style={{
            position: 'absolute', top: '110%', left: 0, width: '100%',
            backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '12px', border: '1px solid #eaeaea', zIndex: 1000,
            overflow: 'hidden', textAlign: 'left'
          }}>
            {searchResults.length === 0 ? (
              <div style={{ padding: '16px', color: '#666', textAlign: 'center' }}>
                No se encontraron coincidencias
              </div>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div style={{ padding: '8px 16px', backgroundColor: '#f9f9f9', fontSize: '0.8rem', color: '#888' }}>Resultados rápidos</div>
                {searchResults.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setShowResults(false);
                      setSearchTerm('');
                      navigate(item.type === 'folder' ? `/carpeta/${item.id}` : `/archivo/${item.id}`);
                    }}
                    className="search-item"
                    style={{ padding: '12px 16px', borderBottom: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                  >
                    <span>{item.icon}</span>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{getSecurityBadge(item.security)} {item.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- SECCIÓN DERECHA --- */}
      <div className="private-header-right">
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>🔔</button>
          {showNotifications && (
            <div className="notifications-dropdown" style={{ position: 'absolute', top: '120%', right: '0', width: '300px', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px', border: '1px solid #eaeaea', zIndex: 1000, padding: '16px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Notificaciones</h3>
              <p style={{ color: '#888', textAlign: 'center', margin: 0 }}>No hay novedades</p>
            </div>
          )}
        </div>

        {/* --- MENU DESPLEGABLE DE USUARIO --- */}
        <div className="user-menu-container" ref={userMenuRef} style={{ position: 'relative' }}>
          <div className="user-box" onClick={() => setShowUserMenu(!showUserMenu)} style={{ cursor: 'pointer' }}>
            <div className="user-avatar">AH</div>
            <span className="user-name">Alejandro</span>
            <span style={{ fontSize: '0.7rem', marginLeft: '5px' }}>{showUserMenu ? '▲' : '▼'}</span>
          </div>

          {showUserMenu && (
            <div className="user-dropdown shadow-sm" style={{
              position: 'absolute', top: '120%', right: '0', width: '190px',
              backgroundColor: 'white', borderRadius: '10px', border: '1px solid #eaeaea',
              zIndex: 1001, overflow: 'hidden', padding: '5px 0'
            }}>
              <button 
                className="dropdown-item"
                onClick={() => { navigate('/configuracion'); setShowUserMenu(false); }}
                style={{ width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}
              >
                ⚙️ Configuración
              </button>
              
              <button 
                className="dropdown-item logout"
                onClick={handleLogout}
                style={{ width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#dc3545', borderTop: '1px solid #eee' }}
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}