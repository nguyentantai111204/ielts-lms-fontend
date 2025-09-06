import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllQuizGrades } from "../Services/QuizService";

const InstructorQuizPage = () => {
  const { quizId } = useParams(); // quiz được chọn từ URL
  const navigate = useNavigate();

  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách bài nộp cho quiz
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        const data = await getAllQuizGrades(quizId);
        setGrades(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách bài nộp.");
      } finally {
        setLoading(false);
      }
    };
    fetchGrades();
  }, [quizId]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-[1000px] mx-auto mt-20 min-h-screen">
      {/* Nút quay lại */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ⬅ Quay lại
      </button>

      <h1 className="text-2xl font-bold text-orange-600 mb-6">
        Danh sách bài nộp Quiz
      </h1>

      {grades.length === 0 ? (
        <p className="text-gray-600">Chưa có sinh viên nào nộp quiz này.</p>
      ) : (
        <table className="w-full border rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Sinh viên</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Điểm</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g) => (
              <tr key={g.gradeId} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  {g.student.firstName} {g.student.lastName}
                </td>
                <td className="px-4 py-2 border">{g.student.email}</td>
                <td className="px-4 py-2 border text-center">{g.score ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InstructorQuizPage;
