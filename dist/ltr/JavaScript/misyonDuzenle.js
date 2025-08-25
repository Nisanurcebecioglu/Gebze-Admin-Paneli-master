
  function togglePhotoDropdown() {
    const dropdown = document.getElementById("photoDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }

  function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
      alert("Fotoğraf seçildi: " + file.name);
      // Buraya önizleme eklersen gösterebilirim
    }
  }

  function savePhoto() {
    alert("Fotoğraf kaydedildi ");
    document.getElementById("photoDropdown").style.display = "none";
  }

  function cancelChange() {
    document.getElementById("photoUpload").value = "";
    alert("Değişiklik iptal edildi ");
    document.getElementById("photoDropdown").style.display = "none";
  }

  // Dışarı tıklayınca kapanması
  window.onclick = function(event) {
    if (!event.target.closest('.dropdown-toggle') && !event.target.closest('.dropdown-content')) {
      document.getElementById("photoDropdown").style.display = "none";
    }
  };

