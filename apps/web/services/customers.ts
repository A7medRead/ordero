import { api } from "@/lib/api";

export async function getCustomers() {
  const response = await api.get("/customers");
  return response.data;
}


export async function createCustomer(data: {
  name: string;
  phone: string;
  email: string;
}) {
  const response = await api.post("/customers", data);
  return response.data;
}


export async function updateCustomer(
  id: string,
  data: {
    name: string;
    phone: string;
    email: string;
  }
) {
  const response = await api.patch(`/customers/${id}`, data);
  return response.data;
}


export async function deleteCustomer(id: string) {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
}