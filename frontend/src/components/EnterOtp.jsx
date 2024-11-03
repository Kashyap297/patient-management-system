import React, { useContext, useState } from "react";
import logoBanner from "../assets/images/loginBanner.png";
import logo from "../assets/images/logo.png";
import vector1 from "../assets/images/Vector1.png";
import vector2 from "../assets/images/Vector2.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const EnterOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errors, setErrors] = useState("");
  const { verifyOtp, authError, requestOtp } = useContext(AuthContext);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 6) {
      setErrors("Please enter a valid 6-digit OTP.");
    } else {
      setErrors("");
      try {
        const email = localStorage.getItem("email");
        const response = await verifyOtp({ otp: otpString, email });

        if (response.status === 200) {
          navigate("/reset-password");
        } else {
          setErrors(authError || "Invalid or expired OTP");
        }
      } catch (error) {
        setErrors(authError || "Invalid or expired OTP");
      }
    }
  };

  const handleResendOtp = async () => {
    setOtp(new Array(6).fill(""));
    setTimer(30);
    const email = localStorage.getItem("email");
    try {
      await requestOtp({ email });
      alert("OTP resent to your email/phone");
    } catch (error) {
      setErrors("Failed to resend OTP. Please try again.");
    }
  };

  React.useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex justify-center items-center bg-white p-10">
        <div className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Enter OTP</h2>
          <p className="mb-4 text-sm">
            Please enter the 6-digit code that was sent to your phone number.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-4">
              {otp.map((data, index) => (
                <input
                  className={`w-12 h-12 text-center border rounded-md focus:outline-none ${errors || timer === 0 ? "border-red-500 text-red-500" : "border-gray-300 text-black"}`}
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            {errors && <p className="text-red-500 text-sm mb-2">{errors}</p>}

            <div className="flex justify-between items-center mb-4">
              <span className={`text-sm ${timer > 0 ? "text-gray-500" : "text-red-500"}`}>
                {timer > 0 ? `⏱ ${timer} sec` : "OTP expired"}
              </span>
              {timer === 0 && (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#f6f8fb] text-[#4f4f4f] hover:text-white rounded-md hover:bg-[#0eabeb] transition duration-200"
            >
              Verify
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-gray-100 relative flex justify-center items-center">
        <img
          src={vector1}
          alt="Vector Top Left"
          className="absolute top-0 left-0 w-50 h-60"
        />
        <img
          src={vector2}
          alt="Vector Bottom Right"
          className="absolute bottom-0 right-0 w-50 h-60"
        />
        <div className="text-center">
          <img src={logo} alt="Logo" className="mb-4 mx-auto w-60 h-30" />
          <img
            src={logoBanner}
            alt="Banner"
            className="w-full max-w-lg mx-auto"
          />
          <h2 className="text-4xl font-bold mt-4">Hospital</h2>
          <p className="text-gray-600 mt-2 font-semibold">
            Stay connected with your hospital and manage your appointments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnterOTP;
