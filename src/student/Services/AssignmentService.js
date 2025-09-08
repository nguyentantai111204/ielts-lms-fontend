import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/assignment";

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

export const uploadAssignment = async (data, file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("assignmentId", data.assignmentId);
  formData.append("assignmentTitle", data.assignmentTitle);
  formData.append("assignmentDescription", data.assignmentDescription);
  formData.append("courseId", data.courseId);
  formData.append("lessonId", data.lessonId);
  formData.append("submissionText", data.submissionText);

  if (file) {
    formData.append("filePath", file); // tên phải trùng với DTO
  }

  const response = await axios.post(`${API_URL}/uploadAssignment`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    },
  });

  return response.data;
};


