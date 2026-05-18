import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader'
import PrivateHeader from '../components/PrivateHeader' // Importamos el Header Privado
import Footer from '../components/Footer'

export default function RecuperacionContrasena() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detectamos si el usuario viene de la sección interna de Configuración
  const vieneDesdeConfiguracion = location.state?.desdeConfiguracion || false;
  
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
      {/* --- RENDERIZADO CONDICIONAL DE ENCABEZADOS --- */}
      {vieneDesdeConfiguracion ? <PrivateHeader /> : <PublicHeader />}

      <main className="auth-page">
        <section className="section login-section">
          <div className="container auth-container">
            <div className="auth-card">
              
              {/* ENCABEZADOS DINÁMICOS SEGÚN EL CONTEXTO */}
              <div className="auth-header">
                <span className="section-badge">
                  {vieneDesdeConfiguracion ? 'Ajustes de Cuenta' : 'Recuperación de Cuenta'}
                </span>
                <h2>
                  {vieneDesdeConfiguracion ? 'Actualizar Contraseña' : 'Restablecer acceso'}
                </h2>
                <p>
                  {vieneDesdeConfiguracion 
                    ? 'Por seguridad, ingresa tu correo o teléfono para confirmar tu identidad antes de cambiar tu contraseña.' 
                    : 'Ingresa tu correo o número de teléfono registrado para recibir un código de seguridad.'
                  }
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSendToken}>
                <div className="form-group">
                  <label className="form-label">Correo o Celular</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input 
                      type="text" 
                      className="form-control-modern" 
                      placeholder="ejemplo@gmail.com o 5512345678" 
                      required 
                      value={identificador}
                      onChange={(e) => setIdentificador(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Enviar Token de Confirmación'}
                </button>
              </form>

              {/* PIE DE TARJETA DINÁMICO */}
              {!vieneDesdeConfiguracion ? (
                <div className="auth-footer" style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                  <p>¿Recordaste tu contraseña? <Link to="/login" className="link-text">Inicia sesión</Link></p>
                </div>
              ) : (
                <div className="auth-footer" style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', textAlign: 'center' }}>
                  <Link to="/configuracion" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
                    ← Cancelar y regresar a Configuración
                  </Link>
                </div>
              )}

            </div>
          </div>
        </section>
      </main>

      {/* --- MODAL DE RESTABLECIMIENTO --- */}
      {showResetModal && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000
        }}>
          <div className="auth-card" style={{ width: '450px', padding: '2.5rem', backgroundColor: 'white' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '3rem' }}>🛡️</span>
              <h2 style={{ marginTop: '1rem' }}>Verificar Identidad</h2>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Se envió un token al correo <strong>corr***@gmail.com</strong> y al número <strong>*******78</strong>.
              </p>
            </div>

            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label className="form-label">Código de Verificación (Token)</label>
                <input 
                  type="text" 
                  className="form-control-modern" 
                  placeholder="000000" 
                  maxLength="6"
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.4rem' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nueva Contraseña</label>
                <input 
                  type="password" 
                  className="form-control-modern" 
                  placeholder="••••••••" 
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirmar Nueva Contraseña</label>
                <input 
                  type="password" 
                  className="form-control-modern" 
                  placeholder="••••••••" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
                {vieneDesdeConfiguracion ? 'Actualizar Contraseña' : 'Restablecer e Iniciar Sesión'}
              </button>
              
              <button 
                type="button" 
                className="btn-link" 
                onClick={() => setShowResetModal(false)}
                style={{ width: '100%', marginTop: '15px', border: 'none', background: 'none', color: '#888', cursor: 'pointer' }}
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