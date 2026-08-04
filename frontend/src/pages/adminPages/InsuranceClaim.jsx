import { useState, useEffect } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import api from "../../api/api";
import "react-loading-skeleton/dist/skeleton.css";

const InsuranceClaims = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [insuranceClaimsData, setInsuranceClaimsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsuranceClaimsData = async () => {
      try {
        const response = await api.get("/invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const filteredData = response.data.data.filter(
          (entry) => entry.paymentType === "Insurance"
        );
        setInsuranceClaimsData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insurance claims:", error);
        setLoading(false);
      }
    };
    fetchInsuranceClaimsData();
  }, []);

  const filteredData = insuranceClaimsData.filter((claim) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    return (
      claim.billNumber.toString().includes(lowercasedTerm) ||
      `${claim.doctor.firstName} ${claim.doctor.lastName}`
        .toLowerCase()
        .includes(lowercasedTerm) ||
      `${claim.patient.firstName} ${claim.patient.lastName}`
        .toLowerCase()
        .includes(lowercasedTerm) ||
      claim.diseaseName.toLowerCase().includes(lowercasedTerm) ||
      claim.insuranceDetails.insuranceCompany
        .toLowerCase()
        .includes(lowercasedTerm) ||
      claim.insuranceDetails.insurancePlan
        .toLowerCase()
        .includes(lowercasedTerm)
    );
  });

  const handleViewDetails = (claim) => {
    navigate(`/admin/invoice/${claim._id}/${claim.patient?.firstName}`);
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] p-6 md:p-8 space-y-6 font-sans text-gray-800">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Insurance Claims</h2>
          <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 w-full md:max-w-md focus-within:border-[#10b981] focus-within:ring-1 focus-within:ring-[#10b981] transition-all">
            <FaSearch className="text-gray-400 text-sm mr-2" />
            <input
              type="text"
              placeholder="Search by Patient, Doctor, Disease, Insurance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Insurance Claims Table */}
        <div className="overflow-x-auto max-h-[580px] custom-scroll">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 font-semibold border-b border-gray-100 bg-white sticky top-0 z-10">
              <tr>
                {["Bill No", "Doctor Name", "Patient Name", "Disease Name", "Insurance Company", "Insurance Plan", "Bill Date", "Action"].map((header) => (
                  <th key={header} className="px-4 py-3 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    {[80, 120, 120, 120, 150, 100, 80, 30].map((width, i) => (
                      <td key={i} className="px-4 py-4">
                        <Skeleton width={width} height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredData.length > 0 ? (
                filteredData.map((claim, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg font-semibold text-xs border border-gray-200">
                        {claim.billNumber}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800">
                      {`Dr. ${claim.doctor.firstName} ${claim.doctor.lastName}`}
                    </td>
                    <td className="px-4 py-4 text-gray-800">
                      {`${claim.patient.firstName} ${claim.patient.lastName}`}
                    </td>
                    <td className="px-4 py-4 text-gray-600">{claim.diseaseName}</td>
                    <td className="px-4 py-4 text-gray-600">
                      {claim.insuranceDetails.insuranceCompany}
                    </td>
                    <td className="px-4 py-4 font-semibold text-[#10b981]">
                      {claim.insuranceDetails.insurancePlan}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {new Date(claim.billDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        className="text-gray-400 bg-gray-50 hover:bg-[#ecfdf5] hover:text-[#10b981] p-2 rounded-lg transition-colors border border-gray-100 hover:border-[#10b981]/30"
                        onClick={() => handleViewDetails(claim)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-16 text-gray-500 font-medium">
                    No claims found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsuranceClaims;
