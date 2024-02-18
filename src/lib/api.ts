import axios from "axios";

const api = axios.create({
  baseURL: "https://invidious.slipfox.xyz",
  timeout: 5000,
});

export default api;
