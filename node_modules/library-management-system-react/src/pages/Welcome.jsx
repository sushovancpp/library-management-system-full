import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #141e30, #243b55)",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <h1 style={{ fontSize: "2.8rem", marginBottom: "15px" }}>
        📚 Welcome to{" "}
        <span style={{ color: "#00c3ff", fontWeight: "bold" }}>Kitab Ghar</span>
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "rgba(255,255,255,0.85)",
          maxWidth: "600px",
          marginBottom: "35px",
          lineHeight: "1.6",
        }}
      >
        Your digital library system — explore, manage, and read your favorite
        books seamlessly. Whether you’re a student or an admin, Kitab Ghar helps
        you stay organized and connected with your reading world.
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            background: "#00c3ff",
            color: "white",
            padding: "12px 30px",
            borderRadius: "8px",
            fontWeight: "600",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#0077b6")}
          onMouseOut={(e) => (e.target.style.background = "#00c3ff")}
        >
          🔑 Login
        </Link>

        <Link
          to="/register"
          style={{
            textDecoration: "none",
            background: "rgba(255,255,255,0.15)",
            color: "white",
            padding: "12px 30px",
            borderRadius: "8px",
            fontWeight: "600",
            border: "1px solid rgba(255,255,255,0.3)",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "rgba(255,255,255,0.3)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "rgba(255,255,255,0.15)")
          }
        >
          🧾 Create Account
        </Link>
      </div>

      <footer
        style={{
          marginTop: "50px",
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        © {new Date().getFullYear()} Kitab Ghar. All Rights Reserved.
      </footer>
    </div>
  );
}
