import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
          <Link to="/">Overview</Link>
          <Link to="/map">Map</Link>
          <Link to="/scooters">Scooters</Link>
          <Link to="/customers">Customers</Link>
      </div>
    </div>
  )
}

export default Sidebar
