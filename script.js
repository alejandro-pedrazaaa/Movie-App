const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

/**
 * @description - Clicking on the logo will reload the page to take you back to the home page
 */
const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  window.location.reload();
});

/**
 * @description - Retreaves and waits for API data to create the carousel.
 */
const CAROUSEL_API =
  "https://api.themoviedb.org/3/search/movie?api_key=85ade2bd722304de1124d09e0ddfd9b3&query=avengers";
const carouselContainer = document.querySelector(".carousel");

async function getAndDisplayCarousel(CAROUSEL_API) {
  const res = await fetch(CAROUSEL_API);
  const data = await res.json();

  createCarousel(data.results);
}

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

const rotateCarousel = (cards) => {
  setInterval(() => {
    next(cards);
  }, 3500);
};

getAndDisplayCarousel(CAROUSEL_API);

/**
 * @description - Retreaves and waits for data from the to populate the entire landing page with
 * movies and tv shows.
 */
const allAPIs = [
  "https://api.themoviedb.org/3/movie/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US",
  "https://api.themoviedb.org/3/tv/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US",
  "https://api.themoviedb.org/3/movie/top_rated?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US",
  "https://api.themoviedb.org/3/trending/all/week?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US",
];
const swiperWrappers = document.querySelectorAll(".swiper-wrapper");

const getAndDisplayMovies = async (url, swiperWrapper) => {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results, swiperWrapper);
};

for (let i = 0; i < swiperWrappers.length; i++) {
  getAndDisplayMovies(allAPIs[i], swiperWrappers[i]);
}

const showMovies = (movies, container) => {
  movies.forEach((movie) => {
    const { poster_path, id } = movie;

    const movies = document.createElement("div");
    movies.classList.add("swiper-slide");

    movies.innerHTML = `<img src="${IMG_PATH + poster_path}">`;
    movies.setAttribute("id", id);

    container.appendChild(movies);

    const allMovies = document.querySelectorAll(".swiper-slide");
    displayClickedMovie(allMovies);
  });
};

const swiper = new Swiper(".swiper-container", {
  // slidesPerView: 2,
  // slidesPerGroup: 1,
  centeredSlides: true,
  loop: true,
  breakpoints: {
    // when window width is >= 600px
    600: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 5,
      centeredSlides: true,
    },
    // when window width is >= 900px
    900: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 5,
      centeredSlides: false,
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 5,
      centeredSlides: false,
    },
    // when window width is >= 1500px
    1500: {
      slidesPerView: 8,
      spaceBetween: 1,
      centeredSlides: false,
    },
    // when window width is >= 1800px
    1800: {
      slidesPerView: 6,
      slidesPerGroup: 6,
      spaceBetween: 5,
      centeredSlides: true,
    },
  },
});

/**
 * @description - Makes search input appear and dissapears when user clicks on search button
 */
