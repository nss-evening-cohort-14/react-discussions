import React from 'react';
import PropTypes from 'prop-types';

export default function Books({ books, setBooks }) {
  return (
    <div>
      <h1>Books</h1>
      {books.map((book) => (
        <p key={book.firebaseKey}>{book.title}</p>
      ))}
      <button onClick={setBooks}>This a button</button>
    </div>
  );
}

Books.propTypes = {
  books: PropTypes.array,
  setBooks: PropTypes.func
};
