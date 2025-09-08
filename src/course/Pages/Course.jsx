import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CheckCircle2, Headphones, Home, Video, ChevronDown } from 'lucide-react';
import { getCourseBySlug, getCourseOutcomes } from '../Services/CourseService';
import { getLessonsPreview } from '../Services/LessonService';

const iconMap = {
  video: <Video className="w-4 h-4 text-gray-600" />,
  audio: <Headphones className="w-4 h-4 text-gray-600" />,
  home: <Home className="w-4 h-4 text-gray-600" />,
};

const Course = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [outcomes, setOutcomes] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [openLessonId, setOpenLessonId] = useState(null);

  const toggleLesson = (id) => {
    setOpenLessonId((prevId) => (prevId === id ? null : id));
  };

  const calculateTotalTime = (subLessons = []) => {
    return subLessons.reduce((sum, item) => sum + (item.time || 0), 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const c = await getCourseBySlug(slug);
      if (!c) return;

      setCourse(c);

      const o = await getCourseOutcomes(c.courseId);
      const l = await getLessonsPreview(c.courseId);

      setOutcomes(o);
      setLessons(l);
    };

    fetchData();
  }, [slug]);

  if (!course) return <div className="p-6">Đang tải khóa học...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 min-h-screen pt-[80px]">
      {/* THÔNG TIN KHÓA */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{course.courseName}</h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <div className="mt-2 text-sm text-gray-500">
          <p>Giảng viên: {course.instructorName}</p>
          <p>Thời lượng: {course.duration} giờ</p>
        </div>
      </div>

      {/* MỤC TIÊU */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Bạn sẽ đạt được gì sau khóa học</h2>
        <div className="grid md:grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
          {outcomes.map((outcome) => (
            <div key={outcome.id} className="flex items-center gap-2">
              <CheckCircle2 className="text-green-500 flex-shrink-0 mt-1" size={22} />
              <p className="text-sm font-medium text-gray-800 leading-tight">{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NỘI DUNG */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Nội dung chương trình học</h2>
        <p className="text-sm text-gray-500 mb-2">{lessons.length} bài học • {course.duration} ngày</p>
        <ul className="space-y-3">
          {lessons.map((lesson) => {
            const totalTime = calculateTotalTime(lesson.subLessons);

            return (
              <li
                key={lesson.lessonId}
                className="border border-[#ebecf0] rounded-lg bg-[#fafafa] overflow-hidden shadow-sm "
              >
                <button
                  onClick={() => toggleLesson(lesson.lessonId)}
                  className="w-full px-4 py-3 flex justify-between items-center hover:bg-[#f3f4f6] transition"
                >
                  <span className="text-[15px] font-semibold text-[#262a38]">
                    Buổi {lesson.orderNumber}: {lesson.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{totalTime} phút</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 ${openLessonId === lesson.lessonId ? 'rotate-180' : ''
                        }`}
                    />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden bg-white border-t
                      ${openLessonId === lesson.lessonId
                      ? 'max-h-[500px] opacity-100 px-4 py-3 space-y-2'
                      : 'max-h-0 opacity-0 px-4'
                    }`}
                >
                  {lesson.subLessons?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm text-gray-700 py-1">
                      <div className="flex items-center space-x-4">
                        {iconMap[item.type] || <Video className="w-6 h-6 text-gray-600" />}
                        <span className="text-[15px] text-gray-500">{item.title}</span>
                      </div>
                      <span className="text-gray-500">{item.time} phút</span>
                    </div>
                  ))}
                </div>

              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Course;
