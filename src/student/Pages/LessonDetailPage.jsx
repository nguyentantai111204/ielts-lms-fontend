import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLessonById } from "../Services/LessonService";
import { getAssignmentsByLesson } from "../Services/AssignmentService";
import { getActiveQuizByLesson } from "../Services/QuizService";

const LessonDetailPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const lessonData = await getLessonById(lessonId);
        setLesson(lessonData);

        const assignmentsData = await getAssignmentsByLesson(lessonId);
        setAssignments(assignmentsData);

        const quizzesData = await getActiveQuizByLesson(lessonId);
        setQuizzes(quizzesData);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải thông tin bài học.");
      }
    };

    fetchLessonData();
  }, [lessonId]);

  if (error) {
    return <div className="p-6">{error}</div>;
  }

  if (!lesson) {
    return <div className="p-6">Đang tải...</div>;
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto mt-20 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        ⬅ Quay lại
      </button>

      {/* Thông tin bài học */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-orange-600">
          {lesson.lessonName}
        </h1>
        <p className="text-gray-600">{lesson.lessonDescription}</p>
        <p className="text-gray-500 mt-2">{lesson.content}</p>
      </div>

      {/* Assignments */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-orange-500 mb-2">
          Assignments
        </h2>
        {assignments.length === 0 ? (
          <p className="text-gray-600">Chưa có assignment.</p>
        ) : (
          <ul className="list-disc list-inside">
            {assignments.map((a) => (
              <li key={a.assignmentId} className="text-gray-700">
                <Link
                  to={`/my-courses/view/${courseId}/lesson/${lessonId}/assignment/${a.assignmentId}`}
                  className="text-blue-600 hover:underline"
                >
                  {a.assignmentTitle}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quizzes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-orange-500 mb-2">Quizzes</h2>
        {quizzes.length === 0 ? (
          <p className="text-gray-600">Chưa có quiz nào.</p>
        ) : (
          <ul className="list-disc list-inside">
            {quizzes.map((q) => (
              <li key={q.quizId} className="text-gray-700">
                <Link
                  to={`/my-courses/view/${courseId}/lesson/${lessonId}/quiz/${q.quizId}`}
                  className="text-blue-600 hover:underline"
                >
                  {q.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LessonDetailPage;
