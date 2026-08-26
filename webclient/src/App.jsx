import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from "react"
import "./styles/main.scss"
import Profile from "./pages/Profile"
import Account from "./pages/Account"
import Wallet from "./pages/Wallet"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"
import AddFunds from "./pages/AddFunds"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { CustomerProvider } from "./context/CustomerContext"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Change to false to test login
  const customerId = 1

  const handleLogin = (event) => {
    event.preventDefault()
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <CustomerProvider customerId={customerId}>
      <Router>
        <div className="main">
          <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
              <Route path="*" element={<Home isLoggedIn={isLoggedIn} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/history" element={<History />} />
              <Route path="/history-details" element={<HistoryDetails />} />
              <Route path="/add-funds" element={<AddFunds />} />
              <Route
                path="/login"
                element={
                  <Login
                    isLoggedIn={isLoggedIn}
                    onLogin={handleLogin}
                    handleLogout={handleLogout}
                  />
                }
              />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CustomerProvider>
  )
}

export default App
