import { NavLink } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-menu">
          <NavLink to="/">Overview</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/scooters">Scooters</NavLink>
          <NavLink to="/customers">Customers</NavLink>
      </div>
    </div>
  )
}

export default Sidebar
