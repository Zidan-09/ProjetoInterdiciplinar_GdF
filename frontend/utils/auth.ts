// utils/auth.ts

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const clearToken = () => {
  localStorage.removeItem('token');
};



// services/auth.ts
// import api from '../utils/api';

// export const login = async (username: string, password: string) => {
//   try {
//     const response = await api.post('/employee/login', { username, password });

//     const { user, token, role } = response.data.data;

//     // Armazena dados no localStorage
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', user);
//     localStorage.setItem('accessLevel', role);

//     return { user, token, role };
//   } catch (error) {
//     throw new Error('Login inválido');
//   }
// };

// export const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   localStorage.removeItem('accessLevel');
// };

// // services/auth.ts
// // import api from './api';

// // export const login = async (username: string, password: string) => {
// //   try {
// //     const response = await api.post('/employee/login', { username, password });

// //     const { user, token, role } = response.data.data;

// //     localStorage.setItem('token', token);
// //     localStorage.setItem('user', user);
// //     localStorage.setItem('accessLevel', role);

// //     return {token, user, role};

// //   } catch (error) {
// //     throw new Error('Login inválido');
// //   }
// // };

// // export const logout = () => {
// //   localStorage.removeItem('token');
// //   localStorage.removeItem('user');
// //   localStorage.removeItem('accessLevel');
// // };
