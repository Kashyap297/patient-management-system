import React, { useState } from "react";
import { Collapse } from "@mui/material";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { ReactComponent as DashboardIcon } from "../assets/images/Dashboard.svg";
import { ReactComponent as DoctorManagementIcon } from "../assets/images/DoctorManagement.svg";
import { ReactComponent as VectorIcon } from "../assets/images/Vector.svg";
import { ReactComponent as ReportIcon } from "../assets/images/Report.svg";
import { ReactComponent as BilingIcon } from "../assets/images/Billing.svg";
import { ReactComponent as ChatIcon } from "../assets/images/Chaticon.svg";
import { ReactComponent as PrescriptioniconIcon } from "../assets/images/Prescriptionicon.svg";
import { ReactComponent as PatientRecordIcon } from "../assets/images/PatientRecord.svg";
import { ReactComponent as TeleAccessIcon } from "../assets/images/TeleAccess.svg";
import { ReactComponent as calendariconIcon } from "../assets/images/calendaricon.svg";
import { ReactComponent as PatientBillIcon } from "../assets/images/PatientBill.svg";
import { ReactComponent as TelePatientIcon } from "../assets/images/TelePatient.svg";
import { ReactComponent as appPatientIcon } from "../assets/images/appPatient.svg";
import { ReactComponent as healthIcon } from "../assets/images/health.svg";
import appointment from "../assets/images/appointment.png";
import toast from "react-hot-toast";

