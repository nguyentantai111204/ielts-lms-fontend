import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllLessonsInCourse, studentEnterLesson } from '../Services/LessonService';

const StudentCourseView = () => {
    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [otpInput, setOtpInput] = useState('');
    const [otpError, setOtpError] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { courseId } = useParams();

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);

                if (location.state?.course) {
                    setCourse(location.state.course);
                }

                const lessonsData = await getAllLessonsInCourse(courseId);
                setLessons(lessonsData);
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu khóa học:', err);
                setError('Không thể tải thông tin khóa học. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId, location.state]);

    const handleBackClick = () => {
         navigate("/student/my-courses");
    };

    const handleJoinLessonClick = (lesson) => {
        setSelectedLesson(lesson);
        setShowOtpModal(true);
        setOtpInput('');
        setOtpError('');
    };

    const handleOtpSubmit = async () => {
        if (!otpInput.trim()) {
            setOtpError('Vui lòng nhập mã OTP');
            return;
        }

        try {
            // Gọi API để xác minh OTP
            await studentEnterLesson(courseId, selectedLesson.lessonId, otpInput);
            
            // Nếu thành công, đóng modal và chuyển hướng đến trang bài học
            setShowOtpModal(false);
            navigate(`/my-courses/view/${courseId}/lesson/${selectedLesson.lessonId}`);
        } catch (err) {
            console.error('Lỗi khi xác minh OTP:', err);
            setOtpError('Mã OTP không đúng. Vui lòng thử lại.');
        }
    };

    const closeModal = () => {
        setShowOtpModal(false);
        setOtpInput('');
        setOtpError('');
    };

    if (loading) {
        return (
            <div className="p-6 max-w-[1200px] mx-auto min-h-screen mt-20">
                <h2 className="text-xl font-semibold">Đang tải thông tin khóa học...</h2>
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
            {/* Modal nhập OTP */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Nhập mã OTP để tham gia bài học</h3>
                        <p className="text-gray-600 mb-2">Bài học: {selectedLesson?.lessonName}</p>
                        
                        <input
                            type="text"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                            placeholder="Nhập mã OTP"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        
                        {otpError && (
                            <p className="text-red-500 text-sm mt-2">{otpError}</p>
                        )}
                        
                        <div className="flex justify-end mt-6 space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleOtpSubmit}
                                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={handleBackClick}
                className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Quay lại
            </button>

            {course && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold text-orange-600 mb-2">{course.courseName}</h1>
                    <p className="text-gray-600 mb-4">{course.courseDescription}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>Mã khóa học: {course.courseId}</span>
                        <span>Giảng viên: {course.instructorName}</span>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-orange-500 mb-4">Danh sách bài học</h2>

                {lessons.length === 0 ? (
                    <p className="text-gray-600">Chưa có bài học nào trong khóa học này.</p>
                ) : (
                    <div className="space-y-4">
                        {lessons.map((lesson, index) => (
                            <div key={lesson.lessonId} className="border rounded-lg p-4 hover:bg-gray-50">
                                <div className="flex items-start">
                                    <div className="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-800">{lesson.lessonName}</h3>
                                        <p className="text-gray-600 mt-1">{lesson.lessonDescription}</p>
                                        <p className="text-gray-500 text-sm mt-2">{lesson.content}</p>
                                        <div className="flex justify-between gap-3 mt-3 text-sm text-gray-500">
                                            <div className="flex flex-wrap gap-3">
                                                <span>Mã OTP: {lesson.otp}</span>
                                                <span>Ngày tạo: {new Date(lesson.creationTime).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => handleJoinLessonClick(lesson)}
                                                    className="text-[#f57411] hover:underline"
                                                >
                                                    Tham gia bài học
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCourseView;