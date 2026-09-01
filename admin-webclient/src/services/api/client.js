import axios from "axios"
import { clearToken } from "./token"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
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
