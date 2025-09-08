import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/lesson";

export const getLessonsPreview = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL}/preview-lessons/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lesson preview:", error);
    throw error;
  }
};
