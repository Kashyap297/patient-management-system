import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import api from "../../api/api"; // Import your API utility
import noRecordImage from "../../assets/images/NoBill.png";

const MonitorBilling = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [billingData, setBillingData] = useState([]); // State for fetched data
  const navigate = useNavigate();

  // Fetch billing data from API
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await api.get("/invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBillingData(response.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchBillingData();
  }, []);

  // Filtered data based on search term
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
    Paid: "bg-green-100 text-green-600  px-4 py-2 rounded-full",
    Unpaid: "bg-red-100 text-red-600  px-4 py-2 rounded-full",
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#030229]">
          Monitor Billing
        </h2>
        {/* Right Section with Search and Buttons */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="flex items-center bg-[#f6f8fb] rounded-full px-4 py-2 w-full max-w-lg">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Patient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#f6f8fb] focus:outline-none w-full"
            />
          </div>

          {/* Edit Design Invoice Button */}
          <button
            className="w-full text-sm border border-[#0eabeb] text-[#0eabeb] px-4 py-2 rounded-xl font-medium flex items-center space-x-2 hover:bg-[#e0f4fb]"
            onClick={() =>
              navigate("/admin/select-template", { state: { editMode: true } })
            }
          >
            <FaEdit className="mr-2" />
            Edit Design Invoice
          </button>

          {/* Create Bills Button */}
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
        <table className="w-full bg-white rounded-2xl overflow-hidden ">
          <thead className="bg-[#f6f8fb]">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Bill Number</th>
              <th className="px-6 py-4 text-left font-semibold">
                Patient Name
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Disease Name
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Phone Number
              </th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Date</th>
              <th className="px-6 py-4 text-left font-semibold">Time</th>
              <th className="px-6 py-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBillingData.length > 0 ? (
              filteredBillingData.map((entry, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">
                    <button className="text-blue-500 hover:underline">
                      <span className="px-4 py-2 bg-[#f6f8fb] rounded-full font-semibold text-[#718EBF]">
                      {entry.billNumber}
                      </span>
                    </button>
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F] ">
                    {entry.patient
                      ? `${entry.patient.firstName} ${entry.patient.lastName}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]" >{entry.diseaseName}</td>
                  <td className="px-6 py-4 text-[#4F4F4F]" >{entry.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <span className={statusStyles[entry.status]}>
                      {entry.status || "Unpaid"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F] ">
                    {new Date(entry.billDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]" >{entry.billTime}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-500 hover:bg-gray-100 p-2 rounded-lg"
                      onClick={() => handleViewInvoice(entry)}
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
                    <img
                      src={noRecordImage}
                      alt="No Record Found"
                      className="w-96 mb-4"
                    />
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
