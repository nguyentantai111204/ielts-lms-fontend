import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssignmentById, uploadAssignment } from "../Services/AssignmentService";
import { useAuth } from "../../auth/Context/AuthContext";
import { FileText, Clock, CheckCircle, XCircle, Upload } from "lucide-react";

const AssignmentPage = () => {
  const { courseId, lessonId, assignmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [assignment, setAssignment] = useState(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const data = await getAssignmentById(assignmentId);
        setAssignment(data.assignment);
        setAlreadySubmitted(data.alreadySubmitted);
        if (data.previousAnswer) setAnswer(data.previousAnswer);
      } catch (err) {
        console.error("Không thể tải assignment:", err);
        setError("Không thể tải thông tin assignment.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [assignmentId]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !answer.trim()) {
      alert("Vui lòng nhập câu trả lời hoặc upload file.");
      return;
    }
    if (!assignment) return;

    try {
      const dto = {
        assignmentId: assignment.assignmentId,
        assignmentTitle: assignment.assignmentTitle,
        assignmentDescription: assignment.assignmentDescription,
        courseId: parseInt(courseId),
        lessonId: parseInt(lessonId),
        submissionText: answer,
        filePath: file || null,
      };
      await uploadAssignment(dto, file);
      alert("Nộp bài thành công!");
      setAlreadySubmitted(true);
      navigate(`/my-courses/view/${courseId}/lesson/${lessonId}`);
    } catch (err) {
      console.error("Lỗi khi nộp bài:", err);
      alert("Nộp bài thất bại.");
    }
  };

  if (loading) return <p className="p-4">⏳ Đang tải...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200 mt-[80px] min-h-screen">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-4">
        <FileText className="w-6 h-6 text-gray-700" /> {assignment?.assignmentTitle}
      </h2>

      <p className="mb-3 text-gray-700">{assignment?.assignmentDescription}</p>

      <p className="mb-3 flex items-center gap-2 text-gray-600">
        <Clock className="w-5 h-5 text-gray-500" />
        <span>
          Hạn nộp:{" "}
          <strong>{new Date(assignment?.dueDate).toLocaleString()}</strong>
        </span>
      </p>

      <p className="mb-5 flex items-center gap-2 font-medium">
        {alreadySubmitted ? (
          <span className="flex items-center text-green-600 gap-2 bg-green-50 px-3 py-2 rounded-lg">
            <CheckCircle className="w-5 h-5" /> ✅ Đã nộp
          </span>
        ) : (
          <span className="flex items-center text-red-600 gap-2 bg-red-50 px-3 py-2 rounded-lg">
            <XCircle className="w-5 h-5" /> ❌ Chưa nộp
          </span>
        )}
      </p>

      {!alreadySubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Câu trả lời:
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="4"
              placeholder="Nhập câu trả lời của bạn..."
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Upload file:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700"
              />
              {file && (
                <span className="text-sm text-green-600 font-medium">
                  {file.name}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Upload className="w-5 h-5" /> Nộp bài
          </button>
        </form>
      ) : (
        <p className="text-gray-600 italic">
          Bạn đã nộp bài này. Không thể nộp lại.
        </p>
      )}

      <button
        onClick={() =>
          navigate(`/my-courses/view/${courseId}/lesson/${lessonId}`)
        }
        className="mt-6 bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
      >
        ⬅ Quay lại bài học
      </button>
    </div>
  );
};

export default AssignmentPage;
