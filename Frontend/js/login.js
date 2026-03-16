import { isValidEmail, isValidPassword } from "./utils/validators.js";
import { loginUser } from "./services/auth.js";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  clearMessages();

  const email = emailInput.value;
  const password = passwordInput.value;

  let isFormValid = true;

  if (!isValidEmail(email)) {
    emailError.textContent = "Ingresa un correo electrónico válido.";
    isFormValid = false;
  }

  if (!isValidPassword(password)) {
    passwordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
    isFormValid = false;
  }

  if (!isFormValid) return;

  formMessage.textContent = "Validando credenciales...";

  try {
    const response = await loginUser(email, password);

    formMessage.textContent = `Bienvenido, ${response.user.name}.`;
    formMessage.style.color = "var(--color-success)";

    // Aquí luego podrías redirigir:
    // window.location.href = "../pages/dashboard.html";
  } catch (error) {
    formMessage.textContent = error.message || "Ocurrió un error al iniciar sesión.";
    formMessage.style.color = "var(--color-error)";
  }
});

function clearMessages() {
  emailError.textContent = "";
  passwordError.textContent = "";
  formMessage.textContent = "";
  formMessage.style.color = "var(--color-text)";
}