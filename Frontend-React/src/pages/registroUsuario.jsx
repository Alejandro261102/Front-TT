import React from 'react'
import { Link } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

export default function RegistroUsuario() {
  return (
    <>
      <PublicHeader />

      <main className="auth-page">
        <section className="section login-section">
          <div className="container auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <span className="section-badge">Únete a nosotros</span>
                <h2>Crear una cuenta</h2>
                <p>Registra tus datos para comenzar a transferir archivos de forma segura.</p>
              </div>

              <form className="auth-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input type="text" id="nombre" placeholder="Ej. Juan Pérez" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input type="email" id="email" placeholder="correo@ejemplo.com" required />
                </div>

                {/* Este campo es vital para tu lógica de autenticación SMS del TT2 */}
                <div className="form-group">
                  <label htmlFor="tel">Número celular</label>
                  <input type="tel" id="tel" placeholder="5512345678" required />
                  <small className="form-help">Lo usaremos para enviarte tus tokens de acceso.</small>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" id="password" placeholder="••••••••" required />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password">Confirmar contraseña</label>
                  <input type="password" id="confirm-password" placeholder="••••••••" required />
                </div>

                <div className="form-terms">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    Acepto los <Link to="/ayuda-soporte">términos y condiciones</Link> y el aviso de privacidad.
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Registrarse
                </button>
              </form>

              <div className="auth-footer">
                <p>¿Ya tienes una cuenta? <Link to="/login" className="link-text">Inicia sesión aquí</Link></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}