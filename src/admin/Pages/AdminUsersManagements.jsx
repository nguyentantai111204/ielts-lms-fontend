import React, { useEffect, useState } from "react";
import { Trash2, Edit, Plus } from "lucide-react";
import {
  getAllStudents,
  deleteStudent,
  updateStudentProfile,
  updateStudentAvatar
} from "../Services/StudentService";
import StudentModal from "../Components/StudentModal";
import { addUser } from "../Services/AuthService";


const AdminUsersManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa học viên này?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleOpenModal = (student = null) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const handleSaveStudent = async (formData, studentId) => {
    try {
      if (!studentId) {
        await addUser(formData);
      } else {
        await updateStudentProfile(studentId, formData);
      }

      handleCloseModal();
      fetchStudents(); // load lại danh sách
    } catch (err) {
      alert("Lưu thất bại: " + (err.response?.data || err.message));
    }
  };



  const filteredStudents = students.filter(
    (s) =>
      s.firstName.toLowerCase().includes(search.toLowerCase()) ||
      s.lastName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý học viên</h1>
        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={() => handleOpenModal()}
        >
          <Plus size={18} /> Thêm học viên
        </button>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc email..."
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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Họ tên</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Avatar</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">User Type</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((s, index) => (
                <tr key={s.userAccountId} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {s.firstName} {s.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{s.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {s.avatar ? (
                      <img
                        src={s.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                        —
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{s.locationName || "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{s.userType}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center gap-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition"
                      onClick={() => handleOpenModal(s)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md transition"
                      onClick={() => handleDelete(s.userAccountId)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    Không tìm thấy học viên
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />
    </div>
  );
};

export default AdminUsersManagement;
