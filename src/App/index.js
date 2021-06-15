import React, { useState, useEffect } from 'react';
import { getBooks } from '../helpers/data';
import Routes from '../helpers/Routes';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  return (
   <>
    <Routes
      books={books}
    />
   </>
  );
}

export default App;
