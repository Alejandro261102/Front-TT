import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

// 1. Validadores actualizados
// Acepta formato de email O un nombre de usuario (letras, números, guiones bajos, 3-20 caracteres)
const isValidIdentifier = (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return emailRegex.test(val.trim()) || userRegex.test(val.trim());
};
const isValidPassword = (password) => password.trim().length >= 6;

// 2. Servicio de autenticación simulado
const loginUser = async (identificador, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulación: acepta "admin@demo.com" O "admin_user" con la misma clave
      const credencialesCorrectas = (identificador === "admin@demo.com" || identificador === "admin_user");
      
      if (credencialesCorrectas && password === "123456") {
        resolve({ success: true, user: { name: "Administrador", email: "admin@demo.com" } });
      } else {
        reject({ success: false, message: "Usuario/Correo o contraseña incorrectos" });
      }
    }, 800);
  });
};

export default function Login() {
  const navigate = useNavigate();
  
  // Usamos un solo estado para ambos casos
  const [identificador, setIdentificador] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorIdentificador, setErrorIdentificador] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorIdentificador('');
    setPasswordError('');
    setFormMessage('');
    setIsSuccess(false);

    let isFormValid = true;

    if (!isValidIdentifier(identificador)) {
      setErrorIdentificador("Ingresa un correo o nombre de usuario válido.");
      isFormValid = false;
    }

    if (!isValidPassword(password)) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      isFormValid = false;
    }

    if (!isFormValid) return;

    setFormMessage("Validando credenciales...");
    setIsLoading(true);

    try {
      const response = await loginUser(identificador, password);
      setFormMessage(`Bienvenido, ${response.user.name}. Redirigiendo...`);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      setFormMessage(error.message || "Ocurrió un error al iniciar sesión.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />

      <main className="login-main">
        <section className="login-section">
          <div className="login-card">
            
            <div className="user-icon" aria-hidden="true">
              <div className="icon-head"></div>
              <div className="icon-body"></div>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {/* CAMPO UNIFICADO */}
              <div>
                <input 
                  type="text" // Cambiado a text para permitir username
                  placeholder="Correo o Nombre de Usuario" 
                  value={identificador}
                  onChange={(e) => setIdentificador(e.target.value)}
                  disabled={isLoading}
                />
                {errorIdentificador && <p className="error-text">{errorIdentificador}</p>}
              </div>
              
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                {passwordError && <p className="error-text">{passwordError}</p>}
                
                <div style={{ textAlign: 'right', marginTop: '8px' }}>
                  <Link 
                    to="/recuperacion-contrasena" 
                    style={{ 
                      fontSize: '0.85rem', 
                      color: 'var(--color-primary)', 
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              {formMessage && (
                <p style={{
                  color: isSuccess ? '#52c41a' : (isLoading ? 'var(--color-dark)' : '#ff4d4f'),
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: '15px'
                }}>
                  {formMessage}
                </p>
              )}

              <div className="login-buttons" style={{ marginTop: '20px' }}>
                <button type="submit" disabled={isLoading} style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>
                  {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
                <Link to="/registro" className="btn-secondary" style={{ display: 'inline-block' }}>
                  ¡Registrarse!
                </Link>
              </div>
            </form>

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}