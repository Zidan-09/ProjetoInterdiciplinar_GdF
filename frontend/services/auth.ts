// services/auth.ts
import axiosInstance from './api';

export const login = async (username: string, password: string) => {
  const res = await axiosInstance.post('/employee/login', { username, password });
  const { token, user } = res.data.data;
  const { accessLevel } = res.data.role;

  localStorage.setItem('token', token);
  localStorage.setItem('user', user);
  localStorage.setItem('accessLevel', accessLevel);

  return accessLevel;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('accessLevel');
};
