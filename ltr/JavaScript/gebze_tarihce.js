// tarihi yerler için gerekli sabit değişken
const locations = getLoc();

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

// fotoğraf ekleme

function addEvent() {
  document.getElementById("add").addEventListener("click", function () {
    const row = document.querySelector("#photos");
    if (!row) return;

    const count = row.children.length + 1;

    row.insertAdjacentHTML(
      "beforeend",
      `
            <div class="col-6 col-md-2 mb-3" style="border-top:1px solid #ccc;border-left:1px solid #ccc;border-right:1px solid #ccc; ">
              <img
                src=""
                class="img-fluid rounded mb-2 preview-img"
                style="min-height:150px;min-width:150px"
                alt="resim${count}"
              />
              <div class="d-flex gap-2"   >
                <label for="resim${count}" class="btn btn-outline-primary w-50 p-1" ><b>Değiştir</b></label>
                <label for="resimSil${count}" class="btn btn-outline-danger w-50 p-1 pt-1 remove ml-1"><b>Sil</b></label>
                <input type="file" id="resim${count}" class="resim-input" style="display: none" />
              </div>
            </div>
            `
    );

    remove();
  });

  document.querySelector("#images").addEventListener("change", function (e) {
    if (e.target.classList.contains("resim-input")) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (ev) {
          const container = e.target.closest(".col-6");
          const img = container.querySelector(".preview-img");
          if (img) {
            img.src = ev.target.result;
            img.style.display = "block";
          }
        };
        reader.readAsDataURL(file);
      }
    }
  });
}

function addEventLoc(loc) {
  const add = document.getElementById("add");
  add.addEventListener("click", function () {
    const row = document.querySelector("#tableContent");
    if (!row) return;

    const count = row.children.length + 1;

    row.insertAdjacentHTML(
      "beforeend",
      `
             <tr>
    <td><img src="" alt="Lokasyon resmi" width="50" height="30" /></td>
    <td class="location dot" title="Başlık">Lokasyon Başlığı</td>
    <td class="dot" title="">Lokasyon Genel Bilgi</td>
    <td class="location dot" title="">Lokasyon Konum Bilgisi</td>
    <td style="text-align:right;">
      <button class="btn w-10 p-1 edit">Düzenle</button>
    </td>
  </tr>
            `
    );
    remove();
    setupEditButtons();
  });

  document.querySelector("#images").addEventListener("change", function (e) {
    if (e.target.classList.contains("resim-input")) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (ev) {
          const container = e.target.closest(".col-6");
          const img = container.querySelector(".preview-img");
          if (img) {
            img.src = ev.target.result;
            img.style.display = "block";
          }
        };
        reader.readAsDataURL(file);
      }
    }
  });
}
remove();
addEventLoc();
getLocPhotos(photoNum);
window.addEventListener("DOMContentLoaded", addEvent);

// DÜZENLE

