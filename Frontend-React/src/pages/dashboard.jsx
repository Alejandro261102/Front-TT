import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'
import DetallesModal from '../components/DetallesModal'

const getSecurityBadge = (status) => {
  if (status === 'password') return <span title="Bloqueado con contraseña" style={{ fontSize: '1rem', marginRight: '6px' }}>🔒</span>;
  if (status === 'encrypted') return <span title="Cifrado de alto nivel" style={{ fontSize: '1rem', marginRight: '6px' }}>🛡️</span>;
  return null;
}

const fetchDashboardData = async () => {
  try {
    return {
      stats: { totalFiles: 128, totalFolders: 16, shared: 24, inTrash: 5 },
      recentFiles: [
        { id: 'f1', name: 'Reporte_Avance.pdf', icon: '📄', date: 'Hoy, 10:30 AM', size: '2.4 MB', security: 'encrypted' },
        { id: 'f2', name: 'Presupuesto.xlsx', icon: '📊', date: 'Ayer', size: '1.1 MB', security: 'password' },
        { id: 'f3', name: 'Diagrama_Arquitectura.png', icon: '🖼️', date: 'Hace 3 días', size: '4.5 MB', security: 'public' }
      ]
    };
  } catch (error) {
    throw error;
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null) // <- NUEVO
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchDashboardData();
        setData(result);
      } catch (err) {
        setError('No se pudo establecer conexión con el servidor.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [])

  return (
    <PrivateLayout>
      <section className="section-top">
        <div>
          <h1>Bienvenido, Alejandro</h1>
          <p>Aquí puedes consultar tus archivos recientes, carpetas principales y accesos rápidos.</p>
        </div>
        <button onClick={() => navigate('/subir-archivo')} className="btn btn-primary">+ Subir archivo</button>
      </section>

      {isLoading && <div style={{ padding: '40px', textAlign: 'center' }}>Cargando información...</div>}
      {error && <div style={{ padding: '20px', backgroundColor: '#ffe5e5', color: '#d93025' }}>{error}</div>}

      {!isLoading && !error && data && (
        <>
          <section className="stats-grid">
            <article className="stat-card" onClick={() => navigate('/recientes')} style={{ cursor: 'pointer' }}>
              <h3>Archivos recientes</h3>
              <p className="stat-number">{data.stats.totalFiles}</p>
            </article>
            <article className="stat-card" onClick={() => navigate('/carpetas')} style={{ cursor: 'pointer' }}>
              <h3>Carpetas</h3>
              <p className="stat-number">{data.stats.totalFolders}</p>
            </article>
            <article className="stat-card" onClick={() => navigate('/compartidos')} style={{ cursor: 'pointer' }}>
              <h3>Compartidos</h3>
              <p className="stat-number">{data.stats.shared}</p>
            </article>
            <article className="stat-card" onClick={() => navigate('/papelera')} style={{ cursor: 'pointer' }}>
              <h3>En papelera</h3>
              <p className="stat-number">{data.stats.inTrash}</p>
            </article>
          </section>

          <section style={{ marginTop: '40px' }}>
            <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontSize: '1.5rem' }}>Actividad Reciente</h2>
            <div className="cards-grid">
              {data.recentFiles.map(file => (
                <article key={file.id} className="file-card" onClick={() => navigate(`/archivo/${file.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="file-card-top">
                    <span className="file-type">{file.icon}</span>
                    <button className="card-menu-btn" onClick={(e) => {
                      e.stopPropagation();
                      setElementoSeleccionado(file);
                    }}>⋮</button>
                  </div>
                  <div className="file-card-body">
                    <h3 title={file.name} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center' }}>
                      {getSecurityBadge(file.security)}
                      {file.name}
                    </h3>
                    <p>{file.size}</p>
                    <small>Modificado: {file.date}</small>
                  </div>
                </article>
              ))}
            </div>
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <Link to="/recientes" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Ver todos los recientes →</Link>
            </div>
          </section>
        </>
      )}
      {/* Nuestro nuevo Modal Global */}
      <DetallesModal 
        elemento={elementoSeleccionado} 
        onClose={() => setElementoSeleccionado(null)} 
      />
    </PrivateLayout>
  )
}