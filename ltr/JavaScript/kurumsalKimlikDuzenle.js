// Açılır menüyü açıp kapatma
function toggleDropdown(btn) {
  const menu = btn.nextElementSibling;
  document.querySelectorAll(".dropdown-menu").forEach((el) => {
    if (el !== menu) el.style.display = "none";
  });
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Tablo görünümüne geri dönme
function geriDon() {
  location.reload(); // Sayfayı yenileyerek tabloyu geri yükler
}

// Yeni yayın ekleme ve düzenleme formunu açma
function ekle() {
  const icerikDiv = document.getElementById("icerikler");
  document.getElementById("nav").innerHTML = ``;
  // Formu göster (duzenle ile aynı)
  icerikDiv.innerHTML = `
                  <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1)">
                    <h4>Yeni Yayın Ekle</h4><br>
                    <h5>Başlık</h5>
                    <input type="text" id="baslik" placeholder="Yayın başlığını girin" style="width: 100%; padding: 8px;"/> <br><br>
                    <input type="file" id="pdfDosya" accept="application/pdf" style="margin-bottom: 20px" /> <br><br>
                    <div id="pdfOnizleme" style="margin-top: 20px;"></div>
                    <button onclick="geriDon()" style="margin-top: 20px; padding: 10px 15px; background-color: #2196F3; color: white; border: none; border-radius: 5px;">Geri Dön</button>
                    <button onclick="kaydet()" style="margin-top: 20px; padding: 10px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">Kaydet</button>
                  </div>
                `;

  // PDF önizlemesini yönet
  setTimeout(() => {
    const input = document.getElementById("pdfDosya");
    const preview = document.getElementById("pdfOnizleme");

    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file && file.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        preview.innerHTML = `
                    <iframe src="${url}" width="100%" height="500px" style="border:1px solid #ccc;"></iframe>
                  `;
      } else {
        preview.innerHTML = `<p style="color: red;">Geçerli bir PDF seçin.</p>`;
      }
    });
  }, 0);
}

// Tekli Silme Butonu
function remove(btn) {
  if (btn) {
    const row = btn.closest("tr");
    row.parentNode.removeChild(row);
  }
}

