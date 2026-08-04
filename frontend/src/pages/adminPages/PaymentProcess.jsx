import { useState, useEffect } from "react";
import { FaEye, FaDollarSign, FaEdit, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import api from "../../api/api";
import CashPaymentModal from "../../components/modals/CashPaymentModal";
import "react-loading-skeleton/dist/skeleton.css";

const PaymentProcess = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [billingData, setBillingData] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
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
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
      setLoading(false);
    };
    fetchBillingData();
  }, []);

  const handleOpenPaymentModal = (bill) => {
    setSelectedBill(bill);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedBill(null);
  };

  const handlePayment = async (amount) => {
    const totalAmount = selectedBill.totalAmount;
    const newRemainingAmount =
      totalAmount - (selectedBill.paidAmount || 0) - amount;

    if (newRemainingAmount <= 0) {
      try {
        await api.patch(`/invoice/${selectedBill._id}`, {
          status: "Paid",
          paidAmount: totalAmount,
          remainingAmount: 0,
          patient: selectedBill.patient._id,
          doctor: selectedBill.doctor._id,
        });
        setBillingData((prevData) =>
          prevData.map((bill) =>
            bill._id === selectedBill._id
              ? {
                  ...bill,
                  status: "Paid",
                  paidAmount: totalAmount,
                  remainingAmount: 0,
                }
              : bill
          )
        );
      } catch (error) {
        console.error("Error updating invoice status:", error);
      }
    } else {
      try {
        await api.patch(`/invoice/${selectedBill._id}`, {
          paidAmount: (selectedBill.paidAmount || 0) + amount,
          remainingAmount: newRemainingAmount,
          status: newRemainingAmount <= 0 ? "Paid" : "Unpaid",
          patient: selectedBill.patient._id,
          doctor: selectedBill.doctor._id,
        });
        setBillingData((prevData) =>
          prevData.map((bill) =>
            bill._id === selectedBill._id
              ? {
                  ...bill,
                  paidAmount: (selectedBill.paidAmount || 0) + amount,
                  remainingAmount: newRemainingAmount,
                  status: newRemainingAmount <= 0 ? "Paid" : "Unpaid",
                }
              : bill
          )
        );
      } catch (error) {
        console.error("Error updating payment:", error);
      }
    }
    handleClosePaymentModal();
  };

  const filteredBillingData = billingData.filter(
    (bill) =>
      bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${bill.patient.firstName} ${bill.patient.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      bill.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fafbfc] p-6 md:p-8 space-y-6 font-sans text-gray-800">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            Billing Details
          </h2>
          <div className="relative flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 w-full md:max-w-md focus-within:border-[#10b981] focus-within:ring-1 focus-within:ring-[#10b981] transition-all">
            <FaSearch className="text-gray-400 text-sm mr-2" />
            <input
              type="text"
              placeholder="Search by Bill, Patient, Disease, Status..."
              className="bg-transparent focus:outline-none w-full text-sm text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto max-h-[580px] custom-scroll">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 font-semibold border-b border-gray-100 bg-white sticky top-0 z-10">
              <tr>
                {[
                  "Bill Number",
                  "Patient Name",
                  "Disease Name",
                  "Phone Number",
                  "Status",
                  "Date",
                  "Time",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-50">
                    {[80, 120, 120, 100, 80, 100, 80, 60].map((width, i) => (
                      <td key={i} className="px-4 py-4">
                        <Skeleton width={width} height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredBillingData.length > 0 ? (
                filteredBillingData.map((bill, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg font-semibold text-xs border border-gray-200">
                        {bill.billNumber}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-gray-800">
                      {`${bill.patient.firstName} ${bill.patient.lastName}`}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {bill.diseaseName}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {bill.phoneNumber}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${bill.status === 'Paid' ? 'bg-[#ecfdf5] text-[#10b981]' : 'bg-red-50 text-red-500'}`}>
                        {bill.status || "Unpaid"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {new Date(bill.billDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      <span className="text-gray-500">{bill.billTime}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-400 bg-gray-50 hover:bg-[#ecfdf5] hover:text-[#10b981] p-2 rounded-lg transition-colors border border-gray-100 hover:border-[#10b981]/30"
                          onClick={() =>
                            navigate(
                              `/admin/invoice/${bill._id}/${bill.patient.firstName}`
                            )
                          }
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="text-gray-400 bg-gray-50 hover:bg-blue-50 hover:text-blue-500 p-2 rounded-lg transition-colors border border-gray-100 hover:border-blue-300"
                          onClick={() =>
                            navigate(`/admin/payment/edit/${bill._id}`)
                          }
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-gray-400 bg-gray-50 hover:bg-[#ecfdf5] hover:text-[#10b981] p-2 rounded-lg transition-colors border border-gray-100 hover:border-[#10b981]/30"
                          onClick={() => handleOpenPaymentModal(bill)}
                          title="Payment"
                        >
                          <FaDollarSign />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-16 text-gray-500 font-medium"
                  >
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBill && (
        <CashPaymentModal
          open={isPaymentModalOpen}
          handleClose={handleClosePaymentModal}
          handlePayment={handlePayment}
          totalAmount={selectedBill.totalAmount}
          paidAmount={selectedBill.paidAmount || 0}
        />
      )}
    </div>
  );
};

export default PaymentProcess;
