import React, { useState, useEffect } from "react";
import { addAssignment } from "../Services/AssignmentService";

const CreateAssignmentModal = ({ isOpen, onClose, courseId, lessonId, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // disable scroll khi mở modal
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const assignmentData = {
        assignmentTitle: title,
        assignmentDescription: description,
        dueDate,
        courseId,
        lessonId,
      };

      await addAssignment(assignmentData);

      alert("Tạo assignment thành công!");
      if (onSuccess) onSuccess(); // refresh danh sách
      setTitle("");
      setDescription("");
      setDueDate("");
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data || "Có lỗi xảy ra");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      {/* modal box */}
      <div className="bg-white w-[500px] max-h-[80vh] rounded-lg shadow-lg overflow-y-auto">
        {/* header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-blue-600">
            Tạo Assignment
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            ✖
          </button>
        </div>

        {/* body */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Tiêu đề</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Mô tả</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                required
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Ngày hết hạn</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Tạo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignmentModal;
