import axios from 'axios';

const api = 'https://pixabay.com/api/';
const api_key = '54662429-d0583973866d02e67b13f9c1b';

export async function getImagesByQuery(query,page=1) {
  const params = {
    key: api_key,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };
  try{
       const res = await axios.get(api, { params });
            return res.data;
  }
  catch(error){
    console.log(error);
    console.log(error.message);
  }
}
