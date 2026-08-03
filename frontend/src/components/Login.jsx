import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiMail, FiLock } from "react-icons/fi";
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
    <div className="min-h-screen flex bg-background font-sans overflow-hidden">
      {/* Left Login Form Side */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8 relative animate-fade-in z-10">
        
        {/* Subtle decorative background blur for left side */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow" style={{animationDelay: '1s'}}></div>

        <div className="w-full max-w-md glass p-10 rounded-3xl relative z-10 animate-slide-up">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold mb-2 text-secondary">Welcome Back</h2>
            <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className={`text-xl transition-colors duration-300 ${errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'}`} />
              </div>
              <input
                type="text"
                id="email"
                className={`peer w-full pl-12 pr-4 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${
                  errors.email ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                }`}
                placeholder="Email or Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className={`absolute left-12 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                  peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary
                  ${errors.email ? "text-red-500" : "text-gray-500"}
                `}
              >
                Email or Phone Number
              </label>
              {errors.email && <p className="text-red-500 text-xs font-semibold mt-2 ml-2 animate-fade-in">{errors.email}</p>}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className={`text-xl transition-colors duration-300 ${errors.password ? 'text-red-500' : 'text-gray-400 group-focus-within:text-primary'}`} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`peer w-full pl-12 pr-12 py-4 bg-white/50 border-2 rounded-2xl outline-none transition-all duration-300 placeholder-transparent focus:bg-white focus:shadow-lg ${
                  errors.password ? "border-red-500/50 focus:border-red-500" : "border-transparent focus:border-primary"
                }`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className={`absolute left-12 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold transition-all duration-300 pointer-events-none
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400
                  peer-focus:-top-2.5 peer-focus:text-sm peer-focus:bg-white peer-focus:text-primary
                  ${errors.password ? "text-red-500" : "text-gray-500"}
                `}
              >
                Password
              </label>
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-primary transition-colors duration-200"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
              </div>
              {errors.password && <p className="text-red-500 text-xs font-semibold mt-2 ml-2 animate-fade-in">{errors.password}</p>}
            </div>

            <div className="flex justify-between items-center px-1">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary transition-colors cursor-pointer" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:text-blue-600 hover:underline transition-all">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-2xl hover:shadow-[0_8px_20px_rgba(14,171,235,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-gray-500">
            Don’t have an account?{" "}
            <Link to="/patient-registration" className="text-primary font-bold hover:underline hover:text-blue-600 transition-colors">
              Register Here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-secondary overflow-hidden">
        <SidePanel />
      </div>
    </div>
  );
};

export default Login;
