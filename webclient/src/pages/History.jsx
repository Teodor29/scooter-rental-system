import { useCustomer } from "../context/CustomerContext"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6"
import { formatDate } from "../utils/date"

function History() {
  const { customer, error, loading } = useCustomer()

  return (
    <div className="profile-content">
      <div className="page-header">
        <Link to="/profile">
          <FaArrowLeft className="back" />
        </Link>
        <h2>History</h2>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {customer.rentalHistory.length > 0 ? (
        <ul className="history-list">
          {customer.rentalHistory.map((rental) => (
            <li key={rental._id}>
              <Link
                to={`/history-details`}
                state={{ rental }}
                className="history-item"
              >
                <div className="history-details">
                  <span className="history-minutes">
                    {rental.durationMinutes} min
                  </span>
                  <span className="history-date">
                    {formatDate(rental.endTime)}
                  </span>
                </div>
                <span className="history-cost">{rental.cost} Kr</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="center">No rental history available.</p>
      )}
    </div>
  )
}

export default History
