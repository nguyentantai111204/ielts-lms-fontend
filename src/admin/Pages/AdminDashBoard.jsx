// src/modules/admin/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Users, BookOpen, FileText, BarChart2 } from "lucide-react";
import { countStudent, getUserGrowth } from "../Services/StudentService";
import { countCourse } from "../Services/CourseService";
import { countTest } from "../Services/TestService";
import { countTestSubmission } from "../Services/TestSubmissionService";
import { getBandStatistics } from "../Services/TestSubmissionService";

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
    Legend,
} from "recharts";


// ✅ Card components tự code
const Card = ({ children, className }) => (
    <div className={`bg-white border shadow-md rounded-2xl ${className}`}>
        {children}
    </div>
);

const CardContent = ({ children, className }) => (
    <div className={`p-4 ${className}`}>{children}</div>
);

const AdminDashboard = () => {

    const [studentCount, setStudentCount] = useState(0);
    const [courseCount, setCourseCount] = useState(0);
    const [testCount, setTestCount] = useState(0);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [bandStatistics, setBandStatistics] = useState(null);
    const [userGrowth, setUserGrowth]= useState(null);


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [student, course, test, submission, bandStatisticsData, userGrowthData] = await Promise.all([
                    countStudent(),
                    countCourse(),
                    countTest(),
                    countTestSubmission(),
                    getBandStatistics(),
                    getUserGrowth(),
                ]);

                setStudentCount(student);
                setCourseCount(course);
                setTestCount(test);
                setSubmissionCount(submission);
                setBandStatistics(bandStatisticsData);
                setUserGrowth(userGrowthData)

            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", err);
            }
        };

        fetchStats();
    }, []);


    const stats = [
        { title: "Người dùng", value: studentCount, icon: <Users className="text-blue-600" /> },
        { title: "Khóa học", value: courseCount, icon: <BookOpen className="text-green-600" /> },
        { title: "Bài test", value: testCount, icon: <FileText className="text-purple-600" /> },
        { title: "Submissions", value: submissionCount, icon: <BarChart2 className="text-red-600" /> },
    ];

    return (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="flex items-center p-6 gap-4">
                            <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <h3 className="text-xl font-bold">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Biểu đồ Band Score */}
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Phân bố Band Score</h2>
                        {bandStatistics && bandStatistics.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={bandStatistics}>
                                    <XAxis dataKey="band" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p className="text-gray-500">Chưa có dữ liệu thống kê</p>
                        )}
                    </CardContent>
                </Card>

                {/* Biểu đồ User Growth */}
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Người dùng mới theo tháng</h2>
                        {userGrowth && userGrowth.length > 0 ?(
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={userGrowth}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                        ):"Đang tải dữ liệu"}
                    </CardContent>
                </Card>
            </div>

            {/* Notifications / Activity */}
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
                    <ul className="space-y-3">
                        <li>✅ Học viên <b>Nguyễn Văn A</b> vừa đăng ký khoá IELTS 6.0.</li>
                        <li>📝 Bài test <b>IELTS Mini Test 5</b> vừa được tạo.</li>
                        <li>📊 Có <b>35 submissions</b> mới trong 24h qua.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminDashboard;
