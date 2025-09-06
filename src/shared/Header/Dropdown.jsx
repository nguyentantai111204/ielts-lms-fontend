import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const courseLinks = [
    { name: 'Khóa cho người mới', slug: 'ielts-beginner' },
    { name: 'Khóa kèm 1 - 1', slug: 'ielts-1-1' },
    { name: 'Khóa 5.0 - 5.5 đầu ra', slug: 'ielts-5.0-5.5' },
    { name: 'Khóa 6.0 - 6.5 đầu ra', slug: 'ielts-6.0-6.5' },
    { name: 'Khóa 7+ đầu ra', slug: 'ielts-7+' },
    { name: 'Khóa học online', slug: 'ielts-online' },
  ];

  return (
    <div className="relative cursor-pointer" ref={dropdownRef}>
      <span className="element" onClick={() => setOpen(!open)}>
        Khóa học
      </span>

      {open && (
        <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 mt-2 min-w-[180px] z-50">
          {courseLinks.map((course) => (
            <Link
              key={course.slug}
              to={`/course/${course.slug}`}
              className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              onClick={() => setOpen(false)}
            >
              {course.name}
            </Link>
          ))}
        </div>
      )}

    </div>
  );
};

export default Dropdown;
