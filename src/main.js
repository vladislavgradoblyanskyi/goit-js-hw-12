import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import  {getImagesByQuery}  from "./js/pixabay-api.js";
import {createGallery,clearGallery,showLoader,hideLoader,showLoadMoreButton,hideLoadMoreButton} from "./js/render-functions.js";


hideLoadMoreButton();

const form = document.querySelector(".form");
const btn = document.querySelector('.load');

form.addEventListener("submit", function (event) {

  event.preventDefault();
  showLoader();

  const query = event.target.elements["search-text"].value.trim();
  let page = 1;

  if (!query) {
    iziToast.warning({
      message: "Поле пошуку порожнє!",
      position: "topRight",
    });
    return;
  }


  clearGallery();
 
  getImagesByQuery(query,page)
   
    .then( (data) => {

      if (data.hits.length === 0) {

        iziToast.error({
          message: "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
        });

        return;
      }
      createGallery(data.hits);
    })
    .catch( () =>
        {
      iziToast.error({
        message: "Помилка запиту на сервер",
        position: "topRight",
      });

    })
    .finally(()=>{
        hideLoader();
        form.reset();
        showLoadMoreButton();
    })

    btn.addEventListener('click', ()=>{
        page++;
    getImagesByQuery(query,page)
        .then((data) => {
            createGallery(data.hits);
        })
        .catch((error)=>{
            console.log(error);
        })})
});
