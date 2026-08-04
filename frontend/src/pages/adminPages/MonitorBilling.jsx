import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import api from "../../api/api";
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

  return (
    <div className="min-h-screen bg-[#fafbfc] p-6 md:p-8 space-y-6 font-sans text-gray-800">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Monitor Billing</h2>
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-64 focus-within:border-[#10b981] focus-within:ring-1 focus-within:ring-[#10b981] transition-all">
              <FaSearch className="text-gray-400 text-sm mr-2" />
              <input
                type="text"
                placeholder="Search Patient"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent focus:outline-none w-full text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
            <button
              className="w-full sm:w-auto text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              onClick={() =>
                navigate("/admin/select-template", { state: { editMode: true } })
              }
            >
              <FaEdit />
              Edit Design Invoice
            </button>
            <button
              className="w-full sm:w-auto text-sm bg-[#10b981] hover:bg-[#059669] px-4 py-2 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              onClick={() => navigate("/admin/create-bill")}
            >
              <FaPlus />
              Create Bills
            </button>
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto max-h-[580px] custom-scroll">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 font-semibold border-b border-gray-100 bg-white sticky top-0 z-10">
              <tr>
                {["Bill Number", "Patient Name", "Disease Name", "Phone Number", "Status", "Date", "Time", "Action"].map((header) => (
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
                    {[100, 120, 120, 120, 60, 80, 60, 30].map((width, i) => (
                      <td key={i} className="px-4 py-4">
                        <Skeleton width={width} height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredBillingData.length > 0 ? (
                filteredBillingData.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg font-semibold text-xs border border-gray-200">
                        {entry.billNumber}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800">
                      {entry.patient
                        ? `${entry.patient.firstName} ${entry.patient.lastName}`
                        : "N/A"}
                    </td>
                    <td className="px-4 py-4 text-gray-600">{entry.diseaseName}</td>
                    <td className="px-4 py-4 text-gray-600">{entry.phoneNumber}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${entry.status === 'Paid' ? 'bg-[#ecfdf5] text-[#10b981]' : 'bg-red-50 text-red-500'}`}>
                        {entry.status || "Unpaid"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {new Date(entry.billDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      <span className="text-gray-500">{entry.billTime}</span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        className="text-gray-400 bg-gray-50 hover:bg-[#ecfdf5] hover:text-[#10b981] p-2 rounded-lg transition-colors border border-gray-100 hover:border-[#10b981]/30"
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
                  <td colSpan="8" className="text-center py-16 text-gray-500 font-medium">
                    No matching records found
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
