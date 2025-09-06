import axios from "axios";

const API_URL = "http://localhost:8080/api/instructor";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const updateInstructor = async (instructorId, instructorData) => {
  const res = await axios.put(`${API_URL}/update_profile/${instructorId}`, instructorData, {
    headers: {
      ...getAuthHeaders(), 
    },
  });
  return res.data;
};


export const deleteInstructor = async (instructorId) => {
  const res = await axios.put(`${API_URL}/delete/${instructorId}`,{ headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    }});
  return res.data;
};


export const getAllNotifications = async (instructorId) => {
  const res = await axios.get(`${API_URL}/notifications/${instructorId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


export const getUnreadNotifications = async (instructorId) => {
  const res = await axios.get(`${API_URL}/unreadnotifications/${instructorId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


export const getAllInstructors = async () => {
  const res = await axios.get(`${API_URL}/get_all_instructors`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};
