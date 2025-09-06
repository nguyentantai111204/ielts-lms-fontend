import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Headphones, BookOpen } from "lucide-react";
import { getTestPreview} from "../services/TestOnlineService";
import { startTest} from '../services/TestSubmitService';
import { useAuth } from "../../auth/Context/AuthContext";




const TestOnlineDetail = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { testId } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestPreview(testId);
        setTest(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu test:", error);
      }
    };
    fetchData();
  }, [testId]);

  if (!test) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-purple-600 font-bold text-xl animate-pulse">
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }
  const handleStartTest = async () => {
  try {
    if (!user || !user.userId) {
      alert("Bạn cần đăng nhập để làm bài!");
      navigate("/login", { replace: true });
      return;
    }

    const submission = await startTest(testId, user.userId);

    navigate(`/test-online/${testId}/take/${submission.submissionId}`);
  } catch (error) {
    console.error("Lỗi khi bắt đầu test:", error);
    alert("Không thể bắt đầu bài thi. Vui lòng thử lại.");
  }
};



  const totalTime = test.sections.reduce((sum, sec) => sum + sec.durationMinutes, 0);
  const totalQuestions = test.sections.reduce((sum, sec) => sum + sec.totalQuestions, 0);

  const getSectionIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "listening":
        return <Headphones className="text-purple-600 w-8 h-8" />;
      case "reading":
        return <BookOpen className="text-purple-600 w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-4">
          {test.description}
        </h1>
        <p className="text-center mb-6 text-gray-600">{test.title}</p>

        <h2 className="text-center text-lg font-semibold mb-6 text-purple-700">
          Thông tin các phần thi
        </h2>

        <div className="flex justify-center gap-6 flex-wrap mb-8">
          {test.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl w-64 p-6 text-center border border-purple-200 hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <div className="flex justify-center mb-3">
                {getSectionIcon(section.sectionType)}
              </div>
              <p className="font-bold text-lg mb-2 text-purple-700">
                {section.sectionType.toUpperCase()}
              </p>
              <ul className="text-sm text-left list-disc list-inside space-y-1 text-gray-600">
                <li>
                  <strong>{section.durationMinutes}</strong> phút
                </li>
                <li>
                  <strong>{section.totalQuestions}</strong> câu hỏi
                </li>
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm italic text-purple-700 mb-8">
          Tổng thời gian: <strong>{totalTime} phút</strong> | Tổng số câu hỏi:{" "}
          <strong>{totalQuestions}</strong>
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition duration-300"
          >
            ⬅ Quay lại
          </button>
          <button
            onClick={handleStartTest}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-md shadow hover:opacity-90 transition duration-300"
          >
            Bắt đầu làm bài »
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestOnlineDetail;
