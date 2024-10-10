import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Visibility, Payment, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import CashPaymentModal from "../../components/modals/CashPaymentModal";

const PaymentProcess = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [billingData, setBillingData] = useState([]); // State for fetched billing data
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch billing data from the API
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await api.get("/invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBillingData(response.data.data); // Update with the fetched data
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
    setSelectedBill(null); // Reset the selected bill after closing
  };

  const handlePayment = (amount) => {
    console.log(
      `Payment of ₹${amount} made for bill number ${selectedBill.billNumber}`
    );
    // Handle the payment logic here (e.g., API call)
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
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Billing Details</h2>
        <input
          type="text"
          placeholder="Quick Search"
          className="border p-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Billing Table */}
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-sm font-semibold">Bill Number</th>
            <th className="p-3 text-left text-sm font-semibold">Patient Name</th>
            <th className="p-3 text-left text-sm font-semibold">Disease Name</th>
            <th className="p-3 text-left text-sm font-semibold">Phone Number</th>
            <th className="p-3 text-left text-sm font-semibold">Status</th>
            <th className="p-3 text-left text-sm font-semibold">Date</th>
            <th className="p-3 text-left text-sm font-semibold">Time</th>
            <th className="p-3 text-left text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBillingData.length > 0 ? (
            filteredBillingData.map((bill, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 text-blue-600">{bill.billNumber}</td>
                <td className="p-3">{`${bill.patient.firstName} ${bill.patient.lastName}`}</td>
                <td className="p-3">{bill.diseaseName}</td>
                <td className="p-3">{bill.phoneNumber}</td>
                <td
                  className={`p-3 ${bill.status === "Paid" ? "text-green-600" : "text-red-600"}`}
                >
                  {bill.status}
                </td>
                <td className="p-3">{new Date(bill.billDate).toLocaleDateString()}</td>
                <td className="p-3">{bill.billTime}</td>
                <td className="p-3">
                  <IconButton color="primary">
                    <Visibility
                      onClick={() => navigate(`/admin/invoice/${bill._id}/${bill.patient.firstName}`)}
                    />
                  </IconButton>
                  <IconButton color="secondary">
                    <Edit onClick={() => navigate(`/admin/payment/edit/${bill._id}`)} />
                  </IconButton>
                  <IconButton>
                    <Payment color="primary" onClick={() => handleOpenPaymentModal(bill)} />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-3 text-center text-gray-500">
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedBill && (
        <CashPaymentModal
          open={isPaymentModalOpen}
          handleClose={handleClosePaymentModal}
          handlePayment={handlePayment}
        />
      )}
    </div>
  );
};

export default PaymentProcess;
