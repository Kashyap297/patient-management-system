import React, { useState } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import master from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";
import api from "../../api/api";

const PaymentMethodModal = ({ bill, onClose }) => {
  const [selectedCard, setSelectedCard] = useState("MasterCard");
  const [cardDetails, setCardDetails] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setCardDetails({ ...cardDetails, [field]: value });
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePay = async () => {
    const newErrors = {};
    if (!cardDetails.holder) newErrors.holder = "Card Holder Name is required";
    if (!cardDetails.number) newErrors.number = "Card Number is required";
    if (!cardDetails.expiry) newErrors.expiry = "Expiry Date is required";
    if (!cardDetails.cvv) newErrors.cvv = "CVV is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // Make an API call to create a PayPal payment
        console.log(bill.totalAmount)
        const response = await api.post("/payment/create", { totalAmount: bill.totalAmount });
  
        if (response.data.forwardLink) {
          // Redirect the user to the PayPal approval page
          window.location.href = response.data.forwardLink;
        } else {
          alert("Payment creation failed. No approval link found.");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Payment initiation failed.");
      }
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Payment Method</h2>

        {/* Card Selection */}
        <div className="flex items-center justify-between mb-6">
          <button
            className={`flex items-center p-4 rounded-lg border-2 w-full ${selectedCard === "MasterCard" ? "border-blue-500" : "border-gray-300"}`}
            onClick={() => setSelectedCard("MasterCard")}
          >
            <FaCcMastercard className="mr-2 text-2xl text-blue-600" />
            <span className="text-gray-700">MasterCard</span>
            <input
              type="radio"
              name="cardType"
              checked={selectedCard === "MasterCard"}
              onChange={() => setSelectedCard("MasterCard")}
              className="ml-auto h-5 w-5"
            />
          </button>

          <button
            className={`flex items-center p-4 rounded-lg border-2 w-full ml-4 ${selectedCard === "Visa" ? "border-blue-500" : "border-gray-300"}`}
            onClick={() => setSelectedCard("Visa")}
          >
            <FaCcVisa className="mr-2 text-2xl text-blue-600" />
            <span className="text-gray-700">Visa</span>
            <input
              type="radio"
              name="cardType"
              checked={selectedCard === "Visa"}
              onChange={() => setSelectedCard("Visa")}
              className="ml-auto h-5 w-5"
            />
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {["holder", "number", "expiry", "cvv"].map((field, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                placeholder={
                  field === "holder"
                    ? "Card Holder Name"
                    : field === "number"
                      ? "Card Number"
                      : field === "expiry"
                        ? "MM/YY Expiry Date"
                        : "CVV"
                }
                value={cardDetails[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`w-full p-4 border rounded-lg ${errors[field] ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-blue-500 text-lg`}
              />
              {errors[field] && (
                <span className="text-xs text-red-500 mt-1 absolute top-full">
                  {errors[field]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded border-2 w-full font-semibold">
            Cancel
          </button>
          <button
            onClick={handlePay}
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold w-full"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