function edit(title, category, situation, date, photoNum, element) {
  let content = document.getElementById("icerikler");

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
                      <form id="editForm">
                        <div class="mb-3">
                          <label for="title" class="form-label">Başlık</label>
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            value="${title}"
                            placeholder="Başlık giriniz"
                            required
                          />
                        </div>

                        <div class="mb-3">
                        <label for="kategori" class="form-label">Kategori</label>
                        <select
                          name="kategori"
                          id="kategori"
                          class="form-control select"
                          required
                        >
                          <option value="gebze">Tarihten Günümüze Gebze</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="situation" class="form-label">Durum</label>
                        <select
                          name="situation"
                          id="situation"
                          class="form-control select"
                          required
                        >
                          <option disabled selected hidden>Durum</option>
                          <option value="arsivle">Arşivle</option>
                          <option value="arsivCikar">Arşivden Çıkar</option>
                        </select>
                      </div>

                        <div class="mb-3">
                          <label for="link" class="form-label">Yazı</label>
                          <textarea
                            name="link"
                            id="link"
                            class="form-control"
                            placeholder="Yazı"
                            rows="5"
                            required
                          >yazı</textarea
                          >
                        </div>
                        <div class="mb-3" id="population" style="margin-left: 23%">
                          
                            <label
                              id="add"
                              class="btn btn-primary w-10 p-1"
                              style="float: right; margin-left: 1%"
                              >Fotoğraf Ekle</label
                            >
                          </div>
                        <div class="container mt-4" id="images">
                          <div class="row text-center justify-content-start" id="photos">
                          </div>
                        </div>
                       <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-success ml-2 mb-2" style="width:150px" id="submit" type="button">
                          Güncelle
                        </button>
                        <a href="Gebze - Tarihce.html" class="btn btn-secondary ml-1 mb-2" style="width:150px">
                          İptal
                        </a>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
                   `;
  addEvent();
  getPhotos(photoNum);
  remove();

  document.getElementById("nav").innerHTML = ``;

  const inputs = document.querySelectorAll(".resim-input");

  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        const self = this;

        reader.onload = function (e) {
          const container = self.closest(".col-6");
          const img = container.querySelector(".preview-img");

          if (img) {
            img.src = e.target.result;
            img.style.display = "block";
          }
        };

        reader.readAsDataURL(file);
      }
    });
  });

  let today = new Date();

  const minute = today.getMinutes();
  const hours = today.getHours();
  const ms = parseInt(today.getMilliseconds() / 10);
  const day = today.getDay();
  const month = today.getMonth();
  const year = today.getFullYear();
  let formattedDate = `${hours}:${minute}:${ms}s - ${day}.${month}.${year}`;
  remove();
}

function editPhoto(title, date, photoNum, element) {
  let content = document.getElementById("icerikler");

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
                      <form id="editNewsForm">
                        <div class="mb-3">
                          <label for="title" class="form-label">Başlık</label>
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            value="${title}"
                            placeholder="Başlık giriniz"
                            required
                          />
                        </div>
                        
                        <div class="mb-3" id="population" style="margin-left: 23%">
                          
                            <label
                              id="add"
                              class="btn btn-primary w-10 p-1"
                              style="float: right; margin-left: 1%"
                              >Fotoğraf Ekle</label
                            >
                          </div>
                        </div>

                        <div class="container mt-4" id="images">
                          <div class="row text-center justify-content-start" id="photos">
                          </div>
                        </div>
                        <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-success ml-2 mb-2" style="width:150px" id="submit" type="button">
                          Güncelle
                        </button>
                        <a href="Gebze - Tarihce.html" class="btn btn-secondary ml-1 mb-2" style="width:150px">
                          İptal
                        </a>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
                    `;
  addEvent();
  remove();

  getPhotos(photoNum);

  document.getElementById("nav").innerHTML = ``;

  const inputs = document.querySelectorAll(".resim-input");

  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        const self = this;

        reader.onload = function (e) {
          const container = self.closest(".col-6");
          const img = container.querySelector(".preview-img");

          if (img) {
            img.src = e.target.result;
            img.style.display = "block";
          }
        };

        reader.readAsDataURL(file);
      }
    });
  });

  let today = new Date();

  const minute = today.getMinutes();
  const hours = today.getHours();
  const ms = parseInt(today.getMilliseconds() / 10);
  const day = today.getDay();
  const month = today.getMonth();
  const year = today.getFullYear();
  let formattedDate = `${hours}:${minute}:${ms}s - ${day}.${month}.${year}`;
}

function remove() {
  const remove = document.querySelectorAll(".remove");

  remove.forEach((removeBtn) => {
    removeBtn.addEventListener("click", function () {
      const targetDiv = removeBtn.closest(".col-6");
      if (removeBtn) targetDiv.remove();
    });
  });
}

function getPhotos(num) {
  for (let i = 0; i < num; i++) {
    document.getElementById("photos").innerHTML += `
          <div class="col-6 col-md-2 mb-3" style="border-top:1px solid #ccc;border-left:1px solid #ccc;border-right:1px solid #ccc;" margin-left:5px;>
        <img
        src=""
        class="img-fluid rounded mb-2 preview-img"
        style="min-height:150px;min-width:150px"
        alt="resim${i}"
        />
      <div class="d-flex gap-2"   >
        <label for="resim${i}" class="btn btn-outline-primary w-50 p-1" ><b>Değiştir</b></label>
        <label for="resimSil${i}" class="btn btn-outline-danger w-50 p-1 pt-1 remove ml-1"><b>Sil</b></label>
        <input type="file" id="resim${i}" class="resim-input" style="display: none" />
      </div>
    </div>`;
  }
  remove();
}

