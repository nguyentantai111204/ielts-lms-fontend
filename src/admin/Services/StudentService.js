import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/student";

// lấy token từ localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const countStudent = async () => {
  const res = await axios.get(`${API_URL}/count_student`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getUserGrowth = async () => {
  const res = await axios.get(`${API_URL}/student-growth`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getAllStudents = async () => {
  const res = await axios.get(`${API_URL}/get_all_student`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const deleteStudent = async (studentId) => {
  const res = await axios.delete(`${API_URL}/delete_student/${studentId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


export const updateStudentProfile = async (studentId, data) => {
  const res = await axios.put(`${API_URL}/update_profile/${studentId}`, data, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};



export const updateStudentAvatar = async (studentId, data) => {
  const res = await axios.put(`${API_URL}/update_avatar/${studentId}`,{
    headers: getAuthHeaders(),
  });
  return res.data;
};

