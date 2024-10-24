import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaFileMedical,
  FaPills,
  FaCalendarAlt,
  FaCommentDots,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../../assets/images/logo.png";
import appointment from "../../assets/images/appointment.png";
import { useBreadcrumb } from "../../context/BreadcrumbContext";


const PatientSidebar = ({ onMenuClick }) => {
  const { updateBreadcrumb } = useBreadcrumb();
  const navigate = useNavigate()

  // State to store the active tab
  const [activeTab, setActiveTab] = useState("Personal Health Record");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleMenuClick = (label, path) => {
    updateBreadcrumb([{ label, path }]);
    setActiveTab(label); // Set the active tab
    if (onMenuClick) onMenuClick(label); // Call onMenuClick if provided
  };

  const menuItems = [
    {
      label: "Personal Health Record",
      path: "/patient",
      icon: FaFileMedical,
    },
    {
      label: "Appointment Booking",
      path: "/patient/appointment-booking",
      icon: FaCalendarAlt,
    },
    {
      label: "Prescription Access",
      path: "/patient/prescription-access",
      icon: FaPills,
    },
    {
      label: "Teleconsultation Access",
      path: "/patient/tele-access",
      icon: FaCommentDots,
    },
    { label: "Chat", path: "/patient/chat", icon: FaCommentDots },
    { label: "Bills", path: "/patient/bills", icon: FaFileInvoiceDollar },
  ];

  return (
    <div className="w-72 bg-white h-full shadow-lg flex flex-col justify-between">
      {/* Logo */}
      <div className="py-2">
        <img src={logo} alt="Hospital Logo" className="w-48 mx-auto mb-4" />
      </div>

      {/* Menu Items */}
      <div className="border-t border-gray-200 mx-5"></div>
      <ul className="mt-5 flex-grow">
        {menuItems.map((item) => (
          <li className="py-2" key={item.label}>
            <NavLink
              to={item.path}
              className={`relative flex items-center px-4 py-4 text-gray-700 font-semibold ${activeTab === item.label
                ? "text-customBlue"
                : "hover:text-customBlue"
                } group`}
              onClick={() => handleMenuClick(item.label, item.path)}
            >
              <item.icon
                className={`mr-3 transition duration-300 z-20 relative ${activeTab === item.label ? "text-customBlue" : "text-gray-500"
                  }`}
              />
              <span className="z-20 relative">{item.label}</span>

              {/* Background Gradient and Clip Path for Active Tab */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#E0F3FB] to-white opacity-0 ${activeTab === item.label
                  ? "opacity-100"
                  : "group-hover:opacity-100"
                  } transition duration-300 z-10`}
              ></div>

              <div
                className={`absolute top-50 right-0 h-10 bg-customBlue ${activeTab === item.label
                  ? "w-2 opacity-100"
                  : "group-hover:w-2 opacity-0"
                  } rounded-tl-lg rounded-bl-lg transition-all duration-300 clip-button z-10`}
              ></div>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Appointment Section */}
      <div className="relative px-5 m-5 bg-gray-100 rounded-2xl">
        <div className="flex justify-center mb-4 relative z-10">
          <img
            src={appointment}
            alt="appointment"
            className="w-48 h-48 -mt-32"
          />
        </div>
        <div className="pb-5 text-center relative z-0">
          <h4 className="mb-2 font-semibold text-lg">Hospital appointment</h4>
          <p className="text-sm text-gray-500 mb-4">
            You have to fill up the form to be admitted to the Hospital.
          </p>
          <NavLink to={'/patient/appointment-booking'}>
            <button className="w-full bg-customBlue text-white py-2 rounded-md">
              Appointment
            </button>
          </NavLink>
        </div>
      </div>

      {/* Logout Section */}
      <div className="mb-5">
        <button
          onClick={handleLogout}
          className="flex items-center w-full py-3 text-red-500 font-semibold bg-red-100 px-6"
        >
          <HiOutlineLogout className="mr-2 text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default PatientSidebar;
