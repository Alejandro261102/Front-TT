import React from 'react'

// Reutilizamos las funciones de seguridad para que el modal también las muestre
const getSecurityBadge = (status) => {
  if (status === 'password') return <span title="Bloqueado con contraseña" style={{ fontSize: '1.2rem', marginRight: '6px' }}>🔒</span>;
  if (status === 'encrypted') return <span title="Cifrado de alto nivel" style={{ fontSize: '1.2rem', marginRight: '6px' }}>🛡️</span>;
  return null;
}

const getSecurityText = (status) => {
  if (status === 'password') return 'Protegido con contraseña';
  if (status === 'encrypted') return 'Cifrado de extremo a extremo';
  return 'Público / Estándar';
}

export default function DetallesModal({ elemento, onClose }) {
  // Si no hay elemento seleccionado, no renderizamos nada
  if (!elemento) return null;

  // Función para cerrar el modal si el usuario hace clic afuera de la caja blanca
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  }

  // Normalizamos algunos datos porque dependiendo de la vista a veces se llama "size", "info" o "fileCount"
  const tamanoOContenido = elemento.info || elemento.size || (elemento.fileCount ? `${elemento.fileCount} archivos` : '--');
  const fecha = elemento.date || elemento.lastModified || elemento.createdAt || '--';
  const propietario = elemento.owner || 'Alejandro (Tú)';
  const esCarpeta = elemento.type === 'folder' || !elemento.size; // Inferencia simple de tipo

  return (
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, // Para que aparezca por encima de TODO
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(3px)' // Efecto visual moderno
      }} 
      onClick={handleOverlayClick}
    >
      <div style={{
        backgroundColor: 'var(--color-white)', borderRadius: '16px',
        width: '90%', maxWidth: '450px', padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        {/* Botón de cerrar (X) */}
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-medium)' }}
        >
          ×
        </button>

        {/* Cabecera del Modal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #eaeaea', paddingBottom: '16px', marginBottom: '16px' }}>
          <span style={{ fontSize: '3rem' }}>{elemento.icon}</span>
          <div>
            <h3 style={{ margin: 0, color: 'var(--color-dark)', display: 'flex', alignItems: 'center', fontSize: '1.2rem', wordBreak: 'break-word' }}>
              {getSecurityBadge(elemento.security)} {elemento.name}
            </h3>
            <p style={{ margin: '4px 0 0 0', color: 'var(--color-medium-dark)', fontSize: '0.9rem' }}>
              {esCarpeta ? 'Carpeta' : 'Archivo'}
            </p>
          </div>
        </div>

        {/* Lista de Detalles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', color: 'var(--color-dark)', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Nivel de Seguridad:</strong>
            <span style={{ 
              color: elemento.security && elemento.security !== 'public' ? '#28a745' : 'var(--color-medium-dark)', 
              fontWeight: elemento.security && elemento.security !== 'public' ? 'bold' : 'normal',
              textAlign: 'right'
            }}>
              {getSecurityText(elemento.security || 'public')}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Tamaño / Contenido:</strong> <span>{tamanoOContenido}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Propietario:</strong> <span>{propietario}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>Fecha de modificación:</strong> <span>{fecha}</span>
          </div>
        </div>

        {/* Botones de Acción Rápida */}
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" style={{ padding: '8px 16px' }} onClick={() => alert('Abriendo menú de compartir...')}>
            Compartir
          </button>
          {!esCarpeta && (
            <button className="btn btn-primary" style={{ padding: '8px 16px' }} onClick={() => alert('Descargando archivo...')}>
              Descargar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}