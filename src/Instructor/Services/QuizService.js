import axios from "axios";

const API_URL = "http://localhost:8080/api/quiz";

// Lấy các bài quiz đang active theo lesson
export const getActiveQuizByLesson = async (lessonId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.get(`${API_URL}/active_quiz_by_lesson/${lessonId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API getActiveQuizByLesson:", error);
    throw error;
  }
};

// Lấy câu hỏi quiz
export const getQuizQuestions = async (quizId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.get(`${API_URL}/get_quiz_questions/${quizId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { questions: Array.isArray(response.data) ? response.data : [], alreadySubmitted: false };
  } catch (error) {
    // Nếu học sinh đã nộp
    if (error.response?.status === 400 && error.response.data === "Bạn đã nộp bài trước đó rồi!") {
      console.warn("Học sinh đã nộp quiz, load bài làm trước đó");
      return { questions: [], alreadySubmitted: true };
    }
    console.error("Lỗi khi gọi API getQuizQuestions:", error);
    throw error;
  }
};

// Submit bài quiz
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
    console.error("Lỗi khi gọi API submitQuiz:", error);
    throw error;
  }
};

// Lấy điểm của học sinh theo quizId
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
    console.error("Lỗi khi gọi API getQuizGradeByStudent:", error);
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
    console.log('Quiz Instructor Res: ', response.data)
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API getAllQuizGrades:", error);
    throw error;
  }
};

export const addQuiz = async (quizDto) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  try {
    const response = await axios.post(`${API_URL}/add_quiz`, quizDto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API addQuiz:", error);
    throw error;
  }
};
