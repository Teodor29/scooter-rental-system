import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6"
import { useCustomer } from "../context/CustomerContext"

function Wallet() {
  const { customer, error, loading } = useCustomer()

  return (
    <div className="main-content">
      <div className="page-header">
        <Link to="/profile">
          <FaArrowLeft className="back" />
        </Link>
        <h2>Wallet</h2>
      </div>
      <div className="wallet">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {customer && (
          <div className="wallet-content">
            <p className="balance">{customer.balance} Kr</p>
            <p>Available balance</p>
          </div>
        )}
      </div>
      <div className="page-footer">
        <Link to="/add-funds">
          <button>Add funds</button>
        </Link>
      </div>
    </div>
  )
}

export default Wallet
