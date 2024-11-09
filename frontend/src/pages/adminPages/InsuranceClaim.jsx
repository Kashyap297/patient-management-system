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
    <div className="p-4 md:p-6 bg-white rounded-2xl shadow-md h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-lg md:text-xl font-semibold text-[#030229]">Insurance Claims</h2>
        <div className="flex items-center bg-[#f6f8fb] rounded-full px-4 py-2 w-full md:max-w-lg">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#f6f8fb] focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Insurance Claims Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl overflow-hidden">
          <thead className="bg-[#f6f8fb]">
            <tr>
              {["Bill No", "Doctor Name", "Patient Name", "Disease Name", "Insurance Company", "Insurance Plan", "Bill Date", "Action"].map((header) => (
                <th key={header} className="px-4 md:px-6 py-2 md:py-4 text-left font-semibold text-sm md:text-base">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  {["80", "120", "120", "120", "150", "100", "80", "30"].map((width, i) => (
                    <td key={i} className="px-4 py-3"><Skeleton width={width} height={20} /></td>
                  ))}
                </tr>
              ))
            ) : filteredData.length > 0 ? (
              filteredData.map((claim, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3 text-[#4F4F4F] font-semibold">
                    <span className="bg-[#f6f8fb] px-2 md:px-4 py-1 md:py-2 rounded-full text-[#718EBF]">
                      {claim.billNumber}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">
                    {`${claim.doctor.firstName} ${claim.doctor.lastName}`}
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">
                    {`${claim.patient.firstName} ${claim.patient.lastName}`}
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">{claim.diseaseName}</td>
                  <td className="px-4 py-3 text-[#4F4F4F]">
                    {claim.insuranceDetails.insuranceCompany}
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">
                    <span className="text-blue-500">
                      {claim.insuranceDetails.insurancePlan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">
                    {new Date(claim.billDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-500 hover:bg-gray-100 p-2 rounded-xl"
                      onClick={() => handleViewDetails(claim)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 sm:py-16 text-gray-500">
                  No claims found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsuranceClaims;
