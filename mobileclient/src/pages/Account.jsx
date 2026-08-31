import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6"
import { useAuth } from "../context/AuthContext"
import { useCustomer } from "../context/CustomerContext"

function Account() {
  const { logout } = useAuth()
  const { customer, loading, error } = useCustomer()
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  useEffect(() => {
    // Set customer info
    if (customer) {
      setCustomerInfo({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
      })
    }
  }, [customer])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    })
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="main-content account">
      <div className="page-header">
        <Link to="/profile">
          <FaArrowLeft className="back" />
        </Link>
        <h2>Account</h2>
        <button className="save-button" onClick={handleSubmit}>
          Save
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {customer && (
        <form onSubmit={handleSubmit}>
          <div className="name-inputs">
            <input
              type="text"
              id="firstname"
              name="firstName"
              value={customerInfo.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              id="lastname"
              name="lastName"
              value={customerInfo.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={customerInfo.email}
            onChange={handleChange}
          />
        </form>
      )}
      <div className="page-footer">
        <Link to="/">
          <button onClick={logout}>Logout</button>
        </Link>
        <Link to="/">
          <button className="delete-button">Delete Account</button>
        </Link>
      </div>
    </div>
  )
}

export default Account
