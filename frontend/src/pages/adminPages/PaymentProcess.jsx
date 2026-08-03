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

  const statusStyles = {
    Paid: "bg-green-100 text-green-600 px-4 py-2 rounded-full",
    Unpaid: "bg-red-100 text-red-600 px-4 py-2 rounded-full",
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
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      
      <div className="glass shadow-sm p-6 md:p-8 rounded-3xl relative z-10 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">
            Billing Details
          </h2>
          <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 w-full md:max-w-md border border-white/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus-within:shadow-md focus-within:bg-white transition-all duration-300">
            <FaSearch className="text-gray-400 text-lg mr-3" />
            <input
              type="text"
              placeholder="Quick Search"
              className="bg-transparent focus:outline-none w-full text-gray-700 font-medium placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto max-h-[580px] custom-scroll">
          <table className="w-full text-left table-auto border-separate border-spacing-y-3">
            <thead className="sticky top-0 bg-white/90 backdrop-blur-sm z-20 shadow-sm">
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
                ].map((header, idx) => (
                  <th
                    key={header}
                    className={`p-4 text-xs font-bold text-gray-400 uppercase tracking-wider ${idx === 0 ? 'rounded-l-2xl' : ''} ${idx === 7 ? 'rounded-r-2xl text-center' : ''}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="bg-white/50">
                    {["80", "120", "120", "100", "80", "100", "80", "60"].map(
                      (width, i) => (
                        <td key={i} className={`p-4 ${i === 0 ? 'rounded-l-2xl' : ''} ${i === 7 ? 'rounded-r-2xl text-center' : ''}`}>
                          <Skeleton width={width} height={20} />
                        </td>
                      )
                    )}
                  </tr>
                ))
              ) : filteredBillingData.length > 0 ? (
                filteredBillingData.map((bill, index) => (
                  <tr key={index} className="bg-white/50 hover:bg-white shadow-sm hover:shadow transition-all duration-300">
                    <td className="p-4 rounded-l-2xl">
                      <span className="px-4 py-1.5 bg-blue-50/80 text-primary rounded-lg font-bold text-sm border border-blue-100">
                        {bill.billNumber}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-800">
                      {`${bill.patient.firstName} ${bill.patient.lastName}`}
                    </td>
                    <td className="p-4 font-medium text-gray-600">
                      {bill.diseaseName}
                    </td>
                    <td className="p-4 font-medium text-gray-600">
                      {bill.phoneNumber}
                    </td>
                    <td className="p-4">
                      <span className={`px-4 py-1.5 text-xs font-bold rounded-lg border ${bill.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {bill.status || "Unpaid"}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-600">
                      {new Date(bill.billDate).toLocaleDateString()}
                    </td>
                    <td className="p-4 font-medium text-gray-600">
                      {bill.billTime}
                    </td>
                    <td className="p-4 rounded-r-2xl">
                      <div className="flex flex-wrap space-x-3 justify-center">
                        <button
                          className="text-primary bg-primary/10 hover:bg-primary hover:text-white p-2.5 rounded-xl transition-colors"
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
                          className="text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white p-2.5 rounded-xl transition-colors"
                          onClick={() =>
                            navigate(`/admin/payment/edit/${bill._id}`)
                          }
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-green-500 bg-green-50 hover:bg-green-500 hover:text-white p-2.5 rounded-xl transition-colors"
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
