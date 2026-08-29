import { Link } from "react-router-dom"
import { MdAccountCircle } from "react-icons/md"
import { useAuth } from "../context/AuthContext"

function Header() {
  const { isLoggedIn, logout } = useAuth()
  return (
    <div className="header">
      <h1>
        <Link to="/">Admin Dashboard</Link>
      </h1>
      <div className="buttons">
        {isLoggedIn && (
          <>
            <Link to="/" onClick={logout} className="logout-button">
              Log out
            </Link>
            <Link to="/profile" className="profile-icon">
              <MdAccountCircle />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
