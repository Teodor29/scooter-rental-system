import api from "./client"

export async function getCustomer() {
  const response = await api.get("/api/v1/customers/me")
  return response.data
}

export async function loginCustomer(email, password) {
  const response = await api.post("/api/v1/customers/login", {
    email,
    password,
  })
  return response.data
}

export async function addCustomer(customer) {
  const response = await api.post("/api/v1/customers/new-customer", customer)
  return response.data
}
