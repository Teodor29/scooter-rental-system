import api from "./client"

export async function getAllScooters() {
  const response = await api.get("/api/v1/scooters/all-scooters")
  return response.data
}

export async function addScooter(scooter) {
  const response = await api.post("/api/v1/scooters/new-scooter", scooter)
  return response.data
}

export async function deleteScooter(scooterId) {
  const response = await api.delete("/api/v1/scooters/delete-one-scooter", {
    data: { _id: scooterId },
  })
  return response.data
}
