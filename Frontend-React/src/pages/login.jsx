import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

// 1. Simulamos tus validadores
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const isValidPassword = (password) => password.trim().length >= 6;

// 2. Simulamos tu servicio de autenticación
const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@demo.com" && password === "123456") {
        resolve({ success: true, user: { name: "Administrador", email: "admin@demo.com" } });
      } else {
        reject({ success: false, message: "Correo o contraseña incorrectos" });
      }
    }, 800);
  });
};

export default function Login() {
  const navigate = useNavigate(); // Hook para redirigir de página
  
  // Estados para guardar lo que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para mostrar mensajes
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función que se ejecuta al darle "Iniciar Sesión"
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiamos mensajes previos
    setEmailError('');
    setPasswordError('');
    setFormMessage('');
    setIsSuccess(false);

    let isFormValid = true;

    if (!isValidEmail(email)) {
      setEmailError("Ingresa un correo electrónico válido.");
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
      const response = await loginUser(email, password);
      setFormMessage(`Bienvenido, ${response.user.name}. Redirigiendo...`);
      setIsSuccess(true);

      // Redirigir al dashboard después de 1 segundo
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
            
            {/* Ícono de usuario (hecho con CSS) */}
            <div className="user-icon" aria-hidden="true">
              <div className="icon-head"></div>
              <div className="icon-body"></div>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="email" 
                  placeholder="Correo Electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                {emailError && <p className="error-text">{emailError}</p>}
              </div>
              
              <div>
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                {passwordError && <p className="error-text">{passwordError}</p>}
              </div>

              {/* Mensaje general del formulario */}
              {formMessage && (
                <p style={{
                  color: isSuccess ? '#52c41a' : (isLoading ? 'var(--color-dark)' : '#ff4d4f'),
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  {formMessage}
                </p>
              )}

              <div className="login-buttons">
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