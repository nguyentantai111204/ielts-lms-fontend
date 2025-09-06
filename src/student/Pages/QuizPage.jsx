import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizQuestions, submitQuiz } from "../Services/QuizService";
import { useAuth } from "../../auth/Context/AuthContext";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 2;

  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        const res = await getQuizQuestions(quizId);

        if (res?.alreadySubmitted) {
          setAlreadySubmitted(true);
          setResult(res.grade ?? 0);
        } else {
          setAlreadySubmitted(false);
          setQuestions(Array.isArray(res?.questions) ? res.questions : []);
          setResult(null);
        }
      } catch (error) {
        console.error("Không thể tải quiz:", error);
        setAlreadySubmitted(false);
        setQuestions([]);
        setResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert("Vui lòng trả lời tất cả câu hỏi trước khi nộp!");
      return;
    }

    setIsSubmitting(true);

    const gradingDto = {
      quiz_id: parseInt(quizId),
      student_id: user.userId,
      answers: questions.map((q) => answers[q.question_id]),
      grades: 0,
      allGrades: [],
    };

    try {
      const res = await submitQuiz(gradingDto);
      setResult(res ?? 0);
      setAlreadySubmitted(true);
      setQuestions([]);
    } catch (error) {
      console.error("Lỗi khi nộp quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="p-6 max-w-3xl mx-auto">Đang tải quiz...</p>;

  const totalPages = alreadySubmitted ? 0 : Math.ceil(questions.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const goPrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen mt-[80px]">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition mt-20"
      >
        ⬅ Quay lại
      </button>

      <h2 className="text-3xl font-bold mb-4 text-gray-800">📘 Quiz #{quizId}</h2>

      {alreadySubmitted ? (
        <div className="p-6 bg-green-50 border border-green-300 rounded-2xl mt-6">
          <h3 className="text-xl font-bold text-green-700">
            🎉 Bài làm đã được ghi nhận!
          </h3>
          <p className="mt-3 text-lg">
            <span className="font-semibold">Điểm số: </span>
            <span className="text-green-800 font-bold">{result}</span>
          </p>
          
        </div>
      ) : (
        <>
          {/* Thanh tiến trình */}
          {questions.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  Trang {currentPage + 1}/{totalPages}
                </span>
                <span>
                  Đã trả lời {Object.keys(answers).length}/{questions.length} câu
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{
                    width: `${((currentPage + 1) / totalPages) * 100}%`,
                    transition: "width 200ms ease",
                  }}
                />
              </div>
            </div>
          )}

          {/* Form câu hỏi */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentQuestions.map((q, index) => {
              let opts = [];
              try {
                opts = typeof q.options === "string" ? JSON.parse(q.options) : q.options;
              } catch {
                console.error("Options không hợp lệ:", q.options);
              }

              return (
                <div
                  key={q.question_id}
                  className="p-5 border rounded-2xl shadow-sm bg-white hover:shadow-md transition"
                >
                  <p className="font-semibold text-lg text-gray-800">
                    {startIndex + index + 1}. {q.question_text}
                  </p>
                  <div className="ml-4 mt-3 space-y-2">
                    {Array.isArray(opts) &&
                      opts.map((opt, i) => (
                        <label
                          key={i}
                          className={`block px-3 py-2 rounded-lg cursor-pointer border ${
                            answers[q.question_id] === opt
                              ? "bg-blue-50 border-blue-500 font-medium"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q-${q.question_id}`}
                            value={opt}
                            checked={answers[q.question_id] === opt}
                            onChange={() => handleChange(q.question_id, opt)}
                            className="mr-2"
                          />
                          {opt}
                        </label>
                      ))}
                  </div>
                </div>
              );
            })}

            {/* Nút nộp bài */}
            {currentPage === totalPages - 1 && questions.length > 0 && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
              >
                {isSubmitting ? "⏳ Đang nộp..." : "✅ Nộp bài"}
              </button>
            )}
          </form>

          {/* Nút phân trang */}
          {questions.length > pageSize && (
            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentPage === 0}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
              >
                ⬅ Trang trước
              </button>

              <span className="text-sm text-gray-600">
                Trang {currentPage + 1}/{totalPages}
              </span>

              <button
                type="button"
                onClick={goNext}
                disabled={currentPage === totalPages - 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700"
              >
                Trang sau ➡
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage;
