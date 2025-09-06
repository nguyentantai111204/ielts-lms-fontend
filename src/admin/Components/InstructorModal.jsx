import React, { useEffect, useState } from "react";
import { getAllLocations } from "../Services/LocationService";

const InstructorModal = ({ isOpen, onClose, onSave, instructor }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [achievements, setAchievements] = useState("");
  const [position, setPosition] = useState("");
  const [userTypeName, setUserTypeName] = useState("INSTRUCTOR");
  const [usersTypeId, setUsersTypeId] = useState(3); // chỉ dùng khi thêm
  const [locationId, setLocationId] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [password, setPassword] = useState("");
  const [locations, setLocations] = useState([]);

  // Load locations khi modal mở
  useEffect(() => {
    if (isOpen) {
      getAllLocations()
        .then((data) => setLocations(data))
        .catch((err) => console.error(err));
    }
  }, [isOpen]);

  // Preload dữ liệu khi edit instructor
  useEffect(() => {
    if (instructor) {
      setFirstName(instructor.firstName || "");
      setLastName(instructor.lastName || "");
      setEmail(instructor.email || "");
      setAchievements(instructor.achievements || "");
      setPosition(instructor.position || "");
      setUserTypeName("INSTRUCTOR");
      setLocationId(instructor.locationId || "");
      setAvatarPreview(instructor.avatar || "");
      setAvatarFile(null);
      setPassword("********");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setAchievements("");
      setPosition("");
      setUserTypeName("INSTRUCTOR");
      setUsersTypeId(3);
      setLocationId("");
      setAvatarFile(null);
      setAvatarPreview("");
      setPassword("");
    }
  }, [instructor, isOpen]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!locationId) {
      alert("Vui lòng chọn Location");
      return;
    }

    const formData = new FormData();

    // Các trường chung
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);

    if (password && password !== "********") {
      formData.append("password", password);
    }

    if (avatarFile) {
      formData.append("avatarFile", avatarFile);
    }

    formData.append("locationId", locationId);

    if (instructor?.userAccountId) {
      // EDIT
      formData.append("userAccountId", instructor.userAccountId);
      formData.append("achievements", achievements);
      formData.append("position", position);
      formData.append("userTypeName", userTypeName);
    } else {
      // ADD
      formData.append("usersTypeId", usersTypeId);
    }

    onSave(formData, instructor?.userAccountId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-300 hover:border-blue-500 transition"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Avatar
            </div>
          )}
          <label className="mt-3 px-4 py-1 text-sm bg-gray-200 rounded cursor-pointer hover:bg-gray-300 transition">
            Đổi Avatar
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {instructor ? "Chỉnh sửa Giảng viên" : "Thêm Giảng viên"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Họ, Tên, Email */}
          {[{ label: "Họ", value: firstName, setter: setFirstName },
            { label: "Tên", value: lastName, setter: setLastName },
            { label: "Email", value: email, setter: setEmail }].map(f => (
            <div className="relative w-full" key={f.label}>
              <input
                type={f.label === "Email" ? "email" : "text"}
                value={f.value}
                onChange={(e) => f.setter(e.target.value)}
                placeholder=" "
                required
                className="peer w-full border rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
              />
              <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:text-base
                peer-focus:top-2
                peer-focus:text-sm
                peer-focus:text-blue-500">{f.label}</label>
            </div>
          ))}

          {/* Achievements (chỉ khi edit) */}
          {instructor && (
            <div className="relative w-full">
              <input
                type="text"
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                placeholder=" "
                className="peer w-full border rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
              />
              <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:text-base
                peer-focus:top-2
                peer-focus:text-sm
                peer-focus:text-blue-500">Thành tích</label>
            </div>
          )}

          {/* Position (chỉ khi edit) */}
          {instructor && (
            <div className="relative w-full">
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder=" "
                className="peer w-full border rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
              />
              <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all
                peer-placeholder-shown:top-5
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:text-base
                peer-focus:top-2
                peer-focus:text-sm
                peer-focus:text-blue-500">Chức vụ</label>
            </div>
          )}

          {/* Location */}
          <div className="relative w-full">
            <select
              value={locationId || ""}
              onChange={(e) => setLocationId(Number(e.target.value))}
              required
              className="peer w-full border rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
            >
              <option value="">Chọn Location</option>
              {locations.map(loc => (
                <option key={loc.locationId} value={loc.locationId}>
                  {loc.locationName}
                </option>
              ))}
            </select>
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-focus:text-blue-500 peer-focus:top-2">
              Location
            </label>
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full border rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
            />
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-focus:top-2 peer-focus:text-blue-500">
              Password
            </label>
            <small className="text-gray-400 text-xs mt-1 block">
              Nhập mật khẩu mới nếu muốn thay đổi, để trống hoặc giữ ******** nếu không đổi
            </small>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg transition">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorModal;
