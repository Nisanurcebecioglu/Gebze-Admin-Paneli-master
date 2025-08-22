// Dropdown logic entegre yonetimSemasiDuzenle.html'den
// Her kart için doğru img ve file input'u bulacak şekilde güncellendi
document.querySelectorAll(".container > .card").forEach(function (card, idx) {
  var i = idx + 1;
  var dropdownBtn = card.querySelector(".dropdownBtn");
  var dropdownContent = card.querySelector(".dropdown-content");
  var photoChange = card.querySelector(".dropdownPhotoChange");
  var saveLink = card.querySelector(".dropdownSaveChanges");
  var fileInput = card.querySelector("#yardimci" + i + "FileInput");
  var img = card.querySelector("#yardimci" + i + "Image");

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
});
function previewImage(event, id) {
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById(id + "Image").src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function saveData(id) {
  const isimEl = document.getElementById(id + "Isim");
  const emailEl = document.getElementById(id + "Email");
  const telEl = document.getElementById(id + "Telefon");
  const img = document.getElementById(id + "Image").src;
  const isim = isimEl.innerText;
  const email = emailEl.value;
  const tel = telEl.value;
  if (!isim.trim()) {
    alert("İsim alanı boş bırakılamaz!");
    isimEl.focus();
    return;
  }
  if (!email.trim()) {
    alert("E-posta alanı boş bırakılamaz!");
    emailEl.focus();
    return;
  }
  if (!tel.trim()) {
    alert("Telefon alanı boş bırakılamaz!");
    telEl.focus();
    return;
  }
  const data = { isim, email, tel, img };
  localStorage.setItem(id + "_data", JSON.stringify(data));
  alert("Bilgiler kaydedildi: " + isim);
}

function cancelData(id) {
  const dataStr = localStorage.getItem(id + "_data");
  if (dataStr) {
    const data = JSON.parse(dataStr);
    document.getElementById(id + "Isim").innerText = data.isim || "";
    document.getElementById(id + "Email").value = data.email || "";
    document.getElementById(id + "Telefon").value = data.tel || "";
    document.getElementById(id + "Image").src = data.img || "";
    alert("Değişiklikler geri alındı");
  } else {
    window.location.reload();
  }
}

window.addEventListener("DOMContentLoaded", function () {
  for (let i = 1; i <= 7; i++) {
    const id = "yardimci" + i;
    const dataStr = localStorage.getItem(id + "_data");
    if (dataStr) {
      const data = JSON.parse(dataStr);
      document.getElementById(id + "Isim").innerText = data.isim || "";
      document.getElementById(id + "Email").value = data.email || "";
      document.getElementById(id + "Telefon").value = data.tel || "";
      document.getElementById(id + "Image").src = data.img || "";
    }
  }
});
