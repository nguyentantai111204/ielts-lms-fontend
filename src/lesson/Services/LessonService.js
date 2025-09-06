
import axios from "axios";

const API_URL = "http://localhost:8080/api/lesson"; 


export const getLessonsPreview = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/preview-lessons/${courseId}`);
    
    return response.data
  } catch (error) {
    console.error(error);
  }
};