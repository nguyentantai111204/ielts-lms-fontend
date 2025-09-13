import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/enrollment";

const API_URL_BACKUP = "http://localhost:8080/api/enrollment";
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const enrollStudentInCourse = async (studentId, courseId) => {
  const dto = {
    studentId: parseInt(studentId),
    courseId: parseInt(courseId),
  };

  const res = await axios.post(
    `${API_URL_BACKUP}/enroll`, 
    dto,                         
    { headers: getAuthHeaders() } 
  );

  return res.data;
};


export const getStudentsByCourse = async (courseId) => {
  const res = await axios.get(`${API_URL_BACKUP}/view_enrolled_students/${courseId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const removeEnrolledStudent = async (studentId, courseId) => {
  const res = await axios.delete(`${API_URL_BACKUP}/remove_enrolled_student/student_id/${studentId}/course_id/${courseId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


