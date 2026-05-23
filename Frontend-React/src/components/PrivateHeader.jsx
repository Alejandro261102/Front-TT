import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// 🌟 Importación de React Icons estandarizados respetando tu estructura
import { 
  FaBars, FaSearch, FaRegBell, FaChevronDown, FaChevronUp, 
  FaUser, FaCog, FaSignOutAlt, FaLock, FaShieldAlt 
} from 'react-icons/fa'

// Reutilizamos la función de los escudos para la búsqueda con React Icons
const getSecurityBadge = (status) => {
  if (status === 'password') return <FaLock title="Bloqueado" style={{ color: '#faad14', marginRight: '4px', fontSize: '0.85rem' }} />;
  if (status === 'encrypted') return <FaShieldAlt title="Cifrado" style={{ color: '#0a3fff', marginRight: '4px', fontSize: '0.85rem' }} />;
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
  
  // 🌟 ESTADO DE CONTROL DE SCROLL (Sincronizado de PublicHeader)
  const [scrolled, setScrolled] = useState(false);

  // Estados de Búsqueda y Notificaciones
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)

  // Menú de Usuario
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

  // 🌟 EFECTO DE ESCUCHA DE SCROLL (Igual a tu PublicHeader)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Efecto para cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
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
    localStorage.clear(); 
    setShowUserMenu(false);
    navigate('/'); 
  };

  return (
    <header className={`private-header ${scrolled ? 'header-scrolled' : ''}`} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      transition: 'all 0.4s ease',
      
      /* 🌟 INTEGRACIÓN DE ESTILO INLINE EXACTO DE TU PUBLICHEADER */
      padding: scrolled ? '0.5rem 2rem' : '0.85rem 2rem',
      backgroundColor: scrolled ? 'rgba(24, 35, 60, 0.95)' : '#18233C', 
      boxShadow: scrolled ? '0 4px 20px rgba(10, 63, 255, 0.5)' : '0 4px 14px rgba(0, 0, 0, 0.15)',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      
      {/* TU ESTRUCTURA ORIGINAL INTACTA */}
      <div className="private-header-left">
        <button className="menu-toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <Link to="/dashboard" className="private-logo" style={{ color: 'var(--color-white)', fontWeight: '700' }}>
          <img src="/assets2/img/logo.png" 
               alt="Logo Capara" 
               className='logo-img'
               style={{
                 /* 🌟 ESCALADO EXACTO DE TU LOGO DEL PUBLICHEADER */
                 height: scrolled ? '30px' : '60px', 
                 width: 'auto',          
                 objectFit: 'contain',   
                 transition: 'height 0.3s ease' 
               }} />
        </Link>
      </div>

      {/* --- BUSCADOR ORIGINAL --- */}
      <div className="private-header-center" ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '720px' }}>
        <form className="header-search" onSubmit={handleSearchSubmit} style={{ margin: 0 }}>
          <input 
            type="text" 
            placeholder={`Buscar en ${location.pathname === '/dashboard' ? 'todo tu espacio' : 'esta sección'}...`} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => { if(searchTerm) setShowResults(true) }}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>

        {/* Dropdown de Búsqueda (Tus estilos CSS intactos) */}
        {showResults && (
          <div className="search-results-dropdown" style={{
            position: 'absolute', top: '110%', left: 0, width: '100%',
            backgroundColor: 'var(--color-primary)', boxShadow: 'var(--shadow-medium)',
            borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', zIndex: 1000,
            overflow: 'hidden', textAlign: 'left'
          }}>
            {searchResults.length === 0 ? (
              <div style={{ padding: '16px', color: 'var(--color-text-medium)', textAlign: 'center' }}>
                No se encontraron conexiones
              </div>
            ) : (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <div style={{ padding: '8px 16px', backgroundColor: 'var(--color-dark)', fontSize: '0.8rem', color: 'var(--color-text-medium)' }}>Resultados rápidos</div>
                {searchResults.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => {
                      setShowResults(false);
                      setSearchTerm('');
                      navigate(item.type === 'folder' ? `/carpeta/${item.id}` : `/archivo/${item.id}`);
                    }}
                    className="search-item"
                    style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                  >
                    <span>{item.icon}</span>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-white)', display: 'flex', alignItems: 'center' }}>
                      {getSecurityBadge(item.security)} {item.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- SECCIÓN DERECHA ORIGINAL --- */}
      <div className="private-header-right">
        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <FaRegBell />
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown" style={{ position: 'absolute', top: '130%', right: '0', width: '300px', backgroundColor: 'var(--color-primary)', boxShadow: 'var(--shadow-medium)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', zIndex: 1000, padding: '16px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: 'var(--color-accent)' }}>Notificaciones</h3>
              <p style={{ color: 'var(--color-text-medium)', textAlign: 'center', margin: 0, fontSize: '0.9rem' }}>No hay novedades en tu red</p>
            </div>
          )}
        </div>

        {/* --- MENU DESPLEGABLE DE USUARIO ORIGINAL --- */}
        <div className="user-menu-container" ref={userMenuRef} style={{ position: 'relative' }}>
          <div className="user-box" onClick={() => setShowUserMenu(!showUserMenu)} style={{ cursor: 'pointer' }}>
            <div className="user-avatar" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-dark)' }}>AG</div>
            <span className="user-name" style={{ color: 'var(--color-white)' }}>Ambar</span>
            <span style={{ fontSize: '0.7rem', marginLeft: '5px', color: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center' }}>
              {showUserMenu ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>

          {showUserMenu && (
            <div className="user-dropdown" style={{
              position: 'absolute', top: '130%', right: '0', width: '190px',
              backgroundColor: 'var(--color-primary)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'var(--shadow-medium)', zIndex: 1001, overflow: 'hidden', padding: '5px 0'
            }}>
              <button 
                className="dropdown-item"
                onClick={() => { navigate('/perfil'); setShowUserMenu(false); }}
                style={{ width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--color-white)' }}
              >
                <FaUser style={{ color: 'var(--color-accent)' }} /> Mi Perfil
              </button>

              <button 
                className="dropdown-item"
                onClick={() => { navigate('/configuracion'); setShowUserMenu(false); }}
                style={{ width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--color-white)' }}
              >
                <FaCog style={{ color: 'var(--color-accent)' }} /> Configuración
              </button>
              
              <button 
                className="dropdown-item logout"
                onClick={handleLogout}
                style={{ width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#ff4d4f', borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}