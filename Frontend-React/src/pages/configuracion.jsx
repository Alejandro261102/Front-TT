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
          <span className="section-badge">Panel de Control</span>
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
                <label>Nombre completo</label>
                <input type="text" placeholder="Ambar Stephania García" />
              </div>
              <div className="form-group">
                <label>Correo electrónico</label>
                <input type="email" placeholder="ambar.garcia@ejemplo.com" disabled />
              </div>
              <button type="button" className="btn btn-secondary">Actualizar Perfil</button>
            </form>
          </section>

          {/* SECCIÓN 2: SEGURIDAD Y MFA (SMS) */}
          <section className="benefit-box shadow-sm" style={{ borderLeft: '4px solid var(--accent-color, #C13676)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🔐</span>
              <h3 style={{ margin: 0 }}>Seguridad y Autenticación</h3>
            </div>
            <div className="form-group">
              <label>Número Celular para SMS</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="tel" placeholder="+52 55 1122 3344" style={{ flex: 1 }} />
                <button type="button" className="btn btn-primary">Cambiar</button>
              </div>
              <small className="form-help">Utilizado para el envío de tokens de cifrado.</small>
            </div>
          </section>

          {/* SECCIÓN 3: RECUPERACIÓN DE CONTRASEÑA (Integrada) */}
          <section className="benefit-box shadow-sm">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📩</span>
              <h3 style={{ margin: 0 }}>Restablecimiento de Credenciales</h3>
            </div>
            
            {!emailEnviado ? (
              <div className="recovery-integration">
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                  ¿Deseas cambiar tu contraseña de forma segura? Te enviaremos un enlace de restablecimiento a tu correo electrónico registrado.
                </p>
                <button 
                  onClick={handleRecuperacionSoporte} 
                  className="btn btn-secondary"
                >
                  Enviar enlace de recuperación
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: '#f0fdf4', padding: '1rem', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <p style={{ color: '#166534', margin: 0, fontSize: '0.9rem' }}>
                  <strong>¡Enlace enviado!</strong> Revisa tu bandeja de entrada para continuar con el cambio de contraseña.
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
              <label>Expiración por defecto de archivos</label>
              <select className="form-control" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}>
                <option>24 horas</option>
                <option>7 días</option>
                <option>30 días</option>
              </select>
            </div>
          </section>

        </div>
      </main>
    </PrivateLayout>
  )
}