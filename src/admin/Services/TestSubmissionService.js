import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/test-submissions";


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const countTestSubmission = async () => {
  const res = await axios.get(`${API_URL}/count_submission`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const countTestSubmissionByTest = async (testId) => {
  const res = await axios.get(`${API_URL}/count_submission_by_test/${testId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getWeeklySubmissionsByTest = async (testId) => {
  const res = await axios.get(`${API_URL}/stat_submission/week/${testId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getBandStatistics = async () => {
  const res = await axios.get(`${API_URL}/band_statistics/all`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const getBandStatisticsByTest = async (testId) => {
  const res = await axios.get(`${API_URL}/band_statistics/test/${testId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


