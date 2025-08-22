// Buton Fonksiyonları
function ekle() {
  alert("Ekleme sayfasına yönlendiriliyor...");
}

function sil() {
  const checkboxes = document.querySelectorAll(".checkbox-item");
  let seciliVar = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      seciliVar = true;
      const row = checkbox.closest("tr");
      row.parentNode.removeChild(row);
    }
  });
  if (!seciliVar) {
    Swal.fire({
      icon: "info",
      title: "Hiç Seçim Yok",
      text: "Lütfen silmek için en az bir içerik seçin.",
      confirmButtonText: "Tamam",
      customClass: {
        popup: "rounded-3",
        confirmButton: "btn btn-primary",
      },
    });
  }
}

// Tekli Arşivleme Butonu
function archive(btn) {
  if (!btn) return;

  const row = btn.closest("tr");
  const durumHucresi = row.querySelectorAll("td, th")[3];
  const durumSpan = durumHucresi.querySelector("span");

  const suankiDurum = durumSpan.textContent.trim();

  if (suankiDurum === "Arşivlendi") {
    // Arşivden çıkar
    durumSpan.textContent = "Aktif";
    btn.textContent = "Arşivle";
  } else {
    // Arşivle
    durumSpan.textContent = "Arşivlendi";
    btn.textContent = "Çıkar";
  }
}

// Tekli Silme Butonu
function remove(btn) {
  if (btn) {
    const row = btn.closest("tr");
    row.parentNode.removeChild(row);
  }
}

// Çoklu Arşivleme Butonu
function arsivle() {
  const checkboxes = document.querySelectorAll(".checkbox-item");
  let herhangiBiriSecili = false;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      herhangiBiriSecili = true;

      // Satırı bul
      const row = checkbox.closest("tr");
      // Durum hücresini bul (4. sütun yani index 3)
      const durumHucresi = row.querySelectorAll("td, th")[3];
      const durumSpan = durumHucresi.querySelector("span");

      if (durumSpan.textContent.trim() !== "Arşivlendi") {
        durumSpan.textContent = "Arşivlendi";
      } else if (durumSpan.textContent.trim() === "Arşivlendi") {
        Swal.fire({
          icon: "info",
          title: "Zaten Arşivlenmiş",
          text: "Seçtiğiniz liste elemanlarından bazıları veya hepsi zaten arşivlenmiş",
          confirmButtonText: "Tamam",
          customClass: {
            popup: "rounded-3",
            confirmButton: "btn btn-primary",
          },
        });
      }
    }
  });

  if (!herhangiBiriSecili) {
    Swal.fire({
      icon: "info",
      title: "İçerik Seçilmedi",
      text: "Lütfen arşivlemek için en az bir içerik seçin.",
      confirmButtonText: "Tamam",
      customClass: {
        popup: "rounded-3",
        confirmButton: "btn btn-primary",
      },
    });
  }
}

function toggleDropdown(btn) {
  const menu = btn.nextElementSibling;

  // Diğer tüm açık menüleri kapat
  document.querySelectorAll(".dropdown-menu").forEach((el) => {
    if (el !== menu) el.style.display = "none";
  });

  // Tıklanan menüyü aç/kapat
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleMenu(button) {
  const menu = button.nextElementSibling;
  const allMenus = document.querySelectorAll(".islem-menu");

  allMenus.forEach((m) => {
    if (m !== menu) m.style.display = "none";
  });

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
