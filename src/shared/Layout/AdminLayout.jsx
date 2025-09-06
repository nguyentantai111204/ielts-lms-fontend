import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/Context/AuthContext";

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 font-bold text-lg border-b">Admin Panel</div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="block p-2 rounded hover:bg-gray-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="block p-2 rounded hover:bg-gray-200">
                Students
              </Link>
            </li>
            <li>
              <Link to="/admin/instructors" className="block p-2 rounded hover:bg-gray-200">
                Instructor
              </Link>
            </li>
            <li>
              <Link to="/admin/courses" className="block p-2 rounded hover:bg-gray-200">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/admin/tests" className="block p-2 rounded hover:bg-gray-200">
                Tests
              </Link>
            </li>
            
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">{user?.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Nội dung route */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
