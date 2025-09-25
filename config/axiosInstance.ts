import axios from "axios";
import { addToast } from "@heroui/react";

const baseURL1 =
  process.env.NEXT_PUBLIC_TEXT_GENERATE_API ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://text-generate-services.onrender.com");

// Primary and backup URLs for AIO App
const primaryURL = "https://aio-app-services-1.onrender.com";
const backupURL = "https://aio-app-services-lyif.onrender.com/";

const baseURL2 =
  process.env.NEXT_PUBLIC_AIO_APP_API ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : primaryURL);

// Instance 1
export const axiosTextGenerate = axios.create({
  baseURL: baseURL1,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Instance 2
export const axiosAioApp = axios.create({
  baseURL: baseURL2,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor dùng chung
const errorInterceptor = (error: any) => {
  const t = (k: string) =>
    k === "toasts.error.title" ? "Error" : k; /* fallback */

  if (error.response?.data?.detail) {
    addToast({
      title: t("toasts.error.title"),
      description: error.response.data.detail,
      color: "danger",
    });
  } else {
    addToast({
      title: t("toasts.error.title"),
      description: String(error),
      color: "danger",
    });
  }

  return Promise.reject(error);
};

// Interceptor đặc biệt cho axiosAioApp với auto-failover
const aioAppErrorInterceptor = async (error: any) => {
  const config = error.config;

  // Kiểm tra nếu đây là lần retry đầu tiên và đang dùng primary URL
  if (!config._retry && config.baseURL === primaryURL) {
    config._retry = true;
    config.baseURL = backupURL;

    // Thử lại request với backup URL
    return axiosAioApp.request(config);
  }

  // Nếu đã retry hoặc không phải primary URL, xử lý lỗi bình thường
  return errorInterceptor(error);
};

axiosTextGenerate.interceptors.response.use((res) => res, errorInterceptor);
axiosAioApp.interceptors.response.use((res) => res, aioAppErrorInterceptor);
