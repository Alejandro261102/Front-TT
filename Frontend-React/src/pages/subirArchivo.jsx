import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'
import Footer from '../components/Footer'

// 🌟 Importación de React Icons estandarizados
import { 
  FaUpload, FaLock, FaShieldAlt, FaGlobe, FaChevronLeft, 
  FaFileAlt, FaKey, FaPhoneAlt, FaEye, FaDownload 
} from 'react-icons/fa'

// Servicios API Simulados
const fetchAvailableFolders = async () => {
  return [
    { id: 'root', name: 'Mi unidad (Raíz)' },
    { id: 'fld-1', name: 'Documentos personales' },
    { id: 'fld-2', name: 'Proyecto terminal' },
    { id: 'fld-4', name: 'Borradores Financieros' }
  ];
}

const uploadFileService = async (formData) => {
  // Simulación de delay asíncrono
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Archivo subido y protegido correctamente' };
}

export default function SubirArchivo() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const carpetaInicial = searchParams.get('carpeta') || 'root'

  // Estados del Formulario Extendidos
  const [file, setFile] = useState(null)
  const [folderId, setFolderId] = useState(carpetaInicial)
  const [security, setSecurity] = useState('public') // 'public', 'password', 'sms'
  const [password, setPassword] = useState('')
  const [useRegisteredPhone, setUseRegisteredPhone] = useState(true)
  const [customPhone, setCustomPhone] = useState('+525555885620')
  const [acceso, setAcceso] = useState('Descarga') // 'Descarga' o 'Solo Vista'
  
  // Campos opcionales solicitados
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [setMessage] = useState('') // Para evitar error de compilación si se decide usar el mismo estado para ambos campos de mensaje
  
  // Estados de carga y error
  const [folders, setFolders] = useState([])
  const [isLoadingFolders, setIsLoadingFolders] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const result = await fetchAvailableFolders();
        setFolders(result);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la lista de carpetas.');
      } finally {
        setIsLoadingFolders(false);
      }
    }
    loadFolders();
  }, [])

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

      const formData = new FormData();
      formData.append('archivo', file);
      formData.append('carpetaDestino', folderId);
      formData.append('nivelSeguridad', security);
      formData.append('asunto', asunto.trim());
      formData.append('mensajePersonalizado', mensaje.trim());
      formData.append('nivelAcceso', acceso);
      
      if (security === 'password') formData.append('password', password);
      if (security === 'sms') formData.append('telefonoSMS', useRegisteredPhone ? '+525555885620' : customPhone);

      await uploadFileService(formData);
      navigate(folderId === 'root' ? '/dashboard' : `/carpeta/${folderId}`);
      
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado al subir el archivo.');
      setIsUploading(false);
    }
  }

  return (
    <PrivateLayout>
      <main style={{ paddingTop: '110px', paddingBottom: '80px', color: 'white', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        
        {/* Encabezado de Navegación */}
        <section className="section-top" style={{ marginBottom: '30px', textAlign: 'left' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', border: 'none', color: 'var(--color-text-medium)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
          >
            <FaChevronLeft /> Cancelar y volver al espacio
            
          </button>
          
        </section>

        <section >
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#3C60E2' }}>Subir Archivo</h1>
          <p style={{ color: 'var(--color-text-medium)', marginTop: '4px' }}>Carga tus documentos.</p>
        </section>


        {error && (
          <div style={{ padding: '16px', backgroundColor: 'rgba(245, 34, 45, 0.15)', color: '#f5222d', border: '1px solid rgba(245, 34, 45, 0.2)', borderRadius: '10px', marginBottom: '25px', textAlign: 'left' }}>
            <strong>Error de Políticas:</strong> {error}
          </div>
        )}
        
        <br></br>
        {/* Formulario Principal con Estilo de Luz Integrado */}
        <form 
          onSubmit={handleSubmit} 
          style={{ 
            backgroundColor: '#1D263C', 
            padding: '35px', 
            borderRadius: '16px', 
            border: '1px solid #0a3fff', 
            boxShadow: 'var(--shadow-medium), 0 0 20px rgba(10, 63, 255, 0.35)',
            textAlign: 'left'
          }}
        >
          
          {/* 1. SELECCIÓN DE ARCHIVO */}
          <div style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white', fontWeight: '600' }}>Archivos a subir *</label>
            <div style={{ 
              border: file ? '2px dashed #0a3fff' : '2px dashed rgba(255,255,255,0.15)', 
              borderRadius: '12px', 
              padding: '40px 20px', 
              textAlign: 'center', 
              backgroundColor: file ? 'rgba(10, 63, 255, 0.04)' : 'var(--color-dark)', 
              cursor: 'pointer', 
              transition: 'all 0.3s'
            }}>
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])} 
                style={{ display: 'none' }} 
                id="file-upload" 
              />
              <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: 0 }}>
                <span style={{ fontSize: '2.8rem', color: file ? 'var(--color-accent)' : 'var(--color-text-medium)' }}>
                  {file ? <FaFileAlt /> : <FaUpload />}
                </span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '1.05rem' }}>
                  {file ? file.name : 'Haz clic para seleccionar archivos'}
                </span>
                <span style={{ color: 'var(--color-text-medium)', fontSize: '0.85rem' }}>
                  {file ? `Tamaño: ${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Soporta PDF, DOCX, JPG, PNG, ZIP, etc. (Máx 50MB)'}
                </span>
              </label>
            </div>
          </div>

          {/* 2. DESTINO DEL ARCHIVO */}
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white' }}>Carpeta destino de resguardo</label>
            <select 
              value={folderId} 
              onChange={(e) => setFolderId(e.target.value)}
              disabled={isLoadingFolders}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--color-dark)', color: 'white', fontSize: '1rem', outline: 'none' }}
            >
              {isLoadingFolders ? (
                <option>Cargando directorio seguro...</option>
              ) : (
                folders.map(f => (
                  <option key={f.id} value={f.id} style={{ backgroundColor: 'var(--color-dark)' }}>{f.name}</option>
                ))
              )}
            </select>
          </div>

          {/* 3. ASUNTO (Nuevo de la imagen) */}
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white' }}>Asunto (opcional)</label>
            <input 
              type="text" 
              className="form-control-modern" 
              placeholder="Ej. Evidencia de Cifrado Bloque"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>

          {/* 4. MENSAJE PERSONALIZADO (Nuevo de la imagen) */}
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white' }}>Mensaje descriptivo interno (opcional)</label>
            <textarea 
              rows="3"
              className="form-control-modern" 
              placeholder="Ingresar mensaje..."
              value={mensaje}
              onChange={(e) => setMessage ? setMessage(e.target.value) : setMensaje(e.target.value)}
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', fontSize: '1rem', resize: 'none', outline: 'none' }}
            />
          </div>

          {/* 5. NIVEL DE SEGURIDAD (Adaptado idéntico a los radios de la imagen) */}
          <div style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white', fontWeight: '600', marginBottom: '12px', display: 'block' }}>Nivel de seguridad *</label>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Opción Pública */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', border: security === 'public' ? '2px solid #0a3fff' : '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'public' ? 'rgba(10, 63, 255, 0.05)' : 'transparent', transition: 'all 0.2s' }}>
                <input type="radio" name="security" value="public" checked={security === 'public'} onChange={() => setSecurity('public')} style={{ width: '18px', height: '18px', accentColor: '#0a3fff' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaGlobe style={{ color: 'var(--color-text-medium)', fontSize: '1.2rem' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>Público / Estándar</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-medium)' }}>Cualquier persona autorizada en tu red con el enlace puede acceder al archivo.</span>
                  </div>
                </div>
              </label>

              {/* Opción Contraseña */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', border: security === 'password' ? '2px solid #0a3fff' : '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'password' ? 'rgba(10, 63, 255, 0.05)' : 'transparent', transition: 'all 0.2s' }}>
                <input type="radio" name="security" value="password" checked={security === 'password'} onChange={() => setSecurity('password')} style={{ width: '18px', height: '18px', accentColor: '#0a3fff' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaLock style={{ color: '#faad14', fontSize: '1.2rem' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>Protegido con contraseña</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-medium)' }}>Requerirá una clave asimétrica específica definida por ti para abrirse.</span>
                  </div>
                </div>
              </label>

              {/* Opción SMS */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', border: security === 'sms' ? '2px solid #0a3fff' : '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'sms' ? 'rgba(10, 63, 255, 0.05)' : 'transparent', transition: 'all 0.2s' }}>
                <input type="radio" name="security" value="sms" checked={security === 'sms'} onChange={() => setSecurity('sms')} style={{ width: '18px', height: '18px', accentColor: '#0a3fff' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaShieldAlt style={{ color: '#52c41a', fontSize: '1.2rem' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>Verificación por SMS Dual</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-medium)' }}>El sistema disparará un token OTP numérico mediante Azure Communication Services.</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* CAMPOS CONDICIONALES BASADOS EN LA SELECCIÓN */}
          {security === 'password' && (
            <div style={{ marginBottom: '25px', padding: '16px', backgroundColor: 'rgba(250, 173, 20, 0.05)', borderLeft: '4px solid #faad14', borderRadius: '4px' }}>
              <label className="form-label" style={{ color: 'white', fontWeight: '600' }}><FaKey /> Define la contraseña del archivo</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe la clave de descifrado..."
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--color-dark)', color: 'white', marginTop: '6px' }}
              />
            </div>
          )}

          {security === 'sms' && (
            <div style={{ marginBottom: '25px', padding: '16px', backgroundColor: 'rgba(82, 196, 26, 0.05)', borderLeft: '4px solid #52c41a', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input 
                  type="checkbox" 
                  checked={useRegisteredPhone} 
                  onChange={(e) => setUseRegisteredPhone(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#52c41a' }}
                />
                Usar mi número de teléfono registrado (+525555885620)
              </label>
              
              {!useRegisteredPhone && (
                <div>
                  <label className="form-label" style={{ fontSize: '0.85rem' }}><FaPhoneAlt /> Número Alternativo Destino</label>
                  <input 
                    type="tel" 
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="+52 55 1234 5678"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--color-dark)', color: 'white', marginTop: '4px' }}
                  />
                </div>
              )}
            </div>
          )}

          {/* 6. NIVEL DE ACCESO / RESTRICCIONES (Nuevo) */}
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label className="form-label" style={{ color: 'white', fontWeight: '600' }}>Nivel de restricción de lectura</label>
            <div style={{ display: 'flex', gap: '15px', marginTop: '6px' }}>
              <button 
                type="button" 
                onClick={() => setAcceso('Descarga')}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
                  backgroundColor: acceso === 'Descarga' ? 'rgba(82, 196, 26, 0.15)' : 'var(--color-dark)',
                  color: acceso === 'Descarga' ? '#52c41a' : 'var(--color-text-medium)',
                  border: acceso === 'Descarga' ? '1px solid #52c41a' : '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <FaDownload /> Permitir DescargaCompleta
              </button>
              <button 
                type="button" 
                onClick={() => setAcceso('Solo Vista')}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
                  backgroundColor: acceso === 'Solo Vista' ? 'rgba(250, 173, 20, 0.15)' : 'var(--color-dark)',
                  color: acceso === 'Solo Vista' ? '#faad14' : 'var(--color-text-medium)',
                  border: acceso === 'Solo Vista' ? '1px solid #faad14' : '1px solid rgba(255,255,255,0.08)'
                }}
              >
                <FaEye /> Restringir a Solo Vista
              </button>
            </div>
          </div>

          {/* 7. BOTÓN SUBMIT DE ACCIÓN */}
          <div style={{ marginTop: '35px' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isUploading}
              style={{ width: '100%', padding: '14px', fontSize: '1.05rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: '700' }}
            >
              {isUploading ? 'Subiendo y protegiendo en Azure...' : 'Cargar y Aplicar Cifrado'}
            </button>
          </div>

        </form>
      </main>
    
    </PrivateLayout>
  )
}