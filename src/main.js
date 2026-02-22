import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import  {getImagesByQuery}  from "./js/pixabay-api.js";
import {createGallery,clearGallery,showLoader,hideLoader,showLoadMoreButton,hideLoadMoreButton} from "./js/render-functions.js";
import axios from "axios";


hideLoadMoreButton();

const form = document.querySelector(".form");
const btn = document.querySelector('.load');

form.addEventListener("submit", async (event) =>{

  event.preventDefault();

  const query = event.target.elements["search-text"].value.trim();
  let page = 1;

  if (!query) {
    iziToast.warning({
      message: "Поле пошуку порожнє!",
      position: "topRight",
    });
    return;
  }


    showLoader();
  clearGallery();
 
  try{
    const data = await getImagesByQuery(query,page);
    if (data.hits.length === 0) {
        iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
            });
        return;
        }
        createGallery(data.hits);
        showLoadMoreButton();
        }
  catch(error){
    console.log(error);
  }
  finally{
    hideLoader();
    form.reset();
  }
    
}
)
btn.addEventListener('click', async ()=>{
        page++;
        btn.disabled = true;
        btn.innerHTML = 'Loading';

        showLoader();
        try{
            
            console.log(page);
            const data = await getImagesByQuery(query,page);
            createGallery(data.hits);
            
        }
        catch(error){
            console.log(error);
        }
        finally{
            hideLoader();
            btn.disabled = false;
        }

    })