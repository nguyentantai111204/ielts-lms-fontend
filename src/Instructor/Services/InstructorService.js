import axios from "axios";

const API_URL = "http://localhost:8080/api/instructor"; 

export const getAllInstructors = async () => {
  const response = await axios.get(`${API_URL}/get_all_instructors`);
  return response.data;
};



