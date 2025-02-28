import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL; // Use env variable here

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;