const popup = document.querySelector(".model-overlay");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".model-cancel");

const movieData = [
  { title: "Inception", year: 2010, genre: "Sci-Fi" },
  { title: "The Dark Knight", year: 2008, genre: "Action" },
  { title: "Interstellar", year: 2014, genre: "Sci-Fi" },
  { title: "IT", year: 2017, genre: "Horror" },
  { title: "obsession", year: 2026, genre: "Thriller" },
];

addBtn.addEventListener("click", (e) => {
  popup.style.display = "block";
});
cancelBtn.addEventListener("click", (e) => {
  popup.style.display = "none";
});
