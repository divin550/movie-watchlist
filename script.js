const popup = document.querySelector(".model-overlay");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".model-cancel");
const movieSave = document.querySelector(".model-save");
const globalInput = document.querySelector(".search-input");
const sidbarWatched = document.querySelector(".sidebar-watched");
const sidebarFavorites = document.querySelector(".sidebar-favorites");
const sidebarToWatch = document.querySelector(".sidebar-toWatch");
let movieToEdit = null;

const defaultMovies = [
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    image: "assets/Inception.jpg",
    watched: false,
    favourate: false,
    ratings: 8.8,
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    image: "assets/darkNight.jpg",
    watched: false,
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
    watched: false,
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
const savedMovies = localStorage.getItem("movie");
let movieData;
if (savedMovies !== null) {
  movieData = JSON.parse(savedMovies);
} else {
  movieData = defaultMovies;
}
function saveMovies() {
  const setMovies = JSON.stringify(movieData);
  localStorage.setItem("movie", setMovies);
}
const movieCardsContainer = document.querySelector(".movie-cards-container");
movieData.forEach((data) => {
  createMovieCard(data);
});

addBtn.addEventListener("click", (e) => {
  movieToEdit = null;
  movieForm.reset();
  movieSave.textContent = "Add Movie";
  popup.style.display = "block";
});
cancelBtn.addEventListener("click", (e) => {
  popup.style.display = "none";
});
movieSave.addEventListener("click", (e) => {
  popup.style.display = "none";
});

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  let movieCardHTML = `<div class="movie-poster movie-poster-inception">
            <img class="movie-poster-image" src="${movie.image}" />
            <span class="movie-status"></span>
            <button class="movie-favorite" type="button" aria-label="Add Inception to favorites">
              <i class="fa-regular fa-heart" aria-hidden="true"></i>
            </button>
          </div>
          <div class="movie-card-content">
            <h2 class="movie-title">${movie.title}</h2>
            <p class="movie-meta">${movie.genre}<span aria-hidden="true">•</span>${movie.year}</p>
            <p class="movie-rating">
              <i class="fa-solid fa-star" aria-hidden="true"></i>
              <span>${movie.ratings}</span>
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
  function updateFavBtn() {
    if (movie.favourate) {
      movieFav.style.color = "#fbbf24";
      movieFav.innerHTML = "<i class='fa-solid fa-heart'></i>";
    } else {
      movieFav.style.color = "white";
      movieFav.innerHTML =
        "<i class='fa-regular fa-heart' aria-hidden='true'></i>";
    }
  }
  updateFavBtn();
  movieFav.addEventListener("click", (e) => {
    movie.favourate = !movie.favourate;
    updateFavBtn();
    saveMovies();
  });
  const totalMoviesVal = document.querySelector(".total-movies-val");
  totalMoviesVal.innerHTML = movieData.length;
  movieStatus.innerHTML = "To watch";
  movieStatus.style.backgroundColor = "#8b5cf6";
  const toWatchVal = document.querySelector(".toWatched-val");
  const watchedVal = document.querySelector(".watched-val");
  const newArr2 = movieData.filter((item) => {
    return item.watched === false;
  });
  toWatchVal.innerHTML = newArr2.length;
  function updateMovieStatus() {
    if (movie.watched) {
      movieStatus.innerHTML = "Watched";
      movieStatus.style.backgroundColor = "#10b981";
    } else {
      movieStatus.innerHTML = "To watch";
      movieStatus.style.backgroundColor = "#8b5cf6";
    }
    console.log(movie.watched);
  }
  function updateMovieCounters() {
    const watchedMovies = movieData.filter((item) => {
      return item.watched === true;
    });

    watchedVal.innerHTML = watchedMovies.length;

    const toWatchMovies = movieData.filter((item) => {
      return item.watched === false;
    });

    toWatchVal.innerHTML = toWatchMovies.length;
  }
  updateMovieStatus();
  updateMovieCounters();
  movieStatus.addEventListener("click", (e) => {
    movie.watched = !movie.watched;
    updateMovieStatus();
    updateMovieCounters();
    saveMovies();
  });

  const movieEdit = movieCard.querySelector(".movie-edit");
  movieEdit.addEventListener("click", (e) => {
    popup.style.display = "block";
    movieSave.innerHTML = "Save";
    const editTitel = document.querySelector(".title-input");
    const editImg = document.querySelector(".img-input");
    const editGenre = document.querySelector(".genre");
    const editYear = document.querySelector(".year-input");
    const editRating = document.querySelector(".rating-input");
    const editStatus = document.querySelector(".status");
    editTitel.value = movie.title;
    editImg.value = movie.image;
    editGenre.value = movie.genre;
    editYear.value = movie.year;
    editRating.value = movie.ratings;
    editStatus.value = movie.watched;
    movieToEdit = movie;
  });
  const movieDelete = movieCard.querySelector(".movie-delete");
  movieDelete.addEventListener("click", (e) => {
    const newArr = movieData.filter((item) => {
      return item !== movie;
    });
    movieData.splice(0, movieData.length, ...newArr);
    movieCard.remove();
    const newArr3 = movieData.filter((item) => {
      return item.watched === false;
    });
    toWatchVal.innerHTML = newArr3.length;
    totalMoviesVal.innerHTML = movieData.length;
    saveMovies();
  });
}
const movieForm = document.querySelector(".movie-form");
movieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.querySelector(".title-input").value;
  const imgInput = document.querySelector(".img-input").value;
  const genreSelect = document.querySelector(".genre").value;
  const yearInput = Number(document.querySelector(".year-input").value);
  const ratingInput = Number(document.querySelector(".rating-input").value);
  const statusSelect = document.querySelector(".status").value;
  const newMovie = {
    title: titleInput,
    image: imgInput,
    genre: genreSelect,
    year: yearInput,
    ratings: ratingInput,
    watched: false,
    favourate: false,
  };
  if (statusSelect === "true") {
    newMovie.watched = true;
  } else {
    newMovie.watched = false;
  }
  if (movieToEdit !== null) {
    movieToEdit.title = newMovie.title;
    movieToEdit.image = newMovie.image;
    movieToEdit.genre = newMovie.genre;
    movieToEdit.year = newMovie.year;
    movieToEdit.ratings = newMovie.ratings;
    movieToEdit.watched = newMovie.watched;

    movieToEdit = null;
  } else {
    movieData.push(newMovie);
  }
  saveMovies();
  document.querySelector(".movie-cards-container").innerHTML = "";

  movieData.forEach((movie) => {
    createMovieCard(movie);
  });
});

globalInput.addEventListener("input", (e) => {
  let storeInput = e.target.value;
  const newArr = movieData.filter((item) => {
    return item.title.toLowerCase().includes(storeInput.toLowerCase());
  });
  movieCardsContainer.innerHTML = "";
  newArr.forEach((data) => {
    createMovieCard(data);
  });
});
sidbarWatched.addEventListener("click", (e) => {
  e.preventDefault();
  const newArr = movieData.filter((item) => {
    return item.watched === true;
  });
  movieCardsContainer.innerHTML = "";
  newArr.forEach((data) => {
    createMovieCard(data);
  });
  if (newArr.length === 0) {
    movieCardsContainer.style.textAlign = "center";
    movieCardsContainer.style.color = "#c2c2c25f";
    movieCardsContainer.innerHTML =
      "<h1 class='no-movies'>THERE'S NO WATCHED MOVIE YET</h1>";
  }
});
sidebarFavorites.addEventListener("click", (e) => {
  const newArr = movieData.filter((item) => {
    return item.favourate === true;
  });
  movieCardsContainer.innerHTML = "";
  newArr.forEach((data) => {
    createMovieCard(data);
  });
  if (newArr.length === 0) {
    movieCardsContainer.style.textAlign = "center";
    movieCardsContainer.style.color = "#c2c2c25f";
    movieCardsContainer.innerHTML =
      "<h1 class='no-movies'>THERE'S NO FAVOURITE MOVIE YET</h1>";
  }
});
sidebarToWatch.addEventListener("click", (e) => {
  const newArr = movieData.filter((item) => {
    return item.watched === false;
  });
  movieCardsContainer.innerHTML = "";
  newArr.forEach((data) => {
    createMovieCard(data);
  });
  if (newArr.length === 0) {
    movieCardsContainer.style.textAlign = "center";
    movieCardsContainer.style.color = "#c2c2c25f";
    movieCardsContainer.innerHTML =
      "<h1 class='no-movies'>THERE'S NO TO-WATCH MOVIE YET</h1>";
      const h1 = document.querySelector(".no-movies");
  }
});
