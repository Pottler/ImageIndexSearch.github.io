var searchQuery = '';
var page = 1;
var perPage = 10;
var loadedResults = [];

function handleSearch(event) {
  if (event.key === 'Enter') {
    searchPhotos();
  }
}

function showScrollToTopButton() {
  var scrollToTopButton = document.getElementById('scroll-to-top-button');
  if (scrollToTopButton) {
    scrollToTopButton.style.display = 'block';
  }
}

function hideScrollToTopButton() {
  var scrollToTopButton = document.getElementById('scroll-to-top-button');
  if (scrollToTopButton) {
    scrollToTopButton.style.display = 'none';
  }
}

function searchPhotos() {
  searchQuery = document.getElementById("search-input").value;
  page = 1;
  loadedResults = [];
  var apiUrl =
    "https://api.unsplash.com/search/photos?query=" +
    searchQuery +
    "&page=" +
    page +
    "&per_page=" +
    perPage +
    "&client_id=t-qcfpjs6jCTALtxy9A1sO-rrz08bsg7UWgs82eAbaQ";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      var results = data.results;
      var imageContainer = document.getElementById("results");
      var noResultsElement = document.querySelector(".no-results");
      var loadMoreContainer = document.querySelector(".load-more-container");
      var loadMoreButton = document.querySelector(".load-more");

      imageContainer.innerHTML = '';

      if (results.length > 0) {
        showScrollToTopButton();
        for (var i = 0; i < results.length; i++) {
          var imageUrl = results[i].urls.regular;
          var imageElement = document.createElement("img");
          imageElement.src = imageUrl;
          imageElement.className = "image";
          imageElement.addEventListener('click', createImageClickHandler(imageUrl));
          imageContainer.appendChild(imageElement);
          loadedResults.push(imageUrl);
        }

        noResultsElement.style.display = "none";

        if (results.length === perPage) {
          loadMoreContainer.style.display = "block";
          loadMoreButton.style.display = "block";
          loadMoreButton.addEventListener('click', loadMorePhotos);
        } else {
          loadMoreContainer.style.display = "none";
          loadMoreButton.style.display = "none";
        }
      } else {
        hideScrollToTopButton();
        noResultsElement.style.display = "block";
        loadMoreContainer.style.display = "none";
      }
    })
    .catch((error) => {
      console.log("Error al realizar la búsqueda:", error);
    });
}

function loadMorePhotos() {
  page++;
  var apiUrl =
    "https://api.unsplash.com/search/photos?query=" +
    searchQuery +
    "&page=" +
    page +
    "&per_page=" +
    perPage +
    "&client_id=t-qcfpjs6jCTALtxy9A1sO-rrz08bsg7UWgs82eAbaQ";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      var results = data.results;
      var imageContainer = document.getElementById("results");
      var loadMoreContainer = document.querySelector(".load-more-container");
      var loadMoreButton = document.querySelector(".load-more");

      if (results.length > 0) {
        for (var i = 0; i < results.length; i++) {
          var imageUrl = results[i].urls.regular;
          if (!loadedResults.includes(imageUrl)) {
            var imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.className = "image";
            imageElement.addEventListener('click', createImageClickHandler(imageUrl));
            imageContainer.appendChild(imageElement);
            loadedResults.push(imageUrl);
          }
        }

        if (results.length === perPage) {
          loadMoreContainer.style.display = "block";
          loadMoreButton.style.display = "block";
        } else {
          loadMoreContainer.style.display = "none";
          loadMoreButton.style.display = "none";
        }
      } else {
        loadMoreContainer.style.display = "none";
        loadMoreButton.style.display = "none";
      }
    })
    .catch((error) => {
      console.log("Error al cargar más resultados:", error);
    });
}

function createImageClickHandler(imageUrl) {
  return function () {
    openImage(imageUrl);
  };
}

function openImage(imageUrl) {
  var overlay = document.getElementById('overlay');
  var fullImageContainer = document.getElementById('full-image-container');
  var fullImageElement = document.createElement('img');
  fullImageElement.src = imageUrl;
  fullImageElement.className = 'full-image';
  fullImageContainer.innerHTML = '';
  fullImageContainer.appendChild(fullImageElement);
  overlay.style.display = 'flex';
}

function closeImage() {
  var overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
}

var overlay = document.getElementById('overlay');
overlay.onclick = function () {
  closeImage();
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
