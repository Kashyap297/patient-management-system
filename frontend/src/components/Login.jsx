import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";
import { Activity } from "lucide-react"; // Using Lucide for a medical heartbeat icon
import SidePanel from "./SidePanel";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = ({ setIsAuthenticated }) => {
  const { loginUser, authError } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    setErrors({});

    if (!email) validationErrors.email = "Email or Phone is required.";
    if (!password) validationErrors.password = "Password is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const { token, role } = await loginUser({ email, password });
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        toast.success("Login successful!");
        if (role === "admin") navigate("/admin/dashboard");
        else if (role === "doctor") navigate("/doctor");
        else if (role === "patient") navigate("/patient");
        else navigate("/home");
      } catch (error) {
        toast.error("Login failed. Please try again.");
        setErrors({ password: authError || "Login failed, try again" });
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F4F7FE] font-sans overflow-hidden">
      {/* Left Login Form Side */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 relative animate-fade-in z-10">
        
        {/* Subtle decorative background blur for left side */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse-slow" style={{animationDelay: '1s'}}></div>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 relative z-10 animate-slide-up hover:shadow-[0_8px_40px_rgb(14,171,235,0.08)] transition-shadow duration-500">
          
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-blue-50 text-customBlue rounded-2xl">
              <Activity size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-[#1C1F2E] tracking-tight">Welcome Back</h2>
              <p className="text-gray-500 font-medium text-sm mt-1">Please enter your details to sign in.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <FiMail className={`text-xl transition-colors duration-300 ${errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-customBlue'}`} />
              </div>
              <input
                type="text"
                id="email"
                className={`peer w-full pl-14 pr-4 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-[0_0_15px_rgba(14,171,235,0.15)] ${
                  errors.email ? "border-red-500/50 focus:border-red-500" : "border-gray-200 focus:border-customBlue"
                }`}
                placeholder="Email or Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className={`absolute left-14 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                  peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-customBlue
                  ${errors.email ? "text-red-500" : "text-gray-500"}
                `}
              >
                Email or Phone Number
              </label>
              {errors.email && <p className="text-red-500 text-xs font-semibold mt-2 ml-2 animate-fade-in">{errors.email}</p>}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <FiLock className={`text-xl transition-colors duration-300 ${errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-customBlue'}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`peer w-full pl-14 pr-12 py-4 bg-gray-50/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-[0_0_15px_rgba(14,171,235,0.15)] ${
                  errors.password ? "border-red-500/50 focus:border-red-500" : "border-gray-200 focus:border-customBlue"
                }`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className={`absolute left-14 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                  peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-customBlue
                  ${errors.password ? "text-red-500" : "text-gray-500"}
                `}
              >
                Password
              </label>
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-customBlue transition-colors duration-200"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </div>
              {errors.password && <p className="text-red-500 text-xs font-semibold mt-2 ml-2 animate-fade-in">{errors.password}</p>}
            </div>

            <div className="flex justify-between items-center px-1">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-customBlue focus:ring-customBlue transition-colors cursor-pointer" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-customBlue transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-customBlue hover:text-blue-600 hover:underline transition-all">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-customBlue to-blue-600 text-white font-bold rounded-2xl shadow-md hover:shadow-[0_8px_20px_rgba(14,171,235,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            Don’t have an account?{" "}
            <Link to="/patient-registration" className="text-customBlue font-bold hover:underline hover:text-blue-600 transition-colors">
              Register Here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0E1525] overflow-hidden">
        <SidePanel />
      </div>
    </div>
  );
};

export default Login;
