import PrivateLayout from '../components/PrivateLayout'

export default function Dashboard() {
  return (
    <PrivateLayout>
      <section className="section-top">
        <div>
          <h1>Bienvenido, Alejandro</h1>
          <p>Aquí puedes consultar tus archivos recientes, carpetas principales y accesos rápidos.</p>
        </div>
        <button className="btn btn-primary">+ Subir archivo</button>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <h3>Archivos totales</h3>
          <p className="stat-number">128</p>
        </article>
        <article className="stat-card">
          <h3>Carpetas</h3>
          <p className="stat-number">16</p>
        </article>
        <article className="stat-card">
          <h3>Compartidos</h3>
          <p className="stat-number">24</p>
        </article>
        <article className="stat-card">
          <h3>En papelera</h3>
          <p className="stat-number">5</p>
        </article>
      </section>
      
      {/* Aquí podrías agregar tus grids de tarjetas recientes y carpetas principales */}
    </PrivateLayout>
  )
}