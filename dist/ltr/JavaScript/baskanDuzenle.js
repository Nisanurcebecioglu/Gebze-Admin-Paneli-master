function validateAndSaveAll() {
  var isim = document.getElementById("isim").value.trim();
  var uyari = document.getElementById("isimUyari");
  if (!isim) {
    uyari.style.display = "block";
    document.getElementById("isim").focus();
    return false;
  } else {
    uyari.style.display = "none";
    saveAll();
  }
}

  function toggleDropdown() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  function previewImage(event, type) {
    const file = event.target.files[0];
    if (file) {
      alert(`${type === 'photo' ? 'Fotoğraf' : 'İmza'} seçildi: ${file.name}`);
    }
  }

  function saveAll() {
    const bio = document.getElementById('bioText').value;
    alert("Değişiklikler kaydedildi.\nBiyografi: " + bio);
    // Buraya gerçek kaydetme kodlarını yazabilirsiniz.
  }

  // Kapanma özelliği için dışarı tıklama kontrolü (isteğe bağlı)
  window.onclick = function(event) {
    const menu = document.getElementById("dropdownMenu");
    if (!event.target.matches('button') && menu.style.display === 'block') {
      menu.style.display = "none";
    }
  };

