import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - remove token and user data silently
      // Only clean up if we have a token (avoid unnecessary cleanup)
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      // Suppress console errors for common endpoints when user is not authenticated
      const url = error.config?.url || '';
      const isCommonEndpoint = url.includes('/auth/me') || url.includes('/favorites');
      if (isCommonEndpoint && !token) {
        // User is not logged in - this is expected, don't log error
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

