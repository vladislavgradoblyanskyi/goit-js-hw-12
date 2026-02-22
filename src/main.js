import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import  {getImagesByQuery}  from "./js/pixabay-api.js";
import {createGallery,clearGallery,showLoader,hideLoader,showLoadMoreButton,hideLoadMoreButton} from "./js/render-functions.js";
import axios from "axios";


hideLoadMoreButton();
let page = 1;
const form = document.querySelector(".form");
const btn = document.querySelector('.load');
let query_global= ''

form.addEventListener("submit", async (event) =>{

  event.preventDefault();
  const query = event.target.elements["search-text"].value.trim();
    
  if (!query) {
    iziToast.warning({
      message: "Поле пошуку порожнє!",
      position: "topRight",
    });
    return;
  }

  query_global = query;
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
        

        if(15>data.totalHits){
            hideLoadMoreButton();
        }
        else{
            showLoadMoreButton();
        }

        }

  catch(error){
    console.log(error);
    iziToast.error({
            message: `something went wrong :( ${error}`,
            position: "topRight",
            });
  }
  finally{
    hideLoader();
  }
    return query;
}
)

btn.addEventListener('click', async ()=>{
        page++;
        btn.disabled = true;
        btn.innerHTML = 'Loading...';

        showLoader();
        try{
            
            const data = await getImagesByQuery(query_global,page);
            console.log(page);

            createGallery(data.hits);
            
        }
        catch(error){
            console.log(error);
            iziToast.error({
                message: `something went wrong :( ${error}`,
                position: "topRight",
                });
        }
        finally{
            hideLoader();
            btn.disabled = false;
            btn.innerHTML = 'Load more';
        }
    })