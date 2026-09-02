import { useEffect, useState } from "react"
import { getAllScooters } from "../services/api/scooter"
import { getAllCustomers } from "../services/api/customer"

function Home() {
  // State variables
  const [scooters, setScooters] = useState(null)
  const [customers, setCustomers] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScooter = async () => {
      try {
        const data = await getAllScooters()
        setScooters(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    const fetchCustomer = async () => {
      try {
        const data = await getAllCustomers()
        setCustomers(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchScooter()
    fetchCustomer()

    // fetch every 10 seconds
    const interval = setInterval(() => {
      fetchScooter()
      fetchCustomer()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overview">
      {loading && <h2>Loading...</h2>}
      {error && <p>{error}</p>}
      {scooters && customers && (
        <>
          <div className="cards">
            <div className="card">
              <h2>Scooters</h2>
              <p>{scooters.data.length}</p>
            </div>
            <div className="card">
              <h2>Customers</h2>
              <p>{customers.data.length}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
