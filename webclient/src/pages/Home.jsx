import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Home() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="home">
      <div className="home-content">
        <h2>Your ride is waiting</h2>
        {isLoggedIn ? (
          <>
            <p>Go to your profile to see your activity.</p>
            <Link to="/profile">
              <button className="login-button">Go to profile</button>
            </Link>
          </>
        ) : (
          <>
            <p>Log in to see your activity.</p>
            <Link to="/login">
              <button className="login-button">Log in</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
