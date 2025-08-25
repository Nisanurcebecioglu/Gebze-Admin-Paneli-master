const cardHTML = `
  <div class="d-flex flex-wrap gap-5 justify-content-center">

        <!-- 📷 Resim Yükleme Kartı (1/4) -->
        <div class="card"
            style="flex: 1; max-width: 25%; box-shadow: 0 4px 10px rgba(56, 119, 255, 0.948); margin-right: 25px;">
            <div id="imageContainer" class="d-flex align-items-center justify-content-center bg-light border-bottom"
              style="height: 250px;">
              <img id="previewImage" src="" alt="Resim Önizleme"
                style="max-height: 100%; max-width: 100%; display: none;">
              <span id="placeholderText" class="text-muted">Henüz resim yüklenmedi</span>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">Resim Yükle</h5>
              <input type="file" id="imageInput" accept="image/*" style="display: none;">
              <button type="button" class="btn btn-outline-primary" id="customButton">Resim Seç</button>
            </div>
          </div>

        <!-- 📝 Metin Giriş Kartı (3/4) -->
        <div class="card" style="flex: 3; max-width: 73%; box-shadow: 0 4px 10px rgba(56, 119, 255, 0.948);">
            <div class="card-body">
              <h5 class="card-title">Biyografi</h5>

              <div class="mb-3">
                <label for="textInput" class="form-label">Başlık</label>
                <input type="text" class="form-control" id="textInput" placeholder="Bir başlık gir...">
              </div>

              <div class="mb-3">
                <label for="textArea" class="form-label">Açıklama</label>
                <textarea class="form-control" id="textArea" rows="6" placeholder="Detayları buraya yaz..."></textarea>
              </div>

              <button class="btn btn-outline-primary">Kaydet</button>
            </div>
          </div>
        </div>

  `;

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

// Ana checkboxa tıklandığında tüm checkboxların durumunu değiştirme
const checkboxes = document.querySelectorAll(".checkbox-item");
const anaCheckbox = document.getElementById("ana-checkbox");
anaCheckbox.addEventListener("change", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = anaCheckbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  });
});

function filtrele(kategori) {
  const satirlar = document.querySelectorAll("#icerikTablosu tbody tr");

  satirlar.forEach((satir) => {
    // Eğer kategori "tum" ise hepsini göster
    if (kategori === "tum" || satir.classList.contains(kategori)) {
      satir.style.display = "table-row";
    } else {
      satir.style.display = "none";
    }
  });

  // Aktif butonları güncelle
  document.querySelectorAll("#kategoriButonlari button").forEach((buton) => {
    buton.classList.remove("active");
  });

  const aktifButon = document.querySelector(
    `#kategoriButonlari button[onclick="filtrele('${kategori}')"]`
  );
  if (aktifButon) {
    aktifButon.classList.add("active");
  }
}

// Sayfa yüklendiğinde TÜM içerikler gösterilsin
window.onload = function () {
  filtrele("tum");
};

function filtreleKategori(kategori) {
  const satirlar = document.querySelectorAll("#icerikTablosu tbody tr");

  satirlar.forEach((satir) => {
    const kategoriHucre = satir.querySelector("td:nth-child(3)");
    const kategoriMetin = kategoriHucre?.innerText.trim();

    if (kategori === "Hepsi" || kategoriMetin === kategori) {
      satir.style.display = "";
    } else {
      satir.style.display = "none";
    }
  });
}

// Kategori filtreleme fonksiyonu
function filtreleKategoriler(secilenKategoriler) {
  const satirlar = document.querySelectorAll("#icerikTablosu tbody tr");

  satirlar.forEach((satir) => {
    const kategori = satir.getAttribute("data-kategori") || satir.className;

    if (
      secilenKategoriler.length === 0 ||
      secilenKategoriler.includes(kategori)
    ) {
      satir.style.display = "table-row";
    } else {
      satir.style.display = "none";
    }
  });
}

// Uygula butonuna tıklandığında seçili checkbox'lara göre filtreleme yapar onların içeriğini ekrana getirir
document.querySelectorAll(".btn-uygula").forEach((btn) => {
  btn.addEventListener("click", function () {
    const secilenler = Array.from(
      document.querySelectorAll(".checkbox-item:checked")
    ).map((cb) => cb.getAttribute("data-kategori"));

    filtreleKategoriler(secilenler);
  });
});

// Sil butonu tüm checkbox'ları temizler.
document.querySelectorAll(".btn-sil").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".checkbox-item").forEach((cb) => {
      cb.checked = false;
    });

    // Tüm satırları geri göster
    filtreleKategoriler([]);
  });
});

// <!-- Hizmet Noktaları Düzenleme -->

function hizmetNoktalari(nav, name, category) {
  let content = document.getElementById("icerikler");

  content.innerHTML = `<div class="container mt-5">
                <div
                  class="card"
                  style="box-shadow: 3px 3px 10px rgba(100, 100, 100, 0.738);"
                >




                  <!-- DHNDüzenleme(Diğer Hİzmet Noktaları Düzenleme) sayfası  -->
                  <div class="DHNDüzenle">

                      <form id="editDigerHizmetNoktalariForm">
                      <div class="mb-3">
                        <label for="title" class="form-label">Konum Linki</label>
                        <input
                          type="text"
                          class="form-control"
                          ;
                          "
                          id="nav"
                          value="${nav}"

                          required
                        />
                      </div>
                  <div class="mb-5">
                    <form id="editDigerHizmetNoktalariForm">
                      <div class="mb-3">
                        <label for="title" class="form-label" >İsim</label>
                        <input
                          type="text"
                          class="form-control"
                          id="nav"
                          value="${name}"

                          required
                        />
                      </div>
                    <!-- DhnCategory= diğer hizmet noktaları kategorisi -->
                    <div class="DhnCategory">
                    <form id="editDigerHizmetNoktalariForm">
                      <div class="mb-3">
                        <label for="title" class="form-label" >Kategori</label>
                        <input
                          type="text"
                          class="form-control"
                          id="nav"
                          value="${category}"

                          required
                        />
                      </div>


                      <button type="button" class="btn btn-success" id="guncelleBtn">
                        Güncelle
                      </button>
                      <a href="digerHizmetNoktalari.html" class="btn btn-secondary">İptal</a>
                    </form>
                  </div>
                </div>
              </div>`;

  if (category === "Amirlikler") {
    document.getElementById("amirlikler").selected = true;
  }
  if (category === "Kültür ve Sanat Merkezleri") {
    document.getElementById("kültürel").selected = true;
  }
  if (category === "Sosyal Tesisler") {
    document.getElementById("sosyal").selected = true;
  }
  if (category === "Eğitim") {
    document.getElementById("eğitim").selected = true;
  }
  if (category === "Diğer") {
    document.getElementById("diger").selected = true;
  }
}
