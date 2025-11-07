import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();
const router = express.Router();

// ✅ Middleware: verify admin
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ error: "Admin only" });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// ✅ Multer storage config for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

// ✅ POST /api/admin/books → Add new book + PDF
router.post("/books", requireAdmin, upload.single("pdf"), async (req, res) => {
  const { title, author, publisher, isbn, total_copies } = req.body;
  const pdfPath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const [result] = await pool.query(
      "INSERT INTO books (title, author, publisher, isbn, total_copies, available_copies, pdf_path) VALUES (?,?,?,?,?,?,?)",
      [title, author || null, publisher || null, isbn || null, total_copies || 1, total_copies || 1, pdfPath]
    );

    res.json({
      id: result.insertId,
      message: "✅ Book added successfully",
      pdf: pdfPath,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
