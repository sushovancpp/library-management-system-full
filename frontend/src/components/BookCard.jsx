import React from 'react';

export default function BookCard({ book }) {
  const baseURL = "http://localhost:4000";
  const pdfLink = book.pdf_path ? `${baseURL}${book.pdf_path}` : null;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h3>{book.title}</h3>
        <p><strong>Author:</strong> {book.author || 'Unknown'}</p>
        <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
        <p><strong>Available Copies:</strong> {book.available_copies}</p>
      </div>

      {pdfLink ? (
        <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href={pdfLink}
            target="_blank"
            rel="noreferrer"
            className="btn small"
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📖 View PDF
          </a>
          <a
            href={pdfLink}
            download
            className="btn small"
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ⬇️ Download
          </a>
        </div>
      ) : (
        <p style={{ color: '#6b7280', marginTop: '10px' }}>No PDF available</p>
      )}
    </div>
  );
}
