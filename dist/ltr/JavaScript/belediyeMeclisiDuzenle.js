document.querySelectorAll(".card").forEach((card, idx) => {
  const photoBtn = card.querySelector(".photo-btn");
  const fileInput = card.querySelector(".file-input");
  const img = card.querySelector("img");
  const nameInput = card.querySelector("input[type='text']");
  const emailInput = card.querySelector("input[type='email']");
  const telInput = card.querySelector("input[type='tel']");
  const saveBtn = card.querySelector(".save-btn");
  const cancelBtn = card.querySelector(".cancel-btn");
  const cardKey = `meclis_card_${idx}`;

  // Fotoğraf Değiştir
  photoBtn.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Kaydet
  saveBtn.addEventListener("click", () => {
    if (!nameInput.value.trim()) {
      alert("İsim alanı boş bırakılamaz!");
      nameInput.focus();
      return;
    }
    if (emailInput && !emailInput.value.trim()) {
      alert("E-posta alanı boş bırakılamaz!");
      emailInput.focus();
      return;
    }
    if (telInput && !telInput.value.trim()) {
      alert("Telefon alanı boş bırakılamaz!");
      telInput.focus();
      return;
    }
    const data = {
      name: nameInput ? nameInput.value : "",
      email: emailInput ? emailInput.value : "",
      tel: telInput ? telInput.value : "",
      img: img ? img.src : "",
    };
    localStorage.setItem(cardKey, JSON.stringify(data));
    alert((data.name || "Meclis üyesi") + " kaydedildi!");
  });

  // İptal
  cancelBtn.addEventListener("click", () => {
    const dataStr = localStorage.getItem(cardKey);
    if (dataStr) {
      const data = JSON.parse(dataStr);
      if (nameInput) nameInput.value = data.name || "";
      if (emailInput) emailInput.value = data.email || "";
      if (telInput) telInput.value = data.tel || "";
      if (img && data.img) img.src = data.img;
    } else {
      window.location.reload();
    }
  });

  // Sayfa açıldığında localStorage'dan yükle
  const dataStr = localStorage.getItem(cardKey);
  if (dataStr) {
    const data = JSON.parse(dataStr);
    if (nameInput) nameInput.value = data.name || "";
    if (emailInput) emailInput.value = data.email || "";
    if (telInput) telInput.value = data.tel || "";
    if (img && data.img) img.src = data.img;
  }
});
