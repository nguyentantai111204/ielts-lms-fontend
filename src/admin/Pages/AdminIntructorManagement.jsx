import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  getAllInstructors,
  updateInstructor,
  deleteInstructor,
} from "../Services/InstructorService";
import InstructorModal from "../Components/InstructorModal";
import { addUser } from "../Services/AuthService";

const AdminInstructorManagement = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const data = await getAllInstructors();
      setInstructors(data);
    } catch (err) {
      console.error("Lỗi khi load giảng viên:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleAdd = () => {
    setSelectedInstructor(null);
    setIsModalOpen(true);
  };

  const handleEdit = (instructor) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa giảng viên này?")) {
      try {
        await deleteInstructor(id);
        fetchInstructors();
      } catch (err) {
        console.error("Xóa giảng viên lỗi:", err);
      }
    }
  };

  const handleSave = async (instructorData, id) => {
    try {
      if (id) {
        await updateInstructor(id, instructorData);
      } else {
        await addUser(instructorData);
      }
      setIsModalOpen(false);
      fetchInstructors();
    } catch (err) {
      alert("Lưu thất bại: " + (err.response?.data || err.message));
    }
  };

  const filteredInstructors = instructors.filter(
    (ins) =>
      ins.firstName.toLowerCase().includes(search.toLowerCase()) ||
      ins.lastName.toLowerCase().includes(search.toLowerCase()) ||
      (ins.email && ins.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Giảng viên</h1>
        <button
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={handleAdd}
        >
          <Plus size={18} /> Thêm Giảng viên
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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Họ</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tên</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Avatar</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInstructors.map((ins, index) => (
                <tr key={ins.userAccountId} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ins.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ins.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ins.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ins.avatar ? (
                      <img
                        src={ins.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                        —
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center gap-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition"
                      onClick={() => handleEdit(ins)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-md transition"
                      onClick={() => handleDelete(ins.userId)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInstructors.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    Không tìm thấy giảng viên
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <InstructorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          instructor={selectedInstructor}
        />
      )}
    </div>
  );
};

export default AdminInstructorManagement;
