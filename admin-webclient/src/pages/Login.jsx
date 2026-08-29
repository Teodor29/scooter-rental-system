import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
  const { isLoggedIn, login } = useAuth()

  const [username, setUsername] = useState("")
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
      await login(username, password)
      Navigate("/")
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="center">Log in</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && <p className="login-error">{error}</p>}
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  )
}

export default Login
