import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./styles/main.scss"
import "leaflet/dist/leaflet.css"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
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
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Sidebar />
        <div className="main">
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/scooters" element={<Scooters />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/add-customer" element={<AddCustomer />} />
                <Route path="/add-scooter" element={<AddScooter />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
