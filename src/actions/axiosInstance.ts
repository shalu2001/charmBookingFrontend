import axios from "axios";

const baseURL = "http://localhost:3001"; // Use env variable here

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;