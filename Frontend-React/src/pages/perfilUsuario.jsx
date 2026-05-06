import React from 'react'
import PrivateLayout from '../components/PrivateLayout'

export default function PerfilUsuario() {
  // Datos de prueba simulando la respuesta del Backend (RF-005, RF-020)
  const datosUsuario = {
    nombre: "Ambar Stephania García",
    boleta: "2026A202",
    email: "ambar.garcia@ejemplo.com",
    telefono: "+52 55 1122 3344",
    almacenamientoUsado: "1.2 GB",
    almacenamientoTotal: "5 GB",
    porcentaje: 24
  };

  return (
    <PrivateLayout>

      <main className="profile-page section">
        <div className="container">
          <header className="section-heading">
            <span className="section-badge">Mi Cuenta</span>
            <h1>Perfil de Usuario</h1>
            <p>Administra tu identidad digital y revisa tu estado de almacenamiento seguro.</p>
          </header>

          <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '3rem' }}>
            
            {/* Tarjeta de Información General */}
            <aside className="benefit-box shadow-sm" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: 'var(--primary-color, #4A142C)', 
                borderRadius: '50%', 
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: 'white'
              }}>
                {datosUsuario.nombre.charAt(0)}
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{datosUsuario.nombre}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>Boleta: {datosUsuario.boleta}</p>
              <button className="btn btn-secondary btn-block" style={{ marginTop: '1rem' }}>Editar Foto</button>
            </aside>

            {/* Detalles y Estadísticas de Almacenamiento (RF-020) */}
            <section className="profile-details">
              <div className="benefit-box shadow-sm" style={{ marginBottom: '2rem' }}>
                <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>Información de Contacto</h3>
                <div style={{ padding: '1rem 0' }}>
                  <p><strong>Correo:</strong> {datosUsuario.email}</p>
                  <p><strong>Teléfono:</strong> {datosUsuario.telefono}</p>
                </div>
                <button className="btn btn-primary">Actualizar Datos</button>
              </div>

              <div className="benefit-box shadow-sm">
                <h3>Estado del Almacenamiento (Azure)</h3>
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Usado: {datosUsuario.almacenamientoUsado}</span>
                    <span>Total: {datosUsuario.almacenamientoTotal}</span>
                  </div>
                  {/* Barra de progreso de almacenamiento */}
                  <div style={{ 
                    width: '100%', 
                    backgroundColor: '#eee', 
                    height: '12px', 
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${datosUsuario.porcentaje}%`, 
                      backgroundColor: 'var(--accent-color, #C13676)', 
                      height: '100%' 
                    }}></div>
                  </div>
                  <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#666' }}>
                    Tu espacio se utiliza para almacenar archivos cifrados con extensión .seg
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      
    </PrivateLayout>
  )
}