// Tekli Arşivleme Butonu
function archive(btn) {
  console.log("Archive fonksiyonu çağrıldı! (Kurumsal Kimlik)");

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

// Ekle kısmındaki kaydet butonu
function kaydet() {
  const baslik = document.getElementById("baslik").value;
  const pdfDosya = document.getElementById("pdfDosya").files[0];

  if (!baslik || !pdfDosya) {
    Swal.fire({
      icon: "error",
      title: "Eksik Bilgi",
      text: "Başlık ve PDF dosyası zorunludur!",
    });
    return;
  }

  // PDF dosyasının sadece adını alıyoruz
  const dosyaAdi = pdfDosya.name;

  // Şu anki zamanı al
  const tarihSaat = new Date();
  const formattedTarih = tarihSaat.toLocaleDateString("tr-TR");
  const formattedSaat = tarihSaat.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const yeniYayin = {
    baslik,
    kategori: "Yayınlarımız",
    durum: "Aktif",
    guncelleme: `${formattedTarih} [${formattedSaat}]`,
    dosya: dosyaAdi,
  };

  localStorage.setItem("yeniYayin", JSON.stringify(yeniYayin));

  // Sayfayı yenile (veya geri dön)
  window.location.reload();
}

// Düzenle Butonu
function duzenle(button) {
  const row = button.closest("tr");
  const baslik = row.querySelector(".baslik")?.innerText.trim() || "Başlık";

  // Mevcut satırın INDEX'ini kaydet
  const tbody = row.parentNode;
  window.duzenlenenSatirIndex = [...tbody.children].indexOf(row);

  // Orijinal tabloyu yedekle (geriDon için)
  window.orijinalIcerik = document.getElementById("icerikler").innerHTML;

  // İçerikleri düzenleme arayüzüne çevir
  const icerikDiv = document.getElementById("icerikler");
  icerikDiv.innerHTML = `
    <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1)">
      <h4>PDF Düzenle</h4><br>
      <h5>Başlık</h5>
      <input type="text" id="baslik" placeholder="Yayın başlığını girin" style="width: 100%; padding: 8px;" value="${baslik}"/> <br><br>
      <input type="file" id="pdfDosya" accept="application/pdf" style="margin-bottom: 20px" /> <br><br>
      <div id="pdfOnizleme" style="margin-top: 20px;"></div>
      <button onclick="geriDon()" style="margin-top: 20px; padding: 10px 15px; background-color: #2196F3; color: white; border: none; border-radius: 5px;">Geri Dön</button>
      <button onclick="kaydetDuzenle()" style="margin-top: 20px; padding: 10px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">Kaydet</button>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById("pdfDosya");
    const preview = document.getElementById("pdfOnizleme");

    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file && file.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        preview.innerHTML = `
          <iframe src="${url}" width="100%" height="500px" style="border:1px solid #ccc;"></iframe>
        `;
      } else {
        preview.innerHTML = `<p style="color: red;">Geçerli bir PDF seçin.</p>`;
      }
    });
  }, 0);
}

// Düzenle kısmındaki kaydet butonu
function kaydetDuzenle() {
  const yeniBaslik = document.getElementById("baslik").value.trim() || "Başlık";

  const icerikDiv = document.getElementById("icerikler");

  // Yeni satır HTML
  const yeniSatir = `
    <tr>
      <th scope="row"><input type="checkbox" class="checkbox-item" /></th>
      <td class="baslik">${yeniBaslik}</td>
      <td><span class="badge" style="margin-top: 7px">Yayınlarımız</span></td>
      <td><span class="durum" style="margin-top: 7px">Arşivlendi</span></td>
      <td>Şimdi</td>
      <td style="text-align: right">
        <div class="dropdown-container">
          <button class="dropdown-toggle" onclick="toggleDropdown(this)">İşlemler</button>
          <div class="dropdown-menu">
            <button onclick="duzenle(this)">
              <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
              Düzenle
            </button>
            <button onclick="remove(this)">
              <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%" height="10%" />
              Sil
            </button>
            <button onclick="archive(this)">
              <img src="../assets/images/dropdown_svg/copy-writing.svg" alt="content" width="10%" height="10%" />
              Arşivle
            </button>
          </div>
        </div>
      </td>
    </tr>
  `;

  // Sayfayı eski haline getir
  icerikDiv.innerHTML = window.orijinalIcerik;

  // Satırı güncelle
  const tbody = document.querySelector("#icerikler table tbody");
  const index = window.duzenlenenSatirIndex;
  if (tbody && typeof index === "number") {
    tbody.children[index].outerHTML = yeniSatir;
  }
}

// Çoklu Silme Butonu
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

// Sayfa dışında bir yere tıklanınca açılır menüyü kapatma
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown-container")) {
    document.querySelectorAll(".dropdown-menu").forEach((el) => {
      el.style.display = "none";
    });
  }
});

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
const checkboxes = document.querySelectorAll(".checkbox-item");

// Ana checkboxa tıklandığında tüm checkboxların durumunu değiştirme
const anaCheckbox = document.getElementById("ana-checkbox");
anaCheckbox.addEventListener("change", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = anaCheckbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  });
});

window.addEventListener("load", function () {
  const veri = localStorage.getItem("yeniYayin");
  if (veri) {
    const yayin = JSON.parse(veri);
    const tbody = document.querySelector("#icerikler table tbody");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">
        <input type="checkbox" class="checkbox-item" />
      </th>
      <td>${yayin.baslik}</td>
      <td><span class="badge" style="margin-top: 7px">${yayin.kategori}</span></td>
      <td><span class="durum" style="margin-top: 7px">${yayin.durum}</span></td>
      <td>${yayin.guncelleme}</td>
      <td style="text-align: right">
        <div class="dropdown-container">
          <button class="dropdown-toggle" onclick="toggleDropdown(this)">İşlemler</button>
          <div class="dropdown-menu">
            <button onclick="duzenle(this)">
              <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
              Düzenle
            </button>
            <button onclick="remove(this)">
              <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%" height="10%" />
              Sil
            </button>
            <button onclick="archive(this)">
              <img src="../assets/images/dropdown_svg/copy-writing.svg" alt="content" width="10%" height="10%" />
              Arşivle
            </button>
          </div>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
    localStorage.removeItem("yeniYayin");
  }
});
