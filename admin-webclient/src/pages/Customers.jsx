import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllCustomers, deleteCustomer } from "../services/api/customer"

function Customers() {
  // State variables
  const [customers, setCustomers] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedRows, setExpandedRows] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers()
        setCustomers(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [])

  // Handle row expansion to show more details
  const handleExpand = (customerId) => {
    if (expandedRows.includes(customerId)) {
      setExpandedRows(expandedRows.filter((id) => id !== customerId))
    } else {
      setExpandedRows([...expandedRows, customerId])
    }
  }
  // Delete customer by id
  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId)

      // Update the state to remove the deleted customer
      setCustomers({
        data: customers.data.filter((customer) => customer._id !== customerId),
      })
    } catch (error) {
      setError(error.message)
    }
  }

  // Filter customers based on search term
  const filteredCustomers = customers
    ? customers.data.filter(
        (customer) =>
          (customer.firstName ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (customer.lastName ?? "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
    : []

  return (
    <div className="customers">
      <div className="page-header">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/add-customer">
          <button>Add Customer</button>
        </Link>
      </div>
      {loading && <h2>Loading...</h2>}
      {error && <p>{error}</p>}
      {customers && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <React.Fragment key={customer._id}>
                <tr onClick={() => handleExpand(customer._id)}>
                  <td>{customer._id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                </tr>
                {expandedRows.includes(customer._id) && (
                  <tr className="expanded">
                    <td colSpan="3">
                      <div className="expanded-content">
                        <p>
                          {customer.firstName} {customer.lastName}
                        </p>
                        <button onClick={() => handleDelete(customer._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Customers
