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

document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown-container")) {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((el) => (el.style.display = "none"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("input", search);
});
let originalContent = ``;

function search() {
  document.getElementById("search").addEventListener("input", search);

  const searchText = document.getElementById("search");
  const act = document.getElementsByClassName("act");
  const content = document.getElementById("tableContent");

  if (originalContent === "") {
    originalContent = content.innerHTML;
  }

  if (searchText.value.trim() === "") {
    content.innerHTML = originalContent;
    return;
  }

  const actTitle = [];

  for (let i = 0; i < act.length; i++) {
    actTitle.push(act[i]);
  }

  content.innerHTML = ``;
  var count = 0;
  actTitle.forEach((title) => {
    if (
      title.textContent
        .trim()
        .toLowerCase()
        .includes(searchText.value.trim().toLowerCase())
    ) {
      const tr = title.closest("tr");
      const td = tr.querySelectorAll("td");
      content.innerHTML += `
                <tr>
                  <td style="width: 3%">
                      <input
                        type="checkbox"
                        name="allCheck"
                        style="width: 10px"
                      />
                    </td>
                    <td style="width: 12%">
                      ${td[1].innerHTML}
                    </td>
                    <td style="width: 14%" class="act dot" title="Etkinlik">
                      ${td[2].innerHTML}
                    </td>
                    <td style="width: 10%" class="date">${td[3].innerHTML}</td>
                    <td style="width: 10%" class="exp dot" title="...">${td[4].innerHTML}</td>
                  <td scope="row" style="text-align: right">
                    <div class="dropdown-container">
                      <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                        İşlemler
                      </button>
                      <div class="dropdown-menu">
                        <button
                          onclick="editActivities('../assets/images/gebze-belediyesi.ico', 'etkinlik', '30.03.2025', '...', this)">
                          <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                          Düzenle
                        </button>
                        <button onclick="remove()" id="remove">
                          <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                            height="10%" />
                          Sil
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>`;
    } else {
      count++;
    }
  });

  if (count == actTitle.length) {
    document.getElementById("tableContent").innerHTML = `
                <tr>
                  <td colspan="6" style="text-align: center; padding: 20px;">
                    <span style="color: #2196f3; font-weight: bold;">
                      ARAMANIZLA İLGİLİ BİR SONUÇ BULUNAMADI!
                    </span>
                  </td>
                </tr>`;
  }

  const checkboxes = document.querySelectorAll(".checkbox-item");

  const anaCheckbox = document.getElementById("ana-checkbox");
  anaCheckbox.addEventListener("change", () => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = anaCheckbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });
  });
}

// <!-- etkinlik düzenle-->

function editActivities(imgSrc, title, date, exp, element) {
  let content = document.getElementById("icerikler");
  date = date.split(".").reverse().join("-");

  content.innerHTML = `<div class="d-flex justify-content-center">
              <div class="card " style="box-shadow: 3px 3px 10px rgba(100, 100, 100, 0.738); width:95%;">
                <div class="card-body">
                  <form id="editNewsForm">
                    <div class="mb-3">
                      <label for="title" class="form-label">Başlık</label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        value="${title}"
                        placeholder="Haber başlığını giriniz"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="haberTarih" class="form-label">Tarih</label>
                      <input
                        type="date"
                        class="form-control"
                        id="haberTarih"
                        value="${date}"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="haberIcerik" class="form-label">Açıklama</label>
                      <textarea
                        class="form-control"
                        id="haberIcerik"
                        rows="5"
                        placeholder="Haber içeriğini yazınız..."
                        required
                      >${exp}</textarea>
                    </div>

                    <div class="mb-3">
                      <img
                      id="image"
                        src="${title} etkinlik başlığının resmi"
                        class="img-fluid rounded preview-img d-flex justify-content-center"
                        alt="${title}"
                        style="width: 30%; height: auto; margin-left:35%; max-height:300px"
                      />
                      <label
                        for="resim"
                        class="btn btn-outline-primary mt-2"
                        style="width: 100%"
                      >
                        Fotoğraf Seç
                      </label>
                      <input
                        id="resim"
                        type="file"
                        name="resim"
                        style="display: none"
                        accept="image/*"
                        class="resim-input"
                      />
                    </div>

                    <button class="btn btn-success" id="submit" type="submit">
                      Güncelle
                    </button>
                    <a href="Etkinlikler.html" class="btn btn-secondary">İptal</a>
                  </form>
                </div>
              </div>
              </div>`;

  document.getElementById("nav").innerHTML = ``;

  const input = document.querySelector(".resim-input");
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
}

