import PrivateLayout from '../components/PrivateLayout'

export default function Carpetas() {
  return (
    <PrivateLayout>
      {/* Cabecera de la página */}
      <section className="section-top" style={{ marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Mis carpetas</h1>
          <p style={{ color: 'var(--color-medium-dark)' }}>
            Organiza, consulta y administra tus carpetas en un solo lugar.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary">Ordenar</button>
          <button className="btn btn-primary">+ Nueva carpeta</button>
        </div>
      </section>

      {/* Tarjetas de Resumen */}
      <section className="stats-grid">
        <article className="stat-card">
          <span style={{ color: 'var(--color-medium-dark)', fontWeight: '600' }}>Total de carpetas</span>
          <p className="stat-number">12</p>
        </article>

        <article className="stat-card">
          <span style={{ color: 'var(--color-medium-dark)', fontWeight: '600' }}>Compartidas</span>
          <p className="stat-number">4</p>
        </article>

        <article className="stat-card">
          <span style={{ color: 'var(--color-medium-dark)', fontWeight: '600' }}>Favoritas</span>
          <p className="stat-number">3</p>
        </article>
      </section>

      {/* Cuadrícula de Carpetas */}
      <section style={{ marginTop: '36px' }}>
        <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontSize: '1.5rem' }}>
          Carpetas disponibles
        </h2>

        <div className="cards-grid">
          {/* Carpeta 1 */}
          <article className="folder-card">
            <div className="folder-card-top">
              <span className="folder-icon">📁</span>
              <button className="card-menu-btn">⋮</button>
            </div>
            <div className="folder-card-body">
              <h3>Documentos personales</h3>
              <p>12 archivos</p>
              <small>Última modificación: Hoy</small>
            </div>
          </article>

          {/* Carpeta 2 */}
          <article className="folder-card">
            <div className="folder-card-top">
              <span className="folder-icon">📁</span>
              <button className="card-menu-btn">⋮</button>
            </div>
            <div className="folder-card-body">
              <h3>Proyecto terminal</h3>
              <p>8 archivos</p>
              <small>Última modificación: Ayer</small>
            </div>
          </article>

          {/* Carpeta 3 */}
          <article className="folder-card">
            <div className="folder-card-top">
              <span className="folder-icon">📁</span>
              <button className="card-menu-btn">⋮</button>
            </div>
            <div className="folder-card-body">
              <h3>Fotos</h3>
              <p>25 archivos</p>
              <small>Última modificación: Hace 3 días</small>
            </div>
          </article>

          {/* Carpeta 4 */}
          <article className="folder-card">
            <div className="folder-card-top">
              <span className="folder-icon">📁</span>
              <button className="card-menu-btn">⋮</button>
            </div>
            <div className="folder-card-body">
              <h3>Compartidos con equipo</h3>
              <p>10 archivos</p>
              <small>Última modificación: Hoy</small>
            </div>
          </article>

          {/* Carpeta 5 */}
          <article className="folder-card">
            <div className="folder-card-top">
              <span className="folder-icon">📁</span>
              <button className="card-menu-btn">⋮</button>
            </div>
            <div className="folder-card-body">
              <h3>Respaldos</h3>
              <p>6 archivos</p>
              <small>Última modificación: Hace 1 semana</small>
            </div>
          </article>

          {/* Carpeta 6 */}
          <article className="folder-card">
            <div className="folder-card-top">
              <span className="folder-icon">📁</span>
              <button className="card-menu-btn">⋮</button>
            </div>
            <div className="folder-card-body">
              <h3>Tareas escolares</h3>
              <p>14 archivos</p>
              <small>Última modificación: Hace 2 días</small>
            </div>
          </article>
        </div>
      </section>
    </PrivateLayout>
  )
}