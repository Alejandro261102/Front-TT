import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'
import Footer from '../components/Footer'

// 🌟 Importación de React Icons estandarizados
import { FaLock, FaUnlock, FaShieldAlt, FaStar, FaFolderOpen, FaChevronLeft } from 'react-icons/fa'
import { IoDocumentText, IoBarChart, IoImage } from 'react-icons/io5'

const renderSecurityBadge = (status) => {
  if (status === 'password' || status === 'Bloqueado') {
    return <FaLock title="Bloqueado con contraseña" style={{ color: '#faad14', marginRight: '6px' }} />;
  }
  if (status === 'encrypted' || status === 'Cifrado') {
    return <FaShieldAlt title="Cifrado de alto nivel" style={{ color: '#0a3fff', marginRight: '6px' }} />;
  }
  return <FaUnlock title="Desbloqueado" style={{ color: '#52c41a', marginRight: '6px' }} />;
}

// SIMULACIÓN DE DATOS LOCALES (Cada objeto incluye la bandera "isFavorite")
const fetchRecentData = async () => {
  return [
    { id: 'fld-2', type: 'folder', name: 'Proyecto terminal', info: '8 archivos', date: 'Hoy, 10:30 AM', componentIcon: <FaFolderOpen />, security: 'public', isFavorite: true },
    { id: 'f-1', type: 'file', name: 'Contraseñas_Servidor.pdf', info: '2.4 MB', date: 'Hoy, 09:15 AM', componentIcon: <IoDocumentText />, security: 'encrypted', isFavorite: true },
    { id: 'f-2', type: 'file', name: 'Presupuesto.xlsx', info: '1.1 MB', date: 'Ayer, 04:20 PM', componentIcon: <IoBarChart />, security: 'password', isFavorite: true },
    { id: 'fld-4', type: 'folder', name: 'Carpeta_Privada', info: '10 archivos', date: 'Ayer, 11:00 AM', componentIcon: <FaFolderOpen />, security: 'encrypted', isFavorite: true },
    { id: 'f-3', type: 'file', name: 'Diagrama_Arquitectura.png', info: '4.5 MB', date: 'Hace 2 días', componentIcon: <IoImage />, security: 'public', isFavorite: true }
  ];
}

// 🌟 CORREGIDO: Nombre del componente cambiado a Favoritos para evitar colisiones de ESLint
export default function Favoritos() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchRecentData();
        // Filtramos localmente para renderizar solo aquellos que tengan la bandera en true
        setItems(result.filter(item => item.isFavorite));
      } catch (err) {
        // 🌟 CORREGIDO: Se usa la variable 'err' para que ESLint no marque error de compilación
        console.error("Error local al cargar elementos recientes:", err);
        setError('No se pudieron cargar los elementos favoritos.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [])

  const handleCardClick = (type, itemId) => {
    navigate(type === 'folder' ? `/carpeta/${itemId}` : `/archivo/${itemId}`)
  }

  // Función local para quitar de favoritos en tiempo real desde la UI
  const handleToggleFavorite = (e, id) => {
    e.stopPropagation(); // Evita que se abra el archivo al dar clic en la estrella
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    alert("Elemento eliminado de tu lista de favoritos.");
  };

  return (
    <PrivateLayout>
      <main style={{ 
        paddingTop: '110px', paddingBottom: '60px', color: 'white',
        width: '100%', maxWidth: '1300px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' 
      }}>
        
        {/* Encabezado */}
        <section className="section-top" style={{ marginBottom: '35px', textAlign: 'left' }}>
          <div>
            <button 
              onClick={() => navigate('/dashboard')} 
              style={{ background: 'none', border: 'none', color: 'var(--color-text-medium)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
            >
              <FaChevronLeft /> Volver al inicio
            </button>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#3C60E2' }}>Elementos Favoritos</h1>
            
          </div>
        </section>

        {isLoading && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-medium)' }}>Escaneando marcas de prioridad...</div>}
        {error && <div style={{ padding: '20px', backgroundColor: 'rgba(245, 34, 45, 0.15)', color: '#f5222d', borderRadius: '8px' }}>{error}</div>}

        {!isLoading && !error && (
          <section style={{ textAlign: 'left' }}>
            {items.length === 0 ? (
               <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-medium)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                 No hay elementos marcados como favoritos actualmente.
               </div>
            ) : (
              <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {items.map(item => (
                  
                  <article 
                    key={item.id} 
                    className="file-card card-glow-plop" 
                    onClick={() => handleCardClick(item.type, item.id)} 
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: '#1D263C',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      boxShadow: 'var(--shadow-soft)'
                    }}
                  >
                    <div className="file-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <span style={{ fontSize: '2rem', color: 'var(--color-accent)' }}>{item.componentIcon}</span>
                      
                      {/* 🌟 ESTRELLA INTERACTIVA PARA REMOVER */}
                      <button 
                        onClick={(e) => handleToggleFavorite(e, item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#faad14', fontSize: '1.2rem', display: 'flex', alignItems: 'center', padding: '4px' }}
                        title="Quitar de favoritos"
                      >
                        <FaStar />
                      </button>
                    </div>
                    
                    <div className="file-card-body">
                      <h3 title={item.name} style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', color: 'white', fontWeight: '600' }}>
                        {renderSecurityBadge(item.security)}
                        {item.name}
                      </h3>
                      <p style={{ margin: '6px 0 2px 0', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>{item.info}</p>
                      <small style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem' }}>Modificado: {item.date}</small>
                    </div>
                  </article>

                ))}
              </div>
            )}
          </section>
        )}
      </main>
      
    </PrivateLayout>
  )
}