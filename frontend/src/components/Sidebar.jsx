import React, { useState } from "react";
import { Collapse } from "@mui/material";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate, NavLink } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
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
        label: "Dashboards",
        icon: DashboardIcon,
        path: "/admin/dashboard",
      },
      {
        label: "Appointments",
        icon: calendariconIcon,
        path: "/admin/appointments",
      },
      {
        label: "Patient Flow",
        icon: VectorIcon,
        path: "/admin/patient-management",
      },
      {
        label: "Doctor Availability",
        icon: DoctorManagementIcon,
        path: "/admin/doctor-management",
      },
      {
        label: "Performance Reports",
        icon: ReportIcon,
        path: "/admin/analytics",
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
    if (path && path !== "#") navigate(path);
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
        } md:translate-x-0 w-64 md:w-[280px] bg-white h-full flex flex-col border-r border-gray-100 font-sans`}
      >
        {/* Logo Section */}
        <div className="py-6 flex items-center justify-center md:justify-start md:px-8">
          <div className="flex items-center gap-2">
            <FaHeartbeat className="text-[#10b981] text-2xl" />
            <span className="text-xl font-bold text-gray-800 tracking-tight">VitalsHub</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-grow px-4 mt-2 overflow-y-auto custom-scroll flex flex-col">
          <span className="px-4 text-xs font-semibold text-gray-400 mb-2 tracking-wider">Basics</span>
          <ul className="space-y-1">
            {tabs[role].map((item, index) => {
              const isActive = activeTab === item.label;
              return (
                <li key={index} className="relative">
                  {!item.subMenu ? (
                    <NavLink
                      to={item.path}
                      className={`relative flex items-center w-full px-4 py-3 rounded-xl font-medium transition-colors ${
                        isActive
                          ? "bg-[#ecfdf5] text-[#10b981]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => handleMenuClick(item.path, item.label)}
                    >
                      <item.icon
                        className={`mr-3 w-5 h-5 transition-colors ${
                          isActive ? "text-[#10b981] fill-[#10b981]" : "text-gray-500 fill-gray-500"
                        }`}
                      />
                      <span className="text-sm tracking-wide">{item.label}</span>
                    </NavLink>
                  ) : (
                    <div className="bg-transparent rounded-xl transition-all overflow-hidden">
                      <button
                        onClick={handleToggleBilling}
                        className={`flex items-center w-full px-4 py-3 rounded-xl font-medium transition-colors ${
                          openBilling || activeTab?.includes(item.label)
                            ? "bg-[#ecfdf5] text-[#10b981]"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <item.icon
                          className={`mr-3 w-5 h-5 transition-colors ${
                            openBilling || activeTab?.includes(item.label)
                              ? "text-[#10b981] fill-[#10b981]"
                              : "text-gray-500 fill-gray-500"
                          }`}
                        />
                        <span className="text-sm tracking-wide">{item.label}</span>
                        <AiOutlineDown
                          className={`ml-auto transition-transform ${openBilling ? "rotate-180" : ""}`}
                        />
                      </button>
                      <Collapse in={openBilling} timeout="auto" unmountOnExit>
                        <ul className="mt-1 space-y-1 pl-4 border-l border-gray-200 ml-6 mb-2">
                          {item.subMenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavLink
                                to={subItem.path}
                                className={`flex items-center w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                                  activeTab === subItem.label
                                    ? "bg-[#ecfdf5] text-[#10b981]"
                                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                                }`}
                                onClick={() => handleMenuClick(subItem.path, subItem.label)}
                              >
                                <span className="text-sm">{subItem.label}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </Collapse>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Bottom "Others" Section */}
          <div className="mt-auto pt-6 pb-6 border-t border-gray-100 hidden md:block">
            <span className="px-4 text-xs font-semibold text-gray-400 mb-2 block tracking-wider">Others</span>
            <ul className="space-y-1">

              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  <HiOutlineLogout className="mr-3 w-5 h-5" />
                  <span className="text-sm tracking-wide">Logout</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Add the Hospital Appointment section for patient role */}
          {role === "patient" && (
            <div className="relative px-5 my-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex justify-center mb-2 relative z-10">
                <img
                  src={appointment}
                  alt="appointment"
                  className="w-24 h-24 -mt-12"
                />
              </div>
              <div className="pb-4 text-center relative z-0">
                <h4 className="mb-1 font-semibold text-sm text-gray-800">
                  Hospital appointment
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  You have to fill up the form to be admitted to the Hospital.
                </p>
                <NavLink to={"/patient/appointment-booking"}>
                  <button className="w-full bg-[#10b981] hover:bg-green-600 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                    Appointment
                  </button>
                </NavLink>
              </div>
            </div>
          )}

          {/* Logout Button (Mobile Only since "Others" took bottom space) */}
          <div className="mt-2 mb-4 md:hidden">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors"
            >
              <HiOutlineLogout className="mr-3 w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar on small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
