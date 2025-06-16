// utils/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3333'; // Altere para a URL correta da sua API

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/employee/login`, {
      username,
      password,
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || 'Erro ao conectar',
    };
  }
};


// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:3333', // URL da sua API backend
// });

// // Interceptor para adicionar token nas requisições
// api.interceptors.request.use((config) => {
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


