import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="header">
      {/* ==== Left Logo ==== */}
      <div className="brand">
        <Link to="/">📚 KITAB GHAR</Link>
      </div>

      {/* ==== Center Nav ==== */}
      <nav className="nav-center">
        <Link
          to="/"
          className={currentPath === "/" ? "active-link" : ""}
        >
          Welcome
        </Link>
        <Link
          to="/books"
          className={currentPath === "/books" ? "active-link" : ""}
        >
          Books
        </Link>
        <Link
          to="/profile"
          className={currentPath === "/profile" ? "active-link" : ""}
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
