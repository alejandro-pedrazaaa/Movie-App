const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

/**
 * @description - Makes search input appear and dissapears when user clicks on search button
 */
const searchContainer = document.querySelector(".search-container");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
btn.addEventListener("click", () => {
  searchContainer.classList.toggle("active");
  input.focus();
});

/**
 * @description - When the user scrolls down, the header will stick to the top of the page
 * and will decrease in size.
 */
const header = document.querySelector(".header");
const footer = document.querySelector("footer");
window.addEventListener("scroll", fixHeader);
function fixHeader() {
  if (window.scrollY > header.offsetHeight + 50) {
    header.classList.add("active");
    footer.classList.add("active");
  } else {
    header.classList.remove("active");
    footer.classList.remove("active");
    header.style.transition = "all 0.5s";
    footer.style.transition = "all 0.5s";
  }
}

/**
 * @description - Retreaves and wait for data from the API.
 */
const CAROUSEL_API =
  "https://api.themoviedb.org/3/search/movie?api_key=85ade2bd722304de1124d09e0ddfd9b3&query=avengers";
const carouselContainer = document.querySelector(".carousel");
getAndDisplayCarousel(CAROUSEL_API);
async function getAndDisplayCarousel(url) {
  const res = await fetch(url);
  const data = await res.json();

  createCarousel(data.results);
}

/**
 * @description - Creates the carousel section and setus up carousel functionality.
 */
const createCarousel = (movies) => {
  movies.slice(0, 4).forEach((movie) => {
    const { poster_path } = movie;
    const cards = document.createElement("div");

    cards.classList.add("card");
    cards.style.backgroundImage = `url(${IMG_PATH + poster_path})`;
    carouselContainer.appendChild(cards);
  });

  const cards = document.querySelectorAll(".card");
  rotateCarousel(cards);
};

const transforms = [
  // { x: 0, z: 0, scale: 1, opacity: 1 },
  // { x: "-55%", z: "-50px", scale: 0.8, opacity: 0.8 },
  // {
  //   x: "55%",
  //   z: "-50px",
  //   scale: 0.8,
  //   opacity: 0.8,
  // },
  // transform for 4 instead of 3
  { x: 0, z: 0, scale: 1, opacity: 1 },
  { x: "-50%", z: "-50px", scale: 0.8, opacity: 1 },
  { x: 0, z: 0, scale: 0, opacity: 0 },
  { x: "50%", z: "-50px", scale: 0.8, opacity: 1 },
];

const nextTransform = (x) => {
  if (x >= 4 - 1) {
    x = 0;
  } else {
    x++;
  }
  return x;
};

/**
 * @description - Transitions the carousel to the next available card.
 */
const next = (cards) => {
  for (i = 0; i < cards.length; i++) {
    cards[i].style.transform =
      "translateX(" +
      transforms[nextTransform(i)].x +
      ")" +
      "translateZ(" +
      transforms[nextTransform(i)].z +
      ")" +
      "scale(" +
      transforms[nextTransform(i)].scale +
      ")";
    cards[i].style.opacity = transforms[nextTransform(i)].opacity;
  }
  transforms.push(transforms.shift());
};

/**
 * @description - Rotates the carousel automatically every 3 seconds.
 */
const rotateCarousel = (cards) => {
  setInterval(() => {
    next(cards);
  }, 4000);
};

// const POPULAR_MOVIES_URL =
//   "https://api.themoviedb.org/3/movie/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US";
// const POPULAR_TVSHOWS_URL =
//   "https://api.themoviedb.org/3/tv/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US";
// const TOP_RATED_MOVIES_URL =
//   "https://api.themoviedb.org/3/movie/top_rated?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US";
// const TRENDING_LASTWEEK_URL =
//   "https://api.themoviedb.org/3/trending/all/week?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US";
// // const SEARCH_API =
// //   'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';
// // const SEARCH_API =
// //   "https://api.themoviedb.org/3/search/movie?api_key=85ade2bd722304de1124d09e0ddfd9b3&query=avengers";
// // console.log(API_URL);

// const popularMoviesContainer = document.querySelector(".popular-movies");
// const popularTvShowsContainer = document.querySelector(".popular-tvshows");
// const topRatedMoviesContainer = document.querySelector(".top-rated-movies");
// const trendingLastWeekContainer = document.querySelector(".trending-lastweek");

