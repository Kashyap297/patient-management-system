import React, { useEffect, useState } from "react";
import PaymentTypeModal from "../../components/Patient/PaymentTypeModal";
import InvoiceModal from "../../components/Patient/InvoiceModal";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";
import api from "../../api/api"; // Assuming you have an API setup

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [activeTab, setActiveTab] = useState("unpaid"); // To toggle between paid and unpaid tabs
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Bills", path: "/patient/bills" },
    ]);
  }, []);

  useEffect(() => {
    const fetchUserBills = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace this with the appropriate method of retrieving the token
        const response = await api.get("/invoice/user/invoice", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        });
        const userBills = response.data.data || [];
        setBills(userBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchUserBills();
  }, []);

  const handlePayNow = (bill) => {
    setSelectedBill(bill); // Set the selected bill for payment
    setShowPaymentType(true); // Show payment type modal
  };

  const handleViewInvoice = (bill) => {
    setSelectedBill(bill); // Set the selected bill for viewing invoice
    setShowInvoice(true); // Show invoice modal
  };

  // Filter bills based on the activeTab state ('unpaid' or 'paid')
  const filteredBills = bills.filter((bill) =>
    activeTab === "paid" ? bill.status === "Paid" : bill.status === "Unpaid"
  );

  return (
    <div className="m-6 p-6 bg-white rounded-lg h-full">
      <div className="mb-4 flex space-x-6">
        <button
          onClick={() => setActiveTab("unpaid")}
          className={`text-lg font-semibold px-3 ${activeTab === "unpaid" ? "text-customBlue border-b-4 border-customBlue" : "text-gray-500"}`}
        >
          Unpaid Bills
        </button>
        <button
          onClick={() => setActiveTab("paid")}
          className={`text-lg font-semibold px-3 ${activeTab === "paid" ? "text-customBlue border-b-4 border-customBlue" : "text-gray-500"}`}
        >
          Paid Bills
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredBills.map((bill) => (
          <div key={bill._id} className="p-4 border rounded-md bg-white shadow-sm flex flex-col">
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-t-md">
              {bill.doctor ? (
                <p className="font-semibold">
                  Dr. {bill.doctor.firstName} {bill.doctor.lastName}
                </p>
              ) : (
                <p className="font-semibold">Doctor Information Unavailable</p>
              )}
              <button onClick={() => handleViewInvoice(bill)} className="text-lg p-1 bg-white text-customBlue">
                <FaEye />
              </button>
            </div>
            <div className="p-2">
              <p className="text-gray-500 flex justify-between">
                <strong>Hospital Name</strong> {bill.hospital.name}
              </p>
              <p className="text-gray-500 flex justify-between">
                <strong>Bill Created Date</strong> {new Date(bill.billDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500 flex justify-between">
                <strong>Bill Created Time</strong> {bill.billTime}
              </p>
              <p className="text-red-500 font-semibold flex justify-between">
                <strong className="font-medium text-gray-500">Total Bill Amount</strong> ₹{bill.totalAmount.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end mt-2">
              {bill.status === "Unpaid" && (
                <button
                  className="bg-customBlue text-white py-2 px-4 rounded-lg font-semibold w-full"
                  onClick={() => handlePayNow(bill)}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showInvoice && selectedBill && (
        <InvoiceModal
          bill={selectedBill}
          onClose={() => setShowInvoice(false)}
          onPay={() => {
            setShowInvoice(false);
            setShowPaymentType(true);
          }}
          showPayButton={selectedBill.status === "Unpaid"}
        />
      )}

      {showPaymentType && selectedBill && (
        <PaymentTypeModal
          bill={selectedBill} // Pass the selected bill as a prop
          onClose={() => setShowPaymentType(false)}
        />
      )}
    </div>
  );
};

export default BillPage;
