import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29504531-9bab283f8cb4291b644273701';

export const getImages = async (query, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
