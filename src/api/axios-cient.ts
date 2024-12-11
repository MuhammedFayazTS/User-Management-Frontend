import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { handleAxiosError } from "./api-error";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface ErrorResponseData {
  errorCode?: string;
  message?: string;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

// Function to refresh the access token
const refreshAccessToken = async (): Promise<void> => {
  try {
    await axios.get(`${baseURL}/auth/refresh`, {
      withCredentials: true,
    });
  } catch (error) {
    const { statusCode, message } = handleAxiosError(error);
    console.log({ statusCode, message, error });
  }
};

// Response interceptor to handle token expiration
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorResponseData>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const errorCode = error.response?.data?.errorCode;
    if (
      error.status === 401 &&
      errorCode === "AUTH_TOKEN_NOT_FOUND" &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true; // Mark request to prevent infinite loops
      try {
        await refreshAccessToken(); // Attempt to refresh the token
        return API(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
