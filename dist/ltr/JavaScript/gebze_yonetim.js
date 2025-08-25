// Muhtarlar JavaScript Kodları
function jsonMuhtar() {
  //Muhtar Json
  var ekremUsanmaz = {
    name: "Ekrem USANMAZ",
    title: "Adem Yavuz Mahallesi Muhtarı",
    phone: "0538 632 83 12",
    loc: "Adem Yavuz Mahallesi 2322Sok. No:1 Gebze/Kocaeli",
    mail: "ekremusanmaz@gmail.com",
    imgSrc: "../assets/images/muhtarImg/ekremUsanmazMuhtar.png",
  };
  var tezcanGurlek = {
    name: "Tezcan GÜRLEK",
    title: "Ahatlı Mahallesi Muhtarı",
    phone: "0537 585 92 5",
    loc: "Ahatlı Mahallesi 3120 Sok. No:1/1 Gebze/Kocaeli",
    mail: "-",
    imgSrc: "../assets/images/muhtarImg/tezcanGurlekMuhtar.png",
  };
  var remziKandaz = {
    name: "Remzi KANDAZ",
    title: "Arapçeme Mahallesi Muhtarı",
    phone: "0532 680 14 20",
    loc: "Arapçeşme Mah. Kavak Cad.No:35 Gebze/Kocaeli",
    mail: "remzikandaz@hotmail.com",
    imgSrc: "../assets/images/muhtarImg/remziKandazMuhtar.png",
  };
  var halisTepe = {
    name: "Halis TEPE",
    title: "Balçık Mahallesi Muhtarı",
    phone: "0532 432 00 54",
    loc: "Balçık Mahallesi Mustafa Kemal Cad. No:47/A Balçık",
    mail: "halis.tepe41@hotmail.com",
    imgSrc: "../assets/images/muhtarImg/halisTepeMuhtar.png",
  };

  const MUHTAR = [ekremUsanmaz, tezcanGurlek, remziKandaz, halisTepe];

  return MUHTAR;
}

function muhtarEdit() {
  const muhtar = jsonMuhtar();
  const content = document.getElementById("icerikler");
  content.innerHTML = "";

  const table = document.createElement("table");
  table.className = "table mt-0";
  table.id = "table";
  table.style.width = "100%";
  table.style.backgroundColor = "rgba(204, 204, 204, 0.186)";
  table.style.boxShadow = " 6px 6px 20px rgba(100, 100, 100, 0.738)";
  table.style.borderRadius = "10px";
  table.style.border = "none";
  table.style.marginTop = "-30px";

  table.innerHTML = `
    <thead style="border-top: none">
      <tr>
        <th style="width: 15%; padding-left: 10px;">Resim</th>
        <th style="width: 20%">İsim</th>
        <th style="width: 15%; max-width: 15%;">Unvan</th>
        <th style="width: 15%; max-width: 15%;">Mail</th>
        <th style="width: 15%; max-width: 15%;">Telefon</th>
        <th style="width: 15%; max-width: 15%;">Adres</th>
        <th style="width: 15%; max-width: 15%;"></th>
      </tr>
    </thead>
    <tbody id="tableContent"></tbody>
  `;

  const tableContent = table.querySelector("#tableContent");
  var count = 0;
  for (let i = 0; i < 2; i++) {
    muhtar.forEach((muhtar) => {
      count++;
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>
          <img class="imgSrc" src="${muhtar.imgSrc}" alt="${muhtar.name}" width="80" height="50" /> 
        </td>
        <td class="name dot" title="${muhtar.name}">${muhtar.name}</td>
        <td class="title dot" title="${muhtar.title}">${muhtar.title}</td>
        <td class="mail dot" title="${muhtar.mail}">${muhtar.mail}</td>
        <td class="phone dot" title="${muhtar.phone}">${muhtar.phone}</td>
        <td class="loc dot" title="${muhtar.loc}">${muhtar.loc}</td>
        <td style="text-align:right;">
          <button class="btn w-10 p-1 edit" id="count${count}" onclick="editMuhtar(this)">Düzenle</button>
        </td>
      `;
      tableContent.appendChild(tr);

      tr.querySelector(`#count${count}`).addEventListener("click", () => {});
    });
  }

  content.appendChild(table);
}

