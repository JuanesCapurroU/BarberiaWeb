import axios from 'axios';

const API_URL = '/api/auth/login'; 

export const login = async (usuario, password) => {
  const response = await axios.post(API_URL, { username: usuario, password });
  return response.data;
};
