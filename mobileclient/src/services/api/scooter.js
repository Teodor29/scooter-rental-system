import api from "./client"

export async function getAllScooters() {
  const response = await api.get("/api/v1/scooters/all-scooters")
  return response.data
}
