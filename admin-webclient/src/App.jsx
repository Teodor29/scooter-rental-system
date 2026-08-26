import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useState } from "react"
import "./styles/main.scss"
import "leaflet/dist/leaflet.css"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Map from "./pages/Map"
import Scooters from "./pages/Scooters"
import Customers from "./pages/Customers"
import AddCustomer from "./pages/AddCustomer"
import AddScooter from "./pages/AddScooter"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Change to false to test login
  const handleLogin = () => {
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <Sidebar />
      <div className="main">
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="*"
              element={
                <Home
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/map"
              element={
                <Map
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/scooters"
              element={
                <Scooters
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/customers"
              element={
                <Customers
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/add-customer"
              element={
                <AddCustomer
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/add-scooter"
              element={
                <AddScooter
                  isLoggedIn={isLoggedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
