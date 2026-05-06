import React from 'react'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

export default function Nosotros() {
  return (
    <>
      <PublicHeader />

      <main className="about-page">
        {/* Sección Hero: Misión del Proyecto */}
        <section className="hero section about-hero">
          <div className="container">
            <div className="hero-text text-center">
              <span className="section-badge">Sobre el Proyecto</span>
              <h1>Seguridad Documental al Alcance de Todos</h1>
              <p className="lead-text">
                Somos un equipo de la <strong>Escuela Superior de Cómputo (ESCOM)</strong> dedicados al 
                desarrollo de soluciones tecnológicas que garantizan la confidencialidad 
                en el intercambio de información sensible.
              </p>
            </div>
          </div>
        </section>

        {/* Sección: Nuestra Misión y Visión */}
        <section className="features section light-bg">
          <div className="container grid-2">
            <div className="feature-card white">
              <div className="icon-placeholder">🎯</div>
              <h2>Nuestra Misión</h2>
              <p>
                Proveer una plataforma robusta que combine el poder de la nube de Azure 
                con cifrado local avanzado, eliminando el riesgo de filtraciones en la 
                transferencia de contratos y documentos legales.
              </p>
            </div>
            <div className="feature-card white">
              <div className="icon-placeholder">🚀</div>
              <h2>Nuestra Visión</h2>
              <p>
                Convertirnos en el referente académico de transferencias seguras dentro 
                del Instituto Politécnico Nacional, promoviendo estándares de 
                ciberseguridad de alto nivel.
              </p>
            </div>
          </div>
        </section>

        {/* Sección: El Equipo (TT2) */}
        <section className="benefits section">
          <div className="container">
            <div className="section-heading">
              <h2>Equipo de Desarrollo</h2>
              <p>Estudiantes de Ingeniería en Sistemas Computacionales.</p>
            </div>
            
            <div className="benefits-grid">
              {/* Puedes repetir este bloque por cada integrante */}
              <article className="benefit-box team-card">
                <div className="team-avatar">👤</div>
                <h3>Integrante 1</h3>
                <p>Desarrollador Frontend / UI Designer</p>
                <span className="badge-ipn">ESCOM - IPN</span>
              </article>

              <article className="benefit-box team-card">
                <div className="team-avatar">👤</div>
                <h3>Integrante 2</h3>
                <p>Desarrollador Backend / Azure Architect</p>
                <span className="badge-ipn">ESCOM - IPN</span>
              </article>

              <article className="benefit-box team-card">
                <div className="team-avatar">👤</div>
                <h3>Integrante 3</h3>
                <p>Especialista en Ciberseguridad / QA</p>
                <span className="badge-ipn">ESCOM - IPN</span>
              </article>
            </div>
          </div>
        </section>

        {/* Sección Institucional */}
        <section className="cta section">
          <div className="container cta-box text-center">
            <h2>Desarrollado bajo el protocolo de Trabajo Terminal II</h2>
            <p>Proyecto oficial del Instituto Politécnico Nacional - 2026</p>
            <div className="logo-placeholder">ESCOM | IPN</div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}