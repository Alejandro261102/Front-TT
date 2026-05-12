import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

export default function RegistroUsuario() {
  const navigate = useNavigate();
  
  // 1. ESTADOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    nombreUsuario: '', // Único campo modificable posteriormente
    email: '',
    emailRecuperacion: '', // Correo extra
    tel: '',
    password: '',
    confirmPassword: ''
  });

  // 2. ESTADOS DE LÓGICA (Token y Carga)
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. VALIDACIONES

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de envío de tokens (Backend disparando servicios de Azure)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowTokenModal(true);
    }, 1500);
  };

  const handleVerifyToken = (e) => {
    e.preventDefault();
    // Simulación de validación (Token de prueba: 123456)
    if (tokenInput === "123456") {
      alert("Verificación exitosa. Usuario registrado correctamente.");
      navigate('/login');
    } else {
      alert("Token incorrecto. Revisa tus medios de contacto.");
    }
  };

  return (
    <>
      <PublicHeader />

      <main className="auth-page">
        <section className="section login-section">
          <div className="container auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <span className="section-badge">Registro Seguro TT2</span>
                <h2>Crear cuenta</h2>
                <p>Completa tus datos para el alta en el sistema de transferencia cifrada.</p>
              </div>

              <form className="auth-form" onSubmit={handleRegisterClick}>
                
                {/* Nombre Real (Fijo) */}
                <div className="form-group">
                  <label className="form-label" htmlFor="nombreCompleto">Nombre Completo</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input type="text" id="nombreCompleto" className="form-control-modern" placeholder="Tal cual aparece en tu ID" required onChange={handleChange} />
                  </div>
                </div>

                {/* Nombre de Usuario (Modificable después) */}
                <div className="form-group">
                  <label className="form-label" htmlFor="nombreUsuario">Nombre de Usuario</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🆔</span>
                    <input type="text" id="nombreUsuario" className="form-control-modern" placeholder="Ej. alex_smith" required onChange={handleChange} />
                  </div>
                  <small className="form-help">Este es el único dato que podrás cambiar en configuración.</small>
                </div>

                {/* Correos */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Correo Principal</label>
                    <input type="email" id="email" className="form-control-modern" placeholder="usuario@ipn.mx" required onChange={handleChange} style={{ paddingLeft: '15px' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="emailRecuperacion">Correo Extra</label>
                    <input type="email" id="emailRecuperacion" className="form-control-modern" placeholder="personal@gmail.com" required onChange={handleChange} style={{ paddingLeft: '15px' }} />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="form-group">
                  <label className="form-label" htmlFor="tel">Teléfono Celular</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📱</span>
                    <input type="tel" id="tel" className="form-control-modern" placeholder="55 1234 5678" required onChange={handleChange} />
                  </div>
                </div>

                {/* Contraseñas */}
                <div className="form-group">
                  <label className="form-label" htmlFor="password">Contraseña</label>
                  <input type="password" id="password" className="form-control-modern" placeholder="••••••••" required onChange={handleChange} style={{ paddingLeft: '15px' }} />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input type="password" id="confirmPassword" className="form-control-modern" placeholder="••••••••" required onChange={handleChange} style={{ paddingLeft: '15px' }} />
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={isLoading} style={{ marginTop: '1rem' }}>
                  {isLoading ? 'Generando Tokens...' : 'Registrarse'}
                </button>
              </form>

              <div className="auth-footer">
                <p>¿Ya tienes cuenta? <Link to="/login" className="link-text">Inicia sesión</Link></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* --- MODAL DE TOKEN DUAL (SMS + EMAIL) --- */}
      {showTokenModal && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(74, 20, 44, 0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000
        }}>
          <div className="auth-card" style={{ width: '420px', padding: '2.5rem', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>🔐</span>
            <h2 style={{ margin: '1rem 0' }}>Verificación Dual</h2>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              Se ha enviado un código de seguridad a <strong>{formData.email}</strong> y vía <strong>SMS</strong> a tu celular.
            </p>

            <form onSubmit={handleVerifyToken}>
              <div className="form-group">
                <input 
                  type="text" 
                  maxLength="6"
                  className="form-control-modern"
                  placeholder="000000"
                  required
                  style={{ textAlign: 'center', fontSize: '1.8rem', letterSpacing: '10px', height: '60px' }}
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1.5rem' }}>
                Validar y Entrar
              </button>
              <button type="button" className="btn-link" onClick={() => setShowTokenModal(false)} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                Regresar a corregir datos
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}