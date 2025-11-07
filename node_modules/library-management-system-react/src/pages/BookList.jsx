import React, { useState, useEffect } from 'react';
import { fetchBooks } from '../api';
import BookCard from '../components/BookCard';

export default function BookList() {
  const [q, setQ] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks(q).then(setBooks);
  }, [q]);

  return (
    <div>
      <div className="search-row">
        <input
          placeholder="Search by title or ISBN"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}
