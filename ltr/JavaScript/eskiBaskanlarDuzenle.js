document.querySelectorAll(".card").forEach((card) => {
  const photoBtn = card.querySelector(".photo-btn");
  const fileInput = card.querySelector(".file-input");
  const img = card.querySelector("img");

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
});
