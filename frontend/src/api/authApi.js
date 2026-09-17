import {
  api
}
from "./client";
export const authApi = {
  login:(data) => api(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  ),
  register:(data) => api(
    "/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data)
    }
  ),
};