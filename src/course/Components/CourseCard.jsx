import React from 'react';
import { Link } from 'react-router-dom'; 

const generateCurrentCode = () => {
  const now = new Date();
  const year = now.getFullYear() % 100;
  const month = now.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  return `${year}${quarter}`;
};

const CourseCard = ({ course }) => {
  const code = generateCurrentCode();

  return (
   <Link to={`/my-courses/${course.courseId}/lessons`} className="block hover:shadow-lg transition duration-300">
      <div className="rounded-lg overflow-hidden shadow bg-white">
        <div className="h-24" style={{ backgroundColor: course.color || '#ccc' }} />
        <div className="p-3">
          <h3 className="text-sm font-medium text-blue-700 truncate">
            [{code}] - {course.courseName}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Giảng viên: {course.instructorName}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
