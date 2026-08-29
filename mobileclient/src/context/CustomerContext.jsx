import { createContext, useContext, useEffect, useState } from "react"
import { getCustomer } from "../services/api/customer"
import { useAuth } from "./AuthContext"

const CustomerContext = createContext(null)

export function CustomerProvider({ children }) {
  const { isLoggedIn } = useAuth()

  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isLoggedIn) {
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
  }, [isLoggedIn])

  return (
    <CustomerContext.Provider
      value={{
        customer,
        loading,
        error,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer() {
  return useContext(CustomerContext)
}
