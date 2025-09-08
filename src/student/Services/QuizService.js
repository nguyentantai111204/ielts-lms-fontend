import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/quiz";

export const getActiveQuizByLesson = async (lessonId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.get(`${API_URL}/active_quiz_by_lesson/${lessonId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // console.error("Lỗi khi gọi API getActiveQuizByLesson:", error);
    throw error;
  }
};


export const getQuizQuestions = async (quizId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.get(`${API_URL}/get_quiz_questions/${quizId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }catch{
    //
  }
};


export const submitQuiz = async (gradingDto) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.post(`${API_URL}/grade_quiz`, gradingDto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // console.error("Lỗi khi gọi API submitQuiz:", error);
    throw error;
  }
};

export const getQuizGradeByStudent = async (quizId, studentId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.get(`${API_URL}/get_quiz_grade/${quizId}/student/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 400) return null;
    // console.error("Lỗi khi gọi API getQuizGradeByStudent:", error);
    throw error;
  }
};

// Lấy tất cả điểm của quiz (tracking)
export const getAllQuizGrades = async (quizId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.get(`${API_URL}/grades/${quizId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    // console.error("Lỗi khi gọi API getAllQuizGrades:", error);
    throw error;
  }
};
