import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./styles/main.scss"
import { AuthProvider } from "./context/AuthContext"
import { CustomerProvider } from "./context/CustomerContext"
import ProtectedRoute from "./components/ProtectedRoute"
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

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <Router>
          <div className="main">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
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
                <Route path="/account" element={<Account />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/history" element={<History />} />
                <Route path="/history-details" element={<HistoryDetails />} />
                <Route path="/add-funds" element={<AddFunds />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </CustomerProvider>
    </AuthProvider>
  )
}

export default App
