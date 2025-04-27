import axios from "axios";
import { getToken } from "./authApi";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // Добавляем токен в заголовок
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
