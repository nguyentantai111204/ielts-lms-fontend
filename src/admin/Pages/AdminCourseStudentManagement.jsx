import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    enrollStudentInCourse,
  getStudentsByCourse,
  removeEnrolledStudent,
} from "../Services/EnrollmentService";
import { Trash2, Plus } from "lucide-react";
import { getAllStudents } from "../Services/StudentService";

const CourseStudentsPage = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [selectedAddId, setSelectedAddId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [courseId]);

  const fetchStudents = async () => {
    try {
      const data = await getStudentsByCourse(courseId);
      setStudents(
        data.map((s) => ({
          id: s.userAccountId,
          fullName: `${s.firstName} ${s.lastName}`,
          email: s.email,
        }))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await removeEnrolledStudent(selectedStudent.id, courseId);
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
      setIsDeleteModalOpen(false);
      setSelectedStudent(null);
    } catch (err) {
      console.error("Xóa thất bại:", err);
    }
  };

  const openAddModal = async () => {
    try {
      const data = await getAllStudents();
      setAllStudents(data);
      setIsAddModalOpen(true);
    } catch (err) {
      console.error("Lỗi tải danh sách học viên:", err);
    }
  };

  const confirmAdd = async () => {
    if (!selectedAddId) return;
    try {
      await enrollStudentInCourse(selectedAddId, courseId);
      await fetchStudents();
      setMessage("✅ Thêm học viên thành công!");
      setIsAddModalOpen(false);
    } catch (err) {
      setMessage("⚠️ " + (err.response?.data || "Thêm thất bại"));
       console.error(err.response?.data || "Thêm thất bại");
    }
  };

  if (loading) return <div className="p-6">⏳ Đang tải danh sách học viên...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          👨‍🎓 Học viên trong khóa <span className="text-blue-600">{courseId}</span>
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          <Plus size={18} /> Thêm học viên
        </button>
      </div>

      {message && <div className="mb-4 text-sm text-red-500">{message}</div>}

      {students.length === 0 ? (
        <div className="text-gray-500 italic">Chưa có học viên nào trong khóa này</div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Họ và tên</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s, index) => (
                <tr key={s.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{s.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{s.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                      onClick={() => handleDeleteClick(s)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal xoá */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Xác nhận xoá</h2>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xoá học viên{" "}
              <span className="font-semibold">{selectedStudent?.fullName}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                onClick={confirmDelete}
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Thêm học viên</h2>
            <select
              className="w-full border p-2 rounded mb-4"
              value={selectedAddId || ""}
              onChange={(e) => setSelectedAddId(e.target.value)}
            >
              <option value="">-- Chọn học viên --</option>
              {allStudents.map((s) => (
                <option key={s.userAccountId} value={s.userAccountId}>
                  {s.firstName} {s.lastName} ({s.email})
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setIsAddModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
                onClick={confirmAdd}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseStudentsPage;
