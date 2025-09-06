import React, { useEffect, useState } from "react";
import { Trash2, Edit, Plus } from "lucide-react";
import {
  getAllCourses,
  deleteCourse,
  updateCourse,
  addCourse,
} from "../Services/CourseService";
import CourseModal from "../Components/CourseModal";

const AdminCourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khóa học này?")) {
      try {
        await deleteCourse(id);
        fetchCourses();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleOpenModal = (course = null) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  const handleSaveCourse = async (formData, courseId) => {
  try {
    if (!courseId) {
      await addCourse(formData);
    } else {
      await updateCourse(courseId, formData);
    }

    handleCloseModal();
    fetchCourses();
  } catch (err) {
    alert("Lưu thất bại: " + (err.response?.data || err.message));
  }
};


  const filteredCourses = courses.filter((c) =>
    c.courseName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý khóa học</h1>
        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={() => handleOpenModal()}
        >
          <Plus size={18} /> Thêm khóa học
        </button>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên khóa học..."
        className="border p-3 mb-4 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Tên khóa học
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Giảng viên
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Thời lượng
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Media
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((c, index) => (
                <tr
                  key={c.courseId}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {c.courseName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {c.instructorName || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {c.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {c.media ? (
                      <img
                        src={c.media}
                        alt="media"
                        className="w-16 h-16 rounded object-cover border"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center gap-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition"
                      onClick={() => handleOpenModal(c)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md transition"
                      onClick={() => handleDelete(c.courseId)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-6 text-gray-400"
                  >
                    Không tìm thấy khóa học
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <CourseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCourse}
        course={selectedCourse}
      />
    </div>
  );
};

export default AdminCourseManagement;