const searchContainer = document.querySelector(".search-container");
const searchBtn = document.querySelector(".btn");
const userInput = document.querySelector(".input");
searchBtn.addEventListener("click", () => {
  searchContainer.classList.toggle("active");
  searchContainer.focus();
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
////////////////////////////////////////////////////////////////////////////////////////////
// get the id from the attributes with the asynch function
// const displayClickedMovie = (allMovies) => {
//   allMovies.forEach((movie) => {
//     movie.addEventListener("click", () => {
//       const id = movie.getAttribute("id");
//       console.log(id);
//     });
//   });
// };

// const ex = `https://api.themoviedb.org/3/movie/766507?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US`;
// console.log(ex);

// Get the id of the clicked movie ONLY once.
const displayClickedMovie = (allMovies) => {
  allMovies.forEach((movie) => {
    movie.addEventListener("dblclick", () => {
      const id = movie.getAttribute("id");
      if (!movie.classList.contains("clicked")) {
        movie.classList.add("clicked");
        getAndDisplayMovie(id);
      }
    });
  });
};

const getAndDisplayMovie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US`
  );
  const data = await res.json();
  showMovie(data);
};

const showMovie = (movie) => {
  const {
    backdrop_path,
    poster_path,
    tagline,
    title,
    overview,
    vote_average,
    release_date,
    homepage,
    belongs_to_collection,
  } = movie;
  const movieContainer = document.querySelector(".individual-page");
  movieContainer.innerHTML = `
    <div class="individual-movie-container">
      <div class="individual-movie-poster">
        <img src="${IMG_PATH + poster_path}">
      </div>
      <div class="individual-movie-info">
        <p>${tagline}</p>
        <h1>${title}</h1>
        <p>${overview}</p>
        <p>${vote_average}</p>
        <p>${release_date}</p>
        <p>${homepage}</p>
        <p>${belongs_to_collection}</p>
      </div>
    </div>
  `;
  const moviePoster = document.querySelector(".individual-movie-poster");
  moviePoster.style.backgroundImage = `url(${IMG_PATH + backdrop_path})`;
  const allSectionsContainer = document.querySelector(".main-page");
  allSectionsContainer.style.display = "none";

  // //get the belongs_to_collection and display the collection if it exists
  // if (belongs_to_collection) {
  //   const { id } = belongs_to_collection;
  //   getAndDisplayCollection(id);
  //   console.log(id);
  // }
};

// const collection_API = `

// https://api.themoviedb.org/3/search/collection?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&query=asdf&page=1`;

// getAndDisplayCollection = async (id) => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/collection/${id}?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US`
//   );
//   const data = await res.json();
//   showCollection(data);
// };

// const showCollection = (collection) => {
//   //display the collection div
//   const collectionContainer = document.querySelector(".collection");
//   collectionContainer.style.display = "block";
//   const { name, backdrop_path, poster_path } = collection;
//   collectionContainer.innerHTML = `

//     <div class="collection-poster">
//       <img src="${IMG_PATH + poster_path}">
//     </div>
//     <div class="collection-info">
//       <h1>${name}</h1>
//     </div>
//   `;
//   const collectionPoster = document.querySelector(".collection-poster");
//   collectionPoster.style.backgroundImage = `url(${IMG_PATH + backdrop_path})`;
// };

// the the showMOvie function is callaed, hide .all-sections-container

//  `https://api.themoviedb.org/3/movie/${id}?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US`;

// swiper.on("dbclick", (e) => {
//   if (e.target.tagName === "IMG") {
//     const movieId = e.target.parentElement.getAttribute("data-id");
//     window.location.href = `/movie.info.html?id=${movieId}`;
//   }
// });

// get all data of clicked movie

// const searchMovies = () => {
//   const searchTerm = userInput.value.trim();

//   if (searchTerm && searchTerm !== "") {
//     // go to search page
//     window.location.href = `/search.html`;
//     displaySearchPage(SEARCH_API + searchTerm);
//   } else if (searchTerm === "") {
//     // open search html page
//     window.location.href = "search.html";
//   }
// };

// get the

// const swiperWrappers = document.querySelectorAll(".swiper-wrapper");

// for (let i = 0; i < swiperWrappers.length; i++) {
//   getAndDisplayMovies(allAPIs[i], swiperWrappers[i]);
// }

// getAndDisplayMovies(POPULAR_MOVIES_URL, swiperWrappers);

// async function getAndDisplayMovies(url, container) {
//   const res = await fetch(url);
//   const data = await res.json();

//   showMovies(data.results, container);
// }

// const showMovies = (movies, container) => {
//   movies.forEach((movie) => {
//     const { poster_path } = movie;

//     const movies = document.createElement("div");
//     movies.classList.add("swiper-slide");

//     movies.innerHTML = `<img src="${IMG_PATH + poster_path}">`;

//     container.appendChild(movies);

//     panels = document.querySelectorAll(".swiper-slide");
//   });
// };

// /**
//  * @description - Function that searched for a movies and displays the results.
//  * @param {string} search
//  */
// const SEARCH_API =
//   'https://api.themoviedb.org/3/search/movie?api_key=85ade2bd722304de1124d09e0ddfd9b3&query="';
// // get html search page

// // const searchContainer = document.querySelector(".search-container");
// // const searchBtn = document.querySelector(".btn");
// // const userInput = document.querySelector(".input");

// displaySearchPage = () => {};

// // const displaySearchPage = (url) => {
// //   const res = await fetch(url);
// //   const data = await res.json();

// //   createSearchPage(data.results, container);
// // }

// const searchMovies = () => {
//   const searchTerm = userInput.value.trim();

//   if (searchTerm && searchTerm !== "") {
//     // go to search page
//     window.location.href = `/search.html`;
//     displaySearchPage(SEARCH_API + searchTerm);
//   } else if (searchTerm === "") {
//     // open search html page
//     window.location.href = "search.html";
//   }
// };

// //add event to searchBtn only when it contains class active
// searchBtn.addEventListener("click", (e) => {
//   if (!searchContainer.classList.contains("active")) {
//     searchMovies(userInput);
//   }
// });

// const allAPIs = [
//   (POPULAR_MOVIES_URL =
//     "https://api.themoviedb.org/3/movie/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US"),
//   (POPULAR_TVSHOWS_URL =
//     "https://api.themoviedb.org/3/tv/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US"),
//   (TOP_RATED_MOVIES_URL =
//     "https://api.themoviedb.org/3/movie/top_rated?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US"),
//   (TRENDING_LASTWEEK_URL =
//     "https://api.themoviedb.org/3/trending/all/week?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US"),
// ];
