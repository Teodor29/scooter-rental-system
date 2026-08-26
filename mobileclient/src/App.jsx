import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from "react"
import "./styles/main.scss"
import Navbar from "./components/Navbar"
import Map from "./pages/Map"
import Scan from "./pages/Scan"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Account from "./pages/Account"
import Wallet from "./pages/Wallet"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"
import AddFunds from "./pages/AddFunds"
import { CustomerProvider } from "./context/CustomerContext"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const customerId = 1

  // handle login
  const handleLogin = (event) => {
    event.preventDefault()
    setIsLoggedIn(true)
  }

  // handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <CustomerProvider customerId={customerId}>
      <Router>
        <div className="main">
          <Routes>
            {isLoggedIn ? (
              <>
                <Route
                  path="/"
                  element={
                    <>
                      <Map />
                      <Navbar />
                    </>
                  }
                />
                <Route
                  path="*"
                  element={
                    <>
                      <Map />
                      <Navbar />
                    </>
                  }
                />
                <Route
                  path="/scan"
                  element={
                    <>
                      <Scan />
                      <Navbar />
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <>
                      <Profile />
                      <Navbar />
                    </>
                  }
                />
                <Route
                  path="/account"
                  element={<Account onLogout={handleLogout} />}
                />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/history" element={<History />} />
                <Route path="/history-details" element={<HistoryDetails />} />
                <Route path="/add-funds" element={<AddFunds />} />
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Login onLogin={handleLogin} />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </CustomerProvider>
  )
}

export default App
