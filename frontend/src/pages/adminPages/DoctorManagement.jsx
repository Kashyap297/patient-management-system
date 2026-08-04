import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FaEye, FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import { FiClock, FiActivity } from "react-icons/fi";
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
    <div className="h-full flex flex-col relative font-sans animate-slide-up overflow-hidden -m-5 p-5">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>

      <div className="glass shadow-sm p-6 md:p-8 rounded-3xl relative z-10 flex flex-col flex-1">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight md:ml-3">Doctor Management</h2>
            <p className="text-sm text-gray-500 md:ml-3 mt-1">Manage all registered doctors in your hospital.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 w-full md:w-72 border border-white/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-within:shadow-md focus-within:bg-white transition-all duration-300">
              <FaSearch className="text-gray-400 text-lg mr-3" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm font-medium"
              />
            </div>
            <Link
              to="/admin/add-new-doctor"
              className="w-full sm:w-auto bg-[#10b981] hover:bg-[#059669] text-white px-5 py-3 rounded-2xl font-bold transition-all duration-300 shadow-sm shadow-[#10b981]/30 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <FaPlus className="text-sm" />
              <span>Add New Doctor</span>
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto max-h-[620px] no-scrollbar flex-1 pb-6 mb-4">
          <table className="min-w-full text-left table-auto border-separate border-spacing-y-3">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-l-2xl whitespace-nowrap">Doctor Profile</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Gender</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Qualification</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Specialty</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Working Time</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Check-Up Time</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Break Time</th>
                <th className="p-4 pr-8 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-r-2xl whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4"><Skeleton height={40} className="rounded-xl" /></td>
                    <td className="px-6 py-4"><Skeleton width={60} height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width={80} height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width={100} height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width={120} height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width={120} height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width={120} height={20} /></td>
                    <td className="px-6 py-4"><Skeleton width={100} height={30} /></td>
                  </tr>
                ))
              ) : filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <tr key={doctor._id} className="bg-white/50 hover:bg-white shadow-sm hover:shadow transition-all duration-300 group">
                    <td className="p-4 rounded-l-2xl whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                          <img
                            src={doctor.profileImage ? `${doctor.profileImage}` : userImage}
                            alt="Doctor"
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm relative z-10"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">{`${doctor.firstName} ${doctor.lastName}`}</p>
                          <p className="text-xs text-gray-500 font-medium">ID: {doctor._id.substring(0, 6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${doctor.gender === 'Female' ? 'bg-pink-50 text-pink-600 border-pink-100' : doctor.gender === 'Male' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                        {doctor.gender}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-700">{doctor.doctorDetails.qualification || "N/A"}</span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <FiActivity className="text-blue-500" />
                        {doctor.doctorDetails.specialtyType || "N/A"}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-bold bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100/50 w-max">
                        <FiClock className="text-gray-400" />
                        {doctor.doctorDetails.workingHours?.workingTime || "N/A"}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-bold bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100/50 w-max">
                        <FiClock className="text-gray-400" />
                        {doctor.doctorDetails.workingHours?.checkupTime || "N/A"}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-bold bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100/50 w-max">
                        <FiClock className="text-gray-400" />
                        {doctor.doctorDetails.workingHours?.breakTime || "N/A"}
                      </div>
                    </td>
                    <td className="p-4 rounded-r-2xl whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleViewClick(doctor)}
                          className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
                          title="View"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <Link
                          to={`/admin/edit-doctor/${doctor._id}`}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <FaEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(doctor._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <img src={noRecordImage} alt="No Records" className="w-12 opacity-50" />
                      </div>
                      <p className="text-gray-500 font-medium">No doctors found in the system</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm z-50 p-4 transition-all">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl border border-gray-100 transform transition-all animate-slide-up relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <div className="flex flex-col items-center mt-2">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <FaTrash className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Doctor?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                Are you sure you want to remove this doctor? All of their data will be permanently deleted.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-red-500/30"
                >
                  Yes, Delete
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
