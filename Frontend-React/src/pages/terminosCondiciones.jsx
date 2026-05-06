import React from 'react'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

export default function TerminosCondiciones() {
  return (
    <>
      <PublicHeader />

      <main className="terms-page section">
        <div className="container">
          <header className="section-heading">
            <span className="section-badge">Aspectos Legales</span>
            <h1>Términos y Condiciones de Uso</h1>
            <p>Última actualización: 30 de abril de 2026</p>
          </header>

          <section className="benefit-box shadow-sm" style={{ textAlign: 'left', padding: '2rem', marginTop: '3rem' }}>
            <div className="terms-content" style={{ color: '#444', lineHeight: '1.6' }}>
              
              <h3>1. Aceptación de los Términos</h3>
              <p>
                Al acceder y utilizar esta plataforma de transferencia de archivos, usted acepta cumplir con estos términos. 
                Este sistema ha sido desarrollado como un proyecto académico bajo el protocolo de Trabajo Terminal de la ESCOM.
              </p>

              <h3>2. Uso de la Tecnología de Cifrado</h3>
              <p>
                El usuario reconoce que los archivos son cifrados localmente mediante el algoritmo <strong>AES-256</strong>. 
                La plataforma no almacena las llaves de descifrado de forma persistente en texto plano, garantizando la confidencialidad.
              </p>

              <h3>3. Autenticación por SMS (MFA)</h3>
              <p>
                Para la recuperación y descarga de archivos, el sistema requiere un número telefónico válido para el envío de 
                tokens de seguridad. Usted es responsable de la exactitud de los datos proporcionados para este fin.
              </p>

              <h3>4. Almacenamiento en la Nube (Azure)</h3>
              <p>
                Los datos cifrados se alojan en la infraestructura de <strong>Microsoft Azure</strong>. El sistema se reserva 
                el derecho de eliminar archivos que hayan superado su tiempo de expiración configurado por el remitente.
              </p>

              <h3>5. Responsabilidad</h3>
              <p>
                Dada la naturaleza del proyecto, el equipo de desarrollo no se hace responsable por la pérdida de contraseñas 
                locales generadas durante el proceso de cifrado, ya que estas son necesarias para el acceso final al documento.
              </p>

              <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid var(--accent-color)' }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  <strong>Aviso:</strong> Este documento cumple con los lineamientos de privacidad y protección de datos 
                  personales estipulados en el marco teórico de este Trabajo Terminal.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}