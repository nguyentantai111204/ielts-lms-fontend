import axios from "axios";

const SUBMISSION_API_URL = "https://ielts-lms-backend-1.onrender.com/api/test-submissions";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");
  return { Authorization: `Bearer ${token}` };
};

// 1. Bắt đầu làm test (tạo submission mới)
export const startTest = async (testId, userId) => {
  const res = await axios.post(
    `${SUBMISSION_API_URL}/start/${testId}?userId=${userId}`,
    null,
    { headers: getAuthHeader() }
  );
  console.log("startTest API response:", res.data);
  return res.data; 
};

// 2. Lưu câu trả lời tạm thời cho 1 câu
export const saveAnswer = async (submissionId, questionId, userAnswer) => {
  const res = await axios.post(
    `${SUBMISSION_API_URL}/${submissionId}/answer?questionId=${questionId}`,
    JSON.stringify(userAnswer),
    { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
  );
  return res.data; 
};

// 3. Nộp bài (grading) từng submission
export const submitTest = async (submissionId) => {
  const res = await axios.put(
    `${SUBMISSION_API_URL}/${submissionId}/submit`,
    null,
    { headers: getAuthHeader() }
  );
  return res.data;
};

// 4. Nộp bài cùng lúc với nhiều câu trả lời
export const submitTestWithAnswers = async (submissionId, answersMap) => {
  const res = await axios.post(
    `${SUBMISSION_API_URL}/${submissionId}/submit-with-answers`,
    answersMap,
    { headers: { ...getAuthHeader(), "Content-Type": "application/json" } }
  );
  return res.data; 
};

// 5. Xem lại bài làm chi tiết
export const reviewSubmission = async (submissionId) => {
  const res = await axios.get(`${SUBMISSION_API_URL}/${submissionId}/review`, {
    headers: getAuthHeader(),
  });
  return res.data; // Trả về TestSubmissionDTO
};

// 6. Lấy submission theo ID
export const getSubmissionById = async (submissionId) => {
  const res = await axios.get(`${SUBMISSION_API_URL}/${submissionId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// 7. Lấy tất cả submissions của user cho 1 test
export const getUserSubmissionsForTest = async (testId, userId) => {
  const res = await axios.get(`${SUBMISSION_API_URL}/test/${testId}/user/${userId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// 8. Kiểm tra user đã bắt đầu test chưa
export const hasUserStartedTest = async (testId, userId) => {
  const res = await axios.get(`${SUBMISSION_API_URL}/test/${testId}/user/${userId}/has-started`, {
    headers: getAuthHeader(),
  });
  return res.data; // Boolean
};

// 9. Lấy submission đang làm dở (IN_PROGRESS)
export const getInProgressSubmission = async (testId, userId) => {
  const res = await axios.get(`${SUBMISSION_API_URL}/test/${testId}/user/${userId}/in-progress`, {
    headers: getAuthHeader(),
  });
  return res.data;
};
