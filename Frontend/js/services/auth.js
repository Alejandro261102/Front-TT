export async function loginUser(email, password) {
  // Simulación de login
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@demo.com" && password === "123456") {
        resolve({
          success: true,
          user: {
            name: "Administrador",
            email: "admin@demo.com"
          }
        });
      } else {
        reject({
          success: false,
          message: "Correo o contraseña incorrectos"
        });
      }
    }, 800);
  });
}