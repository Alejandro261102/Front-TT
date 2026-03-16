document.addEventListener("DOMContentLoaded", () => {
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const appSidebar = document.getElementById("appSidebar");
  const appOverlay = document.getElementById("appOverlay");

  if (!menuToggleBtn || !appSidebar || !appOverlay) {
    console.error("Faltan elementos del sidebar en el HTML.");
    return;
  }

  // Función para abrir/cerrar el menú (Toggle)
  const toggleSidebar = () => {
    const isOpen = appSidebar.classList.contains("is-open");
    
    if (isOpen) {
      // Cerrar
      appSidebar.classList.remove("is-open");
      appOverlay.classList.remove("is-visible");
      document.body.classList.remove("no-scroll");
    } else {
      // Abrir
      appSidebar.classList.add("is-open");
      appOverlay.classList.add("is-visible");
      document.body.classList.add("no-scroll");
    }
  };

  // Función forzada para cerrar (útil para clics fuera del menú)
  const closeSidebar = () => {
    appSidebar.classList.remove("is-open");
    appOverlay.classList.remove("is-visible");
    document.body.classList.remove("no-scroll");
  };

  // 1. Clic en el botón del header (Abre o cierra)
  menuToggleBtn.addEventListener("click", toggleSidebar);
  
  // 2. Clic en la "X" dentro del menú (Cierra)
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", closeSidebar);
  }

  // 3. Clic en lo oscuro/opaco fuera del menú (Cierra)
  appOverlay.addEventListener("click", closeSidebar);

  // 4. Clic en la tecla Escape del teclado (Cierra)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
});