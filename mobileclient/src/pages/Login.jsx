import { useState } from "react"
import { Navigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const { isLoggedIn, login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError(null)
    setLoading(true)

    try {
      await login(email, password)
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content">
      <div className="login">
        <img src="/scooter.svg" alt="Login Image" />
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  )
}

export default Login
