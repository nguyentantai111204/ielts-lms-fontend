import axios from "axios";

const API_URL = "https://ielts-lms-backend-1.onrender.com/api/student";


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};


export const getProfile = async (studentId) => {
  const res = await axios.get(`${API_URL}/profile/${studentId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};

export const updateProfile = async (studentId, data) => {
  await axios.put(`${API_URL}/update_profile/${studentId}`, data, {
    headers: getAuthHeaders(),
  });
};


export const updateAvatar = async (studentId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.put(`${API_URL}/update_avatar/${studentId}`, formData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; 
};


export const changePassword = async (studentId, data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Bạn chưa đăng nhập");

    const response = await axios.put(
      `${API_URL}/change_password/${studentId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};



export const getAllNotifications = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.get(`${API_URL}/allnotifications/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUnreadNotifications = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.get(
    `${API_URL}/unreadnotifications/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const isReadNotifications = async (notificationId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Bạn chưa đăng nhập");

  const response = await axios.put(`${API_URL}/${notificationId}/is_read`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

