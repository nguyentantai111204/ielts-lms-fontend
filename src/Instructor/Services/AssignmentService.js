import axios from "axios";

const API_URL = "http://localhost:8080/api/assignment";

// Lấy tất cả assignment theo lesson
export const getAssignmentsByLesson = async (lessonId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.get(`${API_URL}/lesson/${lessonId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; 
  } catch (error) {
    console.error("Lỗi khi gọi API getAssignmentsByLesson:", error);
    throw error;
  }
};

// Lấy chi tiết assignment theo id
export const getAssignmentById = async (assignmentId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.get(`${API_URL}/${assignmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API getAssignmentById:", error);
    throw error;
  }
};

export const uploadAssignment = async (assignmentDto) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.post(`${API_URL}/uploadAssignment`, assignmentDto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API uploadAssignment:", error);
    throw error;
  }
};


export const addAssignment = async (assignmentDto) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.post(`${API_URL}/add_assignment`, assignmentDto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API addAssignment:", error);
    throw error;
  }
};


export const getAssignmentSubmissions = async (assignmentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/submissions/${assignmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Lỗi khi lấy submissions:", err);
    throw err;
  }
};

export const gradeAssignment = async (studentId, assignmentId, grade) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/gradeAssignment`,
      { studentId, assignmentId, grade },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Lỗi khi chấm điểm:", err);
    throw err;
  }
};


export const saveAssignmentFeedback = async (studentId, assignmentId, feedback) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/saveAssignmentFeedback`,
      { studentId, assignmentId, feedback },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    console.error("Lỗi khi lưu feedback:", err);
    throw err;
  }
};