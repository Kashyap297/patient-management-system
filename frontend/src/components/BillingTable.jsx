import { useEffect, useState } from "react";
import { Visibility } from "@mui/icons-material";
import api from "../api/api";
import noBilling from "../assets/images/no-billing.svg";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { IconButton } from "@mui/material";

const BillingTable = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await api.get("/invoice");
        setBills(response.data.data);
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

  const handleViewInvoice = (bill) => {
    navigate(`/admin/invoice/${bill._id}/${bill.patient?.firstName}`);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">Billing & Payments</h2>
        <Link to="/admin/select-template">
          <button className="bg-[#0eabeb] px-3 py-2 rounded-xl text-white text-sm sm:text-base">
            + Create Bills
          </button>
        </Link>
      </div>

      {/* Pending Bills Info */}
      <Link to="/admin/pending-invoice">
        <div className="mb-4 text-sm text-red-500">
          <strong>Pending Bills:</strong>{" "}
          {loading ? <Skeleton width={50} /> : bills.filter(bill => bill.status === "Unpaid").length}
        </div>
      </Link>

      {loading ? (
        <div className="overflow-y-auto h-96 custom-scroll">
          <table className="w-full text-left table-auto">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="p-3 text-xs sm:text-sm font-semibold">Bill No</th>
                <th className="p-3 text-xs sm:text-sm font-semibold">Patient Name</th>
                <th className="p-3 text-xs sm:text-sm font-semibold">Disease Name</th>
                <th className="p-3 text-xs sm:text-sm font-semibold">Status</th>
                <th className="p-3 text-xs sm:text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(5).fill().map((_, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3"><Skeleton width={100} /></td>
                  <td className="p-3"><Skeleton width={150} /></td>
                  <td className="p-3"><Skeleton width={150} /></td>
                  <td className="p-3"><Skeleton width={80} /></td>
                  <td className="p-3"><Skeleton width={40} height={24} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : bills.length > 0 ? (
        <div className="overflow-x-auto max-h-96 custom-scroll">
          <table className="w-full text-left table-auto">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="p-3 text-xs sm:text-sm font-semibold">Bill No</th>
                <th className="p-3 text-xs sm:text-sm font-semibold">Patient Name</th>
                <th className="p-3 text-xs sm:text-sm font-semibold">Disease Name</th>
                <th className="p-3 text-xs sm:text-sm font-semibold">Status</th>
                <th className="p-3 text-xs sm:text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 text-blue-600 cursor-pointer text-xs sm:text-base">
                    {bill.billNumber}
                  </td>
                  <td className="p-3 text-xs sm:text-base">
                    {bill.patient.firstName} {bill.patient.lastName}
                  </td>
                  <td className="p-3 text-xs sm:text-base">{bill.diseaseName}</td>
                  <td className="p-3 text-xs sm:text-base">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[bill.status]}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs sm:text-base">
                    <IconButton color="primary" onClick={() => handleViewInvoice(bill)}>
                      <Visibility fontSize="small" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={noBilling} alt="No Billing Data" className="w-32 sm:w-48 mb-4" />
          <p className="text-gray-500 text-xs sm:text-base">No Bills Found</p>
        </div>
      )}
    </div>
  );
};

export default BillingTable;
