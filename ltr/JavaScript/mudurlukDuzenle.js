// Dropdown ve biyografi logic
document.querySelectorAll(".card").forEach(function (card, idx) {
  // Dropdown 1
  var dropdownBtn = card.querySelector(".dropdownBtn");
  var dropdownContent = card.querySelector(".dropdown-content");
  var photoChange = card.querySelector(".dropdownPhotoChange");
  var saveLink = card.querySelector(".dropdownSaveChanges");
  var cancelLink = card.querySelector(".dropdownCancel");
  var fileInput = card.querySelector('input[type="file"]');
  var img = card.querySelector("img");
  var nameInput = card.querySelector('input[type="text"]');
  var emailInput = card.querySelector('input[type="email"]');
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
  if (photoChange && fileInput && img) {
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
  // Kaydet
  if (saveLink) {
    saveLink.addEventListener("click", function (e) {
      e.preventDefault();
      // Kaydet fonksiyonu
      const birimAdi = card.querySelector("h2").innerText.trim();
      const isim = nameInput.value.trim();
      const email = emailInput.value.trim();
      const photo = img.src;
      let allData = JSON.parse(localStorage.getItem("mudurlukler")) || [];
      allData[idx] = { birimAdi, isim, email, photo };
      localStorage.setItem("mudurlukler", JSON.stringify(allData));

      if (dropdownContent) dropdownContent.style.display = "none";
    });
  }
  // İptal
  if (cancelLink) {
    cancelLink.addEventListener("click", function (e) {
      e.preventDefault();
      // İptal fonksiyonu
      const savedData = JSON.parse(localStorage.getItem("mudurlukler")) || [];
      if (savedData[idx]) {
        card.querySelector("h2").innerText = savedData[idx].birimAdi;
        nameInput.value = savedData[idx].isim;
        emailInput.value = savedData[idx].email;
        img.src = savedData[idx].photo;
      } else {
        window.location.reload();
      }
      if (dropdownContent) dropdownContent.style.display = "none";
    });
  }

  // Dropdown 2: Biyografi (modal aç)
  var dropdownBtnBio = card.querySelector(".dropdownBtnBio");
  var dropdownContentBio = card.querySelector(".dropdown-content-bio");
  var bioBtn = card.querySelector(".dropdownBioBtn");
  var yonetmelikBtn = card.querySelector(".dropdownYonetmelikBtn");
  var bioModal = card.querySelector(".bio-modal");
  var bioTextarea = bioModal ? bioModal.querySelector(".bio-textarea") : null;
  var bioModalClose = bioModal
    ? bioModal.querySelector(".bio-modal-close")
    : null;
  var bioEditBtn = bioModal ? bioModal.querySelector(".bio-edit-btn") : null;
  var bioSaveBtn = bioModal ? bioModal.querySelector(".bio-save-btn") : null;
  var yonetmelikModal = card.querySelector(".yonetmelik-modal");
  var yonetmelikTextarea = yonetmelikModal
    ? yonetmelikModal.querySelector(".yonetmelik-textarea")
    : null;
  var yonetmelikModalClose = yonetmelikModal
    ? yonetmelikModal.querySelector(".yonetmelik-modal-close")
    : null;
  var yonetmelikEditBtn = yonetmelikModal
    ? yonetmelikModal.querySelector(".yonetmelik-edit-btn")
    : null;
  var yonetmelikSaveBtn = yonetmelikModal
    ? yonetmelikModal.querySelector(".yonetmelik-save-btn")
    : null;

  // Biyografi modalı: Düzenle/Kaydet
  if (bioEditBtn && bioTextarea && bioSaveBtn) {
    bioEditBtn.addEventListener("click", function () {
      bioTextarea.disabled = false;
      bioTextarea.focus();
      bioSaveBtn.disabled = false;
      bioEditBtn.disabled = true;
    });
    bioSaveBtn.addEventListener("click", function () {
      bioTextarea.disabled = true;
      bioSaveBtn.disabled = true;
      bioEditBtn.disabled = false;
      // Burada isterseniz localStorage'a kaydedebilirsiniz
    });
  }
  // Yönetmelik modalı: Düzenle/Kaydet
  if (yonetmelikEditBtn && yonetmelikTextarea && yonetmelikSaveBtn) {
    yonetmelikEditBtn.addEventListener("click", function () {
      yonetmelikTextarea.disabled = false;
      yonetmelikTextarea.focus();
      yonetmelikSaveBtn.disabled = false;
      yonetmelikEditBtn.disabled = true;
    });
    yonetmelikSaveBtn.addEventListener("click", function () {
      yonetmelikTextarea.disabled = true;
      yonetmelikSaveBtn.disabled = true;
      yonetmelikEditBtn.disabled = false;
      // Burada isterseniz localStorage'a kaydedebilirsiniz
    });
  }
  if (dropdownBtnBio && dropdownContentBio) {
    dropdownBtnBio.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownContentBio.style.display =
        dropdownContentBio.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", function (e) {
      if (dropdownContentBio.style.display === "block") {
        dropdownContentBio.style.display = "none";
      }
    });
  }
  if (bioBtn && bioModal) {
    bioBtn.addEventListener("click", function (e) {
      e.preventDefault();
      bioModal.style.display = "flex";
      if (dropdownContentBio) dropdownContentBio.style.display = "none";
    });
  }
  if (bioModalClose && bioModal) {
    bioModalClose.addEventListener("click", function () {
      bioModal.style.display = "none";
    });
  }
  if (bioModal) {
    bioModal.addEventListener("click", function (e) {
      if (e.target === bioModal) {
        bioModal.style.display = "none";
      }
    });
  }
  // Yönetmelik modal logic
  if (yonetmelikBtn && yonetmelikModal) {
    yonetmelikBtn.addEventListener("click", function (e) {
      e.preventDefault();
      yonetmelikModal.style.display = "flex";
      if (dropdownContentBio) dropdownContentBio.style.display = "none";
    });
  }
  if (yonetmelikModalClose && yonetmelikModal) {
    yonetmelikModalClose.addEventListener("click", function () {
      yonetmelikModal.style.display = "none";
    });
  }
  if (yonetmelikModal) {
    yonetmelikModal.addEventListener("click", function (e) {
      if (e.target === yonetmelikModal) {
        yonetmelikModal.style.display = "none";
      }
    });
  }
});
// Sayfa yüklenince localStorage'dan verileri yükle
function loadData() {
  const savedData = JSON.parse(localStorage.getItem("mudurlukler")) || [];
  const cards = document.querySelectorAll(".card");
  savedData.forEach((data, index) => {
    if (cards[index]) {
      cards[index].querySelector("h2").innerText = data.birimAdi;
      cards[index].querySelector('input[type="text"]').value = data.isim;
      cards[index].querySelector('input[type="email"]').value = data.email;
      if (data.photo) cards[index].querySelector("img").src = data.photo;
    }
  });
}
loadData();
