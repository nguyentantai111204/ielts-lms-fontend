import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/course"; 
const API_URL_BACKUP = "http://localhost:8080/api/course"; 
export const getStudentCourses = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.get(`${API_URL_BACKUP}/student/my-courses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data; 
  } catch (error) {
    console.error("Lỗi khi gọi API getStudentCourses:", error);
    throw error;
  }
};




