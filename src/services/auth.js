import axios from 'axios';

const API_URL = '/api/auth/login'; // gracias al proxy, esto apunta a tu backend

export const login = async (usuario, password) => {
  const response = await axios.post(API_URL, { username: usuario, password });
  // Ajusta los nombres de los campos según tu backend
  return response.data;
};
