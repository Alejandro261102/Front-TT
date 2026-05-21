import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'
import Footer from '../components/Footer'

// Función para renderizar los iconos de protección de seguridad
const getSecurityBadge = (status) => {
  if (status === 'password' || status === 'Bloqueado') {
    return <span title="Bloqueado con contraseña" style={{ fontSize: '1rem', marginRight: '6px' }}>🔒</span>;
  }
  if (status === 'encrypted' || status === 'Cifrado') {
    return <span title="Cifrado de alto nivel" style={{ fontSize: '1rem', marginRight: '6px' }}>🛡️</span>;
  }
  return <span title="Desbloqueado" style={{ fontSize: '1rem', marginRight: '6px' }}>🔓</span>;
}

// 🌟 SIMULACIÓN DE DATOS LOCALES SIN COMENTARIOS O CÓDIGO VIEJO ABAJO (ESLint Limpio)
const fetchDashboardData = async () => {
  return {
    carpetaGeneral: [
      { id: 'cg1', name: 'Contrato_Prestacion_Servicios.pdf', icon: '📄', size: '2.4 MB', security: 'Bloqueado', remitente: 'Dra. Tania Rodríguez', fecha: 'Hoy, 10:30 AM', expiracion: '31/Dic/2026', asunto: 'Contrato legal de infraestructura de red', acceso: 'Solo Vista' },
      { id: 'cg2', name: 'Presupuesto_Servidores_Azure.xlsx', icon: '📊', size: '1.1 MB', security: 'Bloqueado', remitente: 'Dr. Ariel López Rojas', fecha: 'Ayer', expiracion: '15/Jun/2026', asunto: 'Costos proyectados de almacenamiento en la nube', acceso: 'Descarga' },
      { id: 'cg3', name: 'Topologia_Red_GNS3.png', icon: '🖼️', size: '4.5 MB', security: 'Desbloqueado', remitente: 'Héctor Alejandro', fecha: 'Hace 3 días', expiracion: 'Permanente', asunto: 'Esquema de enrutamiento IPsec VPN', acceso: 'Descarga' }
    ],
    enviados: [
      { id: 'env1', name: 'Trabajo_Terminal_II_Reporte.docx', icon: '📝', size: '3.8 MB', security: 'Cifrado', remitente: 'Alejandro (Tú)', fecha: 'Lunes', expiracion: 'Permanente', asunto: 'Borrador de protocolo de transferencia segura', acceso: 'Descarga' },
      { id: 'env2', name: 'Llave_Publica_Cripto.pem', icon: '🔑', size: '12 KB', security: 'Bloqueado', remitente: 'Alejandro (Tú)', fecha: 'Hace 5 días', expiracion: '01/Dic/2026', asunto: 'Clave asimétrica para firmas digitales', acceso: 'Solo Vista' }
    ],
    papelera: [
      { id: 'pap1', name: 'Documento_Invalido.docx', icon: '🗑️', size: '1.2 MB', security: 'Desbloqueado', remitente: 'Remitente Externo', fecha: 'Hace 1 semana', expiracion: 'Inmediata', asunto: 'Archivo corrupto descartado', acceso: 'Solo Vista' }
    ]
  };
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Navegación tipo Google Search e Inspección Lateral
  const [pestanaActiva, setPestanaActiva] = useState('todo'); // 'todo', 'enviados', 'papelera'
  const [elementoDetalle, setElementoDetalle] = useState(null); // Elemento para el panel de detalles flotante

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchDashboardData();
        setData(result);
      } catch (err) {
        // 🌟 SOLUCIÓN: Imprimimos el error para que ESLint detecte que la variable 'err' sí se está usando
        console.error("Error local al cargar datos del dashboard:", err);
        setError('No se pudo establecer conexión con el servidor ficticio.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [])

  // Determina qué conjunto de archivos renderizar según la pestaña
  const obtenerArchivosAMostrar = () => {
    if (!data) return [];
    if (pestanaActiva === 'todo') return data.carpetaGeneral;
    if (pestanaActiva === 'enviados') return data.enviados;
    if (pestanaActiva === 'papelera') return data.papelera;
    return [];
  };

  return (
    <PrivateLayout>
      <main style={{ paddingTop: '110px', paddingBottom: '60px', color: 'white' }}>
        
        {/* Encabezado Principal */}
        <section className="section-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontWeight: '700', fontSize: '2.2rem' }}>Bienvenido, Alejandro</h1>
            <p style={{ color: 'var(--color-text-medium)', marginTop: '4px' }}>Gestiona tus transferencias y políticas de acceso a datos confidenciales.</p>
          </div>
          <button onClick={() => navigate('/subir-archivo')} className="btn btn-primary">+ Subir archivo</button>
          <button onClick={() => navigate('/enviar-archivo')} className="btn btn-primary">+ Enviar Archivo</button>
        </section>

        {isLoading && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-medium)' }}>Cargando información del espacio...</div>}
        {error && <div style={{ padding: '20px', backgroundColor: '#ffe5e5', color: '#d93025', borderRadius: '8px' }}>{error}</div>}

        {!isLoading && !error && data && (
          <>
            {/* Nav Contextual estilo Google */}
            <nav style={{ 
              display: 'flex', 
              gap: '10px', 
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
              marginBottom: '35px',
              paddingBottom: '2px'
            }}>
              <button 
                onClick={() => { setPestanaActiva('todo'); setElementoDetalle(null); }}
                style={{
                  padding: '12px 24px', background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease',
                  color: pestanaActiva === 'todo' ? 'var(--color-accent)' : 'var(--color-text-medium)',
                  borderBottom: pestanaActiva === 'todo' ? '3px solid var(--color-accent)' : '3px solid transparent'
                }}
              >
                📁 Carpeta General
              </button>
              <button 
                onClick={() => { setPestanaActiva('enviados'); setElementoDetalle(null); }}
                style={{
                  padding: '12px 24px', background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease',
                  color: pestanaActiva === 'enviados' ? 'var(--color-accent)' : 'var(--color-text-medium)',
                  borderBottom: pestanaActiva === 'enviados' ? '3px solid var(--color-accent)' : '3px solid transparent'
                }}
              >
                📤 Enviados
              </button>
              <button 
                onClick={() => { setPestanaActiva('papelera'); setElementoDetalle(null); }}
                style={{
                  padding: '12px 24px', background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease',
                  color: pestanaActiva === 'papelera' ? 'var(--color-accent)' : 'var(--color-text-medium)',
                  borderBottom: pestanaActiva === 'papelera' ? '3px solid var(--color-accent)' : '3px solid transparent'
                }}
              >
                🗑️ Papelera
              </button>
            </nav>

            {/* Layout adaptable con Panel de Detalles Flotante */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: elementoDetalle ? '1fr 340px' : '1fr', 
              gap: '30px',
              transition: 'all 0.4s ease'
            }}>
              
              {/* BLOQUE DE TARJETAS DE VISTA PREVIA */}
              <section>
                <h2 style={{ color: 'var(--color-white)', marginBottom: '20px', fontSize: '1.3rem', fontWeight: '600' }}>
                  {pestanaActiva === 'todo' && 'Archivos Recientes en Espacio'}
                  {pestanaActiva === 'enviados' && 'Historial de Documentos Compartidos'}
                  {pestanaActiva === 'papelera' && 'Elementos Eliminados (Retención Temporal)'}
                </h2>
                
                <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                  {obtenerArchivosAMostrar().map(file => (
                    
                    <article 
                      key={file.id} 
                      className={`file-card card-glow-plop ${elementoDetalle?.id === file.id ? 'active-inspect' : ''}`}
                      onClick={() => setElementoDetalle(file)} 
                      style={{ 
                        cursor: 'pointer',
                        backgroundColor: '#1D263C',
                        border: elementoDetalle?.id === file.id ? '1px solid #0a3fff' : '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: elementoDetalle?.id === file.id ? '0 0 15px rgba(10, 63, 255, 0.3)' : 'var(--shadow-soft)'
                      }}
                    >
                      <div className="file-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span style={{ fontSize: '2rem' }}>{file.icon}</span>
                        <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: '4px', color: 'var(--color-text-medium)' }}>
                          {file.acceso}
                        </span>
                      </div>
                      <div className="file-card-body">
                        <h3 title={file.name} style={{ margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', color: 'white', fontWeight: '600' }}>
                          {getSecurityBadge(file.security)}
                          {file.name}
                        </h3>
                        <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>{file.size}</p>
                      </div>
                    </article>

                  ))}
                </div>

                {obtenerArchivosAMostrar().length === 0 && (
                  <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-medium)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    Esta sección se encuentra vacía.
                  </div>
                )}
              </section>

              {/* PANEL LATERAL DE DETALLES EXTENDIDO */}
              {elementoDetalle && (
                <aside className="card-glow-plop" style={{ 
                  backgroundColor: '#1D263C', 
                  borderRadius: '15px', 
                  border: '1px solid #0a3fff', 
                  padding: '24px', 
                  boxShadow: 'var(--shadow-medium), 0 0 20px rgba(10, 63, 255, 0.4)',
                  alignSelf: 'start',
                  position: 'sticky',
                  top: '130px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-accent)' }}>Detalles de Archivo</h3>
                    <button onClick={() => setElementoDetalle(null)} style={{ background: 'none', border: 'none', color: 'var(--color-text-medium)', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left', fontSize: '0.9rem' }}>
                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Nombre del archivo</label>
                      <strong style={{ color: 'white', wordBreak: 'break-all' }}>{elementoDetalle.name}</strong>
                    </div>

                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Quién lo envió</label>
                      <span style={{ color: 'white', fontWeight: '500' }}>{elementoDetalle.remitente}</span>
                    </div>

                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Fecha de transferencia</label>
                      <span style={{ color: 'white' }}>{elementoDetalle.fecha}</span>
                    </div>

                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Fecha de expiración</label>
                      <span style={{ color: '#ff4d4f', fontWeight: '600' }}>{elementoDetalle.expiracion}</span>
                    </div>

                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Asunto</label>
                      <p style={{ color: 'var(--color-text-light)', margin: 0, lineHeight: '1.4' }}>{elementoDetalle.asunto}</p>
                    </div>

                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Estado de protección</label>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'white', fontWeight: '500' }}>
                        {getSecurityBadge(elementoDetalle.security)}
                        {elementoDetalle.security === 'public' || elementoDetalle.security === 'Desbloqueado' ? 'Desbloqueado' : 'Bloqueado por Criptografía'}
                      </span>
                    </div>

                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Nivel de acceso</label>
                      <span style={{ 
                        display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold',
                        backgroundColor: elementoDetalle.acceso === 'Descarga' ? 'rgba(82, 196, 26, 0.15)' : 'rgba(255, 197, 61, 0.15)',
                        color: elementoDetalle.acceso === 'Descarga' ? '#52c41a' : '#faad14'
                      }}>
                        Permiso de {elementoDetalle.acceso}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: '25px', display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }} onClick={() => alert(`Iniciando acción de ${elementoDetalle.acceso.toLowerCase()}...`)}>
                      {elementoDetalle.acceso === 'Descarga' ? '📥 Descargar' : '👁️ Ver Documento'}
                    </button>
                  </div>
                </aside>
              )}

            </div>
          </>
        )}
      </main>
      <Footer />
    </PrivateLayout>
  )
}