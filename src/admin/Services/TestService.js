import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/tests";
const API_URL_BACKUP = "http://localhost:8080/api/tests";
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Lấy tất cả test
export const getAllTests = async () => {
  const res = await axios.get(`${API_URL_BACKUP}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Lấy test theo id
export const getTestById = async (testId) => {
  const res = await axios.get(`${API_URL_BACKUP}/${testId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Thêm test mới
export const addTest = async (testData) => {
  const res = await axios.post(`${API_URL_BACKUP}/add`, testData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// Sửa test
export const updateTest = async (testId, testData) => {
  const res = await axios.put(`${API_URL_BACKUP}/update/${testId}`, testData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// Xóa test
export const deleteTest = async (testId) => {
  const res = await axios.delete(`${API_URL_BACKUP}/delete/${testId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

// Đếm số lượng test
export const countTest = async () => {
  const res = await axios.get(`${API_URL_BACKUP}/count_test`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
