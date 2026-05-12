import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrivateLayout from '../components/PrivateLayout'

export default function ContactosUsuario() {
  const navigate = useNavigate();

  // 1. ESTADOS: Tus amigos/contactos ya agregados
  const [misContactos, setMisContactos] = useState([
    { id: 1, nombre: 'Ambar Stephania García', email: 'ambar.garcia@ejemplo.com', tel: '5512345678', iniciales: 'AG', alias: 'Ambar' },
    { id: 2, nombre: 'Antonio de Jesús', email: 'antonio.dominguez@ejemplo.com', tel: '5587654321', iniciales: 'AD', alias: 'Toño' },
  ]);

  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [showModalBusqueda, setShowModalBusqueda] = useState(false);

  // 2. LÓGICA DE FILTRADO (De mis amigos ya agregados)
  const contactosFiltrados = misContactos.filter(c => 
    c.nombre.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
    c.alias.toLowerCase().includes(busquedaGlobal.toLowerCase())
  );

  // 3. FUNCIÓN PARA AGREGAR NUEVO "AMIGO" (Simulación de búsqueda en servidor)
  const agregarAmigoPorEmail = (e) => {
    e.preventDefault();
    // Aquí el backend buscaría si existe un usuario con ese email
    alert("Buscando usuario en la base de datos de TT2...");
    // Simulación de encontrar a alguien
    const nuevoAmigo = { 
      id: Date.now(), 
      nombre: 'José Luis Medina', 
      email: busquedaGlobal, 
      tel: '5599887766', 
      iniciales: 'JL',
      alias: 'José'
    };
    setMisContactos([...misContactos, nuevoAmigo]);
    setShowModalBusqueda(false);
    setBusquedaGlobal('');
  };

  const eliminarAmigo = (id) => {
    if(window.confirm('¿Eliminar de tu lista de contactos frecuentes?')) {
      setMisContactos(misContactos.filter(c => c.id !== id));
    }
  };

  return (
    <PrivateLayout>
      <main className="contacts-page section">
        <div className="container">
          <header className="section-heading">
            <span className="section-badge">Directorio Institucional</span>
            <h1>Contactos y Amigos</h1>
            <p>Busca usuarios registrados en la plataforma para realizar envíos cifrados directos.</p>
          </header>

          {/* Barra de Búsqueda estilo Teams */}
          <section className="search-section" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
            <div className="auth-card" style={{ padding: '1.2rem', display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: '#f4f7f6' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                <input 
                  type="text" 
                  placeholder="Buscar amigo por nombre o alias..." 
                  value={busquedaGlobal}
                  onChange={(e) => setBusquedaGlobal(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '10px', border: '1px solid #ddd' }}
                />
              </div>
              <button className="btn btn-primary" onClick={() => setShowModalBusqueda(true)}>
                + Agregar Amigo
              </button>
            </div>
          </section>

          <div className="contacts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {contactosFiltrados.map((contacto) => (
              <article key={contacto.id} className="benefit-box shadow-sm" style={{ textAlign: 'left', padding: '1.5rem', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '55px', height: '55px', backgroundColor: '#4A142C', 
                    color: 'white', borderRadius: '12px', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem'
                  }}>
                    {contacto.iniciales}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-color)' }}>{contacto.alias}</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>{contacto.nombre}</p>
                  </div>
                </div>

                <div className="contact-meta" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f5f5f5', fontSize: '0.85rem' }}>
                  <p style={{ margin: '3px 0' }}><strong>📧 Correo:</strong> {contacto.email}</p>
                  <p style={{ margin: '3px 0' }}><strong>📱 Registro:</strong> {contacto.tel}</p>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  {/* AL DAR CLIC, LLEVAMOS AL USUARIO A SUBIR, PERO PODEMOS PASAR EL ID DEL DESTINATARIO */}
                  <button 
                    className="btn btn-primary" 
                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem' }}
                    onClick={() => navigate(`/subir-archivo?to=${contacto.id}`)}
                  >
                    🚀 Enviar Archivo
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: '0.6rem' }}
                    title="Quitar de mi lista"
                    onClick={() => eliminarAmigo(contacto.id)}
                  >
                    🗑️
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL PARA BUSCAR Y AGREGAR (ESTILO TEAMS) */}
      {showModalBusqueda && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
          <div className="auth-card" style={{ width: '450px', padding: '2rem', backgroundColor: 'white', borderRadius: '15px' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>Añadir por Directorio</h2>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              Ingresa el correo institucional del usuario que deseas agregar a tu red segura.
            </p>
            
            <form onSubmit={agregarAmigoPorEmail}>
              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔍</span>
                  <input 
                    type="email" 
                    className="form-control-modern" 
                    placeholder="usuario@escom.ipn.mx" 
                    required
                    value={busquedaGlobal}
                    onChange={(e) => setBusquedaGlobal(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Agregar a mi red</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModalBusqueda(false)} style={{ flex: 1 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PrivateLayout>
  )
}