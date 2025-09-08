import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/consult-request"; 

export const adviseRequest = async (adviseData) => {
  const response = await axios.post(`${API_URL}`, adviseData);
  return response.data;
};


export const getAllLocation = async () => {
  const response = await axios.get(`${API_URL}/all_location`);
  return response.data;
};

