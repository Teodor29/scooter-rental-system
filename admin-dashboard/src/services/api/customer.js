import api from "./client"

export async function getAllCustomers() {
  const response = await api.get("/api/v1/customers/all-customers")
  return response.data
}

export async function addCustomer(customer) {
  const response = await api.post("/api/v1/customers/new-customer", customer)
  return response.data
}

export async function deleteCustomer(customerId) {
  const response = await api.delete("/api/v1/customers/delete-one-customer", {
    data: { _id: customerId },
  })
  return response.data
}
