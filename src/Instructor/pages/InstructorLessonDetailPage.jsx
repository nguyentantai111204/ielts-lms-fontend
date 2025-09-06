import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLessonAttendance, getLessonById } from "../Services/LessonService";
import { getAssignmentsByLesson } from "../Services/AssignmentService";
import { getActiveQuizByLesson } from "../Services/QuizService";
import CreateAssignmentModal from "../Components/AddAssiment";
import AddQuiz from "../Components/AddQuiz";

const InstructorLessonDetailPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);


  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const lessonData = await getLessonById(lessonId);
        setLesson(lessonData);

        const assignmentsData = await getAssignmentsByLesson(lessonId);
        setAssignments(assignmentsData);

        const quizzesData = await getActiveQuizByLesson(lessonId);
        setQuizzes(quizzesData);

        const attendanceData = await getLessonAttendance(lessonId);
        setAttendance(attendanceData);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải thông tin bài học.");
      }
    };

    fetchLessonData();
  }, [lessonId]);


  useEffect(() => {
    document.body.style.overflow = showAttendanceModal ? "hidden" : "auto";
  }, [showAttendanceModal]);

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
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-orange-500">Assignments</h2>
          <button
            onClick={() => setShowAssignmentModal(true)} // mở modal
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Thêm Assignment
          </button>
        </div>

        {assignments.length === 0 ? (
          <p className="text-gray-600">Chưa có assignment.</p>
        ) : (
          <ul className="list-disc list-inside">
            {assignments.map((a) => (
              <li key={a.assignmentId} className="text-gray-700">
                <Link
                  to={`/instructor/courses/${courseId}/lesson/${lessonId}/assignment/${a.assignmentId}/view`}
                  className="text-blue-600 hover:underline"
                >
                  {a.assignmentTitle}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Modal thêm assignment */}
        <CreateAssignmentModal
          isOpen={showAssignmentModal}
          onClose={() => setShowAssignmentModal(false)}
          courseId={courseId}
          lessonId={lessonId}
          onSuccess={async () => {
            const assignmentsData = await getAssignmentsByLesson(lessonId);
            setAssignments(assignmentsData);
          }}
        />

      </div>


      {/* Quizzes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-orange-500">Quizzes</h2>
          <button
            onClick={() => setShowQuizModal(true)}   // mở modal
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Thêm Quiz
          </button>
        </div>

        {quizzes.length === 0 ? (
          <p className="text-gray-600">Chưa có quiz nào.</p>
        ) : (
          <ul className="list-disc list-inside">
            {quizzes.map((q) => (
              <li key={q.quizId} className="text-gray-700">
                <Link
                  to={`/instructor/courses/${courseId}/lesson/${lessonId}/quiz/${q.quizId}/view`}
                  className="text-blue-600 hover:underline"
                >
                  {q.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Quiz Modal */}
      {showQuizModal && (
        <AddQuiz
          isOpen={showQuizModal}
          lessonId={lessonId}
          courseId={courseId}
          onClose={() => setShowQuizModal(false)}
          onSuccess={async () => {
            const quizzesData = await getActiveQuizByLesson(lessonId);
            setQuizzes(quizzesData);
          }}
        />
      )}

      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white w-[600px] max-h-[80vh] rounded-lg shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-orange-600">
                Danh sách điểm danh
              </h3>
              <button
                onClick={() => setShowAttendanceModal(false)}
                className="text-gray-500 hover:text-red-600"
              >
                ✖
              </button>
            </div>
            <div className="p-4">
              {attendance.length === 0 ? (
                <p className="text-gray-600">Chưa có học viên nào trong khóa học.</p>
              ) : (
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border">Tên sinh viên</th>
                      <th className="px-4 py-2 border">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((s) => (
                      <tr key={s.userAccountId}>
                        <td className="px-4 py-2 border">
                          {s.firstName + " " + s.lastName}
                        </td>
                        <td className="px-4 py-2 border text-center">
                          {s.attended ? (
                            <span className="text-green-600 font-semibold">
                              ✅ Đã tham gia
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              ❌ Chưa tham gia
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorLessonDetailPage;
