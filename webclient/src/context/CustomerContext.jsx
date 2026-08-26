import { createContext, useContext, useEffect, useState } from "react"
import { getCustomer } from "../services/api/customer"

const CustomerContext = createContext()

export const useCustomer = () => useContext(CustomerContext)

export const CustomerProvider = ({ customerId, children }) => {
  const [customer, setCustomer] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!customerId) {
      setError("Customer ID is required")
      setLoading(false)
      return
    }

    const fetchCustomer = async () => {
      try {
        const data = await getCustomer(customerId)
        setCustomer(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomer()
  }, [customerId])

  return (
    <CustomerContext.Provider value={{ customer, error, loading }}>
      {children}
    </CustomerContext.Provider>
  )
}
