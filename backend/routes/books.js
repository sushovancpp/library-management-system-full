import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// ✅ GET all books (includes pdf_path)
router.get("/", async (req, res) => {
  const q = `%${req.query.q || ""}%`;

  try {
    const [rows] = await pool.query(
      `SELECT id, title, author, publisher, isbn,
              total_copies, available_copies, pdf_path
       FROM books
       WHERE title LIKE ? OR isbn LIKE ? OR author LIKE ?
       LIMIT 100`,
      [q, q, q]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Failed to load books" });
  }
});

// ✅ GET single book by ID (also include pdf_path)
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, author, publisher, isbn,
              total_copies, available_copies, pdf_path
       FROM books
       WHERE id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Book not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching book:", err.message);
    res.status(500).json({ error: "Failed to load book" });
  }
});

export default router;
