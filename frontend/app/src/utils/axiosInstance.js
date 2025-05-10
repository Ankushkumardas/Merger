
import axios from 'axios';
import { BASE_URL } from './apiPAth';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('token');
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
    
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );
// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 500) {
        console.error('Server error - 500 not found');
      } else if (err.response.status === 401) {
        window.location.href = '/login'; // Redirect on unauthorized
      }
    } else if (err.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
