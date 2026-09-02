import { createContext, useContext, useState, useEffect } from "react"
import { loginCustomer } from "../services/api/customer"
import { getCustomer } from "../services/api/customer"
import { getToken, setToken, clearToken } from "../services/api/token"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken())
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const login = async (username, password) => {
    const { token, customer } = await loginCustomer(username, password)
    setToken(token)
    setTokenState(token)
    setCustomer(customer)
  }

  const logout = () => {
    clearToken()
    setTokenState(null)
    setCustomer(null)
  }

  useEffect(() => {
    if (!token) {
      setCustomer(null)
      setLoading(false)
      return
    }

    async function fetchCustomer() {
      try {
        setLoading(true)
        setError(null)

        const data = await getCustomer()

        setCustomer(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(token),
        customer,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
