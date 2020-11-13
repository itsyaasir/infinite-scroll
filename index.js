const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const apiKey = "c2vhGEb8K_UnUzG7cL18r5R8hH5wkDzOfGYLaTWwYqM";

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=5`;

function handleImageLoaded() {
  imageLoaded += 1;
  if (imageLoaded === totalImages) {
    ready = true;
   loader.hidden = true;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=30`;
  }
}

function displayPhotos() {
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    img.addEventListener("load", handleImageLoaded);


    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    imageLoaded = 0;
    totalImages = photosArray.length;
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();