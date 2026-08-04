import React, { useEffect, useState } from "react";
import { FaEye, FaSearch, FaUserInjured } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import api from "../api/api";
import noRecordImage from "../assets/images/NoPatient.png";
import "react-loading-skeleton/dist/skeleton.css";

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/users/patients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName || ""} ${patient.lastName || ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           (patient.phoneNumber && patient.phoneNumber.includes(searchTerm));
  });

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>

      <div className="glass shadow-sm p-6 md:p-8 rounded-3xl relative z-10 animate-slide-up">
        {/* Header and Search Bar */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 space-y-4 md:space-y-0 gap-4">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl shadow-lg shadow-[#10b981]/20">
               <FaUserInjured className="text-white text-xl" />
             </div>
             <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">Patient Directory</h2>
          </div>
          <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 w-full md:max-w-md border border-white/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-within:shadow-md focus-within:bg-white transition-all duration-300">
            <FaSearch className="text-gray-400 text-lg mr-3" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-gray-700 font-medium placeholder-gray-400"
            />
          </div>
        </div>

        {/* Patient Table */}
        <div className="overflow-x-auto max-h-[620px] custom-scroll">
          <table className="min-w-full text-left table-auto border-separate border-spacing-y-3">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-l-2xl">Patient Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Gender / Age</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Blood Group</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center rounded-r-2xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="bg-white/50">
                    <td className="p-4 rounded-l-2xl"><Skeleton width="80%" height={20} /></td>
                    <td className="p-4"><Skeleton width="100%" height={20} /></td>
                    <td className="p-4"><Skeleton width="80%" height={20} /></td>
                    <td className="p-4"><Skeleton width="90%" height={20} /></td>
                    <td className="p-4"><Skeleton width="60%" height={20} /></td>
                    <td className="p-4 rounded-r-2xl text-center"><Skeleton width={30} height={30} circle /></td>
                  </tr>
                ))
              ) : filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient._id} className="bg-white/50 hover:bg-white shadow-sm hover:shadow transition-all duration-300">
                    <td className="p-4 rounded-l-2xl font-bold text-gray-800 whitespace-nowrap">
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td className="p-4 font-medium text-gray-600 whitespace-nowrap">{patient.email || "N/A"}</td>
                    <td className="p-4 font-medium text-gray-600 whitespace-nowrap">{patient.phoneNumber || "N/A"}</td>
                    <td className="p-4 font-medium text-gray-600 whitespace-nowrap">
                       <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold mr-2">
                         {patient.gender || "Unknown"}
                       </span>
                       <span className="text-sm">{patient.age ? `${patient.age} yrs` : "N/A"}</span>
                    </td>
                    <td className="p-4 font-bold text-red-500 whitespace-nowrap">
                       {patient.bloodGroup || "-"}
                    </td>
                    <td className="p-4 rounded-r-2xl text-center whitespace-nowrap">
                      <button 
                        className="text-primary bg-primary/10 hover:bg-primary hover:text-white p-2.5 rounded-xl transition-colors" 
                        onClick={() => handleViewPatient(patient)} 
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <div className="p-8 bg-primary/5 rounded-full mb-6">
                        <img src={noRecordImage} alt="No Patient Found" className="w-48 md:w-64 opacity-80" />
                      </div>
                      <p className="text-gray-500 font-medium text-lg">No patients found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Profile Modal */}
      {isModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative overflow-hidden animate-slide-up">
            <div className="bg-gradient-to-r from-[#10b981] to-[#059669] p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Patient Details</h2>
              <button onClick={handleCloseModal} className="text-white hover:text-red-200 transition-colors font-bold text-xl px-2">
                &times;
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-5 mb-8 border-b border-gray-100 pb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 text-green-600 flex items-center justify-center text-3xl font-extrabold shadow-sm border border-green-200">
                  {selectedPatient.firstName?.[0] || "P"}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-800">
                    {selectedPatient.firstName} {selectedPatient.lastName}
                  </h3>
                  <p className="text-gray-500 font-medium">{selectedPatient.email || "No Email Provided"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Phone Number</span>
                  <span className="text-gray-800 font-semibold">{selectedPatient.phoneNumber || "-"}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Age</span>
                  <span className="text-gray-800 font-semibold">{selectedPatient.age || "-"} Years</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Gender</span>
                  <span className="text-gray-800 font-semibold">{selectedPatient.gender || "-"}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Blood Group</span>
                  <span className="text-red-500 font-extrabold">{selectedPatient.bloodGroup || "-"}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Address</span>
                  <span className="text-gray-800 font-medium">{selectedPatient.address || "No address on file."}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex justify-end">
              <button 
                onClick={handleCloseModal}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
