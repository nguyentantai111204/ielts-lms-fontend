import axios from "axios";

const API_URL = "http://localhost:8080/api/course"; 

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};


export const countCourse = async () => {
  const res = await axios.get(`${API_URL}/count_course`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


export const updateCourse = async (courseId, formData) => {
  const res = await axios.put(
    `${API_URL}/update/course_id/${courseId}`,
    formData,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};


export const addCourse = async (courseData, file) => {

  const res = await axios.post(`${API_URL}/add_course`, courseData, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};


export const deleteCourse = async (courseId) => {
  const res = await axios.delete(`${API_URL}/delete/course_id/${courseId}`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};


export const getAllCourses = async () => {
  const res = await axios.get(`${API_URL}/all_courses`, {
    headers: getAuthHeaders(),
  });
  return res.data;
};