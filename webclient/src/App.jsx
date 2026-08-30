import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./styles/main.scss"
import { AuthProvider } from "./context/AuthContext"
import { CustomerProvider } from "./context/CustomerContext"
import ProtectedRoute from "./components/ProtectedRoute"
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

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <Router>
          <div className="main">
            <Header />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/history-details" element={<HistoryDetails />} />
                  <Route path="/add-funds" element={<AddFunds />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </CustomerProvider>
    </AuthProvider>
  )
}

export default App
