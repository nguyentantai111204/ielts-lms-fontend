import React, { useState, useEffect } from 'react';
import { useCourses } from '../../course/Context/CourseContext';
import { getAllLocation, adviseRequest } from '../../user/UserService';

export default function AdviseModal({ isOpen, onClose }) {
  const { courses, isLoading, error } = useCourses();
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseId: '',
    locationId: '',
    studentType: '',
    note: ''
  });

  const studentTypeMap = {
    "Học sinh cấp 1": "PRIMARY_STUDENT",
    "Học sinh cấp 2": "SECONDARY_STUDENT",
    "Phụ huynh": "PARENT",
    "Người đi làm": "WORKING_PERSON",
    "Sinh viên năm 1-2": "FRESHMAN",
    "Sinh viên năm 3-4": "SENIOR_STUDENT"
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocation();
        setLocations(data);
      } catch (err) {
        console.error('Lỗi load locations:', err);
      }
    };
    fetchLocations();
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.locationId || !formData.studentType || !formData.courseId) {
      alert("Vui lòng chọn đầy đủ thông tin!");
      return;
    }

    const payload = {
      fullName: formData.name,
      phoneNumber: formData.phone,
      email: formData.email,
      require: formData.note,
      studentType: studentTypeMap[formData.studentType],
      status: "PENDING",
      location: { locationId: parseInt(formData.locationId) },
      course: { courseId: parseInt(formData.courseId) }
    };

    try {
      await adviseRequest(payload);
      alert('Đăng ký thành công!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        courseId: '',
        locationId: '',
        studentType: '',
        note: ''
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert('Đăng ký thất bại! Vui lòng thử lại.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-lg mx-auto p-6 rounded-lg bg-[#A78FFD] text-white shadow-md overflow-hidden">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 text-4xl text-white hover:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-center text-2xl font-bold mb-6 uppercase leading-snug">
          Đăng ký ngay nhận<br />tư vấn miễn phí
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Họ tên"
              className="flex-1 min-w-0 px-4 py-4 rounded-md placeholder:text-gray-500 bg-white"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1 min-w-0 px-4 py-4 rounded-md placeholder:text-gray-500 bg-white"
              required
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="px-4 py-4 rounded-md placeholder:text-gray-500 bg-white"
            required
          />

          {/* Khóa học */}
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="px-4 py-4 rounded-md text-gray-700 bg-white"
            required
          >
            <option value="">Chọn khoá học</option>
            {isLoading ? (
              <option>Đang tải...</option>
            ) : error ? (
              <option>Lỗi tải khóa học</option>
            ) : (
              courses.map(course => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))
            )}
          </select>

          {/* Chi nhánh */}
          <select
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            className="px-4 py-4 rounded-md text-gray-700 bg-white"
            required
          >
            <option value="">Chọn chi nhánh gần nhất</option>
            {locations.map(loc => (
              <option key={loc.locationId} value={loc.locationId}>
                {loc.address}
              </option>
            ))}
          </select>

          {/* Loại học viên */}
          <select
            name="studentType"
            value={formData.studentType}
            onChange={handleChange}
            className="px-4 py-4 rounded-md text-gray-700 bg-white"
            required
          >
            <option value="">Bạn đang là</option>
            {Object.keys(studentTypeMap).map((label, idx) => (
              <option key={idx} value={label}>
                {label}
              </option>
            ))}
          </select>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Bạn có điều gì cần giải đáp thêm?"
            rows="3"
            className="px-4 py-4 rounded-md resize-none placeholder:text-gray-500 bg-white"
          ></textarea>

          <button
            type="submit"
            className="bg-yellow-400 text-[#0c2247] text-xl font-bold py-4 rounded-md hover:bg-yellow-300 transition-all mt-2"
          >
            TƯ VẤN NGAY
          </button>
        </form>
      </div>
    </div>
  );
}
