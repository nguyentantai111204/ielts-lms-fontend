import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/my-logo.png'
import person from '../../assets/person_intro.png'
import { Menu, X, ChevronDown } from 'lucide-react'

import Dropdown from './Dropdown'
import AdviseModal from '../Form/AdviseModal'
import { useAuth } from '../../auth/Context/AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const { user, logout, token } = useAuth()
  const isAuthenticated = Boolean(token)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)


  return (
    <div className="w-full top-0 left-0 fixed z-50 bg-white pb-1 shadow-md nav-shadow">
      <div className="flex justify-center items-center px-4">
        <div className="nav-container flex justify-between items-center max-w-[960px] w-full h-[60px]">
          <Link className="w-[130px] overflow-hidden object-cover" to="/">
            <img className="w-full" src={logo} alt="logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="nav-elements mt-2 hidden lg:block">
            <div className="group-elements flex flex-col justify-center lg:flex-row lg:items-center gap-8 text-sm font-medium">
              <Link to="/about" className="element cursor-pointer">Giới thiệu</Link>
              <Link to="/instructors" className="element cursor-pointer">Giảng viên</Link>
              <Link to="/test-online" className="element cursor-pointer">Test Online</Link>

              {/* Khóa học */}
              {isAuthenticated && user ? (
                <Link
                  to={
                    user.role === "STUDENT"
                      ? "/student/my-courses"
                      : user.role === "INSTRUCTOR"
                        ? "/instructor/my-courses"
                        : "/"
                  }
                  className="element cursor-pointer"
                >
                  Khóa học của tôi
                </Link>
              ) : (
                <Dropdown />
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="button-group hidden lg:flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="min-w-[120px] rounded-2xl border font-semibold border-[#9237F6] px-6 py-1.75 text-[#9237F6] hover:bg-[#f3e8ff] transition"
            >
              Tư vấn
            </button>

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 border px-4 py-1.5 rounded-2xl hover:bg-[#f3e8ff] transition"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src={user?.avatar || person}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown size={18} />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg w-48 z-50">
                    {user?.userId && (
                      <>
                        <Link
                          to={`/student/profile/${user.userId}`}
                          className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                          onClick={() => setShowDropdown(false)}
                        >
                          Hồ sơ
                        </Link>

                        <Link
                          to={`/student/notifications/${user.userId}`}
                          className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                          onClick={() => setShowDropdown(false)}
                        >
                          Thông báo
                        </Link>
                      </>
                    )}

                    <button
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
                      onClick={logout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-2xl bg-[#9237F6] text-white px-6 py-2 hover:bg-[#7e2ed6] transition w-full text-center font-semibold"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-[#9237F6]">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-[250px] h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex justify-end p-4">
          <button onClick={closeMenu} className="text-[#9237F6] cursor-pointer">
            <X size={30} />
          </button>
        </div>
        <div className="mobile-menu flex flex-col items-start gap-8 mt-10 pl-6">
          <Link to="/about" className="text-base w-full" onClick={closeMenu}>Về chúng tôi</Link>
          <Link to="/instructors" className="text-base w-full" onClick={closeMenu}>Giảng viên</Link>
          <Link to="/test-online" className="text-base w-full" onClick={closeMenu}>Test online</Link>

          {/* Khóa học */}
          {isAuthenticated && user ? (
            <Link
              to={
                user.role === "STUDENT"
                  ? "/student/my-courses"
                  : user.role === "INSTRUCTOR"
                    ? "/instructor/my-courses"
                    : "/"
              }
              className="element cursor-pointer"
            >
              Khóa học của tôi
            </Link>
          ) : (
            <Dropdown />
          )}

          <br />
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-2xl border font-semibold border-[#9237F6] px-6 py-2 text-[#9237F6] hover:bg-[#f3e8ff] transition w-full"
            >
              Tư vấn
            </button>

            {!isAuthenticated && (
              <Link
                to="/login"
                className="rounded-2xl bg-[#9237F6] text-white px-6 py-2 hover:bg-[#7e2ed6] transition w-full text-center font-semibold"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-40 lg:hidden"
        ></div>
      )}

      <AdviseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default Header