function remove() {
  let tr = document.getElementById("remove").closest("tr");
  tr.remove();
}

function ekle() {
  let content = document.getElementById("icerikler");

  document.getElementById("nav").innerHTML = ``;

  content.innerHTML = `<div class="d-flex justify-content-center"">
              <div
                class="card"
                style="box-shadow: 3px 3px 10px rgba(100, 100, 100, 0.738); width:95%;"
              >
                <div class="card-body">
                  <form id="editActForm">
                    <div class="mb-3">
                      <label for="title" class="form-label">Başlık</label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        value=""
                        placeholder="Etkinlik başlığını giriniz"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="haberTarih" class="form-label">Tarih</label>
                      <input
                        type="date"
                        class="form-control"
                        id="haberTarih"
                        value=""
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="haberIcerik" class="form-label">Açıklama</label>
                      <textarea
                        class="form-control"
                        id="haberIcerik"
                        rows="5"
                        placeholder="Etkinlik içeriğini yazınız..."
                        required
                      ></textarea>
                    </div>

                    <div class="mb-3">
                      <img
                        src="../assets/images/gebze-belediyesi.ico"
                        class="img-fluid rounded preview-img d-flex justify-content-center"
                        alt=""
                        style="width: 30%; height: auto; margin-left:35%; max-height:300px"
                      />
                      <label
                        for="resim"
                        class="btn btn-outline-primary mt-2"
                        style="width: 100%"
                      >
                        Fotoğraf Seç
                      </label>
                      <input
                        type="file"
                        name="resim"
                        id="resim"
                        style="display: none"
                        accept="image/*"
                        class="resim-input"
                      />
                    </div>

                    <button type="submit" class="btn btn-success" onclick="ekleButonu(event)">
                      Ekle
                    </button>
                    <a href="Etkinlikler.html" class="btn btn-secondary">İptal</a>
                  </form>
                </div>
              </div>
            </div>`;

  const input = document.querySelector(".resim-input");
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
}

