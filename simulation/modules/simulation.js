import database from "./db.js"

async function bulkUpdateScooters(scooterObjects) {
  try {
    const bulkOps = scooterObjects.map((scooter) => ({
      updateOne: {
        filter: { _id: scooter.scooterID }, // Assuming the scooter has a unique scooterID
        update: {
          $set: {
            location: scooter.location,
            status: scooter.status,
            speed: scooter.speed,
            battery: scooter.battery,
            tripLog: scooter.tripLog,
          },
        },
      },
    }))

    if (bulkOps.length > 0) {
      await database.updateAll("scooters", bulkOps)
      console.log(`Bulk update successful for ${bulkOps.length} scooters.`)
    }
  } catch (error) {
    console.error("Error during bulk update:", error.message)
  }
}

// Function to log the current status of all scooters
export async function logScooterStatuses(scooterObjects) {
  console.log("---- Scooter Status Update ----")
  scooterObjects.forEach((scooter, index) => {
    console.log(`Scooter ${index + 1} in ${scooter.city}:`)
    console.log(`Scooter ${index + 1} is rented by: ${scooter.user}:`)
    console.log(
      `  Location: { latitude: ${scooter.location.latitude}, longitude: ${scooter.location.longitude} }`,
    )
    console.log(`  Battery: ${scooter.battery}`)
    console.log(`  Speed: ${scooter.speed}`)
  })
  console.log("--------------------------------")
}

export async function moveScooters(scooterObjects, citiesData) {
  const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 10000 // 10 second update interval per default

  // Start the status logging every 10 seconds
  const statusInterval = setInterval(() => {
    bulkUpdateScooters(scooterObjects)
  }, UPDATE_INTERVAL) // Log every 10 seconds
  const movementPromises = scooterObjects.map(async (scooter) => {
    const cityData = citiesData.find((city) => city.city === scooter.city)

    if (cityData) {
      let destination = getRandomCoordinates(cityData.driveZone)
      scooter.setSpeed(process.env.SCOOTER_SPEED)

      const result = await simulateMovement(scooter, destination)

      if (result.arrived) {
        scooter.park()

        let parkingSpot = await canIPark(cityData.parkZones, scooter.location)
        if (parkingSpot) {
          console.log("parkingSpot found")
        }
      } else {
        console.log("Scooter could not reach the destination.")
      }
      console.log("Final Scooter State:", result.scooter)
    } else {
      console.error(`City not found for scooter: ${scooter.city}`)
    }
  })

  await Promise.all(movementPromises)
  // Stop logging once all scooters have finished their movement
  clearInterval(statusInterval)
  //save one last time
  bulkUpdateScooters(scooterObjects)
}

export async function simulateMovement(scooter, destination) {
  const SIMULATION_SPEED = process.env.SIMULATION_SPEED || 1000 // Default value of 1 second
  const speedPerSecond = scooter.speed / 3600 // Convert km/h to km/s

  if (scooter.battery <= 0) {
    console.log("Battery depleted. Scooter cannot continue.")
    return { arrived: false, scooter }
  }

  const distance = getDistance(scooter.location, destination)

  if (distance <= 0.01) {
    // Consider arrival if within 10 meters
    scooter.location = { ...destination } // Snap to destination
    console.log(
      `Arrived at Destination: { latitude: ${destination.latitude}, longitude: ${destination.longitude} }`,
    )
    return { arrived: true, scooter }
  }

  // Calculate proportional movement step
  const maxMoveDistance = speedPerSecond // Distance scooter can travel per second
  const ratio = Math.min(1, maxMoveDistance / distance) // Ensure we don't overshoot

  // Update scooter position proportionally
  scooter.location.latitude +=
    (destination.latitude - scooter.location.latitude) * ratio
  scooter.location.longitude +=
    (destination.longitude - scooter.location.longitude) * ratio
  // scooter.battery -= 1;

  await new Promise((resolve) => setTimeout(resolve, SIMULATION_SPEED))

  return simulateMovement(scooter, destination)
}

// Function to calculate the distance between two points using the Haversine formula
export function getDistance(coordA, coordB) {
  const R = 6371 // Earth's radius in km
  const toRadians = (angle) => angle * (Math.PI / 180)
  const dLat = toRadians(coordB.latitude - coordA.latitude)
  const dLng = toRadians(coordB.longitude - coordA.longitude)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(coordA.latitude)) *
      Math.cos(toRadians(coordB.latitude)) *
      Math.sin(dLng / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km
}

// Function to interpolate between two coordinates
export function interpolateCoords(start, end, fraction) {
  return {
    latitude: start.latitude + fraction * (end.latitude - start.latitude),
    longitude: start.longitude + fraction * (end.longitude - start.longitude),
  }
}

export function getRandomCoordinates(cityCenter) {
  const { latitude, longitude, radius_km2 } = cityCenter

  // Convert radius from square kilometers to a circular radius in kilometers
  const radius = Math.sqrt(radius_km2)

  // Convert radius to degrees (approximately, assuming Earth is a sphere)
  const radiusInDegrees = radius / 111 // 111 km ~ 1 degree of latitude

  const angle = Math.random() * 2 * Math.PI

  const distance = Math.random() * radiusInDegrees

  const deltaLat = distance * Math.cos(angle)
  const deltaLon =
    (distance * Math.sin(angle)) / Math.cos(latitude * (Math.PI / 180))

  const randomLat = latitude + deltaLat
  const randomLon = longitude + deltaLon

  return {
    latitude: randomLat,
    longitude: randomLon,
  }
}

export async function canIPark(parkZones, location) {
  const DEFAULT_RADIUS_KM = 0.01

  const toRadians = (degrees) => (degrees * Math.PI) / 180

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Earth's radius in km
    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in km
  }

  for (const zone of parkZones) {
    const radius = zone.radius_km2 || DEFAULT_RADIUS_KM
    const distance = haversineDistance(
      location.latitude,
      location.longitude,
      zone.latitude,
      zone.longitude,
    )

    if (distance <= radius) {
      return true
    }
  }

  return "Location is not within any park zone"
}
