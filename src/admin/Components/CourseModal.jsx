import React, { useState, useEffect } from "react";
import { getAllInstructors } from "../Services/InstructorService";

const CourseModal = ({ isOpen, onClose, onSave, course }) => {
    const [courseName, setCourseName] = useState("");
    const [duration, setDuration] = useState("");
    const [instructorId, setInstructorId] = useState(null);
    const [description, setDescription] = useState("");
    const [instructors, setInstructors] = useState([]);
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState("");

    // Load instructors
    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const data = await getAllInstructors();
                setInstructors(data);
            } catch (err) {
                console.error("Lỗi khi load instructors:", err);
            }
        };
        fetchInstructors();
    }, []);

    // Preload course data when editing
    useEffect(() => {
        if (course) {
            setCourseName(course.courseName || "");
            setDuration(course.duration || "");
            setInstructorId(course.instructorId || null);
            setDescription(course.description || "");
            setMediaPreview(course.media || "");
            setMediaFile(null);
        } else {
            setCourseName("");
            setDuration("");
            setInstructorId(null);
            setDescription("");
            setMediaPreview("");
            setMediaFile(null);
        }
    }, [course, isOpen]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMediaFile(file);
            setMediaPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Không gửi instructorId nếu chưa chọn
        const courseData = {
            courseName,
            duration: parseInt(duration) || 0,
            description: description || "",
            instructorId: instructorId || null
        };

        const formData = new FormData();
        formData.append(
            "course",
            new Blob([JSON.stringify(courseData)], { type: "application/json" })
        );

        if (mediaFile) {
            formData.append("file", mediaFile);
        }

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }


        console.log("InstructorId: ", instructorId);

        onSave(formData, course?.courseId);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    {course ? "Chỉnh sửa khóa học" : "Thêm khóa học"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Course Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Tên khóa học</label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            placeholder="Nhập tên khóa học"
                            required
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Thời lượng</label>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="VD: 40 giờ, 3 tháng"
                            required
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Mô tả khóa học</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả khóa học..."
                            rows={3}
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Instructor */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Giảng viên</label>
                        <select
                            value={instructorId || ""}
                            onChange={(e) => setInstructorId(Number(e.target.value) || null)}
                            required
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">-- Chọn giảng viên --</option>
                            {instructors.map((inst) => (
                                <option key={inst.userAccountId} value={inst.userAccountId}>
                                    {inst.fullName || `${inst.firstName} ${inst.lastName}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Media Upload */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Hình ảnh / Video</label>
                        {mediaPreview && (
                            <img
                                src={mediaPreview}
                                alt="preview"
                                className="w-full h-40 object-cover rounded-md border mb-2"
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg transition"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseModal;
