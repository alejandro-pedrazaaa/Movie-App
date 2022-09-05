const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const CAROUSEL_API =
  "https://api.themoviedb.org/3/search/movie?api_key=85ade2bd722304de1124d09e0ddfd9b3&query=avengers";
const MAIN_PAGE_APIS = [
  "https://api.themoviedb.org/3/movie/popular?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US",
  "https://api.themoviedb.org/3/movie/top_rated?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&region=US",
  "https://api.themoviedb.org/3/trending/movie/week?api_key=85ade2bd722304de1124d09e0ddfd9b3",
];
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1&include_adult=false";

/**
 * @description - Adds event listener to the "MoviesApp" logo.
 * When logo is clicked, the user will be redirected to the main page.
 */
const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  window.location.reload();
});

/**
 * @description - When scrolling down, the header will stick to the top and
 * a footer will appear at the bottom of the page
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
 * @description - Retreaves and waits for CAROUSEL_API to return data
 */
async function getAndDisplayCarousel(CAROUSEL_API) {
  const res = await fetch(CAROUSEL_API);
  const data = await res.json();

  createCarousel(data.results);
}

/**
 * @description - Creates the carousel and displays it on the page
 */
const carouselContainer = document.querySelector(".carousel");
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

/**
 * @description - Creates rotating effect for the carousel
 */
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
 * @description - Retreaves and waits for MAIN_PAGE_APIS to return data
 */
const swiperWrappers = document.querySelectorAll(".swiper-wrapper");
const getAndDisplayMovies = async (url, swiperWrapper) => {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results, swiperWrapper);
};

/**
 * @description - Matches each section on the main page with its corresponding API
 */
for (let i = 0; i <= 2; i++) {
  getAndDisplayMovies(MAIN_PAGE_APIS[i], swiperWrappers[i]);
}

/**
 * @description - Displays the movies on a swiper slider style layout on the main page
 */
const showMovies = (movies, collectionOrSimilarContainer) => {
  movies.forEach((movie) => {
    if (!collectionOrSimilarContainer.querySelector(`[id="${movie.id}"]`)) {
      const { poster_path, id } = movie;

      const movies = document.createElement("div");
      movies.classList.add("swiper-slide");

      movies.innerHTML = `<img src="${IMG_PATH + poster_path}">`;
      movies.setAttribute("id", id);

      collectionOrSimilarContainer.appendChild(movies);

      const allMovies = document.querySelectorAll(".swiper-slide");
      displayClickedMovie(allMovies);
    }
  });
};

/**
 * @description - Using a third party library, Swiper, this function creates a slider style layout for the
 * display of the movies on the main page
 */
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
      slidesPerView: 7,
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

const mainPage = document.querySelector(".main-page");
const clickedMovieContainer = document.querySelector(
  ".clicked-movie-container"
);
const collectionOrSimilarContainer = document.getElementById(
  "collection-similar-container"
);

/**
 * @description - Double clicking an image on the main page will get that movie's id
 */
const displayClickedMovie = async (allMovies) => {
  allMovies.forEach((movie) => {
    movie.addEventListener("dblclick", () => {
      const id = movie.getAttribute("id");

      getAndDisplayMovie(id);
    });
  });
};

/**
 * @description - Using the movie's id, this function will fetch the movie's data
 */
const getAndDisplayMovie = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US`
  );
  const data = await res.json();
  showMovie(data);
};

/**
 * @description - Displays the movie on the clicked movie container, and hides the main page
 */
const showMovie = async (movie) => {
  mainPage.setAttribute("hidden", "true");
  clickedMovieContainer.removeAttribute("hidden");
  collectionOrSimilarContainer.removeAttribute("hidden");

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  const {
    poster_path,
    tagline,
    title,
    overview,
    vote_average,
    release_date,
    homepage,
    belongs_to_collection,
    id,
  } = movie;

  const voteAverage = Math.round(vote_average * 10) / 10;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const releaseDate = release_date.split("-");
  const releaseDateFormatted = `${months[releaseDate[1] - 1]} ${
    releaseDate[2]
  }, ${releaseDate[0]}`;

  clickedMovieContainer.innerHTML = `
    <div class="movie-container">
      <div class="movie-poster">
        <img src="${IMG_PATH + poster_path}">
      </div>
      <div class="movie-info">
        <h1>${title}</h1>
        <div class="movie-div">
          <div class="div"></div>
        </div>
        <h2>${tagline}<h2>
        <p class="overview">${overview}</p>
        <p>Rating: <span class="rating">${voteAverage}</span></p>
        <p>Released: <span class="released">${releaseDateFormatted}</span></p>
        <p>Want to watch it? click <a href="${homepage}" target="_blank" class="anchor">here</a></p>
      </div>
    </div>`;

  hasCollection(belongs_to_collection, id);
};

/**
 * @description - Checks whether the movie has a collection or not
 */
const hasCollection = async (collection, id) => {
  const collectionTitle = document.querySelector(".collection-title");
  if (collection) {
    getMoviesInCollection(collection.id);
    collectionTitle.innerHTML = collection.name;
  } else if (collection === null) {
    getMoreLikeThis(id);
    collectionTitle.innerHTML = "More like this";
  }
};

/**
 * @description - Fetches and displays the movies in the collection
 */
const wrapper = document.querySelector("#wrapper");
const getMoviesInCollection = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/collection/${id}?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US`
  );
  const data = await res.json();
  const movies = data.parts;
  showMovies(movies, wrapper);
};

/**
 * @description - Fetches and displays more movies like the one clicked
 */
const getMoreLikeThis = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=85ade2bd722304de1124d09e0ddfd9b3&language=en-US&page=1`
  );
  const data = await res.json();
  const movies = data.results;
  showMovies(movies, wrapper);
};

/**
 * @description - When a movie on the collection or similar container is clicked,
 * the page will scroll to the top
 */
wrapper.addEventListener("dblclick", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  const movies = wrapper.querySelectorAll(".movie");
  updateCollectionOrSimilarContainer(movies);
});

/**
 * @description - When a movie on the collection or similar container is clicked,
 * the movie's id will be fetched and passed to the getAndDisplayMovie function
 */
const updateCollectionOrSimilarContainer = (movies) => {
  movies.forEach((movie) => {
    movie.addEventListener("dblclick", () => {
      const id = movie.getAttribute("id");
      getAndDisplayMovie(id);
    });
  });
};

/**
 * @description -
 */
const userInput = document.querySelector(".input");
userInput.addEventListener("keyup", () => {
  userInput.focus();
});
