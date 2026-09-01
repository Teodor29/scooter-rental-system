import axios from "axios"
import { getToken, clearToken } from "./token"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      clearToken()
    }

    return Promise.reject(error)
  }
)

export default api
