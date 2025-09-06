import React, { useEffect, useState } from "react";
import { Bell, CheckCircle2, AlertCircle } from "lucide-react";
import {
  getAllNotifications,
  isReadNotifications,
} from "../Services/StudentService";
import { useParams } from "react-router-dom";

const NotificationsPage = () => {
  const { userId } = useParams();
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await getAllNotifications(userId);
        setAllNotifications(all);
      } catch (err) {
        console.error("Lỗi khi tải thông báo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleMarkAsRead = async (id) => {
    try {
      await isReadNotifications(id);
      setAllNotifications((prev) =>
        prev.map((n) =>
          n.notificationId === id ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.error("Lỗi khi xác nhận đã đọc:", err);
    }
  };

  if (loading) return <p className="p-4">Đang tải thông báo...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen mt-[80px]">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <Bell className="w-7 h-7" /> Thông báo
      </h2>

      {allNotifications.length === 0 ? (
        <p className="text-gray-500 italic">Không có thông báo nào.</p>
      ) : (
        <div className="space-y-4">
          {allNotifications.map((n) => (
            <div
              key={n.notificationId}
              className={`p-4 rounded-xl shadow-sm flex justify-between items-center border transition-all
                ${n.read ? "bg-gray-50 border-gray-200" : "bg-red-50 border-red-300"}`}
            >
              <div className="flex items-center gap-3">
                {n.read ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      n.read ? "text-gray-600" : "text-red-700"
                    }`}
                  >
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(n.createAt).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              {!n.read && (
                <button
                  onClick={() => handleMarkAsRead(n.notificationId)}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Xác nhận đã đọc
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
