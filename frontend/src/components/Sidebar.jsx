import React, { useState } from "react";
import { Collapse } from "@mui/material";
import {
  FaUserMd,
  FaUserInjured,
  FaFileInvoiceDollar,
  FaChartBar,
  FaCalendarAlt,
  FaCommentDots,
  FaFileMedical,
  FaPills,
} from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Sidebar = ({ role, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openBilling, setOpenBilling] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const tabs = {
    admin: [
      { label: "Dashboard", icon: FaChartBar, path: "/admin/dashboard" },
      { label: "Doctor Management", icon: FaUserMd, path: "/admin/doctor-management" },
      { label: "Patient Management", icon: FaUserInjured, path: "/admin/patient-management" },
      {
        label: "Billing And Payments", icon: FaFileInvoiceDollar, subMenu: [
          { label: "Monitor Billing", path: "/admin/monitor-billing" },
          { label: "Insurance Claims", path: "/admin/insurance-claims" },
          { label: "Payment Process", path: "/admin/payment-process" },
        ]
      },
      { label: "Reporting And Analytics", icon: FaChartBar, path: "/admin/analytics" },
    ],
    doctor: [
      { label: "Appointment Management", icon: FaCalendarAlt, path: "/doctor/appointment-management" },
      { label: "Patient Record Access", icon: FaFileMedical, path: "/doctor/patient-record-access" },
      {
        label: "Prescription Tools", icon: FaPills, subMenu: [
          { label: "Create", path: "/doctor/prescription-tools/create" },
          { label: "Manage", path: "/doctor/prescription-tools/manage" },
        ]
      },
      { label: "Teleconsultation", icon: FaCommentDots, path: "/doctor/teleconsultation" },
      { label: "Chat", icon: FaCommentDots, path: "/doctor/doctor-chat" },
    ],
    patient: [
      { label: "Personal Health Record", icon: FaFileMedical, path: "/patient" },
      { label: "Appointment Booking", icon: FaCalendarAlt, path: "/patient/appointment-booking" },
      { label: "Prescription Access", icon: FaPills, path: "/patient/prescription-access" },
      { label: "Teleconsultation Access", icon: FaCommentDots, path: "/patient/tele-access" },
      { label: "Chat", icon: FaCommentDots, path: "/patient/chat" },
      { label: "Bills", icon: FaFileInvoiceDollar, path: "/patient/bills" },
    ],
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    navigate("/");
  };

  const handleMenuClick = (path, label) => {
    setActiveTab(label);
    if (path) navigate(path);
  };

  const handleToggleBilling = () => {
    setOpenBilling(!openBilling);
  };

  return (
    <div className="w-72 bg-white h-full shadow-lg flex flex-col justify-between">
      {/* Logo Section */}
      <div className="py-4">
        <img src={logo} alt="Hospital Logo" className="w-48 mx-auto mb-4" />
      </div>

      {/* Menu Items */}
      <ul className="flex-grow">
        {tabs[role].map((item, index) => (
          <li key={index} className="py-2">
            {!item.subMenu ? (
              <NavLink
                to={item.path}
                className={`relative flex items-center w-full px-6 py-4 text-gray-700 font-semibold ${activeTab === item.label ? "text-customBlue" : "hover:text-customBlue"}`}
                onClick={() => handleMenuClick(item.path, item.label)}
              >
                <item.icon
                  className={`mr-3 transition duration-300 z-20 relative ${activeTab === item.label ? "text-customBlue" : "text-gray-500"
                    }`}
                />
                <span className="relative z-20">{item.label}</span>

                {/* Active Tab Background & Border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#E0F3FB] to-white opacity-0 ${activeTab === item.label ? "opacity-100" : "group-hover:opacity-100"} transition duration-300 z-10`}
                ></div>
                <div
                  className={`absolute top-0 right-0 h-10 bg-customBlue ${activeTab === item.label ? "w-2 opacity-100" : "group-hover:w-2 opacity-0"} rounded-tl-lg rounded-bl-lg transition-all duration-300 z-10`}
                ></div>
              </NavLink>
            ) : (
              <div>
                <button
                  onClick={handleToggleBilling}
                  className={`flex items-center w-full px-6 py-4 text-gray-700 font-semibold ${openBilling ? "text-customBlue" : "hover:text-customBlue"}`}
                >
                  <item.icon className={`mr-4 ${openBilling ? "text-customBlue" : "text-gray-500"}`} />
                  <span>{item.label}</span>
                </button>
                <Collapse in={openBilling} timeout="auto" unmountOnExit>
                  <ul>
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={subItem.path}
                          className={`relative flex items-center w-full pl-12 py-3 text-gray-700 font-semibold ${activeTab === subItem.label ? "text-customBlue" : "hover:text-customBlue"}`}
                          onClick={() => handleMenuClick(subItem.path, subItem.label)}
                        >
                          <span className="relative z-20">{subItem.label}</span>
                          {/* Active Tab Background & Border */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r from-[#E0F3FB] to-white opacity-0 ${activeTab === subItem.label ? "opacity-100" : "group-hover:opacity-100"} transition duration-300 z-10`}
                          ></div>
                          <div
                            className={`absolute top-0 right-0 h-10 bg-customBlue ${activeTab === subItem.label ? "w-2 opacity-100" : "group-hover:w-2 opacity-0"} rounded-tl-lg rounded-bl-lg transition-all duration-300 z-10`}
                          ></div>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Appointment Section */}

      {/* <div className="relative px-5 m-5 bg-gray-100 rounded-2xl">
        <div className="flex justify-center mb-4 relative z-10">
          <img src={appointment} alt="appointment" className="w-48 h-48 -mt-32" />
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
      </div> */}
      {/* Logout Button */}
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

export default Sidebar;
