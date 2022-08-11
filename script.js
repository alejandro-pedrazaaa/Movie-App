const searchContainer = document.querySelector(".search-container");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

btn.addEventListener("click", () => {
  searchContainer.classList.toggle("active");
  input.focus();
});

//////////////////////////////////////////////////////////////

const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClasses();
    panel.classList.add("active");
  });
});

function removeActiveClasses() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

// const header = document.getElementById("header");
// const websiteTitle = document.getElementById("title");
// const search = document.getElementById("search");
// const submit = document.getElementById("submit");
// const moviesContainer = document.getElementById("movies-container");

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
console.log(API_URL);

const API_URL2 =
  "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
console.log(API_URL2);
// /**
//  * @description - First function to be called when the page is loaded. Function is used to get and movies movies from the API
//  * @param {string} url
//  * @returns {Promise} - Promise
//  */
// getMovies(API_URL);

// /**
//  * @description - Event that is triggered when the user clicks on the submit button to search for any movie
//  * @param {Event} e
//  */
// submit.addEventListener("click", () => {
//   searchMovies(search);
// });

// /**
//  * @description - Event that is triggered when the user clicks on title of the page to go back to the main page
//  * @param {Event} e
//  */
// websiteTitle.addEventListener("click", (e) => {
//   e.preventDefault();
//   window.location.reload();
// });

// /**
//  * @description - This function is used to get information from the API to movies the movies on the page
//  * @param {string} url
//  * @returns {Promise} - Promise
//  */
// async function getMovies(url) {
//   const res = await fetch(url);
//   const data = await res.json();

//   showMovies(data.results);

//   if (data.results.length === 0) {
//     noMoviesFound();
//   }
// }

// /**
//  * @description - This function is used to movies movies on the page
//  * @param {array} movies
//  */
// const showMovies = (movies) => {
//   moviesContainer.innerHTML = "";

//   movies.forEach((movie) => {
//     const { title, poster_path, vote_average, overview } = movie;

//     const movies = document.createElement("div");
//     movies.classList.add("movies");

//     movies.innerHTML = `
//       <img src="${IMG_PATH + poster_path}" alt="${title}">
//       <div class="info-container">
//         <h3 class="movie_title">${title}</h3>
//         <span id="votes" class="${getClassByRate(
//           vote_average
//         )}">${vote_average.toFixed(1)}</span>
//       </div>
//       <div class="overview">${overview}</div>`;

//     moviesContainer.appendChild(movies);
//   });
// };

// /**
//  * @description - This function is used to search for movies based on user input
//  * @param {string} search
//  */
// const searchMovies = (search) => {
//   const searchTerm = search.value.trim();

//   if (searchTerm && searchTerm !== "") {
//     getMovies(SEARCH_API + searchTerm);
//   } else if (searchTerm === "") {
//     showErrorInInput();
//   }
// };

// /**
//  * @description - This function is used to determine the color of the vote average (background of
//  * the vote average)
//  * @param {number} rate
//  * @returns {string} - Color to be added to the background of the vote average
//  */
// const getClassByRate = (vote) => {
//   if (vote >= 8) {
//     return "green-vote";
//   } else if (vote >= 5) {
//     return "orange-vote";
//   } else {
//     return "red-vote";
//   }
// };

// /**
//  * @description - This function is used to create and movies an error message if there are no movies found
//  * as well as to throw error in input field
//  * @param {string} url
//  */
// const noMoviesFound = () => {
//   const error = document.createElement("div");
//   error.classList.add("no-movies-found");
//   error.innerHTML = `<h1>No movies found</h1>`;
//   moviesContainer.appendChild(error);

//   showErrorInInput();
// };

// /**
//  * @description - This function is used shake and change the background color of the input field when
//  * the input field is empty or contains only whitespaces
//  * @param {string} url
//  */
// const showErrorInInput = () => {
//   search.style.backgroundColor = "red";
//   search.classList.add("error-shake");
//   setTimeout(() => {
//     search.classList.remove("error-shake");
//     search.style.removeProperty("background-color");
//   }, 1000);
// };
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
