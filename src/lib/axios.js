import axios from "axios";

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Always send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
