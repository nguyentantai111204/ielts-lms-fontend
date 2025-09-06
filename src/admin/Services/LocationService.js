import axios from "axios";

const API_URL = "http://localhost:8080/api/location";


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAllLocations = async () => {
  const res = await axios.get(`${API_URL}/all`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
