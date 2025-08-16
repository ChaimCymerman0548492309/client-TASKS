import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // זה מספיק בשביל שה-cookie יישלח
});

export default api;
