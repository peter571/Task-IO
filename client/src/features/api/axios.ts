import axios from "axios";
import config from "config";

const BASE_URL: string =
  import.meta.env.MODE === "production"
    ? config.LIVE_API_URL
    : config.DEV_API_URL;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
