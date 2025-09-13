import axios from "axios";

const API_URL = "http://localhost:8080/api/test-submissions";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getHistoryTests = async (userId) => {
  const res = await axios.get(
    `${API_URL}/history_tests`,
    { headers: getAuthHeaders() }
  );
  return res.data;
};

export const reviewSubmission = async (submissionId) => {
  const res = await axios.get(
    `${API_URL}/${submissionId}/review`,
    { headers: getAuthHeaders() }
  );
  return res.data;
};
