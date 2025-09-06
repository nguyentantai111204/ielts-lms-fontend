import axios from "axios";

const API_URL = "http://localhost:8080/api/course"; 

export const getInstructorCourses = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.get(`${API_URL}/instructor/my-courses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data; 
  } catch (error) {
    console.error("Lỗi khi gọi API getInstructorCourses:", error);
    throw error;
  }
};


