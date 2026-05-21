import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader'
import PrivateHeader from '../components/PrivateHeader' 
import Footer from '../components/Footer'

// 🌟 FUNCIONES DE ENMASCARAMIENTO (MÁSCARA DE SEGURIDAD)
const enmascararEmail = (email) => {
  if (!email || !email.includes('@')) return 'cor***@dominio.com';
  const [usuario, dominio] = email.split('@');
  if (usuario.length <= 2) {
    return `${usuario}***@${dominio}`;
  }
  // Deja las primeras 2 letras, añade asteriscos y toma las últimas 1 o 2 letras antes del @
  return `${usuario.substring(0, 2)}***${usuario.substring(usuario.length - 1)}@${dominio}`;
};

const enmascararTelefono = (tel) => {
  if (!tel) return '******78';
  const limpio = tel.replace(/\s+/g, ''); // Quita espacios
  if (limpio.length < 4) return '****' + limpio;
  // Muestra solo los últimos 2 dígitos y llena el resto con asteriscos
  return '*'.repeat(limpio.length - 2) + limpio.substring(limpio.length - 2);
};

export default function RecuperacionContrasena() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detectamos el contexto de navegación
  const vieneDesdeConfiguracion = location.state?.desdeConfiguracion || false;
  
  // 🌟 DATOS REALES/SIMULADOS: Si el usuario inició sesión o escribió su identificador, 
  // idealmente estos datos vendrían de una consulta a la API de Antonio en Spring Boot.
  const [datosContacto, setDatosContacto] = useState({
    email: 'antonio.dominguez@gmail.com', // Datos de ejemplo para la simulación local
    telefono: '5512345678'
  });

  // ESTADOS
  const [identificador, setIdentificador] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendToken = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Si el usuario escribió un correo en el input, podemos usarlo para la simulación
    if (identificador.includes('@')) {
      setDatosContacto(prev => ({ ...prev, email: identificador.trim() }));
    } else if (/^\d+$/.test(identificador.trim())) {
      setDatosContacto(prev => ({ ...prev, telefono: identificador.trim() }));
    }

    setTimeout(() => {
      setIsLoading(false);
      setShowResetModal(true);
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    alert("Contraseña actualizada correctamente.");
    
    if (vieneDesdeConfiguracion) {
      navigate('/configuracion');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* RENDERIZADO CONDICIONAL DE ENCABEZADOS */}
      {vieneDesdeConfiguracion ? <PrivateHeader /> : <PublicHeader />}

      <main className="auth-page" style={{ paddingTop: '140px', paddingBottom: '60px', backgroundColor: 'var(--color-dark)' }}>
        <section className="section login-section" style={{ padding: '20px 0' }}>
          <div className="container auth-container">
            <div className="auth-card" style={{ backgroundColor: 'var(--color-primary)', border: '1px solid rgba(255,255,255,0.05)', padding: '40px', borderRadius: '16px', maxWidth: '520px', margin: '0 auto' }}>
              
              <div className="auth-header" style={{ marginBottom: '25px' }}>
                <span className="section-badge">
                  {vieneDesdeConfiguracion ? 'Ajustes de Cuenta' : 'Recuperación de Cuenta'}
                </span>
                <h2 style={{ color: 'var(--color-white)', fontSize: '1.8rem', marginTop: '10px' }}>
                  {vieneDesdeConfiguracion ? 'Actualizar Contraseña' : 'Restablecer acceso'}
                </h2>
                <p style={{ color: 'var(--color-text-medium)', fontSize: '0.95rem', marginTop: '5px' }}>
                  {vieneDesdeConfiguracion 
                    ? 'Por seguridad, ingresa tu identificador para confirmar tus medios de contacto antes del cambio.' 
                    : 'Ingresa tu correo o número de teléfono registrado para recibir un código de seguridad.'
                  }
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSendToken}>
                <div className="form-group">
                  <label className="form-label" style={{ color: 'white' }}>Correo o Teléfono</label>
                  <div className="input-wrapper">

                    <input 
                      type="text" 
                      className="form-control-modern" 
                      placeholder="ejemplo@gmail.com o telefono" 
                      required 
                      value={identificador}
                      onChange={(e) => setIdentificador(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Enviar Token de Confirmación'}
                </button>
              </form>

              {/* PIE DE TARJETA DINÁMICO */}
              {!vieneDesdeConfiguracion ? (
                <div className="auth-footer" style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', textAlign: 'center' }}>
                  <p style={{ color: 'var(--color-text-medium)' }}>
                    ¿Recordaste tu contraseña? <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: '600' }}>Inicia sesión</Link>
                  </p>
                </div>
              ) : (
                <div className="auth-footer" style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', textAlign: 'center' }}>
                  <Link to="/configuracion" style={{ color: 'var(--color-text-medium)', textDecoration: 'none', fontSize: '0.9rem' }}>
                    ← Cancelar y regresar a Configuración
                  </Link>
                </div>
              )}

            </div>
          </div>
        </section>
      </main>

      {/* --- MODAL DE VERIFICACIÓN CON ENMASCARAMIENTO DINÁMICO --- */}
      {showResetModal && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(19, 25, 36, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="auth-card" style={{ width: '450px', padding: '2.5rem', backgroundColor: 'var(--color-primary)', border: '1px solid #0a3fff', borderRadius: '16px', boxShadow: 'var(--shadow-medium)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '3rem' }}>🛡️</span>
              <h2 style={{ marginTop: '1rem', color: 'white', fontWeight: '700' }}>Verificar Identidad</h2>
              
              {/* 🌟 AQUÍ SE RENDERIZA LA MÁSCARA DINÁMICA DE SEGURIDAD */}
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-medium)', marginTop: '10px', lineHeight: '1.5' }}>
                Se envió un token al correo <strong style={{ color: 'white' }}>{enmascararEmail(datosContacto.email)}</strong> y al número SMS <strong style={{ color: 'white' }}>{enmascararTelefono(datosContacto.telefono)}</strong>.
              </p>
            </div>

            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Código de Verificación (Token)</label>
                <input 
                  type="text" 
                  className="form-control-modern" 
                  placeholder="000000" 
                  maxLength="6"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.4rem', backgroundColor: 'var(--color-dark)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Nueva Contraseña</label>
                <input 
                  type="password" 
                  className="form-control-modern" 
                  placeholder="••••••••" 
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ paddingLeft: '15px' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ color: 'white' }}>Confirmar Nueva Contraseña</label>
                <input 
                  type="password" 
                  className="form-control-modern" 
                  placeholder="••••••••" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingLeft: '15px' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                {vieneDesdeConfiguracion ? 'Actualizar Contraseña' : 'Restablecer e Iniciar Sesión'}
              </button>
              
              <button 
                type="button" 
                onClick={() => setShowResetModal(false)}
                style={{ width: '100%', marginTop: '15px', border: 'none', background: 'none', color: 'var(--color-text-medium)', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}