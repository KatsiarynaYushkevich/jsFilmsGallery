const filmsContainer = document.querySelector(".films_wrapper");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal_content");

const filmPoster = document.querySelector("#film_poster");
const filmName = document.querySelector("#film_name");
const filmYear = document.querySelector("#year");
const country = document.querySelector("#country");
const filmGenres = document.querySelector("#genres");
const filmDuration = document.querySelector("#duration");
const filmData = document.querySelector("#date");
const heartIcon = document.querySelector("#heart_icon");

const films = document.querySelector(".films_wrapper");
let savedFilms = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);

  if (value) {
    savedFilms.push(JSON.parse(value));
  }
}

addFilms(savedFilms);

function addFilms(array) {
  array.forEach((item) => {
    const filmBlock = document.createElement("div");
    filmBlock.classList.add("film");
    filmBlock.dataset.film_id = item.kinopoiskId;
    const filmImg = document.createElement("img");
    filmImg.src = `${item.posterUrlPreview}`;
    filmImg.alt = `${item.nameRu}`;
    filmImg.classList.add("film_img");
    const filmDescription = document.createElement("div");
    filmDescription.innerHTML = `
      <p class="film_name">${item.nameRu}</p>
      <span>${item.year}</span>
      <p>${Object.values(item.genres[0])}, ...</p>`;
    filmDescription.classList.add("film_description");

    filmBlock.appendChild(filmImg);
    filmBlock.appendChild(filmDescription);

    films.appendChild(filmBlock);
  });
}

function showFilmInfo(currentFilm) {
  filmPoster.src = currentFilm.posterUrl;
  filmName.textContent = `Название: ${currentFilm.nameRu}`;
  filmYear.textContent = `Год выпуска: ${currentFilm.year}`;
  filmGenres.textContent = `Жанры: ${currentFilm.genres
    .map((genre) => genre.genre)
    .join(", ")}`;
  country.textContent = `Страна производства: ${currentFilm.countries
    .map((country) => country.country)
    .join(", ")}`;
  filmDuration.textContent = `Длительность: ${currentFilm.duration} минут(-ы)`;
  filmData.textContent = `Премьера: ${currentFilm.premiereRu}`;

  modal.style.display = "block";
  console.log(localStorage);
}

filmsContainer.addEventListener("click", (event) => {
  if (event.target.parentNode.classList.contains("film_description")) {
    const filmBlock = event.target.parentNode.parentNode;
    const filmId = Number(filmBlock.dataset.film_id);
    const currentFilm = savedFilms.find((item) => item.kinopoiskId === filmId);

    if (currentFilm) {
      showFilmInfo(currentFilm);
    }
  }
});

modal.addEventListener("click", (event) => {
  if (!event.target.classList.contains("heart_icon"))
    modal.style.display = "none";
});