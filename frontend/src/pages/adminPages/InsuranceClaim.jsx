import { useState } from "react";
import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const InsuranceClaims = () => {
  const navigate = useNavigate();
  const insuranceClaimsData = [
    {
      billNo: 5654,
      doctorName: "Dr. Marcus Philips",
      patientName: "Kadin Saris",
      diseaseName: "Internal Medicine",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Maternity",
      billDate: "2 Jun, 2024",
    },
    {
      billNo: 5655,
      doctorName: "Dr. Haylie Schleifer",
      patientName: "Jaxson Bergson",
      diseaseName: "Jaxson Bergson",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Health",
      billDate: "3 Jun, 2024",
    },
    {
      billNo: 5660,
      doctorName: "Dr. Jaxson Levin",
      patientName: "Emerson Levin",
      diseaseName: "Justin Dokidis",
      insuranceCompany: "Aegon Life Insurance",
      insurancePlan: "Medical",
      billDate: "4 Jun, 2024",
    },
    {
      billNo: 5654,
      doctorName: "Dr. Roger Carder",
      patientName: "Brandon Lipshutz",
      diseaseName: "Terry Dokidis",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Medical",
      billDate: "5 Jun, 2024",
    },
    {
      billNo: 5661,
      doctorName: "Dr. Emily Patel",
      patientName: "Ava Lee",
      diseaseName: "Cardiology",
      insuranceCompany: "ICICI Prudential Life Insurance",
      insurancePlan: "Critical Illness",
      billDate: "6 Jun, 2024",
    },
    {
      billNo: 5662,
      doctorName: "Dr. Liam Chen",
      patientName: "Lily Tran",
      diseaseName: "Neurology",
      insuranceCompany: "SBI Life Insurance",
      insurancePlan: "Accident",
      billDate: "7 Jun, 2024",
    },
    {
      billNo: 5663,
      doctorName: "Dr. Noah Kim",
      patientName: "Ethan Hall",
      diseaseName: "Orthopedics",
      insuranceCompany: "Bajaj Allianz Life Insurance",
      insurancePlan: "Health",
      billDate: "8 Jun, 2024",
    },
    {
      billNo: 5664,
      doctorName: "Dr. Olivia Martin",
      patientName: "Isabella Garcia",
      diseaseName: "Gastroenterology",
      insuranceCompany: "Max Life Insurance",
      insurancePlan: "Maternity",
      billDate: "9 Jun, 2024",
    },
    {
      billNo: 5665,
      doctorName: "Dr. Logan Brooks",
      patientName: "Oliver Brown",
      diseaseName: "Dermatology",
      insuranceCompany: "Tata AIA Life Insurance",
      insurancePlan: "Medical",
      billDate: "10 Jun, 2024",
    },
    {
      billNo: 5666,
      doctorName: "Dr. Ava Lee",
      patientName: "Sophia Patel",
      diseaseName: "Pediatrics",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Health",
      billDate: "11 Jun, 2024",
    },
    {
      billNo: 5667,
      doctorName: "Dr. Ethan Hall",
      patientName: "Mia Kim",
      diseaseName: "Oncology",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Critical Illness",
      billDate: "12 Jun, 2024",
    },
    {
      billNo: 5668,
      doctorName: "Dr. Isabella Garcia",
      patientName: "Alexander Martin",
      diseaseName: "Cardiology",
      insuranceCompany: "Aegon Life Insurance",
      insurancePlan: "Accident",
      billDate: "13 Jun, 2024",
    },
    {
      billNo: 5669,
      doctorName: "Dr. Oliver Brown",
      patientName: "Benjamin Brooks",
      diseaseName: "Neurology",
      insuranceCompany: "ICICI Prudential Life Insurance",
      insurancePlan: "Maternity",
      billDate: "14 Jun, 2024",
    },
    {
      billNo: 5670,
      doctorName: "Dr. Sophia Patel",
      patientName: "Charlotte Lee",
      diseaseName: "Gastroenterology",
      insuranceCompany: "SBI Life Insurance",
      insurancePlan: "Health",
      billDate: "15 Jun, 2024",
    },
    {
      billNo: 5671,
      doctorName: "Dr. Mia Kim",
      patientName: "Julian Kim",
      diseaseName: "Orthopedics",
      insuranceCompany: "Bajaj Allianz Life Insurance",
      insurancePlan: "Medical",
      billDate: "16 Jun, 2024",
    },
    {
      billNo: 5672,
      doctorName: "Dr. Alexander Martin",
      patientName: "Gabriel Martin ",
      diseaseName: "Dermatology",
      insuranceCompany: "Max Life Insurance",
      insurancePlan: "Critical Illness",
      billDate: "17 Jun, 2024",
    },
    {
      billNo: 5673,
      doctorName: "Dr. Benjamin Brooks",
      patientName: "Elijah Brooks",
      diseaseName: "Pediatrics",
      insuranceCompany: "Tata AIA Life Insurance",
      insurancePlan: "Accident",
      billDate: "18 Jun, 2024",
    },
    {
      billNo: 5674,
      doctorName: "Dr. Charlotte Lee",
      patientName: "Abigail Lee",
      diseaseName: "Oncology",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Health",
      billDate: "19 Jun, 2024",
    },
    {
      billNo: 5675,
      doctorName: "Dr. Julian Kim",
      patientName: "Landon Kim",
      diseaseName: "Cardiology",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Maternity",
      billDate: "20 Jun, 2024",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = insuranceClaimsData.filter((claim) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    return (
      claim.billNo.toString().includes(lowercasedTerm) ||
      claim.doctorName.toLowerCase().includes(lowercasedTerm) ||
      claim.patientName.toLowerCase().includes(lowercasedTerm) ||
      claim.diseaseName.toLowerCase().includes(lowercasedTerm) ||
      claim.insuranceCompany.toLowerCase().includes(lowercasedTerm) ||
      claim.insurancePlan.toLowerCase().includes(lowercasedTerm)
    );
  });

  const handleViewDetails = (billNo) => {
    // Navigate to the detailed insurance page
    navigate(`/admin/insurance/${billNo}`);
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
              <th className="p-3 text-left text-sm font-semibold">
                Doctor Name
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Patient Name
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Disease Name
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Insurance Company
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Insurance Plan
              </th>
              <th className="p-3 text-left text-sm font-semibold">Bill Date</th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((claim, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 text-blue-600 cursor-pointer">
                    {claim.billNo}
                  </td>
                  <td className="p-3">{claim.doctorName}</td>
                  <td className="p-3">{claim.patientName}</td>
                  <td className="p-3">{claim.diseaseName}</td>
                  <td className="p-3">{claim.insuranceCompany}</td>
                  <td className="p-3 text-blue-600">{claim.insurancePlan}</td>
                  <td className="p-3">{claim.billDate}</td>
                  <td className="p-3">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(claim.billNo)}
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