function getLocPhotos(num) {
  const photosContainer = document.getElementById("photos");
  photosContainer.innerHTML = "";

  const table = document.createElement("table");
  table.className = "table mt-0";
  table.id = "table";
  table.style.width = "100%";

  table.innerHTML = `
    <thead style="border-top: none">
      <tr>
        <th style="width: 15%; padding-left: 10px;">Resim</th>
        <th style="width: 20%">Başlık</th>
        <th style="width: 25%; max-width: 25%;">Tarihçe ve Genel Bilgi</th>
        <th style="width: 25%; max-width: 25%;">Konum Bilgi</th>
        <th style="width: 15%"></th>
      </tr>
    </thead>
    <tbody id="tableContent"></tbody>
  `;

  const tableContent = table.querySelector("#tableContent");

  for (let i = 0; i < num; i++) {
    locations.forEach((loc, index) => {
      const tr = document.createElement("tr");
      const buttonId = `editBtn_${i}_${index}`;

      tr.innerHTML = `
        <td>
          <img src="${loc.titleImage}" alt="${loc.name}" width="80" height="50" /> <!-- Resim boyutunu artır -->
        </td>
        <td class="news dot" title="${loc.name}">${loc.name}</td>
        <td class="dot" title="${loc.info}">${loc.info}</td>
        <td class="location dot" title="${loc.tarif}">${loc.tarif}</td>
        <td style="text-align:right;">
          <button class="btn w-10 p-1 edit" id="${buttonId}">Düzenle</button>
        </td>
      `;
      tableContent.appendChild(tr);

      tr.querySelector(`#${buttonId}`).addEventListener("click", () => {
        console.log(`${i}_${index} tıklandı`);
        editLocation(loc);
      });
    });
  }

  photosContainer.appendChild(table);
}

function editTarihiYerler(photoNum) {
  let content = document.getElementById("icerikler");

  content.innerHTML = `
                  <div class="d-flex justify-content-center">
                    <div
                    class="card"
                    style="
                      box-shadow: 3px 3px 10px rgba(100, 100, 100, 0.738);
                      width: 95%;
                    "
                  >
                    
                        <div class="mb-3" id="population" style="margin-left: 23%">
                          
                            <label
                              id="add"
                              class="addLocButton"
                              style="float: right; margin-left: 1%"
                              >Lokasyon Ekle</label
                            >
                          </div>
        
                        

                        <div class="container mt-4" id="images">
                          <div id="photos">
                          </div>
                        </div>
                       <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-success ml-2 mb-2" style="width:150px" id="submit" type="button">
                          Güncelle
                        </button>
                        <a href="Gebze - Tarihce.html" class="btn btn-secondary ml-1 mb-2" style="width:150px">
                          İptal
                        </a>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
                    `;
  remove();
  addEventLoc();
  getLocPhotos(photoNum);

  document.getElementById("nav").innerHTML = ``;

  const inputs = document.querySelectorAll(".resim-input");

  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        const self = this;

        reader.onload = function (e) {
          const container = self.closest(".col-6");
          const img = container.querySelector(".preview-img");

          if (img) {
            img.src = e.target.result;
            img.style.display = "block";
          }
        };

        reader.readAsDataURL(file);
      }
    });
  });
}

