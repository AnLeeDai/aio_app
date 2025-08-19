import axios from "axios";
import { addToast } from "@heroui/react";

const baseURL1 =
  process.env.NEXT_PUBLIC_TEXT_GENERATE_API ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://text-generate-services.onrender.com");

const baseURL2 =
  process.env.NEXT_PUBLIC_AIO_APP_API ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://aio-app-services-1.onrender.com");

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
  if (error.response?.data?.detail) {
    addToast({
      title: "Error",
      description: error.response.data.detail,
      color: "danger",
    });
  } else {
    addToast({
      title: "Error",
      description: error,
      color: "danger",
    });
  }

  return Promise.reject(error);
};

axiosTextGenerate.interceptors.response.use((res) => res, errorInterceptor);
axiosAioApp.interceptors.response.use((res) => res, errorInterceptor);
