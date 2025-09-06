import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProfile,
  updateAvatar,
  changePassword
} from "../Services/StudentService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { studentId } = useParams();

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile(studentId);
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [studentId]);

  // update avatar
  const handleUpdateAvatar = async () => {
    if (!file) {
      alert("Vui lòng chọn file trước!");
      return;
    }
    try {
      const newAvatarUrl = await updateAvatar(studentId, file);
      setProfile({ ...profile, avatar: newAvatarUrl });
      alert("Cập nhật avatar thành công!");
    } catch (err) {
      console.error(err);
      alert("Upload avatar thất bại!");
    }
  };


const handleChangePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  if (newPassword !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  try {
    const data = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    await changePassword(studentId, data);

    alert("Đổi mật khẩu thành công!");
    setShowModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    console.error("Lỗi đổi mật khẩu:", err);
    alert(err || "Đổi mật khẩu thất bại! Vui lòng kiểm tra lại.");
  }
};

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-20 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Hồ sơ cá nhân</h1>

      {/* Avatar */}
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={profile.avatar || "https://via.placeholder.com/100"}
          alt="avatar"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUpdateAvatar}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Cập nhật Avatar
          </button>
        </div>
      </div>

      {/* Thông tin cá nhân */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label>Email</label>
          <input
            type="text"
            value={profile.email}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label>Loại người dùng</label>
          <input
            type="text"
            value={profile.userType}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label>Họ</label>
          <input
            type="text"
            value={profile.lastName}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label>Tên</label>
          <input
            type="text"
            value={profile.firstName}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label>Địa điểm</label>
          <input
            type="text"
            value={profile.locationName || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label>Ngày đăng ký</label>
          <input
            type="text"
            value={new Date(profile.registrationDate).toLocaleDateString()}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
      </div>

      {/* Nút đổi mật khẩu */}
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Đổi mật khẩu
      </button>

      {/* Modal đổi mật khẩu */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>

            <label className="block mb-2">Mật khẩu hiện tại</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <label className="block mb-2">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <label className="block mb-2">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
