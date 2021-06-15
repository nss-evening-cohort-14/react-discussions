import axios from 'axios';

const getAuthors = () => new Promise((resolve, reject) => {
  axios.get('https://almost-1564e-default-rtdb.firebaseio.com/authors.json')
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getBooks = () => new Promise((resolve, reject) => {
  axios.get('https://almost-1564e-default-rtdb.firebaseio.com/books.json')
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getAuthors,
  getBooks
};
