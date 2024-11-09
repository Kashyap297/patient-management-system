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
    <div className="p-4 md:p-6 bg-white rounded-2xl shadow-md h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <h2 className="text-lg md:text-xl font-semibold text-[#030229]">Monitor Billing</h2>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-3 w-full md:w-auto">
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
          <button
            className="w-full text-sm border border-[#0eabeb] text-[#0eabeb] px-4 py-2 rounded-xl font-medium flex items-center space-x-2 hover:bg-[#e0f4fb]"
            onClick={() =>
              navigate("/admin/select-template", { state: { editMode: true } })
            }
          >
            <FaEdit className="mr-2" />
            Edit Design Invoice
          </button>
          <button
            className="w-full text-sm bg-[#0eabeb] text-white px-4 py-2 rounded-xl font-medium flex items-center space-x-2 hover:bg-[#0099cc]"
            onClick={() => navigate("/admin/create-bill")}
          >
            <FaPlus className="mr-2" />
            Create Bills
          </button>
        </div>
      </div>

      {/* Billing Table */}
      <div className="overflow-x-auto h-full">
        <table className="w-full bg-white rounded-2xl overflow-hidden">
          <thead className="bg-[#f6f8fb]">
            <tr>
              {["Bill Number", "Patient Name", "Disease Name", "Phone Number", "Status", "Date", "Time", "Action"].map((header) => (
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
                  {["100", "120", "120", "120", "60", "80", "60", "30"].map((width, i) => (
                    <td key={i} className="px-4 py-3"><Skeleton width={width} height={20} /></td>
                  ))}
                </tr>
              ))
            ) : filteredBillingData.length > 0 ? (
              filteredBillingData.map((entry, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">
                    <button className="text-blue-500 hover:underline">
                      <span className="px-2 md:px-4 py-1 md:py-2 bg-[#f6f8fb] rounded-full font-semibold text-[#718EBF]">
                        {entry.billNumber}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">
                    {entry.patient
                      ? `${entry.patient.firstName} ${entry.patient.lastName}`
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">{entry.diseaseName}</td>
                  <td className="px-4 py-3 text-[#4F4F4F]">{entry.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <span className={statusStyles[entry.status]}>
                      {entry.status || "Unpaid"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">
                    {new Date(entry.billDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-[#4F4F4F]">{entry.billTime}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-500 hover:bg-gray-100 p-2 rounded-xl"
                      onClick={() => handleViewInvoice(entry)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 sm:py-16">
                  <div className="flex flex-col items-center">
                    <img src={noRecordImage} alt="No Record Found" className="w-48 sm:w-96 mb-4" />
                    <p className="text-gray-500">No records found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonitorBilling;
