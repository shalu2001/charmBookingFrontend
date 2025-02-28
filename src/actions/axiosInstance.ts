import axios from "axios";

const baseURL = "http://localhost:3000"; // Use env variable here

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;