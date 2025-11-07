import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address
      })
      alert('✅ Account created successfully! You can now login.')
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>🧾 Create Account</h2>
        <p className="login-subtext">Join Kitab Ghar and manage your books with ease.</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Name field */}
          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone field (moved to next line) */}
          <div className="input-group">
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="input-group">
            <label>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="show-pass-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button className="btn login-btn" type="submit">Create Account</button>
        </form>

        <p className="signup-text">
          Already have an account? <a href="/login" className="link">Login</a>
        </p>
      </div>
    </div>
  )
}
