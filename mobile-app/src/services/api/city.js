import api from "./client"

export async function getAllCities() {
  const response = await api.get("/api/v1/cities/all-cities")
  return response.data
}
