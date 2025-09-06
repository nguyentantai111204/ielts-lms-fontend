import React from "react";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="text-xl text-gray-700 mt-4">Bạn không có quyền truy cập trang này.</p>
      <Link 
        to="/" 
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Quay lại Trang chủ
      </Link>
    </div>
  );
};

export default ForbiddenPage;
