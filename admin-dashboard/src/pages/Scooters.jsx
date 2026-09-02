import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllScooters, deleteScooter } from "../services/api/scooter"

function Scooters() {
  // State variables
  const [scooters, setScooters] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedRows, setExpandedRows] = useState([])
  const [filter, setFilter] = useState("all")

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

    fetchScooter()

    // fetch every 10 seconds
    const interval = setInterval(() => {
      fetchScooter()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Handle row expansion to show more details
  const handleExpand = (scooterId) => {
    if (expandedRows.includes(scooterId)) {
      setExpandedRows(expandedRows.filter((id) => id !== scooterId))
    } else {
      setExpandedRows([...expandedRows, scooterId])
    }
  }
  // Delete scooter by id
  const handleDelete = async (scooterId) => {
    try {
      await deleteScooter(scooterId)

      // Update the state to remove the deleted scooter
      setScooters({
        data: scooters.data.filter((scooter) => scooter._id !== scooterId),
      })
    } catch (error) {
      setError(error.message)
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Filter scooters by search term
  const filteredScooters = scooters
    ? scooters.data.filter((scooter) => {
        if (filter === "all") return true
        if (filter === "lowBattery") return scooter.battery < 20
        if (filter === "highBattery") return scooter.battery >= 20
        if (filter === "rented") return scooter.status === "rented"
        if (filter === "available") return scooter.status === "available"
        return true
      })
    : []

  return (
    <div className="scooters">
      <div className="page-header">
        <div className="filter">
          <label htmlFor="filter">Filter:</label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="lowBattery">Low Battery</option>
            <option value="highBattery">High Battery</option>
            <option value="rented">Rented</option>
            <option value="available">Available</option>
          </select>
        </div>
        <Link to="/add-scooter">
          <button>Add scooter</button>
        </Link>
      </div>
      {loading && <h2>Loading...</h2>}
      {error && <p>{error}</p>}
      {scooters && (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Battery</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              {filteredScooters.map((scooter) => (
                <React.Fragment key={scooter._id}>
                  <tr
                    onClick={() => handleExpand(scooter._id)}
                    className={scooter.battery < 20 ? "low-battery" : ""}
                  >
                    <td>{scooter._id}</td>
                    <td>{scooter.status}</td>
                    <td>{scooter.battery}</td>
                    <td>{scooter.speed}</td>
                  </tr>
                  {expandedRows.includes(scooter._id) && (
                    <tr
                      className={`expanded ${scooter.battery < 20 ? "low-battery" : ""}`}
                    >
                      <td colSpan="4">
                        <div className="expanded-content">
                          <div className="expanded-details">
                            <p>
                              Location: {scooter.location.latitude},{" "}
                              {scooter.location.longitude}
                            </p>
                            <p>User: {scooter.user}</p>
                            <p>Trip Log: {scooter.tripLog}</p>
                          </div>
                          <div className="expanded-actions">
                            <button onClick={() => handleDelete(scooter._id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default Scooters
