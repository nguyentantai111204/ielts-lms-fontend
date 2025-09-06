import axios from "axios";

const API_URL = "http://localhost:8080/api/lesson"; 

export const getAllLessonsInCourse = async (courseId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.get(`${API_URL}/get_all_lessons/${courseId}`, {
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

export const getLessonById = async (lessonId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.get(
    `${API_URL}/lesson_id/${lessonId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return response.data;
};


export const getLessonAttendance = async (lessonId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.get(
    `${API_URL}/attendance-status/${lessonId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return response.data;
};