function ekleButonu(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("haberTarih").value;
  const description = document.getElementById("haberIcerik").value;
  const imageInput = document.getElementById("resim");
  const imgSrc = imageInput.files[0]
    ? URL.createObjectURL(imageInput.files[0])
    : "../assets/images/gebze-belediyesi.ico";

  if (!title || !date || !description) {
    Swal.fire({
      icon: "warning",
      title: "Eksik Bilgi",
      text: "Lütfen tüm alanları doldurun.",
      confirmButtonText: "Tamam",
      customClass: {
        popup: "rounded-3",
        confirmButton: "btn btn-warning",
      },
    });
    return;
  }

  const formattedDate = date.split("-").reverse().join(".");

  let nav = document.getElementById("nav");

  nav.innerHTML = `<button class="buton ekle-butonu" onclick="ekle()">
              <div class="icon arti"></div>
              <span>Ekle</span>
            </button>
            <button class="buton sil-butonu" onclick="sil()">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                aria-hidden="true" focusable="false">
                <path
                  d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 01-1 .5H8a1 1 0 01-1-.5L5 9zm4 2v7h2v-7H9zm4 0v7h2v-7h-2z" />
              </svg>
              <span>Sil</span>
            </button>`;

  let content = document.getElementById("icerikler");
  content.innerHTML = `
        <div class="container-sm ml-1">
          <table class="table"
            style="box-shadow: 6px 6px 20px rgba(100, 100, 100, 0.738); background-color: rgba(204, 204, 204, 0.186); border-radius: 10px;">
            <thead>
              <tr>
                <th scope="col"><input type="checkbox" id="ana-checkbox" /></th>
                <th scope="col"></th>
                <th scope="col">Etkinlik Başlığı</th>
                <th scope="col">Tarih</th>
                <th scope="col">Açıklama</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                  <img src="${imgSrc}" alt="etkinlik-img" width="30px" height="30px" />
                </td>
                <td scope="row">${title}</td>
                <td scope="row">${formattedDate}</td>
                <td scope="row">${description}</td>
                <td scope="row" style="text-align: right">
                  <div class="dropdown-container">
                    <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button onclick="editActivities('${imgSrc}', '${title}', '${formattedDate}', '${description}')">
                        <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                        Düzenle
                      </button>
                      <button onclick="remove()" id="remove">
                        <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%" height="10%" />
                        Sil
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                  <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                    height="30px" />
                </td>
                <td scope="row">etkinlik</td>
                <td scope="row">19.05.2025</td>
                <td scope="row">...</td>
                <td scope="row" style="text-align: right">
                  <div class="dropdown-container">
                    <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button
                        onclick="editActivities('../assets/images/gebze-belediyesi.ico', 'etkinlik', '19.05.2025', '...')">
                        <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                        Düzenle
                      </button>
                      <button onclick="remove()" id="remove">
                        <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                          height="10%" />
                        Sil
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                  <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                    height="30px" />
                </td>
                <td scope="row">etkinlik</td>
                <td scope="row">19.05.2025</td>
                <td scope="row">...</td>
                <td scope="row" style="text-align: right">
                  <div class="dropdown-container">
                    <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button
                        onclick="editActivities('../assets/images/gebze-belediyesi.ico', 'etkinlik', '19.05.2025', '...')">
                        <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                        Düzenle
                      </button>
                      <button onclick="remove()" id="remove">
                        <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                          height="10%" />
                        Sil
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                  <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                    height="30px" />
                </td>
                <td scope="row">etkinlik</td>
                <td scope="row">19.05.2025</td>
                <td scope="row">...</td>
                <td scope="row" style="text-align: right">
                  <div class="dropdown-container">
                    <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button
                        onclick="editActivities('../assets/images/gebze-belediyesi.ico', 'etkinlik', '19.05.2025', '...')">
                        <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                        Düzenle
                      </button>
                      <button onclick="remove()" id="remove">
                        <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                          height="10%" />
                        Sil
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                  <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                    height="30px" />
                </td>
                <td scope="row">etkinlik</td>
                <td scope="row">19.05.2025</td>
                <td scope="row">...</td>
                <td scope="row" style="text-align: right">
                  <div class="dropdown-container">
                    <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button
                        onclick="editActivities('../assets/images/gebze-belediyesi.ico', 'etkinlik', '19.05.2025', '...')">
                        <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                        Düzenle
                      </button>
                      <button onclick="remove()" id="remove">
                        <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                          height="10%" />
                        Sil
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                  <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                    height="30px" />
                </td>
                <td scope="row">etkinlik</td>
                <td scope="row">20.02.2025</td>
                <td scope="row">...</td>
                <td scope="row" style="text-align: right">
                  <div class="dropdown-container">
                    <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button
                        onclick="editActivities('../assets/images/gebze-belediyesi.ico', 'etkinlik', '20.02.2025', '...')">
                        <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                        Düzenle
                      </button>
                      <button onclick="remove()" id="remove">
                        <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                          height="10%" />
                        Sil
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                  <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                    height="30px" />
                </td>
                <td scope="row">etkinlik</td>
                <td scope="row">30.03.2025</td>
                <td scope="row">...</td>
                <td scope="row" style="text-align: right">
                  <div class="dropdown-container">
                    <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button
                        onclick="editActivities('../assets/images/gebze-belediyesi.ico', 'etkinlik', '30.03.2025', '...')">
                        <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                        Düzenle
                      </button>
                      <button onclick="remove()" id="remove">
                        <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                          height="10%" />
                        Sil
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                  <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                    height="30px" />
                </td>
                <td scope="row">etkinlik</td>
                <td scope="row">30.04.2025</td>
                <td scope="row">...</td>
                <td scope="row" style="text-align: right">
                  <div class="dropdown-container">
                    <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button
                        onclick="editActivities('../assets/images/gebze-belediyesi.ico', 'etkinlik', '30.04.2025', '...')">
                        <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                        Düzenle
                      </button>
                      <button onclick="remove()" id="remove">
                        <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                          height="10%" />
                        Sil
                      </button>
                      
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

  const checkboxes = document.querySelectorAll(".checkbox-item");

  const anaCheckbox = document.getElementById("ana-checkbox");
  anaCheckbox.addEventListener("change", () => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = anaCheckbox.checked;
      checkbox.dispatchEvent(new Event("change"));
    });
  });
}

const checkboxes = document.querySelectorAll(".checkbox-item");

const anaCheckbox = document.getElementById("ana-checkbox");
anaCheckbox.addEventListener("change", () => {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = anaCheckbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  });
});

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