const Sidebar = ({ role, onLogout, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [openBilling, setOpenBilling] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const tabs = {
    admin: [
      {
        label: "Dashboard",
        icon: DashboardIcon,
        path: "/admin/dashboard",
      },
      {
        label: "Doctor Management",
        icon: DoctorManagementIcon,
        path: "/admin/doctor-management",
      },
      {
        label: "Patient Management",
        icon: VectorIcon,
        path: "/admin/patient-management",
      },
      {
        label: "Billing And Payments",
        icon: BilingIcon,
        subMenu: [
          { label: "Monitor Billing", path: "/admin/monitor-billing" },
          { label: "Insurance Claims", path: "/admin/insurance-claims" },
          { label: "Payment Process", path: "/admin/payment-process" },
        ],
      },
      {
        label: "Reporting And Analytics",
        icon: ReportIcon,
        path: "/admin/analytics",
      },
    ],
    doctor: [
      {
        label: "Appointment Management",
        icon: calendariconIcon,
        path: "/doctor/appointment-management",
      },
      {
        label: "Patient Record Access",
        icon: PatientRecordIcon,
        path: "/doctor/patient-record-access",
      },
      {
        label: "Prescription Tools",
        icon: PrescriptioniconIcon,
        subMenu: [
          { label: "Create", path: "/doctor/prescription-tools/create" },
          { label: "Manage", path: "/doctor/prescription-tools/manage" },
        ],
      },
      {
        label: "Teleconsultation",
        icon: TeleAccessIcon,
        path: "/doctor/teleconsultation",
      },
      { label: "Chat", icon: ChatIcon, path: "/doctor/doctor-chat" },
    ],
    patient: [
      { label: "Personal Health Record", icon: healthIcon, path: "/patient" },
      {
        label: "Appointment Booking",
        icon: appPatientIcon,
        path: "/patient/appointment-booking",
      },
      {
        label: "Prescription Access",
        icon: PrescriptioniconIcon,
        path: "/patient/prescription-access",
      },
      {
        label: "Teleconsultation Access",
        icon: TelePatientIcon,
        path: "/patient/tele-access",
      },
      { label: "Chat", icon: ChatIcon, path: "/patient/chat" },
      { label: "Bills", icon: PatientBillIcon, path: "/patient/bills" },
    ],
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
    navigate("/");
    toast.success("Logout successfully!");
  };

  const handleMenuClick = (path, label) => {
    setActiveTab(label);
    if (path) navigate(path);
    setIsSidebarOpen(false);
  };

  const handleToggleBilling = () => {
    setOpenBilling(!openBilling);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-72 bg-white h-full flex flex-col justify-between`}
      >
        {/* Logo Section */}
        <div className="py-4 flex items-center justify-center md:justify-start md:px-6 m-auto">
          <img src={logo} alt="Hospital Logo" className="w-40 md:w-48" />
        </div>

        {/* Menu Items */}
        <ul className="flex-grow">
          {tabs[role].map((item, index) => (
            <li key={index} className="py-2">
              {!item.subMenu ? (
                <NavLink
                  to={item.path}
                  className={`relative flex items-center w-full px-6 py-4 font-semibold ${
                    activeTab === item.label
                      ? "text-[#0EABEB]"
                      : "hover:text-[#0EABEB] text-[#818194]"
                  }`}
                  onClick={() => handleMenuClick(item.path, item.label)}
                >
                  {/* Conditionally apply color for SVG icons based on active tab */}
                  {item.icon === DashboardIcon ||
                  item.icon === DoctorManagementIcon ? (
                    <item.icon
                      className="mr-3 transition duration-300 z-20 relative"
                      style={{
                        fill: activeTab === item.label ? "#0EABEB" : "#818194",
                      }}
                    />
                  ) : (
                    <item.icon
                      className={`mr-3 transition duration-300 z-20 relative ${
                        activeTab === item.label
                          ? "text-[#0EABEB]"
                          : "text-[#818194]"
                      }`}
                    />
                  )}
                  <span className="relative z-20">{item.label}</span>

                  {/* Active Tab Background & Border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#E0F3FB] to-white opacity-0 ${
                      activeTab === item.label
                        ? "opacity-100"
                        : "group-hover:opacity-100"
                    } transition duration-300 z-10`}
                  ></div>
                  <div
                    className={`absolute top-0 right-0 h-10 bg-[#0EABEB] ${
                      activeTab === item.label
                        ? "w-2 opacity-100"
                        : "group-hover:w-2 opacity-0"
                    } rounded-tl-lg rounded-bl-lg transition-all duration-300 z-10`}
                  ></div>
                </NavLink>
              ) : (
                <div>
                  <button
                    onClick={handleToggleBilling}
                    className={`flex items-center w-full px-6 py-4 font-semibold ${
                      openBilling
                        ? "text-[#0EABEB]"
                        : "hover:text-[#0EABEB] text-[#818194]"
                    }`}
                  >
                    <item.icon
                      className={`mr-4 ${
                        openBilling ? "text-[#0EABEB]" : "text-[#818194]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                  <Collapse in={openBilling} timeout="auto" unmountOnExit>
                    <ul>
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            className={`relative flex items-center w-full pl-12 py-3 font-semibold ${
                              activeTab === subItem.label
                                ? "text-[#0EABEB]"
                                : "hover:text-[#0EABEB] text-[#818194]"
                            }`}
                            onClick={() =>
                              handleMenuClick(subItem.path, subItem.label)
                            }
                          >
                            <span className="relative z-20">
                              {subItem.label}
                            </span>
                            {/* Active Tab Background & Border */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r from-[#E0F3FB] to-white opacity-0 ${
                                activeTab === subItem.label ? "opacity-100" : "group-hover:opacity-100"
                              } transition duration-300 z-10`}
                            ></div>
                            <div
                              className={`absolute top-0 right-0 h-10 bg-[#0EABEB] ${
                                activeTab === subItem.label ? "w-2 opacity-100" : "group-hover:w-2 opacity-0"
                              } rounded-tl-lg rounded-bl-lg transition-all duration-300 z-10`}
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

        {/* Add the Hospital Appointment section for patient role */}
        {role === "patient" && (
          <div className="relative px-5 m-5 bg-gray-100 rounded-2xl">
            <div className="flex justify-center mb-2 relative z-10">
              <img
                src={appointment}
                alt="appointment"
                className="w-30 h-30 -mt-32"
              />
            </div>
            <div className="pb-5 text-center relative z-0">
              <h4 className="mb-2 font-semibold text-lg">
                Hospital appointment
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                You have to fill up the form to be admitted to the Hospital.
              </p>
              <NavLink to={"/patient/appointment-booking"}>
                <button className="w-full bg-customBlue text-white py-2 rounded-md">
                  Appointment
                </button>
              </NavLink>
            </div>
          </div>
        )}

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

      {/* Overlay for sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
