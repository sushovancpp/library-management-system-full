import { pool } from "./db.js";

async function checkDB() {
  try {
    const [rows] = await pool.query("SELECT id, name, email FROM users");
    console.log("✅ Connected to MySQL successfully.");
    console.log("Users table:");
    console.table(rows);
  } catch (err) {
    console.error("❌ Database connection or query failed:", err.message);
  } finally {
    process.exit();
  }
}

checkDB();
