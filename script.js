const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

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
  }, 3000);
};

/**
 * @description - Retreaves and waits for data from the to populate the entire landing page.
 */
const allAPIs = [
  (POPULAR_MOVIES_URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US"),
  (POPULAR_TVSHOWS_URL =
    "https://api.themoviedb.org/3/tv/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US"),
  (TOP_RATED_MOVIES_URL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US"),
  (TRENDING_LASTWEEK_URL =
    "https://api.themoviedb.org/3/trending/all/week?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US"),
];

const swiperWrappers = document.querySelectorAll(".swiper-wrapper");

for (let i = 0; i < swiperWrappers.length; i++) {
  getAndDisplayMovies(allAPIs[i], swiperWrappers[i]);
}

getAndDisplayMovies(POPULAR_MOVIES_URL, swiperWrappers);

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
 * @description - Function that searched for a movies and displays the results.
 * @param {string} search
 */
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=85ade2bd722304de1124d09e0ddfd9b3&query="';
// get html search page

// const searchContainer = document.querySelector(".search-container");
// const searchBtn = document.querySelector(".btn");
// const userInput = document.querySelector(".input");

displaySearchPage = () => {};

// const displaySearchPage = (url) => {
//   const res = await fetch(url);
//   const data = await res.json();

//   createSearchPage(data.results, container);
// }

const searchMovies = () => {
  const searchTerm = userInput.value.trim();

  if (searchTerm && searchTerm !== "") {
    // go to search page
    window.location.href = `/search.html`;
    displaySearchPage(SEARCH_API + searchTerm);
  } else if (searchTerm === "") {
    // open search html page
    window.location.href = "search.html";
  }
};

//add event to searchBtn only when it contains class active
searchBtn.addEventListener("click", (e) => {
  if (!searchContainer.classList.contains("active")) {
    searchMovies(userInput);
  }
});
