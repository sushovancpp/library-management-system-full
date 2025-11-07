import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const data = await login(email, password)
      if (data.role === 'admin') nav('/admin/books')
      else nav('/books')
    } catch (error) {
      setErr(error.response?.data?.error || 'Invalid credentials')
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🔐 Login to <span style={{ color: 'var(--accent)' }}>Kitab Ghar</span></h2>
        <p className="login-subtext">Access your library account easily.</p>

        {err && <div className="error">{err}</div>}

        <form onSubmit={submit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="show-pass-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button className="btn login-btn" type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="/register" className="link">Create one</a>
        </p>
      </div>
    </div>
  )
}
