import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/course";
const API_URL_BACKUP = "http://localhost:8080/api/course";
export const fetchCourses = async () => {
  const response = await axios.get(`${API_URL_BACKUP}/all_courses`);
  return response.data;
};

export const addCourseAPI = async (course) => {
  const response = await axios.post(`${API_URL_BACKUP}/add_course`, course);
  return response.data;
};

export const deleteCourseAPI = async (courseId) => {
  const response = await axios.delete(`${API_URL_BACKUP}/delete/course_id/${courseId}`);
  return response.data;
};

export const getCourseBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL_BACKUP}/${slug}`);
    
    return response.data
  } catch (error) {
     console.error(error);
  }
};

export const getCourseOutcomes = async (courseId) => {
  try {
    const response = await axios.get(`${API_URL_BACKUP}/${courseId}/outcomes`);
    const data = Array.isArray(response.data) ? response.data : [];
    
    return response.data
  } catch (error) {
    console.error(error);
  }
};
