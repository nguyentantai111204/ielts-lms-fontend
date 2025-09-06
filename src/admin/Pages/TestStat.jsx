import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBandStatisticsByTest,
  countTestSubmissionByTest,
  getWeeklySubmissionsByTest,
} from "../Services/TestSubmissionService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// Card Components
const Card = ({ children, className }) => (
  <div className={`bg-white border shadow-md rounded-2xl ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const TestStat = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [bandStats, setBandStats] = useState([]);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [weeklySubmissions, setWeeklySubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bandData, count, weeklyData] = await Promise.all([
          getBandStatisticsByTest(testId),
          countTestSubmissionByTest(testId),
          getWeeklySubmissionsByTest(testId),
        ]);
        setBandStats(bandData);
        setSubmissionCount(count);
        setWeeklySubmissions(weeklyData);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [testId]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <button
        className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded shadow"
        onClick={() => navigate(-1)}
      >
        ← Quay lại
      </button>

      <h1 className="text-2xl font-bold mb-4">Thống kê Test</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full text-blue-600 text-xl font-bold">👤</div>
            <div>
              <p className="text-sm text-gray-500">Số người làm bài</p>
              <h3 className="text-xl font-bold">{submissionCount}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full text-purple-600 text-xl font-bold">📊</div>
            <div>
              <p className="text-sm text-gray-500">Số Band Score phân bố</p>
              <h3 className="text-xl font-bold">{bandStats.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Band Score Chart */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Phân bố Band Score</h2>
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : bandStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={bandStats}>
                <XAxis dataKey="band" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Chưa có dữ liệu thống kê Band Score</p>
          )}
        </CardContent>
      </Card>

      {/* Weekly Submissions Chart */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Bài làm theo tuần</h2>
          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : weeklySubmissions.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySubmissions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">Chưa có dữ liệu bài làm theo tuần</p>
          )}
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Gợi ý</h2>
          <ul className="list-disc ml-5 text-gray-600">
            <li>Band Score 4–5: học viên cần cải thiện kỹ năng cơ bản.</li>
            <li>Band Score 6–7: học viên đã đạt trình độ trung cấp khá tốt.</li>
            <li>Band Score 8–9: học viên xuất sắc, sẵn sàng thi cao cấp.</li>
            <li>Theo tuần: tăng dần số bài làm, học viên đang chăm chỉ.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestStat;
