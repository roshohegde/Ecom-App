import {
  api
}
from "./client";
export const catalogApi = {
  products:(params) => api(`/products?${new URLSearchParams(params)}`),
  product:(id) => api(`/products/${id}`),
  categories:() => api("/categories"),
  createCategory:(data) => api(
    "/admin/categories",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  ),
  createProduct:(data) => api(
    "/admin/products",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  ),
  updateProduct:(id, data) => api(
    `/admin/products/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data)
    }
  ),
  deleteProduct:(id) => api(
    `/admin/products/${id}`,
    {
      method: "DELETE"
    }
  ),
  sellerProducts:() => api("/seller/products?size=50"),
  createSellerProduct:(data) => api(
    "/seller/products",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  ),
  updateSellerProduct:(id, data) => api(
    `/seller/products/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data)
    }
  ),
  deleteSellerProduct:(id) => api(
    `/seller/products/${id}`,
    {
      method: "DELETE"
    }
  ),
};