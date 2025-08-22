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
function remove(btn) {
  if (btn) {
    const row = btn.closest("tr");
    row.parentNode.removeChild(row);
  }
}
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
function archive(btn) {
  console.log("Archive fonksiyonu çağrıldı! (Vizyon Misyon İlke)");

  // Dropdown menüsünün kapanmasını engelle
  event.stopPropagation();

  if (!btn) {
    console.log("Btn parametresi boş!");
    return;
  }

  console.log("Btn elementi:", btn);
  console.log("Btn HTML:", btn.outerHTML);

  const row = btn.closest("tr");
  console.log("Row elementi:", row);

  const durumHucresi = row.querySelectorAll("td, th")[3];
  console.log("Durum hücresi:", durumHucresi);

  const durumSpan = durumHucresi.querySelector("span");
  console.log("Durum span:", durumSpan);

  const butonSpan = btn.querySelector("span");
  console.log("Buton span:", butonSpan);

  const suankiDurum = durumSpan.textContent.trim();
  const butonMetni = butonSpan ? butonSpan.textContent.trim() : "";

  console.log("Mevcut durum:", suankiDurum);
  console.log("Buton metni:", butonMetni);

  // Durum ve buton metnini kontrol ederek doğru işlemi yap
  if (suankiDurum === "Arşivlendi" || butonMetni === "Çıkar") {
    // Arşivden çıkar
    console.log("Arşivden çıkarılıyor...");
    durumSpan.textContent = "Aktif";
    if (butonSpan) {
      butonSpan.textContent = "Arşivle";
      console.log("Buton metni 'Arşivle' olarak değiştirildi");
      console.log("Buton span yeni içerik:", butonSpan.textContent);
    }
  } else {
    // Arşivle
    console.log("Arşivleniyor...");
    durumSpan.textContent = "Arşivlendi";
    if (butonSpan) {
      butonSpan.textContent = "Çıkar";
      console.log("Buton metni 'Çıkar' olarak değiştirildi");
      console.log("Buton span yeni içerik:", butonSpan.textContent);
    }
  }
}

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

// Burada herhangi bir checkbox seçildiğinde Arşivle ve Sil butonlarının display özelliğini none olmaktan çıkaracağız.
const checkboxes = document.querySelectorAll(".checkbox-item");
// Ana checkboxa tıklandığında tüm checkboxların durumunu değiştirme
const anaCheckbox = document.getElementById("ana-checkbox");
anaCheckbox.addEventListener("change", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = anaCheckbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  });
});
