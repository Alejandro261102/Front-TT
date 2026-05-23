import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'


// Importación de React Icons estandarizados
import { 
  FaFolderOpen, FaPaperPlane, FaTrash, FaUnlock, FaLock, 
  FaShieldAlt, FaRegBell, FaPlus, FaUpload, FaShareSquare, FaFolderPlus,
  FaStar, FaRegStar // 🌟 Nuevos iconos de estrellas para Favoritos
} from 'react-icons/fa'
import { IoDocumentText, IoBarChart, IoImage } from 'react-icons/io5'

// Renderizador dinámico de estados criptográficos
const renderSecurityBadge = (status) => {
  if (status === 'password' || status === 'Bloqueado') {
    return <FaLock title="Bloqueado con contraseña" style={{ color: '#faad14', marginRight: '8px', minWidth: '16px' }} />;
  }
  if (status === 'encrypted' || status === 'Cifrado') {
    return <FaShieldAlt title="Cifrado de alto nivel" style={{ color: '#0a3fff', marginRight: '8px', minWidth: '16px' }} />;
  }
  return <FaUnlock title="Desbloqueado" style={{ color: '#52c41a', marginRight: '8px', minWidth: '16px' }} />;
}

// SIMULACIÓN DE DATOS LOCALES UNIFICADOS (Se añade el atributo booleano isFavorite)
const fetchDashboardData = async () => {
  return {
    carpetas: [
      { id: 'cat1', name: 'Documentos Legales', color: '#ff4d4f', importancia: 'Crítica', archivosCount: 12 },
      { id: 'cat2', name: 'Evidencias de Software', color: '#0a3fff', importancia: 'Media', archivosCount: 8 },
      { id: 'cat3', name: 'Otros archivos', color: '#52c41a', importancia: 'Baja', archivosCount: 3 }
    ],
    carpetaGeneral: [
      { id: 'cg1', name: 'Contrato_Prestacion_Servicios.pdf', componentIcon: <IoDocumentText />, size: '2.4 MB', security: 'Bloqueado', remitente: 'Dra. Tania Rodríguez', fecha: 'Hoy, 10:30 AM', expiracion: '31/Dic/2026', asunto: 'Contrato legal de infraestructura de red', acceso: 'Solo Vista', isFavorite: false },
      { id: 'cg2', name: 'Presupuesto_Servidores_Azure.xlsx', componentIcon: <IoBarChart />, size: '1.1 MB', security: 'Bloqueado', remitente: 'Dr. Ariel López Rojas', fecha: 'Ayer', expiracion: '15/Jun/2026', asunto: 'Costos proyectados de almacenamiento en la nube', acceso: 'Descarga', isFavorite: true },
      { id: 'cg3', name: 'Topologia_Red_GNS3.png', componentIcon: <IoImage />, size: '4.5 MB', security: 'Desbloqueado', remitente: 'Héctor Alejandro', fecha: 'Hace 3 días', expiracion: 'Permanente', asunto: 'Esquema de enrutamiento IPsec VPN', acceso: 'Descarga', isFavorite: false }
    ],
    recibidosRecientes: [
      { id: 'rec1', name: 'Plan_Seguridad_AES256.pdf', componentIcon: <IoDocumentText />, size: '1.8 MB', security: 'Cifrado', remitente: 'Héctor Alejandro', fecha: 'Hace 10 min', expiracion: '12/Ago/2026', asunto: 'Especificación de bloques de cifrado locales', acceso: 'Descarga', isFavorite: true },
      { id: 'rec2', name: 'Minuta_Directores_TT.docx', componentIcon: <IoDocumentText />, size: '920 KB', security: 'Desbloqueado', remitente: 'Dra. Tania Rodríguez', fecha: 'Hoy, 08:15 AM', expiracion: 'Permanente', asunto: 'Acuerdos de cambio de director de tesis', acceso: 'Solo Vista', isFavorite: false }
    ],
    enviados: [
      { id: 'env1', name: 'Trabajo_Terminal_II_Reporte.docx', componentIcon: <IoDocumentText />, size: '3.8 MB', security: 'Cifrado', remitente: 'Alejandro (Tú)', fecha: 'Lunes', expiracion: 'Permanente', asunto: 'Borrador de protocolo de transferencia segura', acceso: 'Descarga', isFavorite: false },
      { id: 'env2', name: 'Llave_Publica_Cripto.pem', componentIcon: <IoDocumentText />, size: '12 KB', security: 'Bloqueado', remitente: 'Alejandro (Tú)', fecha: 'Hace 5 días', expiracion: '01/Dic/2026', asunto: 'Clave asimétrica para firmas digitales', acceso: 'Solo Vista', isFavorite: false }
    ],
    papelera: [
      { id: 'pap1', name: 'Documento_Invalido.docx', componentIcon: <IoDocumentText />, size: '1.2 MB', security: 'Desbloqueado', remitente: 'Remitente Externo', fecha: 'Hace 1 semana', expiracion: 'Inmediata', asunto: 'Archivo corrupto descartado', acceso: 'Solo Vista', isFavorite: false }
    ]
  };
}

