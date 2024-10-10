import React, { useEffect, useState } from "react";
import PaymentTypeModal from "../../components/Patient/PaymentTypeModal";
import InvoiceModal from "../../components/Patient/InvoiceModal";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";

const BillPage = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [activeTab, setActiveTab] = useState("unpaid"); // To toggle between paid and unpaid tabs
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      { label: "Bills", path: "/patient/bills" },
    ]);
  }, [updateBreadcrumb]);

  const bills = [
    {
      id: 1,
      doctor: "Dr. Nolan George",
      hospital: "Shamuba Hospital",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      amount: 24668,
      isPaid: false,
    },
    {
      id: 2,
      doctor: "Dr. Nolan George",
      hospital: "Shamuba Hospital",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      amount: 2520,
      isPaid: true,
    },
    // Add more bills as needed
  ];

  const handlePayNow = (bill) => {
    setSelectedBill(bill);
    setShowPaymentType(true);
  };

  const handleViewInvoice = (bill) => {
    setSelectedBill(bill);
    setShowInvoice(true);
  };

  const filteredBills = bills.filter((bill) => bill.isPaid === (activeTab === "paid"));

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
          <div key={bill.id} className="p-4 border rounded-md bg-white shadow-sm flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-t-md">
              <p className="font-semibold">{bill.doctor}</p>
              <button onClick={() => handleViewInvoice(bill)} className="text-lg p-1 bg-white text-customBlue">
                <FaEye />
              </button>
            </div>
            
            {/* Content Section */}
            <div className="p-2 ">
              <p className="text-gray-500 flex justify-between">
                <strong>Hospital Name</strong> {bill.hospital}
              </p>
              <p className="text-gray-500 flex justify-between">
                <strong>Bill Created Date</strong> {bill.date}
              </p>
              <p className="text-gray-500 flex justify-between">
                <strong>Bill Created Time</strong> {bill.time}
              </p>
              <p className="text-red-500 font-semibold flex justify-between">
                <strong className="font-medium text-gray-500">Total Bill Amount</strong> ₹{bill.amount.toLocaleString()}
              </p>
            </div>

            {/* Footer Section */}
            <div className="flex justify-end mt-2">
              {!bill.isPaid && (
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
          showPayButton={!selectedBill.isPaid}
        />
      )}

      {showPaymentType && selectedBill && (
        <PaymentTypeModal
          bill={selectedBill}
          onClose={() => setShowPaymentType(false)}
        />
      )}
    </div>
  );
};

export default BillPage;
