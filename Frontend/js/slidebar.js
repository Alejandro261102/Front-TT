document.addEventListener("DOMContentLoaded", () => {
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const appSidebar = document.getElementById("appSidebar");
  const appOverlay = document.getElementById("appOverlay");

  if (!menuToggleBtn || !appSidebar || !appOverlay) return;

  const openSidebar = () => {
    appSidebar.classList.add("is-open");
    appOverlay.classList.add("is-visible");
    document.body.classList.add("no-scroll");
  };

  const closeSidebar = () => {
    appSidebar.classList.remove("is-open");
    appOverlay.classList.remove("is-visible");
    document.body.classList.remove("no-scroll");
  };

  menuToggleBtn.addEventListener("click", openSidebar);

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", closeSidebar);
  }

  appOverlay.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
});