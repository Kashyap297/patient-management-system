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
    <div className="glass shadow-sm hover:shadow-lg p-6 sm:p-8 rounded-3xl w-full transition-all duration-300 relative overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 relative z-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">Billing & Payments</h2>
          <Link to="/admin/pending-invoice" className="inline-block mt-1">
            <div className="text-sm font-bold text-red-500 bg-red-50/80 px-3 py-1 rounded-lg transition-colors hover:bg-red-100">
              <span className="uppercase tracking-wider mr-1 text-xs">Pending:</span>{" "}
              {loading ? <Skeleton width={30} /> : bills.filter(bill => bill.status === "Unpaid").length}
            </div>
          </Link>
        </div>
        <Link to="/admin/select-template">
          <button className="bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 px-5 py-2.5 rounded-xl text-white font-bold transition-all duration-300 hover:-translate-y-0.5">
            + Create Bill
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="overflow-y-auto h-96 custom-scroll relative z-10">
          <table className="w-full text-left table-auto border-separate border-spacing-y-2">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-l-xl">Bill No</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Patient Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Disease Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array(5).fill().map((_, index) => (
                <tr key={index} className="bg-white/50 hover:bg-white transition-colors">
                  <td className="p-4 rounded-l-xl"><Skeleton width={80} /></td>
                  <td className="p-4"><Skeleton width={120} /></td>
                  <td className="p-4"><Skeleton width={120} /></td>
                  <td className="p-4"><Skeleton width={60} /></td>
                  <td className="p-4 rounded-r-xl"><Skeleton width={30} height={30} circle /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : bills.length > 0 ? (
        <div className="overflow-x-auto max-h-96 custom-scroll relative z-10">
          <table className="w-full text-left table-auto border-separate border-spacing-y-2">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-l-xl">Bill No</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Patient Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Disease Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, index) => (
                <tr key={index} className="bg-white/50 hover:bg-white shadow-sm hover:shadow transition-all duration-300">
                  <td className="p-4 rounded-l-xl text-primary font-bold cursor-pointer hover:underline">
                    {bill.billNumber}
                  </td>
                  <td className="p-4 font-semibold text-gray-800">
                    {bill.patient.firstName} {bill.patient.lastName}
                  </td>
                  <td className="p-4 font-medium text-gray-600">{bill.diseaseName}</td>
                  <td className="p-4">
                    <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${bill.status === "Paid" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="p-4 rounded-r-xl">
                    <IconButton color="primary" onClick={() => handleViewInvoice(bill)} className="hover:bg-primary/10 transition-colors">
                      <Visibility fontSize="small" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 relative z-10">
          <div className="p-6 bg-primary/5 rounded-full mb-4">
            <img src={noBilling} alt="No Billing Data" className="w-24 sm:w-32 opacity-80" />
          </div>
          <p className="text-gray-500 font-medium text-lg">No Bills Found</p>
        </div>
      )}
    </div>
  );
};

export default BillingTable;
