import React, { useState, useEffect } from "react";

const TestModal = ({ isOpen, onClose, onSave, test }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("FULL"); 
  const [isActive, setIsActive] = useState(true);


  useEffect(() => {
    if (test) {
      setTitle(test.title || "");
      setDescription(test.description || "");
      setType(test.type || "FULL");
      setIsActive(test.isActive ?? true);
    } else {
      setTitle("");
      setDescription("");
      setType("FULL");
      setIsActive(true);
    }
  }, [test, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const testData = {
      title,
      description,
      type,
      isActive,
    };

    onSave(testData, test?.testId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {test ? "Chỉnh sửa Test" : "Thêm Test"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tiêu đề
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả..."
              rows={3}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Loại Test
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="FULL">FULL</option>
              <option value="MINI">MINI</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              id="isActive"
              className="w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Hoạt động
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg transition"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestModal;
