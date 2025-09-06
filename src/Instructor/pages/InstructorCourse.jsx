import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/Context/AuthContext';
import CourseCard from '../../course/Components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { getInstructorCourses } from '../Services/CourseService';

const InstructorCourse = () => {
    const [search, setSearch] = useState('');
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        const loadCourses = async () => {
            if (!user) return;
            try {
                const data = await getInstructorCourses();
                if (Array.isArray(data)) {
                    setCourses(data);
                    setError(null);
                } else {
                    setCourses([]);
                    setError('API không trả về dữ liệu hợp lệ'); 
                }
            } catch (err) {
                console.error('Lỗi khi gọi API:', err);
                setCourses([]);
                setError('Không thể tải dữ liệu khóa học. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, [user]);

    const handleCourseClick = (course) => {

        navigate(`/instructor/my-courses/view/${course.courseId}`, { state: { course } });
    };

    const filteredCourses = courses.filter(course =>
        course.courseName?.toLowerCase().includes(search.toLowerCase())
    );

    if (!user) {
        return (
            <div className="p-6 max-w-[1200px] mx-auto min-h-screen mt-20">
                <h2 className="text-xl text-red-500 font-semibold">Vui lòng đăng nhập để xem khóa học bạn giảng dạy</h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-6 max-w-[1200px] mx-auto min-h-screen mt-20">
                <h2 className="text-xl font-semibold">Đang tải khóa học...</h2>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-screen mt-20">
            <h1 className="text-2xl font-bold text-blue-600 mb-4">Welcome, Instructor {user?.email}</h1>
            <div className="border rounded p-4">
                <h2 className="text-xl font-semibold text-blue-500 mb-4">Danh sách khóa học bạn đang giảng dạy</h2>

                {courses.length === 0 ? (
                    <div className="text-gray-600 text-center py-10">
                        Bạn chưa tạo hoặc được phân công khóa học nào.
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <select className="border px-3 py-2 rounded">
                                <option>Tất cả</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="border px-3 py-2 rounded w-64"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4">
                            {filteredCourses.map((course, index) => (
                                <div
                                    key={course.id ?? index}
                                    className="cursor-pointer"
                                    onClick={() => handleCourseClick(course)}
                                >
                                    <CourseCard course={course} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InstructorCourse;
