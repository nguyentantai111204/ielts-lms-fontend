import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/instructor";
const API_URL_BACKUP = "http://localhost:8080/api/instructor";
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const updateInstructor = async (instructorId, instructorData) => {
  const res = await axios.put(`${API_URL_BACKUP}/update_profile/${instructorId}`, instructorData, {
    headers: {
      ...getAuthHeaders(), 
    },
  });
  return res.data;
};


export const deleteInstructor = async (instructorId) => {
  const res = await axios.put(`${API_URL_BACKUP}/delete/${instructorId}`,{ headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    }});
  return res.data;
};


export const getAllNotifications = async (instructorId) => {
  const res = await axios.get(`${API_URL_BACKUP}/notifications/${instructorId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


export const getUnreadNotifications = async (instructorId) => {
  const res = await axios.get(`${API_URL_BACKUP}/unreadnotifications/${instructorId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


export const getAllInstructors = async () => {
  const res = await axios.get(`${API_URL_BACKUP}/get_all_instructors`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