// /**
//  * @description - Populates landing page upon page load.
//  */
// getAndDisplayMovies(POPULAR_MOVIES_URL, popularMoviesContainer);
// getAndDisplayMovies(POPULAR_TVSHOWS_URL, popularTvShowsContainer);
// getAndDisplayMovies(TOP_RATED_MOVIES_URL, topRatedMoviesContainer);
// getAndDisplayMovies(TRENDING_LASTWEEK_URL, trendingLastWeekContainer);

// /**
//  * @description - Waits for api to respond and then displays all of the movies on the page.
//  */
// async function getAndDisplayMovies(url, container) {
//   const res = await fetch(url);
//   const data = await res.json();

//   showMovies(data.results, container);
// }

// /**
//  * @description - Creates the movies's containers and setus up thier functionality.
//  */
// const showMovies = (movies, container) => {
//   movies.forEach((movie) => {
//     const { poster_path } = movie;

//     const movies = document.createElement("div");
//     movies.classList.add("panel");

//     movies.style.backgroundImage = `url(${IMG_PATH + poster_path})`;

//     container.appendChild(movies);

//     panels = document.querySelectorAll(".panel");
//     addActiveClass(container);
//     enlargeHoveredPoster(container);
//   });
// };

// /**
//  * @description - Adds active class to the first movie of each section.
//  */
// const addActiveClass = (container) => {
//   const firstPanel = container.firstElementChild;
//   firstPanel.classList.add("active");
// };

// /**
//  * @description - Allows the user to click on the posters and enlarge while minimizing the other posters.
//  */
// const enlargeHoveredPoster = (container) => {
//   const panels = container.querySelectorAll(".panel");
//   panels.forEach((panel) => {
//     if (panel.parentNode.isEqualNode(container)) {
//       panel.addEventListener("click", () => {
//         removeActiveClasses(container);
//         panel.classList.add("active");
//       });
//     }
//   });
// };

// const removeActiveClasses = (container) => {
//   const panels = container.querySelectorAll(".panel");
//   panels.forEach((panel) => {
//     panel.classList.remove("active");
//   });
// };

const POPULAR_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US";

const popularMoviesContainer = document.querySelector(".swiper-wrapper");

getAndDisplayMovies(POPULAR_MOVIES_URL, popularMoviesContainer);

async function getAndDisplayMovies(url, container) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results, container);
}

const showMovies = (movies, container) => {
  movies.forEach((movie) => {
    const { poster_path } = movie;

    const movies = document.createElement("div");
    movies.classList.add("swiper-slide");

    movies.innerHTML = `<img src="${IMG_PATH + poster_path}">`;

    container.appendChild(movies);

    panels = document.querySelectorAll(".swiper-slide");
    // addActiveClass(container);
    // enlargeHoveredPoster(container);
  });
};

const swiper = new Swiper(".swiper-container", {
  // slidesPerView: 2,
  // slidesPerGroup: 1,
  centeredSlides: true,
  loop: true,
  breakpoints: {
    // when window width is >= 600px
    // 600: {
    //   slidesPerView: 2,
    //   slidesPerGroup: 2,
    //   spaceBetween: 5,
    //   centeredSlides: true,
    // },
    // // when window width is >= 900px
    // 900: {
    //   slidesPerView: 3,
    //   slidesPerGroup: 3,
    //   spaceBetween: 5,
    //   centeredSlides: false,
    // },
    // // when window width is >= 1200px
    // 1200: {
    //   slidesPerView: 4,
    //   slidesPerGroup: 4,
    //   spaceBetween: 5,
    //   centeredSlides: false,
    // },
    // when window width is >= 1500px
    1500: {
      slidesPerView: 8,
      spaceBetween: 1,
      centeredSlides: false,
    },
    // when window width is >= 1800px
    // 1800: {
    //   slidesPerView: 6,
    //   slidesPerGroup: 6,
    //   spaceBetween: 5,
    //   centeredSlides: true,
    // },
  },
});

// panels.forEach((panel) => {
//   panel.addEventListener("click", () => {
//     removeActiveClasses();
//     panel.classList.add("active");
//   });
// });

// panels.forEach((panel) => {
//   panel.classList.remove("active");
// });

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
