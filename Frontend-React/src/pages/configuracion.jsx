import React, { useState } from 'react'
import PrivateLayout from '../components/PrivateLayout'

export default function Configuracion() {
  const [emailEnviado, setEmailEnviado] = useState(false);

  const handleRecuperacionSoporte = (e) => {
    e.preventDefault();
    // Simulación de envío de correo de recuperación desde la sesión activa
    setEmailEnviado(true);
    setTimeout(() => setEmailEnviado(false), 5000); // Resetear mensaje tras 5s
  };

  return (
    <PrivateLayout>
      <main className="settings-page">
        <header className="section-heading">
          <h1>Configuración de Cuenta</h1>
          <p>Gestiona tu información personal y los parámetros de seguridad de tu cuenta.</p>
        </header>

        <div className="settings-grid" style={{ display: 'grid', gap: '2rem', marginTop: '3rem' }}>
          
          {/* SECCIÓN 1: INFORMACIÓN PERSONAL */}
          <section className="benefit-box shadow-sm">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>👤</span>
              <h3 style={{ margin: 0 }}>Información Personal</h3>
            </div>
            
            <form className="auth-form" style={{ maxWidth: '100%' }}>

              <div className="form-group">
                <label className="form-label">Nombre completo</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input 
                    type="text" 
                    className="form-control-modern" 
                    placeholder="Hector Alejandro Hernandez Aranda" 
                    disabled 
                    style={{ cursor: 'not-allowed', backgroundColor: '#f0f0f0' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nombre de Usuario</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input 
                    type="text" 
                    className="form-control-modern" 
                    placeholder="Introducir Nombre de Usuario" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Correo electrónico</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input 
                    type="email" 
                    className="form-control-modern" 
                    placeholder="ambar.garcia@ejemplo.com" 
                    disabled 
                    style={{ cursor: 'not-allowed', backgroundColor: '#f0f0f0' }}
                  />
                </div>
              </div>

              <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
                Actualizar Perfil
              </button>
            </form>
          </section>

          {/* SECCIÓN 2: SEGURIDAD Y MFA (SMS) */}
          <section className="benefit-box shadow-sm" style={{ borderLeft: '4px solid var(--accent-color, #C13676)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🔐</span>
              <h3 style={{ margin: 0 }}>Seguridad y Autenticación</h3>
            </div>
            
            <div className="form-group">
              <label className="form-label">Número Celular para SMS</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="input-wrapper" style={{ flex: 1 }}>
                  <span className="input-icon">📱</span>
                  <input 
                    type="tel" 
                    className="form-control-modern" 
                    placeholder="+52 55 1122 3344" 
                    disabled
                    style={{ cursor: 'not-allowed', backgroundColor: '#f0f0f0' }}
                  />
                </div>
                {/* <button type="button" className="btn btn-primary">Cambiar</button> */}
              </div>
              <small className="form-help">Utilizado para el envío de tokens de cifrado vía Azure.</small>
            </div>
          </section>

          {/* SECCIÓN 3: CAMBIO DE CONTRASEÑA (Integrada) */}
          <section className="benefit-box shadow-sm">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📩</span>
              <h3 style={{ margin: 0 }}>Cambio de Contraseña</h3>
            </div>
            
            {!emailEnviado ? (
              <div className="recovery-integration">
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                  ¿Deseas cambiar tu contraseña de forma segura? Te enviaremos un enlace de restablecimiento a tu correo registrado.
                </p>
                <button 
                  onClick={handleRecuperacionSoporte} 
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  Enviar enlace de recuperación
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '8px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
                <p style={{ color: '#166534', margin: 0, fontSize: '0.9rem' }}>
                  <strong>¡Enlace enviado!</strong> Revisa tu bandeja de entrada para continuar.
                </p>
              </div>
            )}
          </section>

          {/* SECCIÓN 4: PREFERENCIAS DE ALMACENAMIENTO */}
          <section className="benefit-box shadow-sm">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>☁️</span>
              <h3 style={{ margin: 0 }}>Preferencias de Almacenamiento</h3>
            </div>
            <div className="form-group">
              <label className="form-label">Expiración por defecto de archivos</label>
              <div className="input-wrapper">
                <span className="input-icon">⏳</span>
                <select 
                  className="form-control-modern" 
                  style={{ paddingLeft: '40px', cursor: 'pointer' }}
                >
                  <option>24 horas</option>
                  <option>7 días</option>
                  <option>30 días</option>
                </select>
              </div>
              <small className="form-help">Configuración de políticas de ciclo de vida del dato.</small>
            </div>
          </section>

        </div>
      </main>
    </PrivateLayout>
  )
}