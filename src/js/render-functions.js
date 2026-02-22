import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector(".loader");
const btn = document.querySelector(".load")


const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const list = images.map( (img) => {
    
    return `<li class="gallery-item">
              <a href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}" />
              </a>
              <div class="info">
                <p><b>Likes</b> ${img.likes}</p>
                <p><b>Views</b> ${img.views}</p>
                <p><b>Comments</b> ${img.comments}</p>
                <p><b>Downloads</b> ${img.downloads}</p>
              </div>
            </li>`;
  }).join("");

  gallery.insertAdjacentHTML("beforeend", list);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add("is-visible");
}

export function hideLoader() {
  loader.classList.remove("is-visible");
}

export function showLoadMoreButton() {
  btn.classList.add("is-visible");
}

export function hideLoadMoreButton() {
  btn.classList.remove("is-visible");
}