import axios from "axios";
import { BASE_URL } from "./config";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: BASE_URL, // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If you want to send cookies with every request
});

export default api;
