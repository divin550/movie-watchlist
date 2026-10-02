const popup = document.querySelector(".model-overlay");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".model-cancel");

addBtn.addEventListener("click", (e) => {
  popup.style.display = "block"
});
cancelBtn.addEventListener("click", (e) => {
    popup.style.display = "none"
  
});
