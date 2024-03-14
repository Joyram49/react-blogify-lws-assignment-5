import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

const authorizedApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

export { api, authorizedApi };
