import React, { useState } from "react";
import { addQuiz } from "../Services/QuizService";

const AddQuiz = ({ isOpen, onClose, courseId, lessonId, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    questionCount: 5,
    randomized: false,
    typeId: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addQuiz({
        ...formData,
        course_id: courseId,
        lessonId,
      });

      setLoading(false);
      onSuccess?.(); 
      onClose?.();   
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || "Lỗi khi tạo quiz");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-orange-600">Tạo Quiz mới</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Tiêu đề Quiz</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Số lượng câu hỏi</label>
            <input
              type="number"
              name="questionCount"
              value={formData.questionCount}
              onChange={handleChange}
              min="1"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">Loại câu hỏi (typeId)</label>
            <input
              type="number"
              name="typeId"
              value={formData.typeId}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="randomized"
              checked={formData.randomized}
              onChange={handleChange}
              className="mr-2"
            />
            <label>Ngẫu nhiên câu hỏi</label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Đang tạo..." : "Tạo Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;
