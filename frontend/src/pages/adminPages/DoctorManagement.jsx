import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FaEye, FaEdit, FaTrash, FaSearch, FaUserPlus } from "react-icons/fa";
import DoctorOffCanvas from "../../components/DoctorOffCanvas";
import api from "../../api/api";
import noRecordImage from "../../assets/images/Frame 1116602772.png";
import userImage from "../../assets/images/user.png";
import "react-loading-skeleton/dist/skeleton.css";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/users/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsOffCanvasOpen(true);
  };

  const handleCloseOffCanvas = () => {
    setIsOffCanvasOpen(false);
    setSelectedDoctor(null);
  };

  const handleDeleteClick = (doctorId) => {
    setDoctorToDelete(doctorId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDoctorToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!doctorToDelete) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/users/doctors/${doctorToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorToDelete));
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.firstName} ${doctor.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-100">
      <div className="bg-white p-4 md:p-6 rounded-xl h-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-semibold text-center md:text-left">Doctor Management</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 space-x-2 w-full md:w-auto">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search Doctor"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-100 focus:outline-none w-full"
              />
            </div>
            <Link
              to="/admin/add-new-doctor"
              className="bg-customBlue text-white px-4 py-2 rounded-xl flex items-center space-x-2"
            >
              <FaUserPlus className="text-white" />
              <span>Add New Doctor</span>
            </Link>
          </div>
        </div>

        {/* Responsive Table Wrapper with Vertical and Horizontal Scrollbar */}
        <div className="overflow-x-auto max-h-[580px] custom-scroll">
          <table className="w-full bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100 sticky top-0 z-10">
                <th className="px-3 md:px-6 py-3 text-left text-gray-600 font-semibold">Doctor Name</th>
                <th className="px-3 md:px-6 py-3 text-left text-gray-600 font-semibold">Gender</th>
                <th className="px-3 md:px-6 py-3 text-left text-gray-600 font-semibold">Qualification</th>
                <th className="px-3 md:px-6 py-3 text-left text-gray-600 font-semibold">Specialty</th>
                <th className="px-3 md:px-6 py-3 text-left text-gray-600 font-semibold">Working Time</th>
                <th className="px-3 md:px-6 py-3 text-left text-gray-600 font-semibold">Check-Up Time</th>
                <th className="px-3 md:px-6 py-3 text-left text-gray-600 font-semibold">Break Time</th>
                <th className="px-3 md:px-6 py-3 text-center text-gray-600 font-semibold">Action</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-3 md:px-6 py-4"><Skeleton height={40} /></td>
                    <td className="px-3 md:px-6 py-4"><Skeleton width={80} height={20} /></td>
                    <td className="px-3 md:px-6 py-4"><Skeleton width={80} height={20} /></td>
                    <td className="px-3 md:px-6 py-4"><Skeleton width={100} height={20} /></td>
                    <td className="px-3 md:px-6 py-4 text-center"><Skeleton width={80} height={20} /></td>
                    <td className="px-3 md:px-6 py-4 text-center"><Skeleton width={100} height={20} /></td>
                    <td className="px-3 md:px-6 py-4 text-center"><Skeleton width={80} height={20} /></td>
                    <td className="px-3 md:px-6 py-4 text-center"><Skeleton width={120} height={40} /></td>
                  </tr>
                ))}
              </tbody>
            ) : filteredDoctors.length > 0 ? (
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id} className="border-b">
                    <td className="px-3 md:px-6 py-4 flex items-center space-x-3">
                      <img
                        src={doctor.profileImage ? `https://patient-management-system-vyv0.onrender.com/${doctor.profileImage}` : userImage}
                        alt="Doctor"
                        className="w-10 h-10 rounded-full"
                      />
                      <span>{`${doctor.firstName} ${doctor.lastName}`}</span>
                    </td>
                    <td className="px-3 md:px-6 py-4"><span className="bg-blue-100 text-blue-600 px-2 md:px-3 py-1 rounded-full text-sm">{doctor.gender}</span></td>
                    <td className="px-3 md:px-6 py-4">{doctor.doctorDetails.qualification || "N/A"}</td>
                    <td className="px-3 md:px-6 py-4">{doctor.doctorDetails.specialtyType || "N/A"}</td>
                    <td className="px-3 md:px-6 py-4 text-center"><span className="bg-blue-100 text-blue-600 px-2 md:px-3 py-1 rounded-full text-sm">{doctor.doctorDetails.workingHours?.workingTime || "N/A"}</span></td>
                    <td className="px-3 md:px-6 py-4 text-center"><span className="bg-blue-100 text-blue-600 px-2 md:px-3 py-1 rounded-full text-sm">{doctor.doctorDetails.workingHours?.checkupTime || "N/A"}</span></td>
                    <td className="px-3 md:px-6 py-4 text-center"><span className="bg-blue-100 text-blue-600 px-2 md:px-3 py-1 rounded-full text-sm">{doctor.doctorDetails.workingHours?.breakTime || "N/A"}</span></td>
                    <td className="px-3 md:px-6 py-4 text-xl text-center">
                      <div className="flex items-center justify-center space-x-2 md:space-x-4">
                        <button
                          onClick={() => handleViewClick(doctor)}
                          className="text-customBlue bg-gray-100 p-1 md:p-2 rounded-xl"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <Link
                          to={`/admin/edit-doctor/${doctor._id}`}
                          className="text-green-500 hover:text-green-600 bg-gray-100 p-1 md:p-2 rounded-xl"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(doctor._id)}
                          className="text-red-500 hover:text-red-600 bg-gray-100 p-1 md:p-2 rounded-xl"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center py-8 md:py-16">
                    <div className="flex flex-col items-center">
                      <img
                        src={noRecordImage}
                        alt="No Doctor Found"
                        className="w-32 md:w-48 mb-4"
                      />
                      <p className="text-gray-500">No Doctors Found</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* OffCanvas Component */}
      <DoctorOffCanvas
        doctor={selectedDoctor}
        isOpen={isOffCanvasOpen}
        onClose={handleCloseOffCanvas}
      />

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-xl w-80 p-6 relative shadow-lg border-t-8 border-[#e11d29]">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#e11d29] rounded-full w-16 h-16 flex items-center justify-center">
              <i className="text-white text-3xl">🗑️</i>
            </div>
            <div className="text-center mt-8">
              <h2 className="text-lg font-bold text-[#030229] mb-2">
                Delete Doctor Details?
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this doctor details?
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-700 px-4 py-2 rounded-xl w-full hover:bg-[#f6f8fb] border"
                >
                  No
                </button>
                <button
                  onClick={handleConfirmDelete}
                  type="submit"
                  className="bg-[#f6f8fb] text-[#4F4F4F] px-4 py-2 rounded-xl hover:text-white hover:bg-[#0EABEB] w-full"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;
