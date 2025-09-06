import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getStudentsInCourse, removeEnrolledStudent } from "../Services/EnrollmentService";
import { getAllLessonsInCourse } from "../Services/LessonService";

const InstructorCourseView = () => {
    const [activeTab, setActiveTab] = useState("info");
    const [lessons, setLessons] = useState([]);
    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { courseId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (location.state?.course) {
                    setCourse(location.state.course);
                }

                const lessonsData = await getAllLessonsInCourse(courseId);
                setLessons(lessonsData);

                const studentData = await getStudentsInCourse(courseId);
                setStudents(studentData);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
                setError("Không thể tải dữ liệu khóa học. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId, location.state]);

    const handleBackClick = () => {
        navigate("/instructor/my-courses");
    };

    const handleRemove = async (studentId) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa học sinh này khỏi khóa học?"
        );
        if (!confirmDelete) return;

        try {
            await removeEnrolledStudent(studentId, courseId);
            setStudents((prev) => prev.filter((s) => s.userAccountId !== studentId));
            alert("Đã xóa học sinh thành công!");
        } catch (error) {
            alert("Có lỗi xảy ra khi xóa học sinh.");
        }
    };

    if (loading) {
        return (
            <div className="p-6 max-w-[1200px] mx-auto min-h-screen mt-20">
                <h2 className="text-xl font-semibold">Đang tải dữ liệu...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-[1200px] mx-auto min-h-screen mt-20">
                <h2 className="text-xl text-red-500 font-semibold">{error}</h2>
                <button
                    onClick={handleBackClick}
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                    Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-screen mt-20">
            {/* Nút quay lại */}
            <button
                onClick={handleBackClick}
                className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
            >
                ← Quay lại
            </button>

            {/* Tabs */}
            <div className="border-b mb-6 flex space-x-6">
                <button
                    onClick={() => setActiveTab("info")}
                    className={`pb-2 font-medium ${activeTab === "info"
                            ? "text-orange-600 border-b-2 border-orange-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Thông tin khóa học
                </button>
                <button
                    onClick={() => setActiveTab("students")}
                    className={`pb-2 font-medium ${activeTab === "students"
                            ? "text-orange-600 border-b-2 border-orange-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Danh sách học viên
                </button>
            </div>

            {/* Nội dung Tab */}
            {activeTab === "info" && (
                <>
                    {course && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h1 className="text-3xl font-bold text-orange-600 mb-2">
                                {course.courseName}
                            </h1>
                            <p className="text-gray-600 mb-4">{course.courseDescription}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span>Mã khóa học: {course.courseId}</span>
                                <span>Giảng viên: {course.instructorName}</span>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                            Danh sách bài học
                        </h2>

                        {lessons.length === 0 ? (
                            <p className="text-gray-600">
                                Chưa có bài học nào trong khóa học này.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {lessons.map((lesson, index) => (
                                    <div
                                        key={lesson.lessonId}
                                        className="border rounded-lg p-4 hover:bg-gray-50"
                                        onClick={() => navigate(`/instructor/courses/${courseId}/lesson/${lesson.lessonId}`)}
                                    >
                                        <div className="flex items-start">
                                            <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    {lesson.lessonName}
                                                </h3>
                                                <p className="text-gray-600 mt-1">
                                                    {lesson.lessonDescription}
                                                </p>
                                                <p className="text-gray-500 text-sm mt-2">
                                                    {lesson.content}
                                                </p>
                                                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                                                    <span>
                                                        Ngày tạo:{" "}
                                                        {new Date(
                                                            lesson.creationTime
                                                        ).toLocaleDateString("vi-VN")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            {activeTab === "students" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                        Thành viên trong khóa học
                    </h2>

                    {students.length === 0 ? (
                        <p className="text-gray-600">
                            Chưa có học viên nào tham gia khóa học này.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border px-4 py-2">STT</th>
                                        <th className="border px-4 py-2">Họ và tên</th>
                                        <th className="border px-4 py-2">Email</th>
                                        <th className="border px-4 py-2">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={`${student.userAccountId || 'no-id'}-${index}`} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {student.firstName} {student.lastName}
                                            </td>
                                            <td className="border px-4 py-2">{student.email}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleRemove(student.userAccountId)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InstructorCourseView;
