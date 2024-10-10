import React, { useState, useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaCalendarAlt, FaTrashAlt, FaRedoAlt, FaEye } from "react-icons/fa";
import DoctorDetailsSidebar from "../../components/Patient/DoctorDetailsSidebar";

const AppointmentBookingPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [activeTab, setActiveTab] = useState("Scheduled");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Appointment Booking", path: "/patient/appointment-booking" },
    ]);
  }, [updateBreadcrumb]);

  const appointments = [
    {
      doctor: "Dr. Nolan George",
      specialization: "General Physician",
      hospital: "Shambhu Hospital",
      qualification: "MBBS",
      experience: 10,
      contactNumber: "995796557",
      profileImage: "path-to-image",
      description: "Specializes in general health issues.",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      issue: "Feeling Tired",
      status: "Scheduled",
    },
    // Additional appointment objects...
  ];

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab
  );

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsSidebarVisible(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg m-6 h-full">
      {/* Tabs for Appointment Types */}
      <div className="flex space-x-4 border-b mb-4">
        {["Scheduled", "Previous", "Canceled", "Pending"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 focus:outline-none font-medium ${
              activeTab === tab
                ? "border-b-4 border-customBlue text-customBlue"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Appointment
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Appointment</h2>
        <button className="flex items-center space-x-2 bg-customBlue text-white px-4 py-2 rounded">
          <FaCalendarAlt />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Appointment List */}
      <div className="grid grid-cols-4 gap-4 overflow-y-auto custom-scroll">
        {filteredAppointments.map((appointment, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md bg-white transition"
          >
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-lg">
              <h4 className="font-semibold ">{appointment.doctor}</h4>
              <div
                className="text-customBlue p-2 rounded-lg bg-white shadow cursor-pointer"
                onClick={() => handleViewDetails(appointment)}
              >
                <FaEye />
              </div>
            </div>
            {/* Card body with appointment details */}
            <div className="p-4 text-sm text-gray-700 space-y-1">
              <p className="flex justify-between items-center text-yellow-500 pb-2">
                <span className="font-semibold text-gray-500">
                  Appointment Type
                </span>{" "}
                {appointment.type}
              </p>
              <p className="flex justify-between items-center pb-2">
                <span className="font-semibold text-gray-500">
                  Hospital Name
                </span>{" "}
                {appointment.hospital}
              </p>
              <p className="flex justify-between items-center pb-2">
                <span className="font-semibold text-gray-500">
                  Appointment Date
                </span>{" "}
                {appointment.date}
              </p>
              {appointment.status === "Canceled" && (
                <p className="flex justify-between items-center pb-2">
                  <span className="font-semibold text-gray-500">
                    Cancel Date
                  </span>{" "}
                  {appointment.cancelDate}
                </p>
              )}
              <p className="flex justify-between items-center pb-2">
                <span className="font-semibold text-gray-500">
                  Appointment Time
                </span>{" "}
                {appointment.time}
              </p>
              <p className="flex justify-between items-center pb-2">
                <span className="font-semibold text-gray-500">
                  Patient Issue
                </span>{" "}
                {appointment.issue}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between space-x-2 p-4 bg-white rounded-b-lg">
              {activeTab === "Scheduled" || activeTab === "Pending" ? (
                <>
                  <button className="flex items-center justify-center space-x-1 border-2 px-3 py-2 rounded-md text-gray-600 w-1/2 ">
                    <FaTrashAlt />
                    <span>Cancel</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 bg-customBlue px-3 py-2 rounded-md text-white w-1/2 ">
                    <FaRedoAlt />
                    <span>Reschedule</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Details Sidebar */}
      {selectedDoctor && (
        <DoctorDetailsSidebar
          doctor={selectedDoctor}
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
      )}
    </div>
  );
};

export default AppointmentBookingPage;
