const axios = require('axios').default;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/breeds';
axios.defaults.headers.common["x-api-key"] = 'live_LvFy4yYYCNd4yVpvWYbla3SLSuX17j7Lz7OHydyrhv9o5DJ8HR0V5VwLlZGdWh1I';

const fetchBreeds = async () => {
  const response = await axios.get("");
    return response.data;
}

 const fetchCatByBreed = async (breedId) => {
  const response = await axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  ); 
      return response.data;
}

export { fetchBreeds,  fetchCatByBreed}