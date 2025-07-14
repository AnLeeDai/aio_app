import axios from "axios";
import { addToast } from "@heroui/react";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/";
// const baseURL = "http://127.0.0.1:8000";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

/* --------- Interceptors --------- */
// Gắn Bearer token
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // if (error.response?.status === 401) {
    // }

    // có thể show toast chung ở đây
    if (error.response?.data?.detail) {
      addToast({
        title: "Error",
        description: error.response.data.detail,
        color: "danger",
      });
    } else {
      addToast({
        title: "Error",
        description: "An unexpected error occurred.",
        color: "danger",
      });
    }

    return Promise.reject(error);
  }
);
