const popup = document.querySelector(".model-overlay");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".model-cancel");

const movieData = [
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    image: "assets/Inception.jpg",
    watched: true,
    favourate: false,
    ratings: 8.8,
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    image: "assets/darkNight.jpg",
    watched: true,
    favourate: false,
    ratings: 8.3,
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    image: "assets/intersteller.jpg",
    watched: false,
    favourate: false,
    ratings: 9.8,
  },
  {
    title: "IT",
    year: 2017,
    genre: "Horror",
    image: "assets/IT.jpg",
    watched: true,
    favourate: false,
    ratings: 8.9,
  },
  {
    title: "obsession",
    year: 2026,
    genre: "Thriller",
    image: "assets/obsession.jpg",
    watched: false,
    favourate: false,
    ratings: 8.9,
  },
];
movieData.forEach((data) => {
  const movieCardsContainer = document.querySelector(".movie-cards-container");
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  let movieCardHTML = `<div class="movie-poster movie-poster-inception">
            <img class="movie-poster-image" src="${data.image}" />
            <span class="movie-status">${data.watched}</span>
            <button class="movie-favorite" type="button" aria-label="Add Inception to favorites">
              <i class="fa-regular fa-heart" aria-hidden="true"></i>
            </button>
          </div>
          <div class="movie-card-content">
            <h2 class="movie-title">${data.title}</h2>
            <p class="movie-meta">${data.genre}<span aria-hidden="true">•</span>${data.year}</p>
            <p class="movie-rating">
              <i class="fa-solid fa-star" aria-hidden="true"></i>
              <span>${data.ratings}</span>
            </p>
            <div class="movie-card-actions">
              <button class="movie-edit" type="button">
                <i class="fa-solid fa-pen" aria-hidden="true"></i>
                Edit
              </button>
              <button class="movie-delete" type="button" aria-label="Delete Inception">
                <i class="fa-solid fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>`;

  movieCard.innerHTML = movieCardHTML;
  movieCardsContainer.appendChild(movieCard);
  const movieStatus = movieCard.querySelector(".movie-status");
  const movieFav = movieCard.querySelector(".movie-favorite");
  if (data.watched === true) {
    movieStatus.innerHTML = "Watched";
  } else if (data.watched === false) {
    movieStatus.innerHTML = "To watch";
    movieStatus.style.backgroundColor = "#8b5cf6";
  }
  let fav = false;
  movieFav.addEventListener("click", (e) => {
    fav = !fav;
    data.favourate = fav;
    if (fav === true) {
      movieFav.style.color = "#fbbf24";
      movieFav.innerHTML = "<i class='fa-solid fa-heart'></i>";
    } else {
      movieFav.style.color = "white";
      movieFav.innerHTML =
        "<i class='fa-regular fa-heart' aria-hidden='true'></i>";
    }
  });
  const movieDelete = movieCard.querySelector(".movie-delete");
  movieDelete.addEventListener("click", (e) => {
    movieCard.remove();
  });
});

addBtn.addEventListener("click", (e) => {
  popup.style.display = "block";
});
cancelBtn.addEventListener("click", (e) => {
  popup.style.display = "none";
});
