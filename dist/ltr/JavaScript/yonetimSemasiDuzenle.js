// Her container için dropdown, fotoğraf değiştir, düzenle ve kaydet işlemleri
document.querySelectorAll(".container").forEach(function (container, idx) {
  var dropdownBtn = container.querySelector(".dropdownBtn");
  var dropdownContent = container.querySelector(".dropdown-content");
  var photoChange = container.querySelector(".dropdownPhotoChange");
  var editLink = container.querySelector(".dropdownEdit");
  var saveLink = container.querySelector(".dropdownSaveChanges");
  var fileInput = container.querySelector(".file-input");
  var img = container.querySelector(".photo-section img");
  var saveBtn = container.querySelector(".save-btn");
  var mudurlukCards = container.querySelectorAll(".mudurluk-card");

  // Dropdown aç/kapat
  if (dropdownBtn && dropdownContent) {
    dropdownBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", function (e) {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      }
    });
  }

  // Fotoğrafı Değiştir
  if (photoChange && fileInput) {
    photoChange.addEventListener("click", function (e) {
      e.preventDefault();
      fileInput.click();
      if (dropdownContent) dropdownContent.style.display = "none";
    });
    fileInput.addEventListener("change", function (event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Düzenle
  if (editLink) {
    editLink.addEventListener("click", function (e) {
      e.preventDefault();
      mudurlukCards.forEach(function (card) {
        card.setAttribute("contenteditable", "true");
      });
      if (saveBtn) saveBtn.style.display = "inline-block";
      if (dropdownContent) dropdownContent.style.display = "none";
    });
  }

  // Kaydet
  if (saveLink && saveBtn) {
    saveLink.addEventListener("click", function (e) {
      e.preventDefault();
      saveBtn.click();
      if (dropdownContent) dropdownContent.style.display = "none";
    });
  }
  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      let valid = true;
      mudurlukCards.forEach(function (card, cardIdx) {
        card.setAttribute("contenteditable", "false");
        var inputs = card.querySelectorAll("input.editable-text");
        var mudurlukAdi = inputs[0] ? inputs[0].value : "";
        var mudurAdi = inputs[1] ? inputs[1].value : "";
        var emailInput = card.querySelector("input[type='email']");
        var telInput = card.querySelector("input[type='tel']");
        var imgEl = card.querySelector("img");
        var imgSrc = imgEl ? imgEl.src : "";
        if (!mudurlukAdi.trim()) {
          alert("Müdürlük adı boş bırakılamaz!");
          inputs[0].focus();
          valid = false;
          return;
        }
        if (!mudurAdi.trim()) {
          alert("Müdür adı boş bırakılamaz!");
          inputs[1].focus();
          valid = false;
          return;
        }
        if (emailInput && !emailInput.value.trim()) {
          alert("E-posta alanı boş bırakılamaz!");
          emailInput.focus();
          valid = false;
          return;
        }
        if (telInput && !telInput.value.trim()) {
          alert("Telefon alanı boş bırakılamaz!");
          telInput.focus();
          valid = false;
          return;
        }
        var data = {
          mudurlukAdi: mudurlukAdi,
          mudurAdi: mudurAdi,
          email: emailInput ? emailInput.value : "",
          tel: telInput ? telInput.value : "",
          img: imgSrc,
        };
        localStorage.setItem(
          `yonetim_card_${idx}_${cardIdx}`,
          JSON.stringify(data)
        );
      });
      if (valid) {
        if (saveBtn) saveBtn.style.display = "none";
        alert("Değişiklikler kaydedildi!");
      }
    });
  }
});

// Sayfa açıldığında localStorage'dan yükle
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".container").forEach(function (container, idx) {
    container
      .querySelectorAll(".mudurluk-card")
      .forEach(function (card, cardIdx) {
        var dataStr = localStorage.getItem(`yonetim_card_${idx}_${cardIdx}`);
        if (dataStr) {
          var data = JSON.parse(dataStr);
          var inputs = card.querySelectorAll("input.editable-text");
          if (inputs[0]) inputs[0].value = data.mudurlukAdi || "";
          if (inputs[1]) inputs[1].value = data.mudurAdi || "";
          var imgEl = card.querySelector("img");
          if (imgEl && data.img) imgEl.src = data.img;
        }
      });
  });
});

// Tüm dropdown butonlarına tıklanma olayını tanımla
document.querySelectorAll(".dropdown-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation(); // Sayfa geneline yayılmasını engelle

    // Önce diğer açık dropdownları kapat
    document.querySelectorAll(".dropdown-content").forEach((drop) => {
      if (drop !== this.nextElementSibling) {
        drop.style.display = "none";
      }
    });

    // Şu anki butonun dropdown'unu aç/kapat
    const dropdown = this.nextElementSibling;
    if (dropdown) {
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    }
  });
});

// Sayfada boş bir yere tıklanınca tüm dropdown'lar kapanır
document.addEventListener("click", function () {
  document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
    dropdown.style.display = "none";
  });
});
