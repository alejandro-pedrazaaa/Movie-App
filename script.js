/**
 * @description - Makes search navigation appear and dissapears when user clicks on search button
 */
const searchContainer = document.querySelector(".search-container");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

btn.addEventListener("click", () => {
  searchContainer.classList.toggle("active");
  input.focus();
});

const POPULAR_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCH_API =
//   'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
// console.log(API_URL);

/**
 * @description - Populates initial page movies on the page
 */
displayPopularMovies(POPULAR_URL);

/**
 * @description - Waits for api to respond and then displays the movies
 */
async function displayPopularMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

/**
 * @description - Displays movies on when the page is loaded
 */
const popularMoviesContainer = document.querySelector(".movies-section");
const showMovies = (movies) => {
  movies.forEach((movie) => {
    const { poster_path } = movie;

    const movies = document.createElement("div");
    movies.classList.add("panel");

    movies.style.backgroundImage = `url(${IMG_PATH + poster_path})`;

    popularMoviesContainer.appendChild(movies);

    panels = document.querySelectorAll(".panel");
    addActiveClass(panels);
    enlargeClickedPoster(panels);
  });
};

/**
 * @description - Adds active class to the movie that is displayed
 */
const addActiveClass = (panels) => {
  panels[0].classList.add("active");
};

/**
 * @description - Allows the user to click on a movie and enlarge it
 */
const enlargeClickedPoster = (panels) => {
  panels.forEach((panel) => {
    panel.addEventListener("click", () => {
      removeActiveClasses();
      panel.classList.add("active");
    });
  });
};
const removeActiveClasses = () => {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
};

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
