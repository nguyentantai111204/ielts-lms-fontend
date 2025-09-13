import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHistoryTests } from "../Services/TestOnlineService";


const HistoryTestPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const data = await getHistoryTests(userId);
        setHistory(data);
      } catch (err) {
        console.error("Error fetching history:", err);
        alert("Không thể tải lịch sử bài test");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  if (!history.length) return <div className="min-h-screen flex items-center justify-center text-gray-500">Chưa có bài test nào</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Lịch sử làm bài test</h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2">Tên bài test</th>
                <th className="px-4 py-2">Bắt đầu lúc</th>
                <th className="px-4 py-2">Nộp lúc</th>
                <th className="px-4 py-2">Điểm</th>
                <th className="px-4 py-2 text-center">Xem chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.testSubmissionId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.testName}</td>
                  <td className="px-4 py-2">{item.startedAt ? new Date(item.startedAt).toLocaleString() : "-"}</td>
                  <td className="px-4 py-2">{item.submittedAt ? new Date(item.submittedAt).toLocaleString() : "-"}</td>
                  <td className="px-4 py-2">{item.totalScore ?? "Chưa chấm"}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => navigate(`/student/history-tests/result-page/${item.testSubmissionId}`)}
                      className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate("/student/my-courses")}
            className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Về khóa học
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryTestPage;
