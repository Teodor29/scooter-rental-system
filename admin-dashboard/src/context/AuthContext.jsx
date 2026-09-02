import { createContext, useContext, useState } from "react"
import { loginAdmin } from "../services/api/admin"
import { getToken, setToken, clearToken } from "../services/api/token"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken())

  const login = async (username, password) => {
    const { token } = await loginAdmin(username, password)
    setToken(token)
    setTokenState(token)
  }

  const logout = () => {
    clearToken()
    setTokenState(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: Boolean(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
