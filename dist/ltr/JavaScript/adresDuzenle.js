function toggleMenu(button) {
  const menu = button.nextElementSibling;
  const allMenus = document.querySelectorAll(".islem-menu");

  allMenus.forEach((m) => {
    if (m !== menu) m.style.display = "none";
  });

  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Örnek fonksiyonlar

window.addEventListener("DOMContentLoaded", () => {
  const silButonlari = document.querySelectorAll(".silButonu");
  console.log("Sil butonları bulundu mu? Sayısı:", silButonlari.length);

  silButonlari.forEach((btn, i) => {
    console.log(
      `Buton ${i + 1} display stili:`,
      window.getComputedStyle(btn).display
    );
  });

  // Görünür yapmayı dene
  silButonlari.forEach((btn) => {
    btn.style.setProperty("display", "inline-block", "important");
  });
});

//   <!-- DÜZENLE-->

var oldContent = "";

function gebzeBelediyeleri(
  imgSRC,
  locLink,
  binaİsmi,
  adres,
  telefon,
  email,
  belId,
  element
) {
  const rowIndex = element.closest("tr").rowIndex;
  sessionStorage.setItem("rowIndex", rowIndex);
  let content = document.getElementById("icerikler");
  oldContent = content.innerHTML;
  // Müdürlük dizisini seç
  let mudurlukler = [];
  if (belId === "gebzeBelBaskanligi") mudurlukler = gebzeBelediyesiBaşkanlığı;
  else if (belId === "gebzeBelMevlana") mudurlukler = mevlanaEkHizmet;
  else mudurlukler = gebzeBelediyesi;

  // Müdürlük inputlarını oluştur
  let mudurlukInputs = '<div class="row">';

  mudurlukler.forEach((m, i) => {
    mudurlukInputs += `
  <div class="col-md-4 mb-3">
    <div class="position-relative">
      <input type="text" class="form-control pe-5" value="${m}" required />
      <label class="customCheckbox">
  <input type="checkbox" class="silCheckbox" />
  <span class="checkmark"></span>
</label>

    </div>
  </div>
`;
  });
  mudurlukInputs += "</div>";
  content.innerHTML = `
              <div class="d-flex justify-content-center">
            <div
              class="card"
              style="
                box-shadow: 3px 3px 10px rgba(100, 100, 100, 0.738);
                width: 95%;
              "
            >
              <div class="card-body">
                <form id="editBelForm">
                  <div class="d-flex">
                   
                    <div style="width=100%; flex: 1">
                      <div class="mb-3">
                        <label class="form-label">Bina İsmi</label>
                        <input
                          type="text"
                          class="form-control"
                          id="binaİsmi"
                          value="${binaİsmi}"
                          placeholder="Yeni Bina İsmi Giriniz"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Bina Adresi</label>
                        <input
                          type="text"
                          class="form-control"
                          id="adres"
                          value="${adres}"
                          placeholder="Yeni Bina Adresi Giriniz"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Telefon Numarası</label>
                        <input
                          type="text"
                          class="form-control"
                          id="telefon"
                          value="${telefon}"
                          placeholder="Yeni Telefon Numarası Giriniz"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label class="form-label">eMail</label>
                        <input
                          type="text"
                          class="form-control"
                          id="email"
                          value="${email}"
                          placeholder="Yeni eMail Giriniz"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Konum Linki</label>
                    <textarea class="form-control" id="loc" rows="3" required>${locLink}</textarea
                    >
                  </div>

                  <hr />
            
                  
                  <div class="mb-3 d-flex align-items-center justify-content-between">
                  <h5 class="mb-0 me-3">Bağlı Müdürlükler</h5>
                            
                  <div class="dropdown-wrapper">
                  <button type="button" class="müdürlükButton" onclick="toggleDropdown()">
                    <img src="../assets/images/window.png" alt="Ekle" style="height: 20px;" />
                  </button>

                  <div id="mudurlukDropdown" class="müdürlük-dropdown">
                  <button type="button" onclick="ekle()" id="ekleBtn">Ekle</button>
                  <button id="silBtn" type="button" onclick="sil()" >Sil</button>
                 </div>
                 </div>
                 
               </div>
                  </div>
                  <div class="müdürlükText" id="mudurlukContainer" >
                    ${mudurlukInputs}
                   </div>
                    <div>
                      <img
                        id="image"
                        src="${imgSRC}"
                        class="img-fluid rounded preview-img"
                        alt="Fotoğraf Önizleme"
                        style="width: 50%; height: 270px; margin-left: 25%"
                      />
                      <label
                        for="resim"
                        class="btn btn-outline-primary mt-2"
                        style="width: 50%; margin-left: 25%"
                        >Fotoğraf Seç</label
                      >
                      <input
                        id="resim"
                        type="file"
                        name="resim"
                        style="display: none"
                        accept="image/*"
                        class="resim-girdi"
                      />
                    </div>
                
             <div class="d-flex justify-content-start gap-2 mt-2" style="padding-left: 8px; margin-bottom: 20px;">
  <button class="btn btn-success" id="submit" type="button" style="padding: 8px 20px; font-size: 15px; margin-left:35px">
    Güncelle
  </button>
  <a href="adresDuzenle.html" class="btn btn-secondary" role="button" style="padding: 8px 20px; font-size: 15px; margin-left:2px">
    İptal
  </a>
</div>
      

            </form>
              </div>
            </div>
          </div>
          `;
  document.getElementById("").innerHTML = ``;

  if (category === "Binaİsmi") {
    document.getElementById("Binaİsmi").selected = true;
  }
  if (category === "adres") {
    document.getElementById("adres").selected = true;
  }
  if (category === "telefon") {
    document.getElementById("telefon").selected = true;
  }
  if (category === "email") {
    document.getElementById("email").selected = true;
  }

  const input = document.querySelector(".resim-girdi");
  const imgPrev = document.querySelector(".preview-img");

  input.addEventListener("change", function () {
    const dosya = this.files[0];

    if (dosya) {
      const okuyucu = new FileReader();

      okuyucu.onload = function (e) {
        imgPrev.src = e.target.result;
        imgPrev.style.display = "block";
      };

      okuyucu.readAsDataURL(dosya);
    }
  });

  // Güncelle butonu işlevi
  document.getElementById("submit").addEventListener("click", function () {
    let title = document.querySelector("#binaİsmi").value;
    let kategori = document.querySelector("#adres").value;
    let tarih = document.querySelector("#telefon").value;
    let icerik = document.querySelector("#email").value;
    let link = document.querySelector("#loc").value;

    document.getElementById("icerikler").innerHTML = oldContent;

    sessionStorage.removeItem("rowIndex");
  });
}

// Müdürlük listeleri
var gebzeBelediyesiBaşkanlığı = [
  "Ruhsat ve Denetim Müdürlüğü",
  "İmar ve Şehircilik Müdürlüğü",
  "Plan ve Proje Müdürlüğü",
  "İnsan Kaynakları ve Eğitim Müdürlüğü",
  "Numarataj Şefliği",
  "Hukuk İşleri Müdürlüğü",
  "Özel Kalem Müdürlüğü",
  "Destek Hizmet Müdürlüğü",
  "Mali Hizmetler Müdürlüğü",
  "İstihdam Ofisi",
  "Basın Yayın ve Halkla İlişkiler Müdürlüğü",
  "Bilgi İşlem Müdürlüğü",
  "Emlak ve İstimlak Müdürlüğü",
  "Evrak Kayıt servisi",
];

var mevlanaEkHizmet = [
  "Makina İkmal Bakım Onarım Müdürlüğü",
  "Otobüs İşleri Servisi",
  "Park ve Bahçeler Müdürlüğü",
  "Temizlik İşleri Müdürlüğü",
  "Teftiş Kurulu Müdürlüğü",
  "İşletme ve İştirakler Müdürlüğü",
  "Zabıta Müdürlüğü",
  "Mezarlık Müdürlüğü",
  "Trafik Eğitim Okulu Zabıta Amirliği",
  "Veteriner İşleri Müdürlüğü",
];

var gebzeBelediyesi = [
  "Kültür İşleri Müdürlüğü",
  "Evlendirme Memurluğu",
  "Sosyal Destek Hizmetleri Müdürlüğü",
  "Yazı İşleri Müdürlüğü",
];

function sil() {
  const container = document.getElementById("mudurlukContainer");
  const checkboxes = container.querySelectorAll(".customCheckbox input");

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkbox.closest(".col-md-4").remove();
    }
  });
}

function toggleDropdown() {
  const menu = document.getElementById("mudurlukDropdown");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Dışarı tıklanınca kapansın:
document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("mudurlukDropdown");
  const button = document.querySelector(".müdürlükButton");
  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

function ekle() {
  const yeniMudurlukAdi = "Yeni Müdürlük";
  const container = document.querySelector("#mudurlukContainer .row");
  const inputlar = container.querySelectorAll(".form-control");

  // Boş input var mı kontrol et
  for (let input of inputlar) {
    if (!input.value.trim()) {
      input.value = yeniMudurlukAdi;
      return;
    }
  }

  // Yeni müdürlük kutusu (tam yapı)
  const yeniDiv = document.createElement("div");
  yeniDiv.className = "col-md-4 mb-3";
  yeniDiv.innerHTML = `
    <div class="position-relative">
      <input type="text" class="form-control pe-5" value="${yeniMudurlukAdi}" required />
      <label class="customCheckbox">
        <input type="checkbox" class="silCheckbox" />
        <span class="checkmark"></span>
      </label>
    </div>
  `;
  container.appendChild(yeniDiv);
}