function editMuhtar(element) {
  // Tablodaki Düzenleye basılan tr elementini alıp içindeki değerleri alıyoruz
  const tr = element.closest("tr");
  const name = tr.querySelector(".name").innerHTML;
  const title = tr.querySelector(".title").innerHTML;
  const mail = tr.querySelector(".mail").innerHTML;
  const phone = tr.querySelector(".phone").innerHTML;
  const loc = tr.querySelector(".loc").innerHTML;
  const imgSrc = tr.querySelector(".imgSrc").src;

  let content = document.getElementById("icerikler");
  // Muhtar Düzenleme sayfasını ekrana basıyoruz
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
                          <label for="title" class="form-label">İsim</label>
                          <input
                            type="text"
                            class="form-control"
                            id="nameInput"
                            value="${name}"
                            placeholder="İsim giriniz"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="title" class="form-label">Unvan</label>
                          <input
                            type="text"
                            class="form-control"
                            id="titleInput"
                            value="${title}"
                            placeholder="Unvan giriniz"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="title" class="form-label">Mail</label>
                          <input
                            type="text"
                            class="form-control"
                            id="mailInput"
                            value="${mail}"
                            placeholder="Mail giriniz"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="title" class="form-label">Telefon</label>
                          <input
                            type="text"
                            class="form-control"
                            id="phoneInput"
                            value="${phone}"
                            placeholder="Telefon giriniz"
                            required
                          />
                        </div>
                         <div class="mb-3">
                          <label for="title" class="form-label">Adres</label>
                          <textarea
                            class="form-control"
                            id="locInput"
                            placeholder="Adres giriniz"
                            rows="3"
                            required
                          >${loc}</textarea>
                        </div>
                            <div class="col-12 mb-3">
                        <img
                          id="imgSrcInput"
                          src="${imgSrc}"
                          class="img-fluid rounded preview-img d-flex justify-content-center"
                          alt="${name}'in resmi"
                          style="width: 30%; height: auto; margin-left:35%; max-height:300px; border:3px solid rgba(0, 0, 0, 0.65);"
                        />
                        <div style="text-align:center;">
                        <label
                          for="resim"
                          class="btn btn-outline-primary mt-2"
                          style="width: 95%"
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
                        </div>
                        <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-success ml-2 mb-2" style="width:150px" type="submit">
                          Güncelle
                        </button>
                        <a href="Gebze - Gebze Yonetim.html" class="btn btn-secondary ml-1 mb-2" style="width:150px">
                          İptal
                        </a>
                      </div>
                      </form>
                  </div>
                    `;

  const inputs = document.querySelectorAll(".resim-input");

  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        const self = this;

        reader.onload = function (e) {
          const container = self.closest(".col-12");
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
} // Muhtarlar bu kadar

function kardesSehirlerJson() {
  // kardeş şehirler json dosyası
  var acigolBel = {
    name: "Acıgöl Belediyesi",
    city: "Nevşehir",
    country: "Türkiye",
    imgSrc: "https://flagcdn.com/w320/tr.png",
  };
  var silvanBel = {
    name: "Silvan Belediyesi",
    city: "Diyarbakır",
    country: "Türkiye",
    imgSrc: "https://flagcdn.com/w320/tr.png",
  };
  var pileaBel = {
    name: "Pilea Belediyesi",
    city: "Selanik",
    country: "Yunanistan",
    imgSrc: "https://flagcdn.com/w320/gr.png",
  };
  var malazgirtBel = {
    name: "Malazgirt Belediyesi",
    city: "Muş",
    country: "Türkiye",
    imgSrc: "https://flagcdn.com/w320/tr.png",
  };
  var kakanjBel = {
    name: "Kakanj Belediyesi",
    city: "Kakanj",
    country: "Bosna Hersek",
    imgSrc: "https://flagcdn.com/w320/ba.png",
  };

  const city = [acigolBel, silvanBel, pileaBel, malazgirtBel, kakanjBel];

  return city;
}

function kardesSehirler() {
  const cities = kardesSehirlerJson();
  const content = document.getElementById("icerikler");
  content.innerHTML = "";

  const table = document.createElement("table"); // tabloya stil veriyoruz
  table.className = "table mt-0";
  table.id = "table";
  table.style.width = "100%";
  table.style.backgroundColor = "rgba(204, 204, 204, 0.186)";
  table.style.boxShadow = " 6px 6px 20px rgba(100, 100, 100, 0.738)";
  table.style.borderRadius = "10px";
  table.style.border = "none";
  table.style.marginTop = "-30px";

  // tablo başlıklarını yazdırıyoruz
  table.innerHTML = `
    <thead style="border-top: none">
      <tr>
        <th style="width: 8%; padding-left: 10px;">Resim</th>
        <th style="width: 20%">Belediye İsmi</th>
        <th style="width: 15%; max-width: 15%;">Şehir</th>
        <th style="width: 15%; max-width: 15%;">Ülke</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="tableContent"></tbody>
  `;

  const tableContent = table.querySelector("#tableContent");
  // jsondan çekilen verilerle birlikte içeriği yazdırıyoruz
  cities.forEach((city) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="dot"><img alt="${city.name}" class="w-6 h-4 rounded-sm inline-block align-middle mr-2 img" style="width:40px; height:25px;" src="${city.imgSrc}"></img></td>
      <td class="name dot" title="${city.name}">${city.name}</td>
      <td class="city dot" title="${city.city}">${city.city}</td>
      <td class="country dot" title="${city.country}">${city.country}</td>
      <td style="text-align:right;">
        <button class="btn w-10 p-1 edit" onclick="editKardesSehirler(this)">Düzenle</button>
      </td>
    `;
    tableContent.appendChild(tr);
  });

  content.appendChild(table);
} // kardeş şehirler .

