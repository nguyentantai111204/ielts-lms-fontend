import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAssignmentSubmissions,
  gradeAssignment,
  saveAssignmentFeedback,
} from "../Services/AssignmentService";

const InstructorAssignmentPage = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const data = await getAssignmentSubmissions(assignmentId);
        setSubmissions(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách submissions.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [assignmentId]);

  // Mở modal
  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setFeedback(submission.feedback || "");
    setGrade(submission.grade ?? "");
  };

  // Đóng modal
  const closeModal = () => {
    setSelectedSubmission(null);
    setFeedback("");
    setGrade("");
  };

  // Lưu điểm + feedback cùng lúc
  const handleSaveAll = async () => {
    if (!selectedSubmission) return;
    try {
      setSaving(true);
      // Gọi API lưu grade
      await gradeAssignment(
        selectedSubmission.studentDto.userAccountId,
        selectedSubmission.assignmentId,
        parseFloat(grade)
      );
      // Gọi API lưu feedback
      await saveAssignmentFeedback(
        selectedSubmission.studentDto.userAccountId,
        selectedSubmission.assignmentId,
        feedback
      );
      // Cập nhật state
      setSubmissions((prev) =>
        prev.map((s) =>
          s.submissionId === selectedSubmission.submissionId
            ? { ...s, grade: parseFloat(grade), feedback }
            : s
        )
      );
      alert("Điểm và feedback đã được lưu thành công.");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu dữ liệu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="p-6 text-gray-700">Đang tải danh sách submissions...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-[1000px] mx-auto mt-20 min-h-screen space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ⬅ Quay lại
      </button>
      <h1 className="text-3xl font-bold text-orange-600 mb-4">Danh sách bài nộp</h1>

      {submissions.length === 0 ? (
        <p className="text-gray-600">Chưa có bài nộp nào.</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Sinh viên</th>
              <th className="px-4 py-2 border">Nội dung nộp</th>
              <th className="px-4 py-2 border">File</th>
              <th className="px-4 py-2 border">Điểm</th>
              <th className="px-4 py-2 border">Feedback</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr
                key={s.submissionId}
                className="hover:bg-orange-50 transition"
              >
                <td className="px-4 py-2 border">
                  {s.studentDto.firstName} {s.studentDto.lastName}
                </td>
                <td className="px-4 py-2 border">{s.submissionText || "-"}</td>
                <td className="px-4 py-2 border">
                  {s.filePath ? (
                    <a
                      href={s.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Xem file
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-2 border">{s.grade ?? "-"}</td>
                <td className="px-4 py-2 border">{s.feedback || "-"}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => openModal(s)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Chấm điểm / Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[600px] max-h-[80vh] rounded-2xl shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-orange-600">
                Chấm điểm & Feedback
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-600 transition"
              >
                ✖
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p>
                <strong>Sinh viên:</strong>{" "}
                {selectedSubmission.studentDto.firstName}{" "}
                {selectedSubmission.studentDto.lastName}
              </p>
              <p>
                <strong>Nội dung nộp:</strong>{" "}
                {selectedSubmission.submissionText || "-"}
              </p>
              {selectedSubmission.filePath && (
                <p>
                  <strong>File:</strong>{" "}
                  <a
                    href={selectedSubmission.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Xem file
                  </a>
                </p>
              )}

              <div>
                <label className="block font-semibold mb-1">Điểm:</label>
                <input
                  type="number"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                  min={0}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Feedback:</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                  rows={4}
                />
              </div>

              <button
                onClick={handleSaveAll}
                disabled={saving}
                className="w-full mt-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                {saving ? "Đang lưu..." : "Lưu điểm & Feedback"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorAssignmentPage;