export default function Dashboard() {
  const navigate = useNavigate()
  const data = useState(null)[0] // Mantenemos consistencia con tu declaración destructurada original
  const [dashboardData, setDashboardData] = useState(null) // Estado mutable para controlar los favoritos reactivos
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [pestanaActiva, setPestanaActiva] = useState('recibidos'); 
  const [elementoDetalle, setElementoDetalle] = useState(null);
  
  const [showModalCarpeta, setShowModalCarpeta] = useState(false);
  const [nombreNuevaCarpeta, setNombreNuevaCarpeta] = useState('');
  const [importanciaCarpeta, setImportanciaCarpeta] = useState('#52c41a');

  const [nombreUsuario, setNombreUsuario] = useState('Alejandro');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchDashboardData();
        setDashboardData(result);
        
        const sesion = localStorage.getItem('user');
        if (sesion) {
          const userObj = JSON.parse(sesion);
          if (userObj.name) setNombreUsuario(userObj.name.split(' ')[0]);
        }
      } catch (err) {
        console.error("Error local al cargar datos del dashboard:", err);
        setError('No se pudo establecer conexión con el espacio de almacenamiento.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [])

  // Handler para conmutar la estrella de favoritos
  const handleToggleFavorite = (e, fileId) => {
    e.stopPropagation(); // Previene que se abra el panel de detalles al picar la estrella
    
    setDashboardData(prev => {
      if (!prev) return prev;
      
      // Función mapeadora auxiliar para invertir la bandera de favorito
      const toggle = (list) => list.map(item => item.id === fileId ? { ...item, isFavorite: !item.isFavorite } : item);
      
      const updatedData = {
        ...prev,
        carpetaGeneral: toggle(prev.carpetaGeneral),
        recibidosRecientes: toggle(prev.recibidosRecientes),
        enviados: toggle(prev.enviados),
        papelera: toggle(prev.papelera)
      };

      // Si el archivo modificado está activo en el inspector lateral, actualizamos su vista
      if (elementoDetalle && elementoDetalle.id === fileId) {
        const todasLasListas = [...updatedData.carpetaGeneral, ...updatedData.recibidosRecientes, ...updatedData.enviados, ...updatedData.papelera];
        const itemActualizado = todasLasListas.find(i => i.id === fileId);
        if (itemActualizado) setElementoDetalle(itemActualizado);
      }

      return updatedData;
    });
  };

  const handleCrearCarpetaSubmit = (e) => {
    e.preventDefault();
    if (!nombreNuevaCarpeta.trim()) return;

    let etiquetaImportancia = "Baja";
    if (importanciaCarpeta === '#faad14') etiquetaImportancia = "Media";
    if (importanciaCarpeta === '#f5222d') etiquetaImportancia = "Alta";
    if (importanciaCarpeta === '#722ed1') etiquetaImportancia = "Crítica";

    const nuevaCarpetaObj = {
      id: `cat-${Date.now()}`,
      name: nombreNuevaCarpeta.trim(),
      color: importanciaCarpeta,
      importancia: etiquetaImportancia,
      archivosCount: 0
    };

    setDashboardData(prev => ({
      ...prev,
      carpetas: [nuevaCarpetaObj, ...prev.carpetas]
    }));

    setNombreNuevaCarpeta('');
    setShowModalCarpeta(false);
    alert(`Carpeta "${nuevaCarpetaObj.name}" creada con prioridad ${etiquetaImportancia}.`);
  };

  const handleVaciarPapelera = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar por completo la papelera? Esta acción no se puede deshacer.')) {
      setDashboardData(prev => ({ ...prev, papelera: [] }));
      setElementoDetalle(null);
    }
  };

  const obtenerArchivosAMostrar = () => {
    if (!dashboardData) return [];
    if (pestanaActiva === 'todo') return dashboardData.carpetaGeneral;
    if (pestanaActiva === 'recibidos') return dashboardData.recibidosRecientes;
    if (pestanaActiva === 'enviados') return dashboardData.enviados;
    if (pestanaActiva === 'papelera') return dashboardData.papelera;
    return [];
  };

  return (
    <PrivateLayout>
      <main style={{ 
        paddingTop: '110px', paddingBottom: '60px', color: 'white',
        width: '100%', maxWidth: '1300px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px'
      }}>
        
        {/* Encabezado */}
        <section className="section-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
          <div>
            <h1 style={{ fontWeight: '700', fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              ¡Hola, {nombreUsuario}! <span className="wave-emoji">👋</span>
            </h1>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {pestanaActiva === 'recibidos' && (
              <>
                <button onClick={() => navigate('/subir-archivo')} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaUpload /> Subir Archivo
                </button>
                <button onClick={() => navigate('/enviar-archivo')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaShareSquare /> Enviar Archivo
                </button>
              </>
            )}

            {pestanaActiva === 'todo' && (
              <>
                <button onClick={() => setShowModalCarpeta(true)} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-accent)' }}>
                  <FaFolderPlus /> Crear Carpeta
                </button>
                <button onClick={() => navigate('/subir-archivo')} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <FaUpload /> Subir
                </button>
                <button onClick={() => navigate('/enviar-archivo')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaShareSquare /> Enviar
                </button>
              </>
            )}

            {pestanaActiva === 'enviados' && (
              <button onClick={() => navigate('/enviar-archivo')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaShareSquare /> Enviar Nuevo
              </button>
            )}

            {pestanaActiva === 'papelera' && dashboardData?.papelera?.length > 0 && (
              <button onClick={handleVaciarPapelera} className="btn" style={{ backgroundColor: 'rgba(245, 34, 45, 0.15)', color: '#f5222d', border: '1px solid rgba(245, 34, 45, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaTrash /> Vaciar Papelera
              </button>
            )}
          </div>
        </section>

        {isLoading && <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-medium)' }}>Cargando información corporativa...</div>}
        {error && <div style={{ padding: '20px', backgroundColor: '#ffe5e5', color: '#d93025', borderRadius: '8px' }}>{error}</div>}

        {!isLoading && !error && dashboardData && (
          <>
            {/* Navegación Contextual */}
            <nav style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '35px', paddingBottom: '2px' }}>
              <button 
                onClick={() => { setPestanaActiva('recibidos'); setElementoDetalle(null); }}
                style={{
                  padding: '12px 20px', background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px',
                  color: pestanaActiva === 'recibidos' ? 'var(--color-accent)' : 'var(--color-text-medium)',
                  borderBottom: pestanaActiva === 'recibidos' ? '3px solid var(--color-accent)' : '3px solid transparent'
                }}
              >
                <FaRegBell /> Archivos Recibidos
              </button>
              <button 
                onClick={() => { setPestanaActiva('todo'); setElementoDetalle(null); }}
                style={{
                  padding: '12px 20px', background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px',
                  color: pestanaActiva === 'todo' ? 'var(--color-accent)' : 'var(--color-text-medium)',
                  borderBottom: pestanaActiva === 'todo' ? '3px solid var(--color-accent)' : '3px solid transparent'
                }}
              >
                <FaFolderOpen /> Carpeta General
              </button>
              <button 
                onClick={() => { setPestanaActiva('enviados'); setElementoDetalle(null); }}
                style={{
                  padding: '12px 20px', background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px',
                  color: pestanaActiva === 'enviados' ? 'var(--color-accent)' : 'var(--color-text-medium)',
                  borderBottom: pestanaActiva === 'enviados' ? '3px solid var(--color-accent)' : '3px solid transparent'
                }}
              >
                <FaPaperPlane /> Enviados
              </button>
              <button 
                onClick={() => { setPestanaActiva('papelera'); setElementoDetalle(null); }}
                style={{
                  padding: '12px 20px', background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '8px',
                  color: pestanaActiva === 'papelera' ? 'var(--color-accent)' : 'var(--color-text-medium)',
                  borderBottom: pestanaActiva === 'papelera' ? '3px solid var(--color-accent)' : '3px solid transparent'
                }}
              >
                <FaTrash /> Papelera
              </button>
            </nav>

            <div style={{ display: 'grid', gridTemplateColumns: elementoDetalle ? '1fr 350px' : '1fr', gap: '30px', transition: 'all 0.4s ease' }}>
              
              <section>
                {/* Renderizado de Carpetas */}
                {pestanaActiva === 'todo' && dashboardData.carpetas.length > 0 && (
                  <div style={{ marginBottom: '35px' }}>
                    <h3 style={{ color: 'var(--color-text-medium)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '15px' }}>Carpetas Principales</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
                      {dashboardData.carpetas.map(folder => (
                        <div key={folder.id} className="card-glow-plop" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#1D263C', padding: '16px', borderRadius: '10px', borderLeft: `5px solid ${folder.color}`, cursor: 'pointer' }} onClick={() => navigate(`/carpeta/${folder.id}`)}>
                          <FaFolderOpen style={{ fontSize: '1.5rem', color: folder.color }} />
                          <div style={{ textAlign: 'left' }}>
                            <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'white', fontWeight: '600' }}>{folder.name}</h4>
                            <small style={{ color: 'var(--color-text-medium)', fontSize: '0.8rem' }}>{folder.archivosCount} archivos • {folder.importancia}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <h3 style={{ color: 'var(--color-text-medium)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '15px' }}>
                  {pestanaActiva === 'recibidos' && 'Documentos Recibidos'}
                  {pestanaActiva === 'todo' && 'Archivos Sueltos Raíz'}
                  {pestanaActiva === 'enviados' && 'Historial de Envíos Realizados'}
                  {pestanaActiva === 'papelera' && 'Borradores en Retención Temporal'}
                </h3>
                
                {/* Rejilla de Archivos */}
                <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                  {obtenerArchivosAMostrar().map(file => (
                    <article 
                      key={file.id} 
                      className={`file-card card-glow-plop ${elementoDetalle?.id === file.id ? 'active-inspect' : ''}`}
                      onClick={() => setElementoDetalle(file)} 
                      style={{ 
                        cursor: 'pointer', backgroundColor: '#1D263C', borderRadius: '12px', padding: '20px',
                        border: elementoDetalle?.id === file.id ? '1px solid #0a3fff' : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: elementoDetalle?.id === file.id ? '0 0 15px rgba(10, 63, 255, 0.3)' : 'var(--shadow-soft)',
                        position: 'relative'
                      }}
                    >
                      <div className="file-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span style={{ fontSize: '2rem', color: 'var(--color-accent)' }}>{file.componentIcon}</span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {/* 🌟 ESTRELLA INTERACTIVA DE FAVORITOS */}
                          <button
                            onClick={(e) => handleToggleFavorite(e, file.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', fontSize: '1.1rem', transition: 'transform 0.2s ease', color: file.isFavorite ? '#faad14' : 'rgba(255,255,255,0.25)' }}
                            title={file.isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            {file.isFavorite ? <FaStar /> : <FaRegStar />}
                          </button>

                          <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: '4px', color: 'var(--color-text-medium)', fontWeight: '500' }}>
                            {file.acceso}
                          </span>
                        </div>
                      </div>
                      <div className="file-card-body">
                        <h3 title={file.name} style={{ margin: 0, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', color: 'white', fontWeight: '600' }}>
                          {renderSecurityBadge(file.security)}
                          {file.name}
                        </h3>
                        <p style={{ margin: '6px 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-medium)' }}>{file.size}</p>
                      </div>
                    </article>
                  ))}
                </div>

                {obtenerArchivosAMostrar().length === 0 && (
                  <div style={{ padding: '60px', textAlign: 'center', color: 'var(--color-text-medium)', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    No hay archivos para mostrar en este bloque.
                  </div>
                )}
              </section>

              {/* Panel de Detalles */}
              {elementoDetalle && (
                <aside className="card-glow-plop" style={{ 
                  backgroundColor: '#1D263C', borderRadius: '15px', border: '1px solid #0a3fff', padding: '24px', 
                  boxShadow: 'var(--shadow-medium), 0 0 20px rgba(10, 63, 255, 0.4)', alignSelf: 'start', position: 'sticky', top: '130px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Detalles {elementoDetalle.isFavorite && <FaStar style={{ color: '#faad14', fontSize: '1rem' }} />}
                    </h3>
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
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Cuando se envió</label>
                      <span style={{ color: 'white' }}>{elementoDetalle.fecha}</span>
                    </div>
                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Cuando expira</label>
                      <span style={{ color: '#ff4d4f', fontWeight: '600' }}>{elementoDetalle.expiracion}</span>
                    </div>
                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Asunto</label>
                      <p style={{ color: 'var(--color-text-light)', margin: 0, lineHeight: '1.4' }}>{elementoDetalle.asunto}</p>
                    </div>
                    <div>
                      <label style={{ color: 'var(--color-text-medium)', fontSize: '0.78rem', display: 'block', marginBottom: '2px' }}>Bloqueado o Desbloqueado</label>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'white', fontWeight: '500' }}>
                        {renderSecurityBadge(elementoDetalle.security)}
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
                </aside>
              )}

            </div>
          </>
        )}
      </main>

      {/* Modal para Crear Carpeta */}
      {showModalCarpeta && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(19, 25, 36, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, backdropFilter: 'blur(4px)'
        }}>
          <div className="auth-card card-glow-plop" style={{ width: '420px', padding: '2.5rem', backgroundColor: '#1D263C', borderRadius: '16px', border: '1px solid #0a3fff', boxShadow: '0 0 25px rgba(10, 63, 255, 0.5)' }}>
            <h2 style={{ margin: '0 0 10px 0', color: 'white', fontWeight: '700', textAlign: 'center' }}>Nueva Carpeta</h2>
            <p style={{ color: 'var(--color-text-medium)', fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center' }}>Asigna un nombre y clasifica la carpeta según su nivel de criticidad.</p>

            <form onSubmit={handleCrearCarpetaSubmit}>
              <div className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label className="form-label">Nombre de la Carpeta</label>
                <input 
                  type="text" 
                  className="form-control-modern" 
                  placeholder="Ej. Contratos Minera" 
                  required 
                  style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                  value={nombreNuevaCarpeta}
                  onChange={(e) => setNombreNuevaCarpeta(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '25px', textAlign: 'left' }}>
                <label className="form-label">Nivel de Importancia (Color de Etiqueta)</label>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button type="button" onClick={() => setImportanciaCarpeta('#52c41a')} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#52c41a', border: importanciaCarpeta === '#52c41a' ? '3px solid white' : 'none', cursor: 'pointer' }} title="Baja" />
                  <button type="button" onClick={() => setImportanciaCarpeta('#faad14')} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#faad14', border: importanciaCarpeta === '#faad14' ? '3px solid white' : 'none', cursor: 'pointer' }} title="Media" />
                  <button type="button" onClick={() => setImportanciaCarpeta('#f5222d')} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f5222d', border: importanciaCarpeta === '#f5222d' ? '3px solid white' : 'none', cursor: 'pointer' }} title="Alta" />
                  <button type="button" onClick={() => setImportanciaCarpeta('#722ed1')} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#722ed1', border: importanciaCarpeta === '#722ed1' ? '3px solid white' : 'none', cursor: 'pointer' }} title="Crítica" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Crear</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalCarpeta(false)} style={{ flex: 1, border: '1px solid rgba(255,255,255,0.1)' }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </PrivateLayout> // 🌟 CORRECCIÓN 2: Se removió la etiqueta del componente Footer duplicado de aquí
  )
}