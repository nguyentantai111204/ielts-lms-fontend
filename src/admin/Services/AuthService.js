import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; 

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const addUser = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi addStudent:", err.response?.data || err.message);
    throw err;
  }
};
