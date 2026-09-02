import { NavLink } from "react-router-dom"
import { TbMap2 } from "react-icons/tb"
import { MdOutlineQrCode } from "react-icons/md"
import { MdOutlineAccountCircle } from "react-icons/md"

function Navbar() {
  return (
    <div className="navbar">
      <nav className="nav">
        <NavLink to="/" className="nav-item">
          <TbMap2 className="nav-icon" />
          <span>Map</span>
        </NavLink>
        <NavLink to="/scan" className="nav-item">
          <MdOutlineQrCode className="nav-icon qr" />
        </NavLink>
        <NavLink to="/profile" className="nav-item">
          <MdOutlineAccountCircle className="nav-icon" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default Navbar
