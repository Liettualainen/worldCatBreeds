import { fetchBreeds,  fetchCatByBreed } from "./cat-api.js";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const fetchPostsInput = document.querySelector('#slimSelect');
const fetchCatsDetails = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

async function fetchcats()
{
   try {
     const cats = await fetchBreeds();
     if (cats) {
    loader.style.display = "none";
      fetchPostsInput.style.display = "";
     }
     renderPosts(cats);
   } catch (error) {
       loader.style.display = "none";
     fetchPostsInput.style.display = "none",
    Notiflix.Notify.failure(`❌ Oops! Something went wrong!</p>Try reloading the page!`, {
      timeout: 2000, useIcon: false, width: '240px', position: 'left-top', distance: '10px',
    }, )
     console.log(error);
   }
};
function renderPosts(cats) {
  const catList = cats
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    }).join("\n")
  fetchPostsInput.innerHTML = catList;
    if (slimSelect.innerHTML !== "") {
  const select= new SlimSelect({
    select: document.querySelector('#slimSelect'),
    settings: {
    placeholderText: 'Search your cat`s feed',
    showSearch: true,
    searchText: 'Sorry nothing to see here',
    searchPlaceholder: 'Search your cat`s feed',
    searchHighlight: false,
    closeOnSelect: true,
    showOptionTooltips: false,
  }})
  }
  return fetchPostsInput;
}

async function fetchCat(breedId)
{
  try {
    loader.style.display = "";
    loader.style.position = "absolute";
    loader.style.left = "5% ";
    loader.style.top = "5% "
    fetchCatsDetails.style.display = "none";
    
    const cat = await fetchCatByBreed(breedId);
    if (cat) {
        fetchCatsDetails.style.display = "";
      loader.style.display = "none";
    } 
     renderCat(cat);
  } catch (error) { Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`, {
      timeout: 2000, useIcon: true, width: '340px', position: 'left-top', distance: '50px',
    }, )
     console.log(error);
  }
};


function renderCat(cat) {
  fetchCatsDetails.innerHTML = "";  
  const catDeatails = cat[0].breeds[0];
  const catImg = cat[0].url;
              const form = document.createElement('form')
              fetchCatsDetails.appendChild(form);
              const divblock = document.createElement('div');
              divblock.className = "divblock";
              form.appendChild(divblock);  
              const divImg = document.createElement('div')
              divblock.appendChild(divImg);
              const img = new Image(300);
              img.style.width = "300px";
              img.style.border = "5px solid orange";
              img.style.borderRadius = "10px";
    img.src = catImg;
              divImg.appendChild(img)
              const div = document.createElement('div')
              div.style.marginLeft = "35px";
              divblock.appendChild(div);
              const div2 = document.createElement('div')
              div2.className = "description";
              div2.style.marginBottom = "15px";
              div2.style.width = "400px";
              div.appendChild(div2);
              const spanName = document.createElement('h2')
    spanName.innerHTML = catDeatails.name;
              div2.appendChild(spanName);  
              const span = document.createElement('span')
    span.innerHTML = catDeatails.description;
              div2.appendChild(span);
              const div1 = document.createElement('div')
              div1.className = "temperament";
              div.appendChild(div1);
              const temperament = document.createElement('span')
              temperament.innerHTML = "Temperament: ";
              span.className = "temperament";
              temperament.style.fontWeight  = "bold";
              div1.appendChild(temperament);
              const catTempero = document.createElement('span')
    catTempero.innerHTML = catDeatails.temperament;
              div1.appendChild(catTempero);
  return fetchCatsDetails;
}

fetchPostsInput.addEventListener("change", function () {
  const breedId = fetchPostsInput.value;
  fetchCat(breedId);
});

fetchcats();

export { fetchBreeds,  fetchCatByBreed}
