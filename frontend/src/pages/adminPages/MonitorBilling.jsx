import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import api from "../../api/api";
import noRecordImage from "../../assets/images/NoBill.png";
import "react-loading-skeleton/dist/skeleton.css";

const MonitorBilling = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await api.get("/invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBillingData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setLoading(false);
      }
    };
    fetchBillingData();
  }, []);

  const filteredBillingData = billingData.filter(
    (entry) =>
      `${entry.patient?.firstName} ${entry.patient?.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      entry.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.phoneNumber?.includes(searchTerm)
  );

  const handleViewInvoice = (bill) => {
    navigate(`/admin/invoice/${bill._id}/${bill.patient?.firstName}`);
  };

  const statusStyles = {
    Paid: "bg-green-100 text-green-600 px-4 py-2 rounded-full",
    Unpaid: "bg-red-100 text-red-600 px-4 py-2 rounded-full",
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      
      <div className="glass shadow-sm p-6 md:p-8 rounded-3xl relative z-10 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">Monitor Billing</h2>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 w-full sm:w-64 border border-white/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-within:shadow-md focus-within:bg-white transition-all duration-300">
              <FaSearch className="text-gray-400 text-lg mr-3" />
              <input
                type="text"
                placeholder="Search Patient"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent focus:outline-none w-full text-gray-700 font-medium placeholder-gray-400"
              />
            </div>
            <button
              className="w-full sm:w-auto text-sm font-bold border-2 border-primary text-primary px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-300 whitespace-nowrap"
              onClick={() =>
                navigate("/admin/select-template", { state: { editMode: true } })
              }
            >
              <FaEdit />
              Edit Design Invoice
            </button>
            <button
              className="w-full sm:w-auto text-sm bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-blue-500/30 px-6 py-3 rounded-2xl text-white font-bold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 whitespace-nowrap"
              onClick={() => navigate("/admin/create-bill")}
            >
              <FaPlus />
              Create Bills
            </button>
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto max-h-[580px] custom-scroll">
          <table className="w-full text-left table-auto border-separate border-spacing-y-3">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
              <tr>
                {["Bill Number", "Patient Name", "Disease Name", "Phone Number", "Status", "Date", "Time", "Action"].map((header, idx) => (
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
                    {["100", "120", "120", "120", "60", "80", "60", "30"].map((width, i) => (
                      <td key={i} className={`p-4 ${i === 0 ? 'rounded-l-2xl' : ''} ${i === 7 ? 'rounded-r-2xl' : ''}`}>
                        <Skeleton width={width} height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredBillingData.length > 0 ? (
                filteredBillingData.map((entry, index) => (
                  <tr key={index} className="bg-white/50 hover:bg-white shadow-sm hover:shadow transition-all duration-300">
                    <td className="p-4 rounded-l-2xl">
                      <span className="px-4 py-1.5 bg-blue-50/80 text-primary rounded-lg font-bold text-sm border border-blue-100">
                        {entry.billNumber}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-800">
                      {entry.patient
                        ? `${entry.patient.firstName} ${entry.patient.lastName}`
                        : "N/A"}
                    </td>
                    <td className="p-4 font-medium text-gray-600">{entry.diseaseName}</td>
                    <td className="p-4 font-medium text-gray-600">{entry.phoneNumber}</td>
                    <td className="p-4">
                      <span className={`px-4 py-1.5 text-xs font-bold rounded-lg border ${entry.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {entry.status || "Unpaid"}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-600">
                      {new Date(entry.billDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-gray-600">{entry.billTime}</td>
                    <td className="p-4 rounded-r-2xl text-center">
                      <button
                        className="text-primary bg-primary/10 hover:bg-primary hover:text-white p-2.5 rounded-xl transition-colors"
                        onClick={() => handleViewInvoice(entry)}
                        title="View Invoice"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <div className="p-8 bg-primary/5 rounded-full mb-6">
                        <img src={noRecordImage} alt="No Record Found" className="w-32 sm:w-48 opacity-80" />
                      </div>
                      <p className="text-gray-500 font-medium text-lg">No records found</p>
                    </div>
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

export default MonitorBilling;
