import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'
import DetallesModal from '../components/DetallesModal'

const getSecurityBadge = (status) => {
  if (status === 'password') return <span title="Bloqueado con contraseña" style={{ fontSize: '1.2rem', marginRight: '8px' }}>🔒</span>;
  if (status === 'encrypted') return <span title="Cifrado de alto nivel" style={{ fontSize: '1.2rem', marginRight: '8px' }}>🛡️</span>;
  return null;
}

const getSecurityText = (status) => {
  if (status === 'password') return 'Protegido con contraseña';
  if (status === 'encrypted') return 'Cifrado de extremo a extremo';
  return 'Público / Estándar';
}

const fetchFileDetails = async (fileId) => {
  try {
    return {
      id: fileId,
      name: fileId === 'f-1' ? 'Reporte_Avance.pdf' : 'Contraseñas_Servidor.docx',
      type: 'Documento de Texto',
      size: '2.4 MB',
      createdAt: '10 Octubre 2025',
      modifiedAt: 'Hoy, 10:30 AM',
      owner: 'Alejandro',
      icon: '📄',
      security: fileId === 'f-1' ? 'public' : 'encrypted' // Simulamos uno público y otro cifrado
    };
  } catch (error) {
    throw error;
  }
}

export default function ArchivoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [fileData, setFileData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null) // <- NUEVO
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchFileDetails(id);
        setFileData(result);
      } catch (err) {
        setError('No se pudo cargar la información del archivo.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [id])

  return (
    <PrivateLayout>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-medium-dark)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        ← Volver
      </button>

      {isLoading && <div style={{ padding: '40px', textAlign: 'center' }}>Cargando archivo...</div>}
      {error && <div style={{ padding: '20px', backgroundColor: '#ffe5e5', color: '#d93025' }}>{error}</div>}

      {!isLoading && !error && fileData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ backgroundColor: '#f4f8ff', border: '1px solid #eaeaea', borderRadius: '16px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '5rem' }}>{fileData.icon}</span>
            <h2 style={{ color: 'var(--color-dark)', marginTop: '16px', display: 'flex', alignItems: 'center' }}>
              {getSecurityBadge(fileData.security)}
              {fileData.name}
            </h2>
          </div>

          <div style={{ backgroundColor: 'var(--color-white)', padding: '24px', borderRadius: '16px', boxShadow: 'var(--shadow-soft)' }}>
            <h3 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '12px', marginBottom: '16px', color: 'var(--color-primary)' }}>Detalles del archivo</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', color: 'var(--color-dark)' }}>
              <div><strong>Tipo:</strong> <p style={{ margin: 0, color: 'var(--color-medium-dark)' }}>{fileData.type}</p></div>
              <div><strong>Tamaño:</strong> <p style={{ margin: 0, color: 'var(--color-medium-dark)' }}>{fileData.size}</p></div>
              <div><strong>Propietario:</strong> <p style={{ margin: 0, color: 'var(--color-medium-dark)' }}>{fileData.owner}</p></div>
              <div><strong>Nivel de Seguridad:</strong> <p style={{ margin: 0, color: fileData.security !== 'public' ? '#28a745' : 'var(--color-medium-dark)', fontWeight: fileData.security !== 'public' ? 'bold' : 'normal' }}>
                {getSecurityBadge(fileData.security)} {getSecurityText(fileData.security)}
              </p></div>
              <div><strong>Creado:</strong> <p style={{ margin: 0, color: 'var(--color-medium-dark)' }}>{fileData.createdAt}</p></div>
              <div><strong>Última modificación:</strong> <p style={{ margin: 0, color: 'var(--color-medium-dark)' }}>{fileData.modifiedAt}</p></div>
            </div>

            <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => alert('Descargando archivo...')}>Descargar</button>
              <button className="btn btn-secondary" onClick={() => alert('Abriendo opciones de compartir...')}>Compartir</button>
              <button className="btn btn-secondary" style={{ color: '#d93025', borderColor: '#d93025' }} onClick={() => alert('Moviendo a papelera...')}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
        {/* Nuestro nuevo Modal Global */}
      <DetallesModal 
        elemento={elementoSeleccionado} 
        onClose={() => setElementoSeleccionado(null)} 
      />
    </PrivateLayout>
  )
}