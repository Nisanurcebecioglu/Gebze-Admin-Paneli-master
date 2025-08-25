function toggleMenu(button) {
  const menu = button.nextElementSibling;
  const allMenus = document.querySelectorAll(".islem-menu");

  allMenus.forEach((m) => {
    if (m !== menu) m.style.display = "none";
  });

  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
// Örnek fonksiyonlar

function toggleDropdown(btn) {
  const menu = btn.nextElementSibling;

  // Diğer tüm açık menüleri kapat
  document.querySelectorAll(".dropdown-menu").forEach((el) => {
    if (el !== menu) el.style.display = "none";
  });

  // Tıklanan menüyü aç/kapat
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
// Sayfa dışında bir yere tıklanınca menü kapanır
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown-container")) {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((el) => (el.style.display = "none"));
  }
});
