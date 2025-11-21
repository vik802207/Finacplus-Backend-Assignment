import axios from "axios";

const baseURL = "http://localhost:5000/api";

export const api = axios.create({ baseURL });

// attach token automatically
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export default api;
