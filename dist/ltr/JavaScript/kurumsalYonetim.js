function ekle() {
  Swal.fire({
    title: "Bir kategori seçin",
    input: "select",
    inputOptions: {
      baskan: "Başkan",
      yardimcilar: "Başkan Yardımcıları",
      danismanlar: "Başkan Danışmanları",
      mudurlukler: "Müdürlükler",
      meclis: "Belediye Meclisi",
      sema: "Yönetim Şeması",
      eskiler: "Eski Başkanlar",
    },
    inputPlaceholder: "Seçin...",
    showCancelButton: true,
    confirmButtonText: "Git",
    cancelButtonText: "İptal",
    preConfirm: (value) => {
      if (!value) {
        Swal.showValidationMessage("Bir seçenek seçmelisiniz");
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      let secim = result.value;
      let url = "";

      switch (secim) {
        case "baskan":
          url = "duzenle.html";
          break;
        case "yardimcilar":
          url = "yardimciDuzenle.html";
          break;
        case "danismanlar":
          url = "danismanDuzenle.html";
          break;
        case "mudurlukler":
          url = "mudurluklerDuzenle.html";
          break;
        case "meclis":
          url = "meclisDuzenle.html";
          break;
        case "sema":
          url = "yonetimSemasiDuzenle.html";
          break;
        case "eskiler":
          url = "eskiBaskanlar.html";
          break;
        default:
          return;
      }

      window.location.href = url;
    }
  });
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

function arsivle() {
  const checkboxes = document.querySelectorAll(".checkbox-item");
  let herhangiBiriSecili = false;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      herhangiBiriSecili = true;

      const row = checkbox.closest("tr");
      const durumHucresi = row.querySelectorAll("td, th")[3];
      const durumSpan = durumHucresi.querySelector("span");

      if (durumSpan.textContent.trim() === "Arşivlendi") {
        // Arşivden çıkar
        durumSpan.textContent = "Aktif";
      } else {
        // Arşivle
        durumSpan.textContent = "Arşivlendi";
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

function remove(btn) {
  if (btn) {
    const row = btn.closest("tr");
    row.parentNode.removeChild(row);
  }
}

function archive(btn) {
  event.stopPropagation();

  if (!btn) return;

  const row = btn.closest("tr");
  const durumHucresi = row.querySelectorAll("td, th")[3];
  const durumSpan = durumHucresi.querySelector("span");
  const butonSpan = btn.querySelector("span");

  const suankiDurum = durumSpan.textContent.trim();

  if (suankiDurum === "Arşivlendi") {
    // Arşivden çıkar
    durumSpan.textContent = "Aktif";
    if (butonSpan) butonSpan.textContent = "Arşivle";
  } else {
    // Arşivle
    durumSpan.textContent = "Arşivlendi";
    if (butonSpan) butonSpan.textContent = "Çıkar";
  }
}
function arsivdenCikar() {
  const checkboxes = document.querySelectorAll(".checkbox-item");
  let seciliVar = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      seciliVar = true;
      const durumSpan = checkbox.closest("tr").querySelector("td span.durum");
      durumSpan.textContent = "Aktif";
      durumSpan.classList.remove("badge-danger");
      durumSpan.classList.add("badge-success");
    }
  });
  if (!seciliVar) Swal.fire("İçerik Seçilmedi", "Lütfen arşivden çıkarmak için en az bir içerik seçin.", "info");
}


// Ana checkboxa tıklandığında tüm checkboxların durumunu değiştirme
const checkboxes = document.querySelectorAll(".checkbox-item");
const anaCheckbox = document.getElementById("ana-checkbox");
anaCheckbox.addEventListener("change", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = anaCheckbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  });
});

let satirNumarasi = 7;

function toggleMenu(button) {
  const menu = button.nextElementSibling;
  const allMenus = document.querySelectorAll(".islem-menu");

  allMenus.forEach((m) => {
    if (m !== menu) m.style.display = "none";
  });

  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function toggleDropdown(btn) {
  const menu = btn.nextElementSibling;

  document.querySelectorAll(".dropdown-menu").forEach((el) => {
    if (el !== menu) el.style.display = "none";
  });

  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown-container")) {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((el) => (el.style.display = "none"));
  }
});
