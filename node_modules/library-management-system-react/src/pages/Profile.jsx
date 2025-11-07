import React, { useEffect, useState } from "react";
import api, { authHeader } from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const res = await api.get("/auth/me", { headers: authHeader() });
      setUser(res.data);
    } catch (err) {
      console.error("Profile error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setError("Session expired. Please log in again.");
      navigate("/login");
    }
  }

  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
          alt="Profile Avatar"
          className="profile-img"
        />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
        <p><strong>Address:</strong> {user.address || "Not provided"}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button
          className="btn"
          style={{ marginTop: "10px", backgroundColor: "#ef4444" }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
