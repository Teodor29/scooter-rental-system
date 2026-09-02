import { useEffect, useState } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { TbScooter } from "react-icons/tb"
import ReactDOMServer from "react-dom/server"
import { getAllScooters, deleteScooter } from "../services/api/scooter"
import { getAllCities } from "../services/api/city"

function Map() {
  // State variables
  const [scooters, setScooters] = useState(null)
  const [cities, setCities] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)
  const [filter, setFilter] = useState("all")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScooter = async () => {
      try {
        const data = await getAllScooters()
        setScooters(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    const fetchCities = async () => {
      try {
        const data = await getAllCities()
        setCities(data)
        setSelectedCity(data.data[0])
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchScooter()
    fetchCities()

    // fetch every 10 seconds
    const interval = setInterval(() => {
      fetchScooter()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleCityChange = (event) => {
    const cityId = event.target.value
    const city = cities.data.find((city) => city._id === cityId)
    setSelectedCity(city)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredScooters = scooters
    ? scooters.data.filter((scooter) => {
        if (filter === "all") return true
        if (filter === "lowBattery") return scooter.battery < 20
        if (filter === "highBattery") return scooter.battery >= 20
        if (filter === "rented") return scooter.status === "rented"
        if (filter === "available") return scooter.status === "available"
        return true
      })
    : []

  const handleDelete = async (scooterId) => {
    try {
      await deleteScooter(scooterId)

      // Update the state to remove the deleted scooter
      setScooters({
        data: scooters.data.filter((scooter) => scooter._id !== scooterId),
      })
    } catch (error) {
      setError(error.message)
    }
  }

  const scooterIconGreen = new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <div className="scooter-icon" style={{ backgroundColor: "darkgreen" }}>
        <TbScooter className="icon" size={24} color="white" />
      </div>,
    ),
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  })

  const scooterIconRed = new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <div className="scooter-icon" style={{ backgroundColor: "darkred" }}>
        <TbScooter className="icon" size={24} color="white" />
      </div>,
    ),
    className: "custom-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  })

  const ChangeMapCenter = ({ center }) => {
    const map = useMap()
    map.setView(center)
    return null
  }

  return (
    <div className="map">
      {loading && <h2>Loading...</h2>}
      {error && <p className="error-msg">{error}</p>}
      {cities && (
        <div className="page-header">
          <div>
            <label htmlFor="city-select">City:</label>
            <select id="city-select" onChange={handleCityChange}>
              {cities.data.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter">Filter:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="lowBattery">Low Battery</option>
              <option value="highBattery">High Battery</option>
              <option value="rented">Rented</option>
              <option value="available">Available</option>
            </select>
          </div>
        </div>
      )}
      {selectedCity && scooters && (
        <MapContainer
          center={[
            selectedCity.driveZone.latitude,
            selectedCity.driveZone.longitude,
          ]}
          zoom={12}
        >
          <ChangeMapCenter
            center={[
              selectedCity.driveZone.latitude,
              selectedCity.driveZone.longitude,
            ]}
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredScooters.map((scooter) => (
            <Marker
              key={scooter._id}
              position={[scooter.location.latitude, scooter.location.longitude]}
              icon={
                scooter.status === "available"
                  ? scooterIconGreen
                  : scooterIconRed
              }
            >
              <Popup>
                <h3>{scooter._id}</h3>
                <p>Status: {scooter.status}</p>
                <p>Battery: {scooter.battery}</p>
                <p>Speed: {scooter.speed}</p>
                <button onClick={() => handleDelete(scooter._id)}>
                  Delete
                </button>
              </Popup>
            </Marker>
          ))}
          <Circle
            center={[
              selectedCity.driveZone.latitude,
              selectedCity.driveZone.longitude,
            ]}
            pathOptions={{ fillColor: "green" }}
            stroke={false}
            radius={selectedCity.driveZone.radius_km2 * 1000}
          >
            <Popup>
              <h2>{selectedCity.city}</h2>
            </Popup>
          </Circle>
          {selectedCity.parkZones.map((zone, index) => (
            <Circle
              key={index}
              center={[zone.latitude, zone.longitude]}
              pathOptions={{ color: "blue" }}
              stroke={false}
              radius={zone.radius_km2 * 10000}
            >
              <Popup>
                <h2>{zone.name}</h2>
              </Popup>
            </Circle>
          ))}
          {selectedCity.chargingZones.map((zone, index) => (
            <Circle
              key={index}
              center={[zone.latitude, zone.longitude]}
              pathOptions={{ color: "red" }}
              stroke={false}
              radius={zone.radius_km2 * 10000}
            >
              <Popup>
                <h2>{zone.name}</h2>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      )}
    </div>
  )
}

export default Map
