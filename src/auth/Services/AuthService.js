// modules/auth/services/authService.js
import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/auth"; 

export const loginApi = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

