import api from "./client"

export async function getCustomer(customerId) {
  const response = await api.get(`/api/v1/customers/customer/${customerId}`)
  return response.data.data[0]
}
