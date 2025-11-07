import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBook } from '../api';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook(id).then(setBook);
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Total Copies:</strong> {book.total_copies}</p>
      <p><strong>Available Copies:</strong> {book.available_copies}</p>

      {book.pdf_path && (
        <div style={{ marginTop: '10px' }}>
          <a
            href={`http://localhost:4000${book.pdf_path}`}
            target="_blank"
            rel="noreferrer"
            className="btn"
          >
            📘 Open Book
          </a>
          <a
            href={`http://localhost:4000${book.pdf_path}`}
            download
            className="btn"
            style={{ marginLeft: '8px', background: '#10b981' }}
          >
            ⬇️ Download
          </a>
        </div>
      )}
    </div>
  );
}
