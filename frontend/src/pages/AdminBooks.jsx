import React, { useEffect, useState } from "react";
import api, { authHeader } from "../api";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);
  const [file, setFile] = useState(null);

  // ✅ Fetch logged-in user info
  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const res = await api.get("/auth/me", { headers: authHeader() });
      setUser(res.data);
      loadBooks();
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  }

  // ✅ Load all books
  async function loadBooks() {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error loading books:", err);
    }
  }

  // ✅ Add new book (admin only)
  async function addBook(e) {
    e.preventDefault();
    if (!user || user.role !== "admin") {
      alert("❌ Only admins can add books!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publisher", publisher);
    formData.append("isbn", isbn);
    formData.append("total_copies", totalCopies);
    if (file) formData.append("pdf", file);

    try {
      await api.post("/admin/books", formData, {
        headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
      });
      alert("✅ Book added successfully!");
      setTitle("");
      setAuthor("");
      setPublisher("");
      setIsbn("");
      setTotalCopies(1);
      setFile(null);
      loadBooks();
    } catch (err) {
      console.error("Error adding book:", err);
      alert(err.response?.data?.error || "Error adding book");
    }
  }

  const baseURL = "http://localhost:4000";

  return (
    <div className="admin-page">
      <h2 className="page-title">
        📚 {user?.role === "admin" ? "Admin Panel - Manage Books" : "Available Books"}
      </h2>

      {/* Admin Add Book Form */}
      {user?.role === "admin" && (
        <form className="add-book-form" onSubmit={addBook} encType="multipart/form-data">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
            required
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
          />
          <input
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="Publisher"
          />
          <input
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="ISBN"
          />
          <input
            type="number"
            value={totalCopies}
            onChange={(e) => setTotalCopies(e.target.value)}
            placeholder="Total Copies"
            min="1"
          />
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
          <button className="btn">➕ Add Book</button>
        </form>
      )}

      {/* Book Grid */}
      <div className="grid">
        {books.map((b) => (
          <div key={b.id} className="card book-card">
            <h3>{b.title}</h3>
            <p><strong>Author:</strong> {b.author || "Unknown"}</p>
            <p><strong>ISBN:</strong> {b.isbn || "N/A"}</p>
            <p><strong>Available:</strong> {b.available_copies}</p>

            {b.pdf_path ? (
              <div className="book-actions">
                <a
                  href={`${baseURL}${b.pdf_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn small"
                >
                  📖 View PDF
                </a>
                <a
                  href={`${baseURL}${b.pdf_path}`}
                  download
                  className="btn small alt"
                >
                  ⬇️ Download
                </a>
              </div>
            ) : (
              <p style={{ color: "#9ca3af" }}>No PDF available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