function editKardesSehirler(element) {
  const tr = element.closest("tr");
  const name = tr.querySelector(".name").innerHTML;
  const city = tr.querySelector(".city").innerHTML;
  const country = tr.querySelector(".country").innerHTML;
  const img = tr.querySelector(".img").src;

  const content = document.getElementById("icerikler");

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
                          <label for="title" class="form-label">Belediye İsmi</label>
                          <input
                            type="text"
                            class="form-control"
                            id="nameInput"
                            value="${name}"
                            placeholder="Belediye ismi giriniz"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="title" class="form-label">Şehir</label>
                          <input
                            type="text"
                            class="form-control"
                            id="titleInput"
                            value="${city}"
                            placeholder="Şehir giriniz"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="title" class="form-label" >Ülke</label>
                          <select class="form-control select" id="select">
                          <option>Türkiye</option>
                          <option>Portekiz</option>
                          <option>Bosna Hersek</option>
                          <option>Yunanistan</option>
                          <option>Kırgızistan</option>
                          <option>Bulgaristan</option>
                          </select>
                        </div>
                            <div class="col-12 mb-3">
                        <img
                          id="imgSrcInput"
                          src="${img}"
                          class="img-fluid rounded preview-img d-flex justify-content-center"
                          alt="${name}"
                          style="width: 30%; height: auto; margin-left:35%; max-height:300px; border:3px solid rgba(0, 0, 0, 0.65);"
                        />
                        </div>
                        <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-success ml-2 mb-2" style="width:150px" type="submit">
                          Güncelle
                        </button>
                        <a href="Gebze - Gebze Yonetim.html" class="btn btn-secondary ml-1 mb-2" style="width:150px">
                          İptal
                        </a>
                      </div>
                      </form>
                  </div>
                    `;
  const flagMap = {
    Türkiye: "https://flagcdn.com/w320/tr.png",
    Portekiz: "https://flagcdn.com/w320/pt.png",
    "Bosna Hersek": "https://flagcdn.com/w320/ba.png",
    Yunanistan: "https://flagcdn.com/w320/gr.png",
    Kırgızistan: "https://flagcdn.com/w320/kg.png",
    Bulgaristan: "https://flagcdn.com/w320/bg.png",
  };

  const select = document.getElementById("select");
  const imgSrc = document.getElementById("imgSrcInput");

  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].text === country) {
      select.selectedIndex = i;
      imgSrc.src = flagMap[country]; // seçili olan selectteki image mapdeki ile değiştiriliyor
      break;
    }
  }

  select.addEventListener("change", () => {
    // select değişince imagei de değiştirir
    const selectedCountry = select.value; //seçilen select etiketindeki değer keye atanıyor
    imgSrc.src = flagMap[selectedCountry]; // atanan key ile mapdeki src alınıp image değişiyor
  });
}

//uye
function uyeJson() {
  var anadoluBelBir = {
    name: "ANADOLU MEDENİYETLER BELEDİYELER BİRLİĞİ",
    link: "https://www.anadolubirlik.org.tr/",
    imgSrc:
      "../assets/images/belediyeBirlikleriImg/anadoluMedeniyetleriBirligi.png",
  };
  var birlesmisKent = {
    name: "BİRLEŞMİŞ KENTLER VE YEREL YÖNETİMLER",
    link: "https://uclg.org/",
    imgSrc:
      "../assets/images/belediyeBirlikleriImg/BirlesmisKentlerBirligi.png",
  };
  var gebzeBelBir = {
    name: "GEBZE BELEDİYELER BİRLİĞİ",
    link: "https://www.gebzebelediyelerbirligi.org/",
    imgSrc:
      "../assets/images/belediyeBirlikleriImg/gebzeBelediyelerBirligi.png",
  };
  var marmaraBelBir = {
    name: "MARMARA BELEDİYELER BİRLİĞİ",
    link: "https://www.marmara.gov.tr/",
    imgSrc:
      "../assets/images/belediyeBirlikleriImg/marmaraBelediyelerBirligi.png",
  };
  var tarihiKentlerBir = {
    name: "TARİHİ KENTLER BİRLİĞİ",
    link: "https://www.tarihikentlerbirligi.org/",
    imgSrc: "../assets/images/belediyeBirlikleriImg/tarihiKentlerBirligi.png",
  };
  var turkDunyasiBelBir = {
    name: "TÜRK DÜNYASI BELEDİYELER BİRLİĞİ",
    link: "https://www.tdbb.org.tr/?lang=tr",
    imgSrc:
      "../assets/images/belediyeBirlikleriImg/turkDunyasıBelediyelerBirligi.png",
  };

  const uyeliks = [
    anadoluBelBir,
    birlesmisKent,
    gebzeBelBir,
    marmaraBelBir,
    tarihiKentlerBir,
    turkDunyasiBelBir,
  ];

  return uyeliks;
}

function uyelikler() {
  const uyelikler = uyeJson();

  const content = document.getElementById("icerikler");
  content.innerHTML = "";

  const table = document.createElement("table"); // tabloya stil veriyoruz
  table.className = "table mt-0";
  table.id = "table";
  table.style.width = "100%";
  table.style.backgroundColor = "rgba(204, 204, 204, 0.186)";
  table.style.boxShadow = " 6px 6px 20px rgba(100, 100, 100, 0.738)";
  table.style.borderRadius = "10px";
  table.style.border = "none";
  table.style.marginTop = "-30px";

  // tablo başlıklarını yazdırıyoruz
  table.innerHTML = `
    <thead style="border-top: none">
      <tr>
        <th style="width: 15%; padding-left: 10px;">Resim</th>
        <th style="width: 30%">Üye Olunan Birliğin İsmi</th>
        <th style="width: 35%; ">Link</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="tableContent"></tbody>
  `;

  const tableContent = table.querySelector("#tableContent");
  // jsondan çekilen verilerle birlikte içeriği yazdırıyoruz
  uyelikler.forEach((uye) => {
    const tr = document.createElement("tr");
    tr.innerHTML = ` 
      <td class="dot"><img alt="${uye.name}" class="w-6 h-4 rounded-sm inline-block align-middle mr-2 img" style="width:40px; height:25px;" src="${uye.imgSrc}"></img></td>
      <td class="name dot" title="${uye.name}">${uye.name}</td>
      <td class="link dot" title="${uye.link}">${uye.link}</td>
      <td style="text-align:right;">
        <button class="btn w-10 p-1 edit" onclick="editUyelikler(this)">Düzenle</button>
      </td>
    `;
    tableContent.appendChild(tr);
  });
  content.appendChild(table);
}

function editUyelikler(element) {
  console.log("saldır fenerbahçe oley");
  const tr = element.closest("tr");
  const name = tr.querySelector(".name").innerHTML;
  const link = tr.querySelector(".link").innerHTML;
  const img = tr.querySelector(".img").src;

  const content = document.getElementById("icerikler");

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
                          <label for="title" class="form-label">Birlik İsmi</label>
                          <input
                            type="text"
                            class="form-control"
                            id="nameInput"
                            value="${name}"
                            placeholder="Belediye ismi giriniz"
                            required
                          />
                        </div>
                        <div class="mb-3">
                          <label for="title" class="form-label">Link</label>
                          <textarea
                            type="text"
                            class="form-control"
                            id="linkInput"
                            placeholder="Link giriniz"
                            rows="3"
                            required
                          >${link}</textarea>
                        </div>
                           <div class="mb-3">
                      <img
                        src="${img}"
                        class="img-fluid rounded preview-img d-flex justify-content-center"
                        alt="${name}"
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
                        <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-success ml-2 mb-2" style="width:150px" type="submit">
                          Güncelle
                        </button>
                        <a href="Gebze - Gebze Yonetim.html" class="btn btn-secondary ml-1 mb-2" style="width:150px">
                          İptal
                        </a>
                      </div>
                      </form>
                  </div>
                    `;

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
