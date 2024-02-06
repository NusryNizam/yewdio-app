import axios from "axios";

export const api = axios.create({
  baseURL: "https://invidious.fdn.fr/api/v1",
  timeout: 5000,
});
