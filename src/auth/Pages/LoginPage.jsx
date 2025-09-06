// modules/auth/pages/LoginPage.jsx
import React, { useState } from "react";
import logo from "../../assets/my-logo.png";
import banner from "../../assets/banner.jpg";
import { LucideApple, LucideGlobe, LucideMessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const { login, loading, error, user } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");

    try {
      const user = await login(email, password);
      if(user){
        if(user.role==="ADMIN"){
            navigate("/admin/dashboard")
        }
        else{
            navigate("/")
        }
      }
    } catch (err) {
      setLocalError(
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Đăng nhập thất bại!"
      );
    }
  };

  return (
        <div className="min-h-screen flex flex-col md:flex-row min-w-[348px]">
            {/* Left banner image */}
            <div className="md:w-1/2 hidden md:flex items-center justify-center">
                <div className="w-[90%] h-[80%] rounded-2xl overflow-hidden shadow-lg mt-30">
                    <img
                        src={banner}
                        alt="imap-banner"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Right login form */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
                <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
                    <img src={logo} alt="logo" className="w-36 mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-center text-[#333]">Đăng nhập</h2>
                    <p className="text-center text-sm text-gray-500 mb-4">Vui lòng nhập email và mật khẩu để tiếp tục</p>

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8647e6]"
                    />

                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8647e6]"
                    />

                    {error && <div className="text-sm text-red-500 text-center">{error}</div>}

                    <button
                        type="submit"
                        className="w-full bg-[#f44336] text-white py-3 rounded-lg hover:bg-[#d32f2f] transition font-semibold"
                    >
                        Đăng nhập
                    </button>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="h-px bg-gray-300 flex-1" />
                        <span className="text-sm text-gray-500">Hoặc</span>
                        <div className="h-px bg-gray-300 flex-1" />
                    </div>

                    {/* Social login buttons using Lucide icons */}
                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100"
                        >
                            <LucideGlobe size={18} />
                            Đăng nhập với Google
                        </button>
                        <button
                            type="button"
                            className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100"
                        >
                            <LucideApple size={18} />
                            Đăng nhập với Apple
                        </button>
                        <button
                            type="button"
                            className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100"
                        >
                            <LucideMessageCircle size={18} />
                            Đăng nhập với Zalo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
