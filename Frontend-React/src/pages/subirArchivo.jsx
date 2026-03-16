import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'

// Servicios API

// 1. Servicio para obtener la lista de carpetas (para el selector)
const fetchAvailableFolders = async () => {
  try {
    // 🔗 API REAL: const res = await fetch('/api/carpetas'); return res.json();
    return [
      { id: 'root', name: 'Mi unidad (Raíz)' },
      { id: 'fld-1', name: 'Documentos personales' },
      { id: 'fld-2', name: 'Proyecto terminal' },
      { id: 'fld-4', name: 'Borradores Financieros' }
    ];
  } catch (error) {
    throw error;
  }
}

// 2. Servicio para procesar la subida del archivo
const uploadFileService = async (formData) => {
  try {
    // 🔗 API REAL: 
    /*
    const response = await fetch('http://tu-api.com/api/archivos/subir', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: formData // Nota: Cuando se suben archivos, NO se pone Content-Type: application/json
    });
    if (!response.ok) throw new Error('Error al subir el archivo');
    return await response.json();
    */
    
    // Simulación de éxito
    return { success: true, message: 'Archivo subido correctamente' };
  } catch (error) {
    throw error;
  }
}

// Componente Principal
export default function SubirArchivo() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const carpetaInicial = searchParams.get('carpeta') || 'root'

  // Estados del Formulario
  const [file, setFile] = useState(null)
  const [folderId, setFolderId] = useState(carpetaInicial)
  const [security, setSecurity] = useState('public')
  const [password, setPassword] = useState('')
  
  // Estados de datos y carga
  const [folders, setFolders] = useState([])
  const [isLoadingFolders, setIsLoadingFolders] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar las carpetas disponibles al montar el componente
  useEffect(() => {
    const loadFolders = async () => {
      try {
        const result = await fetchAvailableFolders();
        setFolders(result);
      } catch (err) {
        setError('No se pudo cargar la lista de carpetas.');
      } finally {
        setIsLoadingFolders(false);
      }
    }
    loadFolders();
  }, [])

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecciona un archivo para subir.');
      return;
    }
    if (security === 'password' && !password) {
      setError('Por favor, ingresa una contraseña para proteger el archivo.');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Preparamos los datos para enviar al backend (FormData es el estándar para archivos)
      const formData = new FormData();
      formData.append('archivo', file);
      formData.append('carpetaDestino', folderId);
      formData.append('nivelSeguridad', security);
      if (security === 'password') {
        formData.append('password', password);
      }

      await uploadFileService(formData);
      
      // Si todo sale bien, lo regresamos a la carpeta donde lo subió
      navigate(folderId === 'root' ? '/dashboard' : `/carpeta/${folderId}`);
      
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado al subir el archivo.');
      setIsUploading(false);
    }
  }

  return (
    <PrivateLayout>
      <section className="section-top" style={{ marginBottom: '24px' }}>
        <div>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--color-medium-dark)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ← Cancelar y volver
          </button>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Subir nuevo archivo</h1>
          <p style={{ color: 'var(--color-medium-dark)' }}>Sube tus documentos y configura su nivel de privacidad.</p>
        </div>
      </section>

      {error && (
        <div style={{ padding: '16px', backgroundColor: '#ffe5e5', color: '#d93025', borderRadius: '12px', marginBottom: '24px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-white)', padding: '32px', borderRadius: '16px', boxShadow: 'var(--shadow-soft)', maxWidth: '700px' }}>
        
        {/* 1. Selección de Archivo */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-dark)' }}>Selecciona un archivo</label>
          <div style={{ 
            border: '2px dashed #ccc', borderRadius: '12px', padding: '40px', textAlign: 'center', 
            backgroundColor: file ? '#f4f8ff' : '#fafafa', cursor: 'pointer', transition: 'all 0.2s'
          }}>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              style={{ display: 'none' }} 
              id="file-upload" 
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '3rem' }}>{file ? '📄' : '☁️'}</span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                {file ? file.name : 'Haz clic para explorar tus archivos'}
              </span>
              <span style={{ color: 'var(--color-medium-dark)', fontSize: '0.9rem' }}>
                {file ? `Tamaño: ${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Soporta PDF, DOCX, JPG, PNG, etc.'}
              </span>
            </label>
          </div>
        </div>

        {/* 2. Destino del archivo */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-dark)' }}>Carpeta destino</label>
          <select 
            value={folderId} 
            onChange={(e) => setFolderId(e.target.value)}
            disabled={isLoadingFolders}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', color: 'var(--color-dark)' }}
          >
            {isLoadingFolders ? (
              <option>Cargando carpetas...</option>
            ) : (
              folders.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))
            )}
          </select>
        </div>

        {/* 3. Nivel de Seguridad */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '12px', color: 'var(--color-dark)' }}>Nivel de seguridad</label>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: security === 'public' ? '2px solid var(--color-primary)' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'public' ? '#f4f8ff' : 'transparent' }}>
              <input type="radio" name="security" value="public" checked={security === 'public'} onChange={() => setSecurity('public')} style={{ accentColor: 'var(--color-primary)' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--color-dark)' }}>Público / Estándar</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-medium-dark)' }}>Acceso normal para ti y las personas con quienes lo compartas.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: security === 'password' ? '2px solid var(--color-primary)' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'password' ? '#f4f8ff' : 'transparent' }}>
              <input type="radio" name="security" value="password" checked={security === 'password'} onChange={() => setSecurity('password')} style={{ accentColor: 'var(--color-primary)' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--color-dark)' }}>🔒 Protegido con contraseña</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-medium-dark)' }}>Requerirá una clave específica para abrirse o descargarse.</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: security === 'encrypted' ? '2px solid var(--color-primary)' : '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'encrypted' ? '#f4f8ff' : 'transparent' }}>
              <input type="radio" name="security" value="encrypted" checked={security === 'encrypted'} onChange={() => setSecurity('encrypted')} style={{ accentColor: 'var(--color-primary)' }} />
              <div>
                <strong style={{ display: 'block', color: '#28a745' }}>🛡️ Cifrado de extremo a extremo</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-medium-dark)' }}>Máxima seguridad. El archivo se encripta antes de salir de tu dispositivo.</span>
              </div>
            </label>
          </div>
        </div>

        {/* 4. Contraseña (Condicional) */}
        {security === 'password' && (
          <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fff9e6', borderLeft: '4px solid #ffc107', borderRadius: '0 8px 8px 0' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-dark)' }}>Define una contraseña para el archivo</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escribe una contraseña segura..."
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
        )}

        {/* 5. Botón de Enviar */}
        <div style={{ textAlign: 'right', marginTop: '32px' }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isUploading}
            style={{ width: '100%', padding: '14px', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
          >
            {isUploading ? 'Subiendo y protegiendo...' : 'Subir archivo'}
          </button>
        </div>

      </form>
    </PrivateLayout>
  )
}