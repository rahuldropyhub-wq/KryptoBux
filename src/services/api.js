import axios from 'axios';
import appConfig from '@/config/appConfig';
import { getStored, removeStored } from '@/utils/helpers';

// ============================================================
// AXIOS INSTANCE
// ============================================================

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ============================================================
// REQUEST INTERCEPTOR - Attach Auth Token
// ============================================================

api.interceptors.request.use(
  (config) => {
    const token = getStored(appConfig.auth.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR - Handle Errors
// ============================================================

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      // Clear auth and redirect to login
      removeStored(appConfig.auth.tokenKey);
      removeStored(appConfig.auth.userKey);
      window.location.href = '/login';
    }

    const message =
      response?.data?.message ||
      response?.data?.error ||
      error.message ||
      'An unexpected error occurred';

    return Promise.reject({ message, status: response?.status, data: response?.data });
  }
);

export default api;
