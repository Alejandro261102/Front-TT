import React, { useState } from 'react'
import PrivateLayout from '../components/PrivateLayout'

export default function ContactosUsuario() {
  // 1. ESTADOS: Datos, búsqueda y visibilidad del formulario
  const [contactos, setContactos] = useState([
    { id: 1, nombre: 'Héctor Alejandro', email: 'hector.aranda@ejemplo.com', tel: '5512345678', iniciales: 'HA' },
    { id: 2, nombre: 'Antonio de Jesús', email: 'antonio.dominguez@ejemplo.com', tel: '5587654321', iniciales: 'AD' },
    { id: 3, nombre: 'Tania Rodríguez', email: 'tania.sarabia@escom.ipn', tel: '5500112233', iniciales: 'TR' },
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nuevoContacto, setNuevoContacto] = useState({ nombre: '', email: '', tel: '' });

  // 2. LÓGICA DE BÚSQUEDA
  const contactosFiltrados = contactos.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.tel.includes(busqueda)
  );

  // 3. AGREGAR CONTACTO
  const handleAddContacto = (e) => {
    e.preventDefault();
    const iniciales = nuevoContacto.nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const id = contactos.length + 1;
    setContactos([...contactos, { ...nuevoContacto, id, iniciales }]);
    setShowModal(false); // Cerrar modal
    setNuevoContacto({ nombre: '', email: '', tel: '' }); // Limpiar
  };

  // 4. ELIMINAR CONTACTO
  const eliminarContacto = (id) => {
    if(window.confirm('¿Estás seguro de eliminar este contacto?')) {
      setContactos(contactos.filter(c => c.id !== id));
    }
  };

  return (
    <PrivateLayout>
      <main className="contacts-page section">
        <div className="container">
          <header className="section-heading">
            <span className="section-badge">Directorio Seguro</span>
            <h1>Mis Contactos</h1>
            <p>Gestiona tus contactos frecuentes para realizar transferencias rápidas y seguras.</p>
          </header>

          {/* Barra de Búsqueda Mejorada */}
          <section className="search-section" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
            <div className="auth-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Buscar por nombre, correo o teléfono..." 
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>
              <button className="btn btn-secondary">🔍 Buscar</button>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Añadir Contacto</button>
            </div>
          </section>

          {/* Grilla de Contactos */}
          <div className="contacts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {contactosFiltrados.map((contacto) => (
              <article key={contacto.id} className="benefit-box shadow-sm" style={{ textAlign: 'left', padding: '1.5rem', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ 
                    width: '50px', height: '50px', backgroundColor: 'var(--accent-color, #C13676)', 
                    color: 'white', borderRadius: '50%', display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
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
                  <button className="btn-icon" onClick={() => eliminarContacto(contacto.id)}>🗑️</button>
                  <button className="btn-icon" title="Editar">⚙️</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* --- MODAL PARA AÑADIR CONTACTO --- */}
      {showModal && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
        }}>
          <div className="auth-card" style={{ width: '400px', padding: '2rem', backgroundColor: 'white' }}>
            <h2>Nuevo Contacto</h2>
            <form onSubmit={handleAddContacto} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input 
                type="text" placeholder="Nombre completo" required
                value={nuevoContacto.nombre}
                onChange={(e) => setNuevoContacto({...nuevoContacto, nombre: e.target.value})}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input 
                type="email" placeholder="Correo electrónico" required
                value={nuevoContacto.email}
                onChange={(e) => setNuevoContacto({...nuevoContacto, email: e.target.value})}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input 
                type="tel" placeholder="Teléfono" required
                value={nuevoContacto.tel}
                onChange={(e) => setNuevoContacto({...nuevoContacto, tel: e.target.value})}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PrivateLayout>
  )
}