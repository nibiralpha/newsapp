import axios from "axios";
import { API_END_POINT } from "../Constant/API";

export const axiosInstance = axios.create({
  baseURL: API_END_POINT,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.url += `&api-key=${process.env.REACT_APP_API_KEY}`
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance
