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
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      
      <div className="glass shadow-sm p-6 md:p-8 rounded-3xl relative z-10 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">Insurance Claims</h2>
          <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 w-full md:max-w-md border border-white/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-within:shadow-md focus-within:bg-white transition-all duration-300">
            <FaSearch className="text-gray-400 text-lg mr-3" />
            <input
              type="text"
              placeholder="Search Patient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-gray-700 font-medium placeholder-gray-400"
            />
          </div>
        </div>

        {/* Insurance Claims Table */}
        <div className="overflow-x-auto max-h-[580px] custom-scroll">
          <table className="w-full text-left table-auto border-separate border-spacing-y-3">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
              <tr>
                {["Bill No", "Doctor Name", "Patient Name", "Disease Name", "Insurance Company", "Insurance Plan", "Bill Date", "Action"].map((header, idx) => (
                  <th key={header} className={`p-4 text-xs font-bold text-gray-400 uppercase tracking-wider ${idx === 0 ? 'rounded-l-2xl' : ''} ${idx === 7 ? 'rounded-r-2xl' : ''}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="bg-white/50">
                    {["80", "120", "120", "120", "150", "100", "80", "30"].map((width, i) => (
                      <td key={i} className={`p-4 ${i === 0 ? 'rounded-l-2xl' : ''} ${i === 7 ? 'rounded-r-2xl' : ''}`}>
                        <Skeleton width={width} height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredData.length > 0 ? (
                filteredData.map((claim, index) => (
                  <tr key={index} className="bg-white/50 hover:bg-white shadow-sm hover:shadow transition-all duration-300">
                    <td className="p-4 rounded-l-2xl">
                      <span className="px-4 py-1.5 bg-blue-50/80 text-primary rounded-lg font-bold text-sm border border-blue-100">
                        {claim.billNumber}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-800">
                      {`${claim.doctor.firstName} ${claim.doctor.lastName}`}
                    </td>
                    <td className="p-4 font-medium text-gray-800">
                      {`${claim.patient.firstName} ${claim.patient.lastName}`}
                    </td>
                    <td className="p-4 font-medium text-gray-600">{claim.diseaseName}</td>
                    <td className="p-4 font-medium text-gray-600">
                      {claim.insuranceDetails.insuranceCompany}
                    </td>
                    <td className="p-4 font-medium text-primary">
                      {claim.insuranceDetails.insurancePlan}
                    </td>
                    <td className="p-4 font-medium text-gray-600">
                      {new Date(claim.billDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 rounded-r-2xl text-center">
                      <button
                        className="text-primary bg-primary/10 hover:bg-primary hover:text-white p-2.5 rounded-xl transition-colors"
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
