// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
