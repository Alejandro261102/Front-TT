import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'
import Footer from '../components/Footer'

// 🌟 Importación de React Icons estandarizados de tu imagen
import { 
  FaUpload, FaLock, FaShieldAlt, FaGlobe, FaChevronLeft, 
  FaFileAlt, FaKey, FaPhoneAlt, FaEye, FaDownload, 
  FaTimes, FaUserPlus 
} from 'react-icons/fa'

// Servicios API Simulados
const fetchAvailableFolders = async () => {
  return [
    { id: 'fld-1', name: 'Documentos personales' },
    { id: 'fld-2', name: 'Proyecto terminal' },
    { id: 'fld-4', name: 'Borradores Financieros' }
  ];
}

const uploadFileService = async (formData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: 'Archivo subido y protegido correctamente' };
}

export default function SubirArchivo() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const carpetaInicial = searchParams.get('carpeta') || 'root'

  // Estados del Formulario Extendidos
  const [folderId] = useState(carpetaInicial)
  const [security, setSecurity] = useState('public') // 'public', 'password', 'sms'
  const [password, setPassword] = useState('')
  const [useRegisteredPhone, setUseRegisteredPhone] = useState(true)
  const [customPhone, setCustomPhone] = useState('+525555885620')
  const [acceso, setAcceso] = useState('Descarga') // 'Descarga' o 'Solo Vista'
  
  // Estados complementarios de tu imagen de WhatsApp
  const [tipoDestinatario, setTipoDestinatario] = useState('email') // 'email', 'user', 'tel'
  const [inputDestinatario, setInputDestinatario] = useState('')
  const [destinatarios, setDestinatarios] = useState(['tono2001ado@gmail.com', 'antonio2001ado@gmail.com'])
  const [enviarCopia, setEnviarCopia] = useState(false)
  const [asunto, setAsunto] = useState('Practica 5 Big Data')
  const [mensaje, setMensaje] = useState('Esto es una prueba del TT')
  
  // 🌟 ESTADOS DE CONTROL DE CARPETAS Y ARCHIVOS MÚLTIPLES CORREGIDOS
  const [folder, setFolders] = useState([]) // <- Agregado para corregir el setFolders del useEffect
  const [files, setFiles] = useState([])
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

  // Agregar tag de destinatario
  const handleAgregarDestinatario = (e) => {
    e.preventDefault();
    if (!inputDestinatario.trim()) return;
    if (destinatarios.includes(inputDestinatario.trim())) return;
    setDestinatarios([...destinatarios, inputDestinatario.trim()]);
    setInputDestinatario('');
  };

  // Remover tag de destinatario
  const handleRemoverDestinatario = (indexToRemove) => {
    setDestinatarios(destinatarios.filter((_, index) => index !== indexToRemove));
  };

  // 🌟 Manejador para añadir archivos al arreglo (Múltiple selección)
  const handleFileChange = (e) => {
    if (e.target.files) {
      const nuevosArchivos = Array.from(e.target.files);
      setFiles([...files, ...nuevosArchivos]);
    }
  };

  // 🌟 Función para eliminar un archivo específico de la lista por su índice
  const handleRemoverArchivo = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  // ENVÍO DE DATOS EXTENDIDO
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Por favor, selecciona al menos un archivo para subir.');
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
      
      // 🌟 Añadimos cada archivo del arreglo al FormData de forma independiente
      files.forEach((item) => {
        formData.append('archivos', item);
      });

      formData.append('carpetaDestino', folderId);
      formData.append('nivelSeguridad', security);
      formData.append('asunto', asunto.trim());
      formData.append('mensajePersonalizado', mensaje.trim());
      formData.append('nivelAcceso', acceso);
      formData.append('enviarCopia', enviarCopia);
      formData.append('destinatarios', JSON.stringify(destinatarios));
      
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
        
        {/* Encabezado */}
        <section className="section-top" style={{ marginBottom: '30px', textAlign: 'left' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', border: 'none', color: 'var(--color-text-medium)', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
          >
            <FaChevronLeft /> Cancelar y volver al espacio
          </button>
          <br></br>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'white' }}>Enviar Archivo</h1>
          <p style={{ color: 'var(--color-text-medium)', marginTop: '4px' }}>Comparte archivos de forma segura con otros usuarios. Configura permisos, seguridad y tiempo de expiración.</p>
        </section>

        {error && (
          <div style={{ padding: '16px', backgroundColor: 'rgba(245, 34, 45, 0.15)', color: '#f5222d', border: '1px solid rgba(245, 34, 45, 0.2)', borderRadius: '10px', marginBottom: '25px', textAlign: 'left' }}>
            <strong>Error de Políticas:</strong> {error}
          </div>
        )}

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
          
          {/* 1. SELECCIÓN DE ARCHIVOS MÚLTIPLES */}
          <div style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white', fontWeight: '600' }}>Archivos a enviar *</label>
            <div style={{ 
              border: files.length > 0 ? '2px dashed #0a3fff' : '2px dashed rgba(255,255,255,0.15)', 
              borderRadius: '12px', 
              padding: '40px 20px', 
              textAlign: 'center', 
              backgroundColor: files.length > 0 ? 'rgba(10, 63, 255, 0.04)' : 'var(--color-dark)', 
              cursor: 'pointer', 
              transition: 'all 0.3s'
            }}>
              <input 
                type="file" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                id="file-upload" 
                multiple 
              />
              <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: 0 }}>
                <span style={{ fontSize: '2.8rem', color: '#46A2FD' }}>
                  <FaUpload />
                </span>
                <span style={{ color: '#46A2FD', fontWeight: 'bold', fontSize: '1.05rem' }}>
                  Haz clic para seleccionar archivos
                </span>
                <span style={{ color: 'var(--color-text-medium)', fontSize: '0.85rem' }}>
                  Soporta PDF, DOCX, JPG, PNG, ZIP, etc. (Puedes elegir múltiples)
                </span>
              </label>
            </div>

            {/* 🌟 SECCIÓN DINÁMICA DE ARCHIVOS CARGADOS (Oculta si está vacía) */}
            {files.length > 0 && (
              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-medium)', fontWeight: '500' }}>
                  Archivos seleccionados ({files.length}):
                </span>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {files.map((item, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '8px 14px', borderRadius: '8px', 
                        border: '1px solid rgba(255,255,255,0.05)', width: '100%', maxWidth: '550px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                        <FaFileAlt style={{ color: '#faad14', fontSize: '1rem', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.88rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name} 
                          <span style={{ color: 'var(--color-text-medium)', marginLeft: '8px', fontSize: '0.8rem' }}>
                            ({(item.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </span>
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={() => handleRemoverArchivo(index)} 
                        style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. DESTINATARIOS EN TAGS */}
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white' }}>Destinatarios *</label>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
              {destinatarios.map((dest, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(70, 162, 253, 0.15)', border: '1px solid rgba(70, 162, 253, 0.3)', padding: '6px 12px', borderRadius: '20px', color: '#46A2FD', fontSize: '0.85rem' }}>
                  <span>📬 {dest}</span>
                  <FaTimes style={{ cursor: 'pointer', color: '#ff4d4f' }} onClick={() => handleRemoverDestinatario(index)} />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={tipoDestinatario}
                onChange={(e) => setTipoDestinatario(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--color-dark)', color: 'white', outline: 'none' }}
              >
                <option value="email">Correo Electrónico</option>
                <option value="user">Nombre de Usuario</option>
                <option value="tel">Teléfono</option>
              </select>
              <input 
                type="text"
                className="form-control-modern"
                placeholder={tipoDestinatario === 'email' ? 'correo@ejemplo.com' : tipoDestinatario === 'user' ? 'alex_smith' : '5512345678'}
                value={inputDestinatario}
                onChange={(e) => setInputDestinatario(e.target.value)}
                style={{ flex: 1, backgroundColor: 'var(--color-dark)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button type="button" onClick={handleAgregarDestinatario} className="btn btn-primary" style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FaUserPlus /> Agregar
              </button>
            </div>
          </div>

          {/* 4. ENVIAR COPIA A MÍ MISMO */}
          <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              id="enviarCopia"
              checked={enviarCopia}
              onChange={(e) => setEnviarCopia(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#0a3fff', cursor: 'pointer' }}
            />
            <label htmlFor="enviarCopia" style={{ fontSize: '0.9rem', color: 'white', cursor: 'pointer' }}>
              Enviar copia a mí mismo
            </label>
          </div>

          {/* 5. ASUNTO */}
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

          {/* 6. MENSAJE PERSONALIZADO */}
          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white' }}>Mensaje personalizado (opcional)</label>
            <textarea 
              rows="3"
              className="form-control-modern" 
              placeholder="Añade notas contextuales sobre este documento..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              style={{ width: '100%', backgroundColor: 'var(--color-dark)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', fontSize: '1rem', resize: 'none', outline: 'none' }}
            />
          </div>

          {/* 7. NIVEL DE SEGURIDAD RADIOS */}
          <div style={{ marginBottom: '25px' }}>
            <label className="form-label" style={{ color: 'white', fontWeight: '600', marginBottom: '12px', display: 'block' }}>Nivel de seguridad *</label>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', border: security === 'public' ? '2px solid #0a3fff' : '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'public' ? 'rgba(10, 63, 255, 0.05)' : 'transparent', transition: 'all 0.2s' }}>
                <input type="radio" name="security" value="public" checked={security === 'public'} onChange={() => setSecurity('public')} style={{ width: '18px', height: '18px', accentColor: '#0a3fff' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaGlobe style={{ color: '#46A2FD', fontSize: '1.2rem' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>🌐 Público</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-medium)' }}>Cualquier persona con el enlace puede acceder al archivo.</span>
                  </div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', border: security === 'password' ? '2px solid #0a3fff' : '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'password' ? 'rgba(10, 63, 255, 0.05)' : 'transparent', transition: 'all 0.2s' }}>
                <input type="radio" name="security" value="password" checked={security === 'password'} onChange={() => setSecurity('password')} style={{ width: '18px', height: '18px', accentColor: '#0a3fff' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaLock style={{ color: '#faad14', fontSize: '1.2rem' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>🔒 Protegido con contraseña</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-medium)' }}>Requerirá una contraseña para acceder al archivo.</span>
                  </div>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', border: security === 'sms' ? '2px solid #0a3fff' : '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', backgroundColor: security === 'sms' ? 'rgba(10, 63, 255, 0.05)' : 'transparent', transition: 'all 0.2s' }}>
                <input type="radio" name="security" value="sms" checked={security === 'sms'} onChange={() => setSecurity('sms')} style={{ width: '18px', height: '18px', accentColor: '#0a3fff' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaShieldAlt style={{ color: '#52c41a', fontSize: '1.2rem' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'white', fontSize: '0.95rem' }}>🔐 Verificación por SMS</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-medium)' }}>El destinatario deberá ingresar un código enviado por SMS.</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* CAMPOS CONDICIONALES */}
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
                  <label className="form-label" style={{ fontSize: '0.85rem' }}><FaPhoneAlt /> Número del destinatario celular</label>
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

          {/* 8. NIVEL DE ACCESO */}
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
                <FaDownload /> Permitir Descarga Completa
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

          {/* 9. BOTÓN SUBMIT */}
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
      <Footer />
    </PrivateLayout>
  )
}