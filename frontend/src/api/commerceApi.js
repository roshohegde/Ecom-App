import {
  api
}
from "./client";
export const commerceApi = {
  cart:() => api("/cart"),
  addItem:(data) => api(
    "/cart/items",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  ),
  updateItem:(id, data) => api(
    `/cart/items/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data)
    }
  ),
  removeItem:(id) => api(
    `/cart/items/${id}`,
    {
      method: "DELETE"
    }
  ),
  clearCart:() => api(
    "/cart",
    {
      method: "DELETE"
    }
  ),
  orders:() => api("/orders"),
  order:(id) => api(`/orders/${id}`),
  checkout:(data, key) => api(
    "/orders",
    {
      method: "POST",
      headers: {
        "Idempotency-Key": key
      },
      body: JSON.stringify(data),
    }
  ),
};