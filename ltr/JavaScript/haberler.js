//  <!-- DÜZENLE-->

var oldContent = "";
function editNews(imgSrc, title, category, date, exp, element) {
  const rowIndex = element.closest("tr").rowIndex;
  sessionStorage.setItem("rowIndex", rowIndex);
  let content = document.getElementById("icerikler");
  date = date.split(".").reverse().join("-");
  oldContent = content.innerHTML;

  content.innerHTML = `
              <div class="d-flex justify-content-center">
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
                        <label for="kategori" class="form-label"
                        >Kategori</label
                        >
                        <select class="select form-control" id="kategori">
                          <option id="yonetim">Yönetim</option>
                          <option id="baskanlik">Başkanlık</option>
                          <option id="halk">Halk</option>
                          <option id="genel">Genel</option>
                        </select>
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
                          src=""
                          class="img-fluid rounded preview-img d-flex justify-content-center"
                          alt="${title} haber başlığının resmi"
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
                      <a href="Haberler.html" class="btn btn-secondary">İptal</a>
                    </form>
                  </div>
                </div>
              </div>
              `;
  document.getElementById("nav").innerHTML = ``;

  if (category === "Yönetim") {
    document.getElementById("yonetim").selected = true;
  }
  if (category === "Başkanlık") {
    document.getElementById("baskanlik").selected = true;
  }
  if (category === "Halk") {
    document.getElementById("halk").selected = true;
  }
  if (category === "Genel") {
    document.getElementById("genel").selected = true;
  }

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
                        placeholder="Haber başlığını giriniz"
                        required
                      />
                    </div>

                    <div class="mb-3">
                        <label for="kategori" class="form-label"
                        >Kategori</label
                        >
                        <select class="select" id="kategori">
                          <option id="yonetim">Yönetim</option>
                          <option id="baskanlik">Başkanlık</option>
                          <option id="halk">Halk</option>
                          <option id="genel">Genel</option>
                        </select>
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
                        placeholder="Haber içeriğini yazınız..."
                        required
                      ></textarea>
                    </div>

                    <div class="mb-3">
                      <img
                        src=""
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

                    <button type="submit" class="btn btn-success" onclick="ekleButonu(this)">
                      Ekle
                    </button>
                    <a href="Haberler.html" class="btn btn-secondary">İptal</a>
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
  const category = document.getElementById("haberKategori").value;
  const description = document.getElementById("haberIcerik").value;
  const imageInput = document.getElementById("resim");
  const imgSrc = imageInput.files[0]
    ? URL.createObjectURL(imageInput.files[0])
    : "../assets/images/gebze-belediyesi.ico";

  if (!title || !date || !description) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "Tüm alanları doldurun!",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#f8d7da",
      color: "#721c24",
    });
    return;
  }

  const formattedDate = date.split("-").reverse().join(".");

  let content = document.getElementById("icerikler");
  content.innerHTML = `
        <div class="container-sm ml-1">
    <table class="table"
        style="box-shadow: 6px 6px 20px rgba(100, 100, 100, 0.738); background-color: rgba(204, 204, 204, 0.186); border-radius: 10px;">

        <thead style="border-top: none">
            <tr>
                <th scope="col" style="width: 3%">
                    <input type="checkbox" name="allCheck" id="ana-checkbox" style="width: 20px; height:20px" />
                </th>
                <th scope="col" style="width: 12%">Haber Resmi</th>
                <th scope="col" style="width: 14%">Haber Başlığı</th>
                <th scope="col" style="width: 14%">Kategori</th>
                <th scope="col" style="width: 10%">Tarih</th>
                <th scope="col" style="width: 18%">Açıklama</th>

                <th scope="col" style="text-align: right">
                    <input type="text" name="search" id="search" placeholder="Ara" />
                    <button id="searchBtn" onclick="search()">ARA</button>
                </th>
            </tr>
        </thead>
        <tbody id="tableContent">
            <tr>
                <th scope="col"><input type="checkbox" class="checkbox-item" /></th>
                <td scope="row">
                    <img src="${imgSrc}" alt="etkinlik-img" width="30px" height="30px" />
                </td>
                <td scope="row">${title}</td>
                <td scope="row">${category}</td>
                <td scope="row">${formattedDate}</td>
                <td scope="row">${description}</td>
                <td scope="row" style="text-align: right">
                    <div class="dropdown-container">
                        <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                            İşlemler
                        </button>
                        <div class="dropdown-menu">
                            <button onclick="editNews('${imgSrc}', '${title}', '${category}' , '${formattedDate}', '${description}')">
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
                <td style="width: 3%">
                    <input class="checkbox-item" type="checkbox" name="allCheck" style="width: 10px" />
                </td>
                <td style="width: 12%">
                    <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                        height="30px" style="margin-left: 18%" />
                </td>
                <td style="width: 16%" class="news dot" title="Ekonomide Büyüme Rakamları Açıklandı">
                    Ekonomide Büyüme Rakamları Açıklandı
                </td>
                <td style="width: 14%" class="management">Başkanlık</td>
                <td style="width: 10%" class="date">19.06.2024</td>
                <td style="width: 18%" class="exp dot" title="Bu yılın ikinci çeyreğinde ekonomi %5.2 büyüdü">
                    Bu yılın ikinci çeyreğinde ekonomi %5.2 büyüdü
                </td>
                <td style="text-align: right">
                    <div class="dropdown-container">
                        <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                            İşlemler
                        </button>
                        <div class="dropdown-menu">
                            <button
                                onclick="editNews('../assets/images/gebze-belediyesi.ico','Ekonomide Büyüme Rakamları Açıklandı','Başkanlık','19.06.2024','Bu yılın ikinci çeyreğinde ekonomi %5.2 büyüdü',this)">
                                <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                                Düzenle
                            </button>
                            <button id="remove" onclick="remove()">
                                <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                                    height="10%" />
                                Sil
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 3%">
                    <input class="checkbox-item" type="checkbox" name="allCheck" style="width: 10px" />
                </td>
                <td style="width: 12%">
                    <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                        height="30px" style="margin-left: 18%" />
                </td>
                <td style="width: 14%" class="news dot" title="Basketbol Takımımız Gruplardan Çıktı">
                    Basketbol Takımımız Gruplardan Çıktı
                </td>
                <td style="width: 14%" class="management">Başkanlık</td>
                <td style="width: 10%" class="date">15.09.2023</td>
                <td style="width: 18%" class="exp dot" title="Turnuvada bir üst tura yükseldi">
                    Turnuvada bir üst tura yükseldi
                </td>
                <td style="text-align: right">
                    <div class="dropdown-container">
                        <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                            İşlemler
                        </button>
                        <div class="dropdown-menu">
                            <button
                                onclick="editNews('../assets/images/gebze-belediyesi.ico','Basketbol Takımımız Gruplardan Çıktı','Başkanlık','15.09.2023','Turnuvada bir üst tura yükseldi',this)">
                                <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                                Düzenle
                            </button>
                            <button id="remove" onclick="remove()">
                                <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                                    height="10%" />
                                Sil
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 3%">
                    <input class="checkbox-item" type="checkbox" name="allCheck" style="width: 10px" />
                </td>
                <td style="width: 12%">
                    <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                        height="30px" style="margin-left: 18%" />
                </td>
                <td style="width: 14%" class="news dot" title="haber">
                    haber
                </td>
                <td style="width: 14%" class="management">Yönetim</td>
                <td style="width: 10%" class="date">30.02.2025</td>
                <td style="width: 10%" class="exp dot" title="...">...</td>
                <td style="text-align: right">
                    <div class="dropdown-container">
                        <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                            İşlemler
                        </button>
                        <div class="dropdown-menu">
                            <button
                                onclick="editNews('../assets/images/gebze-belediyesi.ico','haber','Başkanlık','15.09.2023','...',this)">
                                <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                                Düzenle
                            </button>
                            <button id="remove" onclick="remove()">
                                <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                                    height="10%" />
                                Sil
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 3%">
                    <input class="checkbox-item" type="checkbox" name="allCheck" style="width: 10px" />
                </td>
                <td style="width: 12%">
                    <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                        height="30px" style="margin-left: 18%" />
                </td>
                <td style="width: 14%" class="news dot" title="haber">
                    haber
                </td>
                <td style="width: 14%" class="management">Yönetim</td>
                <td style="width: 10%" class="date">30.02.2025</td>
                <td style="width: 10%" class="exp dot" title="...">...</td>
                <td style="text-align: right">
                    <div class="dropdown-container">
                        <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                            İşlemler
                        </button>
                        <div class="dropdown-menu">
                            <button
                                onclick="editNews('../assets/images/gebze-belediyesi.ico','haber','Başkanlık','15.09.2023','...',this)">
                                <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                                Düzenle
                            </button>
                            <button id="remove" onclick="remove()">
                                <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                                    height="10%" />
                                Sil
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 3%">
                    <input class="checkbox-item" type="checkbox" name="allCheck" style="width: 10px" />
                </td>
                <td style="width: 12%">
                    <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                        height="30px" style="margin-left: 18%" />
                </td>
                <td style="width: 14%" class="news dot" title="haber">
                    haber
                </td>
                <td style="width: 14%" class="management">Yönetim</td>
                <td style="width: 10%" class="date">30.02.2025</td>
                <td style="width: 10%" class="exp dot" title="...">...</td>
                <td style="text-align: right">
                    <div class="dropdown-container">
                        <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                            İşlemler
                        </button>
                        <div class="dropdown-menu">
                            <button
                                onclick="editNews('../assets/images/gebze-belediyesi.ico','haber','Başkanlık','15.09.2023','...',this)">
                                <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                                Düzenle
                            </button>
                            <button id="remove" onclick="remove()">
                                <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                                    height="10%" />
                                Sil
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 3%">
                    <input class="checkbox-item" type="checkbox" name="allCheck" style="width: 10px" />
                </td>
                <td style="width: 12%">
                    <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                        height="30px" style="margin-left: 18%" />
                </td>
                <td style="width: 14%" class="news dot" title="haber">
                    haber
                </td>
                <td style="width: 14%" class="management">Yönetim</td>
                <td style="width: 10%" class="date">30.02.2025</td>
                <td style="width: 10%" class="exp dot" title="...">...</td>
                <td style="text-align: right">
                    <div class="dropdown-container">
                        <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                            İşlemler
                        </button>
                        <div class="dropdown-menu">
                            <button
                                onclick="editNews('../assets/images/gebze-belediyesi.ico','haber','Başkanlık','15.09.2023','...',this)">
                                <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                                Düzenle
                            </button>
                            <button id="remove" onclick="remove()">
                                <img src="../assets/images/dropdown_svg/rubbish-bin.svg" alt="remove" width="10%"
                                    height="10%" />
                                Sil
                            </button>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 3%">
                    <input class="checkbox-item" type="checkbox" name="allCheck" style="width: 10px" />
                </td>
                <td style="width: 12%">
                    <img src="../assets/images/gebze-belediyesi.ico" alt="gebze-belediyesi-img" width="30px"
                        height="30px" style="margin-left: 18%" />
                </td>
                <td style="width: 14%" class="news dot" title="haber">
                    haber
                </td>
                <td style="width: 14%" class="management">Yönetim</td>
                <td style="width: 10%" class="date">30.02.2025</td>
                <td style="width: 10%" class="exp dot" title="...">...</td>
                <td style="text-align: right">
                    <div class="dropdown-container">
                        <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                            İşlemler
                        </button>
                        <div class="dropdown-menu">
                            <button
                                onclick="editNews('../assets/images/gebze-belediyesi.ico','haber','Başkanlık','15.09.2023','...',this)">
                                <img src="../assets/images/dropdown_svg/edit.svg" alt="edit" width="10%" height="10%" />
                                Düzenle
                            </button>
                            <button id="remove" onclick="remove()">
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
    });
  });
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

function sil() {
  const checkboxes = document.querySelectorAll(".checkbox-item");
  let seciliVar = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      seciliVar = true;
      const row = checkbox.closest("tr");
      // Sadece tbody içindeki satırları sil, thead'i koru
      if (row && row.parentNode && row.parentNode.id === "tableContent") {
        row.remove();
      }
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

// Sayfa dışında bir yere tıklanınca menü kapanır
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown-container")) {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((el) => (el.style.display = "none"));
  }
});

//   <!--SEARCH KISMI-->

//V ara butonuna gerek kalmadan doğrudan inputa yazılanı alır ve tabloya yansıtır
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("input", search);
});
let originalContent = ``;
function search() {
  document.getElementById("search").addEventListener("input", search);
  const searchText = document.getElementById("search");
  const news = document.getElementsByClassName("news");
  const content = document.getElementById("tableContent");

  if (originalContent === "") {
    originalContent = content.innerHTML;
  }

  if (searchText.value.trim() === "") {
    content.innerHTML = originalContent;
    return;
  }

  const newsTitle = [];

  for (let i = 0; i < news.length; i++) {
    newsTitle.push(news[i]);
  }

  content.innerHTML = ``;
  var count = 0;
  newsTitle.forEach((title) => {
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
                    class="checkbox-item"
                  />
                </td>
                <td style="width: 12%">
                  ${td[1].innerHTML}
                </td>
                <td style="width: 14%" class="news dot">${td[2].textContent}</td>
                <td style="width: 14%" class="management dot">${td[3].textContent}</td>
                <td style="width: 10%" class="date dot">${td[4].textContent}</td>
                <td style="width: 30%" class="exp dot">${td[5].textContent}</td>
                <td style="text-align: right">
                  <div class="dropdown-container">
                    <button
                      class="dropdown-toggle"
                      onclick="toggleDropdown(this)"
                    >
                      İşlemler
                    </button>
                    <div class="dropdown-menu">
                      <button onclick="editNews()">
                        <img
                          src="../assets/images/dropdown_svg/edit.svg"
                          alt="edit"
                          width="10%"
                          height="10%"
                        />
                        Düzenle
                      </button>
                      <button onclick="remove()">
                        <img
                          src="../assets/images/dropdown_svg/rubbish-bin.svg"
                          alt="remove"
                          width="10%"
                          height="10%"
                        />
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

  if (count == newsTitle.length) {
    document.getElementById("tableContent").innerHTML = `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 20px;">
                    <span style="color: #2196f3; font-weight: bold;">
                      ARAMANIZLA İLGİLİ BİR SONUÇ BULUNAMADI!
                    </span>
                  </td>
                </tr>`;
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

  // Arama sonrası editNews ve remove fonksiyonlarını yeniden bağla
  setTimeout(() => {
    document.querySelectorAll(".dropdown-menu button").forEach((btn) => {
      if (btn.textContent.includes("Düzenle")) {
        btn.onclick = function () {
          // Parametreleri ilgili satırdan al
          const tr = btn.closest("tr");
          const imgSrc = tr.querySelector("img").src;
          const title = tr.querySelector(".news").textContent;
          const category = tr.querySelector(".management").textContent;
          const date = tr.querySelector(".date").textContent;
          const exp = tr.querySelector(".exp").textContent;
          editNews(imgSrc, title, category, date, exp, btn);
        };
      }
      if (btn.textContent.includes("Sil")) {
        btn.onclick = function () {
          const tr = btn.closest("tr");
          // Sadece tbody içindeki satırları sil, thead'i koru
          if (tr && tr.parentNode && tr.parentNode.id === "tableContent") {
            tr.remove();
          }
        };
      }
    });
  }, 0);
}

//   <!-- REMOVE -->

function remove() {
  let tr = document.getElementById("remove").closest("tr");
  // Sadece tbody içindeki satırları sil, thead'i koru
  if (tr && tr.parentNode && tr.parentNode.id === "tableContent") {
    tr.remove();
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

//   <!-- Dropdowndaki kaymayı engeller -->

function toggleDropdown(button) {
  const menu = button.nextElementSibling;

  // Diğer açık menüleri kapat
  document.querySelectorAll(".filter-menu").forEach((otherMenu) => {
    if (otherMenu !== menu) {
      otherMenu.style.display = "none";
    }
  });

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    // İlk olarak menüyü göster ve 'left'i sıfırla
    menu.style.display = "block";
    menu.style.left = "0px"; // BU SATIR ÖNEMLİ!

    // Pozisyonu kontrol et: sağdan taşıyor mu?
    const rect = menu.getBoundingClientRect();
    const overflow = rect.right - window.innerWidth;
    if (overflow > 0) {
      menu.style.left = `-${overflow + 10}px`; // Taşmayı engelle
    }
  }
}

// Dış tıklamada menüyü kapat
document.addEventListener("click", function (e) {
  document.querySelectorAll(".filter-container").forEach((container) => {
    if (!container.contains(e.target)) {
      const menu = container.querySelector(".filter-menu");
      if (menu) menu.style.display = "none";
    }
  });
});

//    <!-- Şuan da mevcut olan kategoriye göre filtreleme yapmamızı sağlar -->

function filtreleKategoriler(secilenKategoriler) {
  const satirlar = document.querySelectorAll("#tableContent tr");

  satirlar.forEach((satir) => {
    const kategori = satir.classList[0]; // sadece ilk sınıf

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

document.querySelectorAll(".btn-uygula").forEach((btn) => {
  btn.addEventListener("click", function () {
    const secilenler = Array.from(
      document.querySelectorAll(".checkbox-item:checked")
    ).map((cb) => cb.getAttribute("data-kategori"));

    filtreleKategoriler(secilenler);
  });
});

document.querySelectorAll(".btn-sil").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".checkbox-item").forEach((cb) => {
      cb.checked = false;
    });

    filtreleKategoriler([]); // Hepsini geri göster
  });
});

//   <!-- yeni eklenecek haberlin seçilen kategoriye göre filtrelenmesini sağlar -->

function yeniHaberEkle(kategori, baslik, aciklama, tarih, resimURL) {
  // Tabloya yeni satır ekleme
  const tbody = document.getElementById("tableContent");
  const tr = document.createElement("tr");

  // Kategori class yerine data-kategori kullanıyoruz
  tr.setAttribute("data-kategori", kategori);

  tr.innerHTML = `
      <td><input class="checkbox-item" type="checkbox" /></td>
      <td><img src="${resimURL}" width="30px" style="margin-left: 18%;" /></td>
      <td class="news dot" title="${baslik}">${baslik}</td>
      <td>${kategori}</td>
      <td class="date">${tarih}</td>
      <td class="exp dot" title="${aciklama}">${aciklama}</td>
      <td style="text-align: right">
        <div class="dropdown-container">
          <button class="dropdown-toggle" onclick="toggleDropdown(this)">İşlemler</button>
          <div class="dropdown-menu">
            <button onclick="editNews('${resimURL}','${baslik}','${kategori}','${tarih}','${aciklama}',this)">
              <img src="../assets/images/dropdown_svg/edit.svg" width="10%" height="10%" />
              Düzenle
            </button>
            <button id="remove" onclick="remove()">
              <img src="../assets/images/dropdown_svg/rubbish-bin.svg" width="10%" height="10%" />
              Sil
            </button>
          </div>
        </div>
      </td>
    `;

  tbody.appendChild(tr);

  // Eğer kategori filtre menüsünde yoksa, onu da ekle
  kategoriFiltreyeEkle(kategori);
}

function kategoriFiltreyeEkle(kategori) {
  const filtreMenu = document.querySelector(".filter-menu");
  const mevcutCheckbox = filtreMenu.querySelector(
    `input[data-kategori="${kategori}"]`
  );

  if (!mevcutCheckbox) {
    const label = document.createElement("label");
    label.innerHTML = `
        <input type="checkbox" class="checkbox-item" data-kategori="${kategori}" />
        ${kategori.charAt(0).toUpperCase() + kategori.slice(1)}
      `;
    filtreMenu.insertBefore(label, filtreMenu.querySelector("div")); // Temizle/Uygula butonlarının üstüne ekler
    filtreMenu.insertBefore(
      document.createElement("br"),
      filtreMenu.querySelector("div")
    );
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

// Sayfa dışında bir yere tıklanınca menü kapanır
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown-container")) {
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((el) => (el.style.display = "none"));
  }
});
