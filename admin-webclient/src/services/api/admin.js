import api from "./client"

export async function loginAdmin(username, password) {
  const response = await api.post("/api/v1/admins/login", {
    username,
    password,
  })
  return response.data
}
