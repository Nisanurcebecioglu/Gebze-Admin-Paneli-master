function saveData(id) {
  const email = document.getElementById(id + "Email");
  const tel = document.getElementById(id + "Telefon");
  const isim = document.getElementById(id + "Isim");
  const img = document.getElementById(id + "Image");
  if (!email.value.trim()) {
    alert("E-posta alanı boş bırakılamaz!");
    email.focus();
    return;
  }
  if (!tel.value.trim()) {
    alert("Telefon alanı boş bırakılamaz!");
    tel.focus();
    return;
  }
  // localStorage'a kaydet
  const data = {
    isim: isim.innerText,
    email: email.value,
    tel: tel.value,
    img: img.src,
  };
  localStorage.setItem(id + "_data", JSON.stringify(data));
  alert("Bilgiler kaydedildi!");
}

// Sayfa açıldığında localStorage'dan yükle
function loadData(id) {
  const dataStr = localStorage.getItem(id + "_data");
  if (dataStr) {
    const data = JSON.parse(dataStr);
    document.getElementById(id + "Isim").innerText = data.isim || "";
    document.getElementById(id + "Email").value = data.email || "";
    document.getElementById(id + "Telefon").value = data.tel || "";
    if (data.img) document.getElementById(id + "Image").src = data.img;
  }
}
// Tüm danışmanlar için yükle
window.addEventListener("DOMContentLoaded", function () {
  loadData("danisman1");
  loadData("danisman2");
});
