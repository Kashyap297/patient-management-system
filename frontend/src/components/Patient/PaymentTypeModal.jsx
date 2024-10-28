import React, { useState } from "react";
import { FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";
import PaymentMethodModal from "./PaymentMethodModal";
import api from "../../api/api"; // Assuming you have an API setup

const PaymentTypeModal = ({ bill, onClose }) => {
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [paymentType, setPaymentType] = useState(null);

  const handlePaymentTypeSelection = async (type) => {
    setPaymentType(type);
    if (type === "Online") {
      // Show payment method modal
      setShowPaymentMethod(true);
    } else {
      try {
        // For Cash payment, update the invoice status to "Paid"
        await api.patch(`/invoice/${bill._id}`, {
          status: "Paid", // Update status to "Paid"
          patient: bill.patient._id, // Include patient ID
          doctor: bill.doctor._id, // Include doctor ID
        });
        alert("Cash payment processed! Invoice status updated to 'Paid'.");
        onClose(); // Close the modal after processing payment
      } catch (error) {
        console.error("Error processing cash payment:", error);
        alert("Failed to process cash payment. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-50 p-6 rounded-xl shadow-md w-1/5">
        <h2 className="text-lg font-semibold mb-4">Select Payment Type</h2>
        <div className="space-y-2">
          <div
            className="flex items-center p-4 rounded-lg bg-white border cursor-pointer"
            onClick={() => setPaymentType("Online")}
          >
            <FaCreditCard className={`mr-3 ${paymentType === "Online" ? "text-customBlue" : "text-gray-500"}`} size={20} />
            <span className="flex-1 text-gray-700">Online</span>
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === "Online"}
              onChange={() => setPaymentType("Online")}
              className="form-radio text-customBlue h-5 w-5"
            />
          </div>

          <div
            className="flex items-center p-4 rounded-lg bg-white border cursor-pointer"
            onClick={() => setPaymentType("Cash")}
          >
            <FaMoneyBillAlt className={`mr-3 ${paymentType === "Cash" ? "text-customBlue" : "text-gray-500"}`} size={20} />
            <span className="flex-1 text-gray-700">Cash</span>
            <input
              type="radio"
              name="paymentType"
              checked={paymentType === "Cash"}
              onChange={() => setPaymentType("Cash")}
              className="form-radio text-customBlue h-5 w-5"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>
          {paymentType && (
            <button onClick={() => handlePaymentTypeSelection(paymentType)} className="px-4 py-2 rounded-lg bg-customBlue text-white">
              Pay Now
            </button>
          )}
        </div>
      </div>

      {showPaymentMethod && <PaymentMethodModal bill={bill} onClose={onClose} />}
    </div>
  );
};

export default PaymentTypeModal;
