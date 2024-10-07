import { Button } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import noBilling from "../assets/images/no-billing.svg"; // Import your no data image

const BillingTable = () => {
  const bills = [
    {
      id: 5654,
      patientName: "Charlie Vaccaro",
      diseaseName: "Colds and Flu",
      status: "Paid",
    },
    {
      id: 5654,
      patientName: "James George",
      diseaseName: "Conjunctivitis",
      status: "Unpaid",
    },
    {
      id: 5654,
      patientName: "Craig Torff",
      diseaseName: "Allergies",
      status: "Paid",
    },
    {
      id: 5654,
      patientName: "Chance Lipshutz",
      diseaseName: "Diarrhea",
      status: "Unpaid",
    },
    {
      id: 5654,
      patientName: "Gustavo Saris",
      diseaseName: "Headaches",
      status: "Paid",
    },
    {
      id: 5654,
      patientName: "Carter Bator",
      diseaseName: "Mononucleosis",
      status: "Unpaid",
    },
    {
      id: 5654,
      patientName: "Kadin Schleifer",
      diseaseName: "Stomach Aches",
      status: "Paid",
    },
  ];

  const statusStyles = {
    Paid: "bg-green-100 text-green-600",
    Unpaid: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Billing & Payments</h2>
        <Button variant="contained" color="primary" className="!text-sm">
          + Create Bills
        </Button>
      </div>

      {/* Pending Bills Info */}
      <div className="mb-4 text-sm text-red-500">
        <strong>Pending Bills:</strong> 50
      </div>

      {/* Check if bills array is empty */}
      {bills.length > 0 ? (
        <div className="overflow-auto" style={{ maxHeight: "400px" }}>
          <table className="w-full text-left table-auto">
            <thead className="sticky top-0 bg-gray-100 z-[1]">
              <tr>
                <th className="p-3 text-sm font-semibold">Bill No</th>
                <th className="p-3 text-sm font-semibold">Patient Name</th>
                <th className="p-3 text-sm font-semibold">Disease Name</th>
                <th className="p-3 text-sm font-semibold">Status</th>
                <th className="p-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 text-blue-600 cursor-pointer">
                    {bill.id}
                  </td>
                  <td className="p-3">{bill.patientName}</td>
                  <td className="p-3">{bill.diseaseName}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        statusStyles[bill.status]
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button variant="text" color="primary">
                      <Visibility />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {/* Render the image and message if no billing data */}
          <img src={noBilling} alt="No Billing Data" className="w-48 mb-4" />
        </div>
      )}
    </div>
  );
};

export default BillingTable;