function editLocation(loc) {
  let content = document.getElementById("icerikler");
  const { name, images = [], link, info, tarif, activities } = loc;
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
                      <form id="editNewsForm">
                        <div class="mb-3">
                          <label for="title" class="form-label">Başlık</label>
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            value="${name}"
                            placeholder="Başlık giriniz"
                            required
                          />
                        </div>
                      
                        <div class="mb-3">
                          <label for="title" class="form-label">Tarihçe ve Genel Bilgi</label>
                          <textarea
                            name="info"
                            id="info"
                            class="form-control"
                            placeholder="Tarihçe ve Genel Bilgi"
                            rows="5"
                            required
                          >${info}</textarea
                          >
                        </div>

                        <div class="mb-3">
                          <label for="tarif" class="form-label">Konum Tarifi</label>
                          <textarea
                            name="tarif"
                            id="tarif"
                            class="form-control"
                            placeholder="Konum Tarifi"
                            rows="2"
                            required
                          >${tarif}.</textarea
                          >
                          <label for="tarif" class="form-label mt-4">Konum Linki</label>
                          <textarea
                            name="link"
                            id="link"
                            class="form-control"
                            placeholder="Konum Linki"
                            rows="4"
                            required
                          >${link}</textarea
                          >
                        </div>
                        <div>
                        <label
                              id="addAct"
                              onclick="addActivities()"
                              class="btn btn-primary w-10 p-1"
                              style="float: right; margin-left: 1%"
                              >Aktivite Ekle</label
                            >
                            <label
                              id="add"
                              class="btn btn-primary w-10 p-1"
                              style="float: right;"
                              >Fotoğraf Ekle</label
                            >
                        </div>
                        <div id="activities" class="mt-5 mb-5">
                        
                        </div>

                        <div class="container mt-4" id="images">
                          <div class="row text-center justify-content-start" id="photos">
                          </div>
                        </div>
                        <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-success ml-2 mb-2" style="width:150px" id="submit" type="button">
                          Güncelle
                        </button>
                        <a href="Gebze - Tarihce.html" class="btn btn-secondary ml-1 mb-2" style="width:150px">
                          İptal
                        </a>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
                    `;

  getPhotos(6);
  remove();
  addEvent();
  renderActivities();

  document.getElementById("nav").innerHTML = ``;

  const inputs = document.querySelectorAll(".resim-input");

  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        const self = this;

        reader.onload = function (e) {
          const container = self.closest(".col-6");
          const img = container.querySelector(".preview-img");

          if (img) {
            img.src = e.target.result;
            img.style.display = "block";
          }
        };

        reader.readAsDataURL(file);
      }
    });
  });
}

function setupEditButtons() {
  const table = document.getElementById("tableContent");

  table.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("edit")) {
      const tr = e.target.closest("tr");

      const loc = {
        name: tr.querySelector("td:nth-child(2)").textContent.trim(),
        info: tr.querySelector("td:nth-child(3)").textContent.trim(),
        tarif: tr.querySelector("td:nth-child(4)").textContent.trim(),
        link: "https://lokasyon.com",
        images: [],
        activities: [],
      };

      editLocation(loc);
    }
  });
}

function renderActivities(element) {
  const activitiesContainer = document.getElementById("activities");

  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      activitiesContainer.innerHTML = `
            <div class="d-flex justify-content-between" style="width: 200%; margin-bottom:-2%;">
              <label for="title" class="form-label" style="margin-left:0.3%">Aktivite Başlığı</label>
              <label for="explain" class="form-label" style="margin-right:81.7%; margin-bottom:10px">Aktivite Açıklaması</label>
            </div>
          `;

      const activities = locations[0].activities;
    }
    activities.forEach((act, i) => {
      activitiesContainer.innerHTML += `
      <div class="d-flex gap-2 mt-3">
        <input
          type="text"
          class="form-control"
          name="activity"
          value="${act.name}"
          placeholder="Aktivite başlığını giriniz"
          style="max-width: 20%"
        />
        <input
          type="text"
          name="expOfActivity"
          id="exp${i}"
          class="form-control"
          value="${act.exp}"
          style="min-width: 70%; margin-left: 5%"
        />
        <label for="exp${i}">
          <img src="../assets/images/rubbishSvg.svg" alt="remove" width="20px" height="20px" style="margin-left:10px; margin-top:10px; cursor:pointer;" onclick="removeSvg(this)" />
        </label>
      </div>
    `;
    });
  }
}

// JSON FORMATINDAKİ VERİLER VE GETTER FONKSİYONU
function getLoc() {
  var balliKayalar = {
    name: "Ballı Kayalar",
    info: "Gebze - İzmit yolu üzerindeki Tavşanlı Köyü sınırlarında bulunan kampçılık ve trekking gibi doğa sporları için oldukça elverişli arazi yapısına sahip bir vadidir.",
    tarif:
      "İstanbul'dan özel araçla TEM Otoyolu üzerinden yaklaşık 45 dakikalık bir yolculukla ulaşılabilir. Gebze merkeze 15 km mesafededir.",
    link: "https://www.google.com/maps/place/Ball%C4%B1kayalar+Tabiat+Park%C4%B1/@40.8299347,29.515808,15z/data=!4m6!3m5!1s0x14cb242bfea49fbf:0x8a949c7858da831d!8m2!3d40.8332309!4d29.5168155!16s%2Fg%2F1thm0p0_?entry=ttu&g_ep=EgoyMDI1MDMyMy4wIKXMDSoASAFQAw%3D%3D",
    titleImage:
      "../assets/images/locationImages/titleImage/balliKayalarTitle.png",
    activities: [
      {
        name: "Kaya Tırmanışı",
        exp: "Türkiye'nin en önemli kaya tırmanış merkezlerinden biridir. 100+ rotalı kayalıklarda her seviyeye uygun parkurlar bulunur.",
      },
      {
        name: "Doğa Yürüyüşü",
        exp: "Vadi boyunca uzanan patikalarda doğa ile başbaşa yürüyüş yapabilirsiniz. İşaretli rotalar güvenli bir deneyim sunar.",
      },
      {
        name: "Kamp ve Piknik",
        exp: "Belirlenen alanlarda kamp ve piknik yapabilirsiniz. Temiz hava ve doğal ortamda dinlenme imkanı bulunur.",
      },
      {
        name: "Fotoğrafçılık",
        exp: "Eşsiz manzaralar ve doğal güzellikler fotoğraf tutkunları için mükemmel kareler sunmaktadır.",
      },
    ],
    images: [
      { imageSrc: "../assets/images/locationImages/balliKayalar1.png" },
      { imageSrc: "../assets/images/locationImages/balliKayalar2.png" },
      { imageSrc: "../assets/images/locationImages/balliKayalar3.png" },
      { imageSrc: "../assets/images/locationImages/balliKayalar4.png" },
    ],
  };

  var mustafaPasaKulliyesi = {
    name: "Mustafa Paşa Külliyesi",
    info: "Camii, yapılar topluluğunun merkezinde ve Gebze'ye hakim bir mevkide yer alır.",
    tarif:
      "İstanbul'dan özel araçla TEM Otoyolu üzerinden yaklaşık 45 dakikalık bir yolculukla ulaşılabilir. Gebze merkeze 15 km mesafededir.",
    link: "https://www.google.com/maps/place/%C3%87oban+Mustafa+Pa%C5%9Fa+K%C3%BClliyesi/@40.799884,29.432153,15z/data=!4m5!3m4!1s0x0:0x1ab84b48f6e54236!8m2!3d40.799884!4d29.432153?shorturl=1",
    titleImage:
      "../assets/images/locationImages/titleImage/mustafaPasaTitle.png",
    activities: [
      {
        name: "Tarihi Keşif",
        exp: "Caminin mimari detaylarını inceleyerek Osmanlı dönemi yapılarının özelliklerini keşfedebilirsiniz.",
      },
      {
        name: "Ruhsal ve Dini",
        exp: "Sessiz ve huzurlu ortamda namaz kılabilir, manevi bir atmosferde zaman geçirebilirsiniz.",
      },
      {
        name: "Sosyal ve Dinlendirici",
        exp: "Külliye bahçesindeki çınar ağaçlarının altında oturup huzurlu bir ortamda dinlenebilirsiniz.",
      },
      {
        name: "Fotoğrafçılık",
        exp: "Çoban Mustafa Paşa Külliyesi, Osmanlı mimarisinin zarif detaylarını, ışık ve gölge oyunlarının büyüleyici etkisini ve tarihi dokusuyla eşsiz bir atmosfer sunar.",
      },
    ],
    images: [
      { imageSrc: "../assets/images/locationImages/mustafaPasa1.png" },
      { imageSrc: "../assets/images/locationImages/mustafaPasa2.png" },
      { imageSrc: "../assets/images/locationImages/mustafaPasa3.png" },
      { imageSrc: "../assets/images/locationImages/mustafaPasa4.png" },
    ],
  };

  var sultanOrhanCami = {
    name: "Sultan Orhan Cami",
    info: "Gebze'nin batısında yer alan cami, tahmini olarak 1323-1331 yılları arasında inşa edilmiştir. Osmanlı mimarisinin ilk örneklerinden olan camiyi, Gebze'nin kurucusu olan Sultan Orhan yaptırmıştır",
    tarif:
      "İstanbul'dan özel araçla TEM Otoyolu üzerinden yaklaşık 45 dakikalık bir yolculukla ulaşılabilir. Gebze merkeze 15 km mesafededir.",
    link: "https://www.google.com/maps/place/Sultan+Orhan+Cami/@40.798079,29.4377681,714m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cb208c7bb7f3d5:0x805bf82146b0c733!8m2!3d40.798079!4d29.4377681!16s%2Fg%2F1tf8j0hn?entry=ttu&g_ep=EgoyMDI1MDcyMS4wIKXMDSoASAFQAw%3D%3D",
    titleImage:
      "../assets/images/locationImages/titleImage/sultanOrhanTitle.png",
    activities: [
      {
        name: "Tarihi Keşif",
        exp: "Erken Osmanlı mimarisini yerinde inceleyerek tarihî bir yolculuğa çıkabilirsiniz.",
      },
      {
        name: "Fotoğrafçılık",
        exp: "Caminin sade ve etkileyici mimarisi, fotoğraf tutkunları için güzel kareler sunar.",
      },
      {
        name: "Kültürel Gezi",
        exp: "Cami çevresindeki diğer tarihî yapılarla birlikte kültürel bir rota oluşturabilirsiniz.",
      },
    ],
    images: [
      { imageSrc: "../assets/images/locationImages/.png" },
      { imageSrc: "../assets/images/locationImages/.png" },
      { imageSrc: "../assets/images/locationImages/.png" },
      { imageSrc: "../assets/images/locationImages/.png" },
    ],
  };

  var anibalinMezari = {
    name: "Anibalın Mezarı",
    info: "Kartacalı ünlü komutan Anibal'ın Anıt Mezarı, Gebze'nin güneydoğusunda, çevresi daire şeklinde selvilerle çevrili sahanın ortasında yer alan 24 ton ağırlığındaki bir taş lahit ve şekillendirilen taşın üzerindeki Kartacalı Komutana ait aplike edilen bir masktan, Türkçe, İngilizce, Fransızca, Almanca ve İtalyanca yazılı birer mermer kitabeden oluşmaktadır.",
    tarif:
      "İstanbul'dan özel araçla TEM Otoyolu üzerinden yaklaşık 45 dakikalık bir yolculukla ulaşılabilir. Gebze merkeze 15 km mesafededir.",
    link: "https://www.google.com/maps/place/Hannibal+an%C4%B1t%C4%B1/@40.782282,29.4417079,715m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14cb2042af222be3:0xd11c044aa3d2711!8m2!3d40.782282!4d29.4417079!16s%2Fg%2F11cftyh3b?entry=ttu&g_ep=EgoyMDI1MDcyMS4wIKXMDSoASAFQAw%3D%3D",
    titleImage:
      "../assets/images/locationImages/titleImage/anibalMezariTitle.png",
    activities: [
      {
        name: "Fotoğrafçılık",
        exp: "Çevredeki doğal patikalarda kısa yürüyüşler yapabilir, doğayla baş başa kalabilirsiniz.",
      },
      {
        name: "Tarihi Gezi",
        exp: "Anibal'in anıt mezarını ve çevresindeki Eskihisar Kalesi gibi tarihi yapıları gezebilirsiniz.",
      },
      {
        name: "Panolarını İnceleme",
        exp: "Anıt çevresinde yer alan panolar aracılığıyla Anibal'in hayatı ve ölümü hakkında bilgi edinebilirsiniz.",
      },
    ],
    images: [
      { imageSrc: "../assets/images/locationImages/anibal1.png" },
      { imageSrc: "../assets/images/locationImages/anibal2.png" },
      { imageSrc: "../assets/images/locationImages/anibal3.png" },
      { imageSrc: "../assets/images/locationImages/anibal4.png" },
    ],
  };

  const LOCATIONS = [
    balliKayalar,
    mustafaPasaKulliyesi,
    sultanOrhanCami,
    anibalinMezari,
  ];

  return LOCATIONS;
}

function addActivities() {
  const activitiesContainer = document.getElementById("activities");
  activitiesContainer.innerHTML += `
            <div class="d-flex gap-2 mt-3">
              <input
                type="text"
                class="form-control"
                name="activity"
                value=""
                placeholder="Aktivite başlığını giriniz"
                style="max-width: 20%"
              />
              <input
                type="text"
                name="expOfActivity"
                id="exp"
                class="form-control"
                value=""
                placeholder="Aktivite açıklaması giriniz"
                style="min-width: 70%; margin-left: 5%"
              /><label for="" onclick="removeSvg(this)"
               ><img src="../assets/images/rubbishSvg.svg" alt="remove" width="20px" height="20px" style="margin-left:10px; margin-top:10px; cursor:pointer;"
               /></label>
            </div>  
          `;
}

function removeSvg(element) {
  const removeAct = element.closest("div");
  removeAct.remove();
}

function editTarihce(title, number) {
  let content = document.getElementById("icerikler");

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
                      <form id="editNewsForm">
                        <div class="mb-3">
                          <label for="title" class="form-label">Başlık</label>
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            value="${title}"
                            placeholder="Başlık giriniz"
                            required
                          />
                        </div>

                        <div class="mb-3">
                          <label for="kategori" class="form-label">Kategori</label>
                          <select class="select form-control" id="kategori">
                            <option id="gebze">Tarihten Günümüze Gebze</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="situtaion" class="form-label">Durum</label>
                          <select class="select form-control" id="situation">
                            <option disabled selected hidden>Durum</option>
                            <option id="arsivle">Arşivle</option>
                            <option id="arsivCikar">Arşivden Çıkar</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="link" class="form-label">Tarihçe</label> 
                          <textarea
                            name="link"
                            id="link"
                            class="form-control"
                            placeholder="Yazı"
                            rows="15"
                            required
                          >Gebze'nin de içinde bulunduğu, eski Yunanlılar'ın ve Romalılar'ın Bitinya (Bithynie) dedikleri coğrafi bölgenin bilinen en eski tarihi, M.Ö. XII yüzyıla kadar dayanır. Bölge, özellikle Kocaeli Yarımadası, coğrafi konumunun öneminden dolayı, tarihin hemen hemen bütün dönemlerinde, birçok ulusa yurt olmuştur. Asya ile Avrupa kıtaları arasındaki en önemli geçit yeri olan Kocaeli Yarımadası ya bir çok ulusun yurdu, ya da gelip geçtikleri, medeniyetlerinden izler bıraktığı bir yer olmuştur. Bilinen ilk ulus göçü de M.Ö. XII. yüzyılın başlarındadır. Bu ulus Yunan kökenli Frikler'dir. Boğaz (Bosforos) yoluyla Anadolu'ya inmişlerdir. XII yüzyıla kadar Trakya'dan İzmit dolaylarına göçler devam etmiştir. Fakat bu dönemde eski Gebze'nin yerine dair hiçbir bilgi edinilememiştir. Kısaca antik çağ Gebze'sinin yeri kesinlikle bilinememektedir. Bugün Gebze'nin olduğu yerde, M.Ö. 281-246 yıllarında Kral 1. Nicomede'nin egemenliğindeki Bitinya Krallığı döneminde Dakibyza ve Libyssa adında yerleşmeler vardır. Eski Gebze'nin yerine dair söylenenler, işte bu tarihlere aittir. Daha eski tarihlere ait bilgiler ise çelişkilidir. Bu yerleşim alanlarının araştırmalara konu olmasının en önemli nedeni ise, ünlü Kartacalı komutan Hannibal'ın krallık döneminde burada yerleşmiş olmasıdır. Hannibal Zama harbindeki yenilgisinden sonra ülkesinde itibar görmemiş ve Bitinya Krallığı'na iltica etmek zorunda kalmıştır. Bitinya Kralları I. ve II. Prusias'ın savaş danışmanlıklarını yapmıştır. II. Prusias'ın ihaneti sonucu düşmanın eline düşmemek için intihar etmiş ve Lybissa'ya gömülmüştür. İşte birçok tarihçinin ve araştırmacının eski Gebze olduğu iddia edilen bu yeri araştırmasının en büyük nedeni budur. Hannibal'ın burayı seçmesinin birçok nedeni vardır. Devamlı izlenme kuşkusu, Nicomedia başkent olduğu için gelenin gidenin çok olması ve tanınma ihtimalinin fazla olması, yönetime güvenmemesi bu nedenlerin başlıcalarıdır. Roma kuvvetlerinden gizlenen Hannibal, korunaklı, kaçışı kolay ve denizle ilişkili bir yer aramıştır. Sonunda bu özelliklere sahip Libyssa'yı seçmiştir. O dönemde Libyssa'nın kurulduğu yer, hem denize hem de karaya hakim bir tepe üzerindedir. Tepe, körfezin en dar yeridir. 1330 yılında Osmanlılarla Bizans arasında yapılan savaştan sonra Gebze'nin de içinde bulunduğu bölge, Osmanlı idaresine dahil edilmiştir. Bugünkü Gebze'nin kurucusu Orhan Gazi'dir. Gebze'de kendi adına cami de yaptıran Orhan Gazi, bölgede izler bırakan ilk Türk büyüğüdür. Orhan Gazi, bölgenin imarı ve yaşaması için büyük çabalar göstermiştir. Bu amaçla işletmeler kurmuş, vakıfları desteklemiştir Osmanlıların devlet olma çabaları sırasında, Gebze yine ordugah yerleşimi olarak kullanılmıştır. Osmanlı Beyliğinin kurulmasında büyük emekleri geçen Akçakoca Bey'in oğlu olan İlyas Çelebi de hem Gebze'nin fethinde hem de kuruluşunda büyük rol oynamıştır. Gebze Osmanlı İmparatorluğunun son yıllarına kadar kimi zaman İstanbul'a, daha çok da Kocaeli'ye bağlı bir kaza olarak, önemli bir yer niteliğini uzun yıllar korumuştur. 1. Dünya Savaşı'nda Osmanlı İmparatorluğunun yenik düşmesi üzerine Anadolu ve Trakya'nın birçok yöresi gibi Gebze'de düşman kuvvetleri tarafından işgal edilmiştir. 1920 yılznda İngilizler'in bölgeyi işgaline, 1921 yılının başlarında Yunanlılar da katılmıştır. Daha sonra Anadolu içerisinde yenilgiye uğrayan Yunan kuvvetleri, amaçlarına ulaşamamanın üzüntüsüyle geldikleri yoldan geriye kaçmışlardır. Bu yıllarda Gebze, Anadolu'nun en dikkate değer yerlerinden biridir. Türk kuvvetlerinin biraz ilerisinde İngiliz askerleri bulunmaktaydı. 18-19 Ocak 1923 tarihli Hakimiyet-i Milliye-Ankara Gazetesi'nde Atatürk'ün bölgeyi ve Gebze'yi ziyaret ettiğinden bahsedilir. Atatürk Gebze'deki askeri birliklerin durumundan memnun kalarak geri dönmüştür. İstanbul'un terk edilmesinden sonra Gebze ve Çevresi tamamen emniyet altına alınmıştır. Cumhuriyet'in ilanına kadar kimi zaman İstanbul, kimi zaman da Kocaeli'ye bağlı bir kaza olan Gebze, Cumhuriyet'in ilanından sonra yeni iller kanununa göre il olan İzmit'e bağlanmıştır. Libyssa'dan Gebze'ye Gebze adı köken olarak, diğer eski yerleşmelerin ismine bağlanmaktadır. Araştırmacıların bir çoğu bu görüştedir</textarea
                          >
                        </div>
                        <div class="mb-3" id="population" style="margin-left: 23%">
                          
                            <label
                              id="add"
                              class="btn btn-primary w-10 p-1"
                              style="float: right; margin-left: 1%"
                              >Fotoğraf Ekle</label
                            >
                        </div>

                        <div class="container mt-4" id="images">
                          <div class="row text-center justify-content-start" id="photos">
                          </div>
                        </div>
                       <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-success ml-2 mb-2" style="width:150px" id="submit" type="button">
                          Güncelle
                        </button>
                        <a href="Gebze - Tarihce.html" class="btn btn-secondary ml-1 mb-2" style="width:150px">
                          İptal
                        </a>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
                    `;
  remove();
  const photo = [
    "../assets/images/tarihce/tarihce1.png",
    "../assets/images/tarihce/tarihce2.png",
    "../assets/images/tarihce/tarihce3.png",
  ];

  addEventHistory(photo);
  addEvent();
}

function addEventHistory(arr) {
  for (let i = 0; i < arr.length; i++) {
    document.getElementById("photos").innerHTML += `
          <div class="col-6 col-md-2 mb-3">
          <img
          src="${arr[i]}"
          class="img-fluid rounded mb-2 preview-img"
          style="min-height:150px;min-width:150px"
          alt="resim${i}"
          />
          <div class="d-flex gap-2"   >
            <label for="resim${i}" class="btn btn-outline-primary w-50 p-1" ><b>Değiştir</b></label>
            <label for="resimSil${i}" class="btn btn-outline-danger w-50 p-1 pt-1 remove ml-1"><b>Sil</b></label>
            <input type="file" id="resim${i}" class="resim-input" style="display: none" />
          </div>
        </div>`;
  }
  remove();
}
