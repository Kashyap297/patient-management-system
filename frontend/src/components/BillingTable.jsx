import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import axios from "../api/api"; // Ensure the correct path to your axios setup file
import noBilling from "../assets/images/no-billing.svg"; // Placeholder image when no bills are found

const BillingTable = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("/invoice");
        setBills(response.data.data); // Assuming data structure based on your API
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);
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
        <strong>Pending Bills:</strong> {bills.filter(bill => bill.status === "Unpaid").length}
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : bills.length > 0 ? (
        <div className="overflow-auto max-h-96">
          <table className="w-full text-left table-auto">
            <thead className="sticky top-0 bg-gray-100 z-10">
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
                    {bill.billNumber}
                  </td>
                  <td className="p-3">{bill.patient.firstName} {bill.patient.lastName} </td>
                  <td className="p-3">{bill.diseaseName}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[bill.status]}`}>
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
          <img src={noBilling} alt="No Billing Data" className="w-48 mb-4" />
          <p className="text-gray-500">No Bills Found</p>
        </div>
      )}
    </div>
  );
};

export default BillingTable;
