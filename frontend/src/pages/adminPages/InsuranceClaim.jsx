import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // Import your API utility

const InsuranceClaims = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [insuranceClaimsData, setInsuranceClaimsData] = useState([]); // State for fetched data

  // Fetch insurance claim data from the API
  useEffect(() => {
    const fetchInsuranceClaimsData = async () => {
      try {
        const response = await api.get("/invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Filter only the entries with paymentType "Insurance"
        const filteredData = response.data.data.filter(
          (entry) => entry.paymentType === "Insurance"
        );
        setInsuranceClaimsData(filteredData);
      } catch (error) {
        console.error("Error fetching insurance claims:", error);
      }
    };
    fetchInsuranceClaimsData();
  }, []);

  // Filtered data based on search term
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
    // Navigate to the detailed insurance page
    // navigate(`/admin/insurance/${billNo}`);
    navigate(`/admin/invoice/${claim._id}/${claim.patient?.firstName}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Insurance Claims</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="overflow-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Bill No</th>
              <th className="p-3 text-left text-sm font-semibold">Doctor Name</th>
              <th className="p-3 text-left text-sm font-semibold">Patient Name</th>
              <th className="p-3 text-left text-sm font-semibold">Disease Name</th>
              <th className="p-3 text-left text-sm font-semibold">Insurance Company</th>
              <th className="p-3 text-left text-sm font-semibold">Insurance Plan</th>
              <th className="p-3 text-left text-sm font-semibold">Bill Date</th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((claim, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 text-blue-600 cursor-pointer">{claim.billNumber}</td>
                  <td className="p-3">{`${claim.doctor.firstName} ${claim.doctor.lastName}`}</td>
                  <td className="p-3">{`${claim.patient.firstName} ${claim.patient.lastName}`}</td>
                  <td className="p-3">{claim.diseaseName}</td>
                  <td className="p-3">{claim.insuranceDetails.insuranceCompany}</td>
                  <td className="p-3 text-blue-600">{claim.insuranceDetails.insurancePlan}</td>
                  <td className="p-3">{new Date(claim.billDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(claim)}
                    >
                      <Visibility />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-3 text-center text-gray-500">
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
