import React, { useEffect, useState } from "react";
import { getAllLocations } from "../Services/LocationService";

const StudentModal = ({ isOpen, onClose, onSave, student }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [locationId, setLocationId] = useState(""); // id khi thêm
  const [locationName, setLocationName] = useState(""); // tên khi sửa
  const [userTypeId, setUserTypeId] = useState(""); // id khi thêm
  const [userTypeName, setUserTypeName] = useState(""); // tên khi sửa
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [password, setPassword] = useState("");
  const [locations, setLocations] = useState([]);

  const userTypeData = [
    { userTypeId: 1, userTypeName: "ADMIN" },
    { userTypeId: 2, userTypeName: "STUDENT" },
    { userTypeId: 3, userTypeName: "INSTRUCTOR" },
  ];

  // Load locations khi modal mở
  useEffect(() => {
    if (isOpen) {
      getAllLocations()
        .then((data) => setLocations(data))
        .catch((err) => console.error(err));
    }
  }, [isOpen]);

  // Set dữ liệu khi edit student
  useEffect(() => {
    if (student) {
      setFirstName(student.firstName || "");
      setLastName(student.lastName || "");
      setEmail(student.email || "");
      setLocationName(student.locationName || "");
      setUserTypeName(student.userType || "");
      setPassword("********");
      setAvatarPreview(student.avatar || "");
      setAvatarFile(null);
      setLocationId(""); // reset
      setUserTypeId(""); // reset
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setLocationName("");
      setUserTypeName("");
      setLocationId("");
      setUserTypeId("");
      setPassword("");
      setAvatarFile(null);
      setAvatarPreview("");
    }
  }, [student, isOpen]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student && (!locationId || !userTypeId)) {
      alert("Vui lòng chọn Location và User Type");
      return;
    }
    if (student && (!locationName || !userTypeName)) {
      alert("Vui lòng chọn Location và User Type");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);

    if (password && password !== "********") {
      formData.append("password", password);
    }

    if (avatarFile) {
      formData.append("avatarFile", avatarFile);
    }

    if (student?.userAccountId) {
      // sửa → gửi tên
      formData.append("locationName", locationName);
      formData.append("userType", userTypeName);
    } else {
      // thêm → gửi id
      formData.append("locationId", locationId);
      formData.append("usersTypeId", userTypeId);
    }

    onSave(formData, student?.userAccountId);
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
          {student ? "Chỉnh sửa học viên" : "Thêm học viên"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Họ, Tên, Email */}
          {[
            { label: "Họ", value: firstName, setter: setFirstName, type: "text" },
            { label: "Tên", value: lastName, setter: setLastName, type: "text" },
            { label: "Email", value: email, setter: setEmail, type: "email" },
          ].map((f) => (
            <div className="relative w-full" key={f.label}>
              <input
                type={f.type}
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
                peer-focus:text-blue-500">
                {f.label}
              </label>
            </div>
          ))}

          {/* Location */}
          <div className="relative w-full">
            <select
              value={student ? locationName : locationId}
              onChange={(e) => {
                if (student) setLocationName(e.target.value);
                else setLocationId(e.target.value);
              }}
              required
              className="peer w-full border rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
            >
              <option value="">Chọn Location</option>
              {locations.map((loc) => (
                <option key={loc.locationId} value={student ? loc.locationName : loc.locationId}>
                  {loc.locationName}
                </option>
              ))}
            </select>
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all
              peer-focus:text-blue-500
              peer-focus:top-2">
              Location
            </label>
          </div>

          {/* User Type */}
          <div className="relative w-full">
            <select
              value={student ? userTypeName : userTypeId}
              onChange={(e) => {
                if (student) setUserTypeName(e.target.value);
                else setUserTypeId(e.target.value);
              }}
              required
              className="peer w-full border rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition"
            >
              <option value="">Chọn User Type</option>
              {userTypeData.map((u) => (
                <option key={u.userTypeId} value={student ? u.userTypeName : u.userTypeId}>
                  {u.userTypeName}
                </option>
              ))}
            </select>
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all
              peer-focus:text-blue-500
              peer-focus:top-2">
              User Type
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
            <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all
              peer-focus:top-2
              peer-focus:text-blue-500">
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

export default StudentModal;
