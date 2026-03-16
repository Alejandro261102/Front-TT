import { Link } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <PublicHeader />

      <main>
        {/* Sección Hero */}
        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-text">
              <span className="section-badge">Plataforma segura de archivos</span>
              <h1>Protege, organiza y comparte tus archivos con mayor seguridad</h1>
              <p>
                Gestiona tus documentos en una plataforma diseñada para almacenamiento,
                protección y compartición segura de archivos desde cualquier lugar.
              </p>

              <div className="hero-actions">
                <Link to="/registro" className="btn btn-primary">Comenzar ahora</Link>
                <Link to="/login" className="btn btn-secondary">Ya tengo cuenta</Link>
              </div>
            </div>

            <div className="hero-visual">
              <img src="/assets/img/security-main.jpg" alt="Seguridad digital y protección de archivos" />
            </div>
          </div>
        </section>

        {/* Sección Características */}
        <section className="features section">
          <div className="container features-grid">
            <div className="features-list">
              <div className="feature-card feature-title-card">
                <h2>Características Destacadas</h2>
              </div>

              <div className="feature-card">
                <h3>Cifrado de grado militar</h3>
                <p>Tus archivos se almacenan protegidos mediante mecanismos avanzados de seguridad.</p>
              </div>

              <div className="feature-card">
                <h3>Autenticación doble</h3>
                <p>Agrega una capa extra de acceso seguro para proteger tu cuenta.</p>
              </div>

              <div className="feature-card">
                <h3>Contraseñas seguras</h3>
                <p>Controles de acceso robustos para una gestión confiable de la información.</p>
              </div>
            </div>

            <div className="features-image">
              <img src="/assets/img/security-shield.jpg" alt="Escudo de seguridad digital" />
            </div>
          </div>
        </section>

        {/* Sección Cómo Funciona */}
        <section className="how-it-works section">
          <div className="container">
            <div className="section-heading dark">
              <h2>¿Cómo funciona?</h2>
              <p>Usa la plataforma en tres pasos simples.</p>
            </div>

            <div className="steps-grid">
              <article className="step-card">
                <div className="step-number">1</div>
                <h3>Sube tu archivo</h3>
                <p>Carga documentos, imágenes o archivos importantes dentro de tu espacio personal.</p>
              </article>

              <article className="step-card">
                <div className="step-number">2</div>
                <h3>Configura la seguridad</h3>
                <p>Define permisos, privacidad, contraseña o restricciones de acceso.</p>
              </article>

              <article className="step-card">
                <div className="step-number">3</div>
                <h3>Compártelo</h3>
                <p>Envía tus archivos a contactos específicos de forma más controlada y segura.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Sección Beneficios */}
        <section className="benefits section">
          <div className="container">
            <div className="section-heading">
              <h2>¿Por qué usar esta plataforma?</h2>
              <p>Diseñada para ofrecer seguridad, simplicidad y control sobre tus archivos.</p>
            </div>

            <div className="benefits-grid">
              <article className="benefit-box">
                <h3>Acceso rápido</h3>
                <p>Encuentra archivos recientes, compartidos y carpetas en una sola interfaz.</p>
              </article>

              <article className="benefit-box">
                <h3>Organización eficiente</h3>
                <p>Administra tus carpetas y documentos de forma clara y ordenada.</p>
              </article>

              <article className="benefit-box">
                <h3>Compartición segura</h3>
                <p>Comparte únicamente con las personas correctas y con mejores controles de acceso.</p>
              </article>

              <article className="benefit-box">
                <h3>Diseño intuitivo</h3>
                <p>Una experiencia amigable para que cualquier usuario pueda usarla sin complicaciones.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Sección CTA */}
        <section className="cta section">
          <div className="container cta-box">
            <div>
              <h2>Empieza a proteger tus archivos hoy</h2>
              <p>Crea una cuenta y comienza a usar una plataforma más segura para gestionar tu información.</p>
            </div>
            <Link to="/registro" className="btn btn-primary">Crear cuenta</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}