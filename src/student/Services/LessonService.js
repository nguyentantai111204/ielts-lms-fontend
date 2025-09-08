import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/lesson"; 

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

export const studentEnterLesson = async (courseId, lessonId, otp) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.post(
    `${API_URL}/student_enter_lesson/course_id/${courseId}/lesson_id/${lessonId}/otp/${otp}`,
    {}, 
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return response.data;
};

export const markAttendance = async (courseId, lessonId, otp) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.post(
    `${API_URL}/student_enter_lesson/course_id/${courseId}/lesson_id/${lessonId}/otp/${otp}`,
    {}, 
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return response.data;
};
