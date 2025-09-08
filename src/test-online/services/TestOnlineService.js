import axios from "axios";

const TEST_API_URL = "https://ielts-lms-backend-1.onrender.com/api/tests";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");
  return { Authorization: `Bearer ${token}` };
};

// Lấy danh sách preview tất cả bài test
export const loadTestList = async () => {
  const res = await axios.get(`${TEST_API_URL}/all_tests_preview`);
  return res.data;
};

// Lấy preview 1 bài test
export const getTestPreview = async (testId) => {
  const res = await axios.get(`${TEST_API_URL}/${testId}/preview`);
  return res.data;
};

// Lấy chi tiết full bài test
export const getTestDetail = async (testId) => {
  const res = await axios.get(`${TEST_API_URL}/${testId}`, { headers: getAuthHeader() });
  return res.data;
};
