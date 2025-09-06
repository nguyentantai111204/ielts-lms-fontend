// CourseSection.jsx
import React from "react";
import { useCourses } from "../../course/Context/CourseContext";
import course1 from "../../assets/course1.jpg";
import course2 from "../../assets/course2.jpg";
import course3 from "../../assets/course3.png";
import course4 from "../../assets/course4.jpg";
import course5 from "../../assets/course5.jpg";
import course6 from "../../assets/course6.jpg";

// Map courseId → ảnh local
const courseImages = {
  1: course1,
  2: course2,
  3: course3,
  4: course4,
  5: course5,
  6: course6,
};

const CourseSection = () => {
  const { courses, isLoading, error } = useCourses();


  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <section className="w-full flex flex-col justify-center items-center mt-30">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#0c2247] uppercase">
        Các Khóa Học IELTS
      </h2>
      <div className="w-full max-w-[968px] pl-8 overflow-x-auto scrollbar-hide">
        <div className="grid grid-cols-3 gap-y-12 min-w-[968px]">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="w-[290px] h-[330px] bg-white shadow-md border-2 border-[#baabf7] rounded-xl flex flex-col overflow-hidden"
            >
              <div className="flex-6 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={courseImages[course.courseId] || course1}
                  alt={course.courseName}
                />
              </div>
              <div className="flex-4 p-2">
                <h3 className="text-md font-semibold text-[#0c2247] uppercase line-clamp-2">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3 min-h-[60px]">
                  {course.description}
                </p>
                <a
                  href="#form-section"
                  className="text-[#1948a6] font-semibold mt-3 block hover:underline"
                >
                  Đăng ký
                </a>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
