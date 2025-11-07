import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/* =============================
   REGISTER ROUTE
============================= */
router.post("/register", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    // 1️⃣ Check if email already exists
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // 2️⃣ Hash password securely
    const hash = await bcrypt.hash(password, 10);

    // 3️⃣ Insert new user with all fields
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash, phone, address, role) VALUES (?,?,?,?,?,?)",
      [name, email, hash, phone, address, "student"]
    );

    // 4️⃣ Respond success
    res.json({
      id: result.insertId,
      email,
      message: "✅ User registered successfully!",
    });
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(400).json({ error: "Registration failed" });
  }
});

/* =============================
   LOGIN ROUTE
============================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1️⃣ Fetch user by email
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = rows[0];

    // 2️⃣ Compare password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3️⃣ Create JWT with user info
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // 4️⃣ Respond with token + user info
    res.json({
      token,
      name: user.name,
      role: user.role,
      phone: user.phone,
      address: user.address,
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

/* =============================
   PROFILE ROUTE (/auth/me)
============================= */
router.get("/me", async (req, res) => {
  try {
    // 1️⃣ Check if request has a token
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing token" });

    // 2️⃣ Extract and verify the token
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Fetch user info from MySQL using decoded user id
    const [rows] = await pool.query(
      "SELECT id, name, email, phone, address, role FROM users WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    // 4️⃣ Send user details to frontend
    res.json(rows[0]);
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
