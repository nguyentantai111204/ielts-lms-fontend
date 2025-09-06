import axios from "axios";

const API_URL = "http://localhost:8080/api/enrollment"; 

export const getStudentsInCourse = async (courseId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.get(`${API_URL}/view_enrolled_students/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data; 
  } catch (error) {
    console.error("Lỗi khi gọi API getStudentsInCourse:", error);
    throw error;
  }
};



export const removeEnrolledStudent = async (studetnId, courseId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.delete(`${API_URL}/remove_enrolled_student/student_id/${studetnId}/course_id/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data; 
  } catch (error) {
    console.error("Lỗi khi gọi API removeEnreolledStudent:", error);
    throw error;
  }
};


