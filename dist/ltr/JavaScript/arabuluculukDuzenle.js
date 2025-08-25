document.querySelectorAll(".edit-button").forEach((button) => {
  let isEditable = false;

  button.addEventListener("click", () => {
    const tableId = button.getAttribute("data-target");
    const table = document.getElementById(tableId);
    const cells = table.querySelectorAll("td");
    isEditable = !isEditable;

    cells.forEach((cell) => {
      if (isEditable) {
        cell.setAttribute("contenteditable", "true");
        cell.style.backgroundColor = "#e9f5ff";
      } else {
        cell.removeAttribute("contenteditable");
        cell.style.backgroundColor = "white";
      }
    });

    button.innerHTML = isEditable ? `Kaydet` : `Düzenle`;
  });
});
