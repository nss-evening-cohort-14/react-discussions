import React, { useState, useEffect } from 'react';
import { getAuthors } from '../helpers/data';

export default function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getAuthors().then(setAuthors);
  }, []);

  return (
    <div>
      <h1>Authors</h1>
      {authors.map((author) => (
        <p key={author.firebaseKey}>{author.first_name}</p>
      ))}
    </div>
  );
}
