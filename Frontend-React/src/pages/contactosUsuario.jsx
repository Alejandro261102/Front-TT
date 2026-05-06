import React from 'react'
import PrivateLayout from '../components/PrivateLayout'

export default function ContactosUsuario() {
  // Datos de prueba para simular la lista de contactos frecuentes (RF-012, RF-025)
  const contactosFrecuentes = [
    { id: 1, nombre: 'Héctor Alejandro', email: 'hector.aranda@ejemplo.com', tel: '5512345678', iniciales: 'HA' },
    { id: 2, nombre: 'Antonio de Jesús', email: 'antonio.dominguez@ejemplo.com', tel: '5587654321', iniciales: 'AD' },
    { id: 3, nombre: 'Tania Rodríguez', email: 'tania.sarabia@escom.ipn', tel: '5500112233', iniciales: 'TR' },
  ];

  return (
    <PrivateLayout>
      <main className="contacts-page section">
        <div className="container">
          <header className="section-heading">
            <span className="section-badge">Directorio Seguro</span>
            <h1>Mis Contactos</h1>
            <p>Gestiona tus contactos frecuentes para realizar transferencias rápidas y seguras.</p>
          </header>

          {/* Barra de Búsqueda de Contactos (RF-012) */}
          <section className="search-section" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
            <div className="auth-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
              <input 
                type="text" 
                placeholder="Buscar por nombre, correo o teléfono..." 
                style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <button className="btn btn-primary">Añadir Contacto</button>
            </div>
          </section>

          <div className="contacts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {contactosFrecuentes.map((contacto) => (
              <article key={contacto.id} className="benefit-box shadow-sm" style={{ textAlign: 'left', padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: 'var(--accent-color, #C13676)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {contacto.iniciales}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{contacto.nombre}</h3>
                    <small style={{ color: '#666' }}>ID: 00{contacto.id}-CONF</small>
                  </div>
                </div>

                <div className="contact-info" style={{ fontSize: '0.9rem', color: '#444' }}>
                  <p style={{ margin: '0.25rem 0' }}>📧 {contacto.email}</p>
                  <p style={{ margin: '0.25rem 0' }}>📱 {contacto.tel}</p>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Enviar Archivo</button>
                  <button className="btn-icon" style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Eliminar">🗑️</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      
    </PrivateLayout>
  )
}