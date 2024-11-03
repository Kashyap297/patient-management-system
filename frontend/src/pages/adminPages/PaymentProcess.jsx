import { useState, useEffect } from "react";
import { FaEye, FaDollarSign, FaEdit, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import CashPaymentModal from "../../components/modals/CashPaymentModal";

const PaymentProcess = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [billingData, setBillingData] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
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
      // Full payment
      try {
        const response = await api.patch(`/invoice/${selectedBill._id}`, {
          status: "Paid",
          paidAmount: totalAmount, // Fully paid, update the amount in the database
          remainingAmount: 0,
          patient: selectedBill.patient._id,
          doctor: selectedBill.doctor._id,
        });
        console.log("Invoice marked as paid:", response.data);

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
        const response = await api.patch(`/invoice/${selectedBill._id}`, {
          paidAmount: (selectedBill.paidAmount || 0) + amount,
          remainingAmount: newRemainingAmount,
          status: newRemainingAmount <= 0 ? "Paid" : "Unpaid",
          patient: selectedBill.patient._id,
          doctor: selectedBill.doctor._id,
        });
        console.log("Payment updated:", response.data);

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
    <div className="p-6 bg-white rounded-2xl shadow-md h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#030229]">
          Billing Details
        </h2>
        <div className="flex items-center bg-[#f6f8fb] rounded-full px-4 py-2 max-w-lg">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Quick Search"
            className="bg-[#f6f8fb] focus:outline-none w-full" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Billing Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-2xl overflow-hidden">
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
              filteredBillingData.map((bill, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">
                    <span className="px-4 py-2 bg-[#f6f8fb] rounded-full font-semibold text-[#718EBF]">
                      {bill.billNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {`${bill.patient.firstName} ${bill.patient.lastName}`}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {bill.diseaseName}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {bill.phoneNumber}
                  </td>
                  <td className="px-6 py-4">
                    <span className={statusStyles[bill.status]}>
                      {bill.status || "Unpaid"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {new Date(bill.billDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">{bill.billTime}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-500 hover:bg-gray-100 p-2 rounded-lg"
                      onClick={() =>
                        navigate(
                          `/admin/invoice/${bill._id}/${bill.patient.firstName}`
                        )
                      }
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-blue-500 hover:bg-gray-100 p-2 rounded-lg mx-2"
                      onClick={() =>
                        navigate(`/admin/payment/edit/${bill._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-green-500 hover:bg-gray-100 p-2 rounded-lg"
                      onClick={() => handleOpenPaymentModal(bill)}
                    >
                      <FaDollarSign />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-16 text-gray-500">
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
