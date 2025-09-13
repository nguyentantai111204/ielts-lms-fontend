import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/location";
const API_URL_BACKUP = "http://localhost:8080/api/location";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllLocations = async () => {
  const res = await axios.get(`${API_URL_BACKUP}/all`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
