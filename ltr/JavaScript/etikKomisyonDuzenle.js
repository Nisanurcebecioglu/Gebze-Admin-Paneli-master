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

    button.innerHTML = isEditable
      ? `<svg viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg> Kaydet`
      : `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/></svg> Düzenle`;
  });
});
