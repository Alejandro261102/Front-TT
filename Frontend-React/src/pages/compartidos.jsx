import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'
import DetallesModal from '../components/DetallesModal'

const getSecurityBadge = (status) => {
  if (status === 'password') return <span title="Bloqueado con contraseña" style={{ fontSize: '1rem', marginRight: '6px' }}>🔒</span>;
  if (status === 'encrypted') return <span title="Cifrado de alto nivel" style={{ fontSize: '1rem', marginRight: '6px' }}>🛡️</span>;
  return null;
}

const fetchSharedData = async () => {
  try {
    return [
      { id: 'fld-8', type: 'folder', name: 'Documentos Proyecto', owner: 'María G.', date: 'Hoy', icon: '📁', security: 'password' },
      { id: 'f-20', type: 'file', name: 'Llaves_Acceso_BD.txt', owner: 'Carlos R.', date: 'Ayer', icon: '📝', security: 'encrypted' },
      { id: 'f-21', type: 'file', name: 'Presentacion_Final.pptx', owner: 'Ana L.', date: 'Hace 3 días', icon: '📊', security: 'public' },
      { id: 'fld-9', type: 'folder', name: 'Borradores Equipo', owner: 'Roberto M.', date: 'Hace 1 semana', icon: '📁', security: 'public' }
    ];
  } catch (error) {
    throw error;
  }
}

export default function Compartidos() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null) // <- NUEVO
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchSharedData();
        setItems(result);
      } catch (err) {
        setError('No se pudieron cargar los elementos compartidos.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [])

  const handleCardClick = (type, itemId) => {
    navigate(type === 'folder' ? `/carpeta/${itemId}` : `/archivo/${itemId}`)
  }

  return (
    <PrivateLayout>
      <section className="section-top" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Compartidos conmigo</h1>
          <p style={{ color: 'var(--color-medium-dark)' }}>Archivos y carpetas que otros usuarios han compartido contigo.</p>
        </div>
      </section>

      {isLoading && <div style={{ padding: '40px', textAlign: 'center' }}>Cargando elementos compartidos...</div>}
      {error && <div style={{ padding: '20px', backgroundColor: '#ffe5e5', color: '#d93025' }}>{error}</div>}

      {!isLoading && !error && (
        <section>
          {items.length === 0 ? (
             <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-medium-dark)' }}>Nadie ha compartido archivos contigo aún.</div>
          ) : (
            <div className="cards-grid">
              {items.map(item => (
                <article key={item.id} className={item.type === 'folder' ? 'folder-card' : 'file-card'} onClick={() => handleCardClick(item.type, item.id)} style={{ cursor: 'pointer' }}>
                  <div className={item.type === 'folder' ? 'folder-card-top' : 'file-card-top'}>
                    <span className={item.type === 'folder' ? 'folder-icon' : 'file-type'}>{item.icon}</span>
                    <button className="card-menu-btn" onClick={(e) => {
                      e.stopPropagation();
                      setElementoSeleccionado(item);
                    }}>⋮</button>
                  </div>
                  <div className={item.type === 'folder' ? 'folder-card-body' : 'file-card-body'}>
                    <h3 title={item.name} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center' }}>
                      {getSecurityBadge(item.security)}
                      {item.name}
                    </h3>
                    <p>De: {item.owner}</p>
                    <small>Compartido: {item.date}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
        {/* Nuestro nuevo Modal Global */}
      <DetallesModal 
        elemento={elementoSeleccionado} 
        onClose={() => setElementoSeleccionado(null)} 
      />
    </PrivateLayout>
  )
}