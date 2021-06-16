import axios from 'axios';
import firebaseConfig from '../apiKeys';

const BASE_URL = firebaseConfig.databaseURL;

const getAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${BASE_URL}/authors.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getBooks = () => new Promise((resolve, reject) => {
  axios.get(`${BASE_URL}/books.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getImages = () => new Promise((resolve, reject) => {
  axios.get(`${BASE_URL}/images.json`)
    .then((response) => resolve(Object.values(response.data || {})))
    .catch((error) => reject(error));
});
const postImages = (url) => new Promise((resolve, reject) => {
  axios.post(`${BASE_URL}/images.json`, { url })
    .then(resolve)
    .catch((error) => reject(error));
});

export {
  getAuthors,
  getBooks,
  getImages,
  postImages
};
