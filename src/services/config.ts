import axios from "axios";
import { VERIFY_OTP_TOKEN } from "../constants/constants";

export const ApiClient = axios.create({
  baseURL: "https://api.sabtline.ir/api",
});

ApiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(VERIFY_OTP_TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token).state.verifyToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
