import React, { useState } from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import master from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";

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

  const handlePay = () => {
    // Validate form fields
    const newErrors = {};
    if (!cardDetails.holder) newErrors.holder = "Card Holder Name is required";
    if (!cardDetails.number) newErrors.number = "Card Number is required";
    if (!cardDetails.expiry) newErrors.expiry = "Expiry Date is required";
    if (!cardDetails.cvv) newErrors.cvv = "CVV is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Payment Successful");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-50 p-6 rounded-md shadow-md w-1/4">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

        {/* Card Selection */}
        <div className="flex items-center  space-x-4 mb-4 ">
          <button
            className={`flex items-center p-4 rounded  w-full bg-white`}
            onClick={() => setSelectedCard("MasterCard")}
          >
            <img src={master} alt="icon" className="mr-2" />
            <span className="text-gray-700">Master Card</span>
            <input
              type="radio"
              name="cardType"
              checked={selectedCard === "MasterCard"}
              onChange={() => setSelectedCard("MasterCard")}
              className="ml-auto form-radio text-customBlue p-2 h-5 w-5"
            />
          </button>

          <button
            className={`flex items-center p-4 rounded  w-full bg-white`}
            onClick={() => setSelectedCard("Visa")}
          >
            <img src={visa} alt="icon" className="mr-2" />
            <span className="text-gray-700">Visa Card</span>
            <input
              type="radio"
              name="cardType"
              checked={selectedCard === "Visa"}
              onChange={() => setSelectedCard("Visa")}
              className="ml-auto  form-radio text-customBlue "
            />
          </button>
        </div>
        <div className="bg-white p-4">
          {/* Input Fields */}
          {["holder", "number", "expiry", "cvv"].map((field, index) => (
            <div key={index} className="relative mt-4 ">
              <input
                type="text"
                placeholder={
                  field === "holder"
                    ? "Card Holder Name"
                    : field === "number"
                    ? "Card Number"
                    : field === "expiry"
                    ? "Expiry Date"
                    : "CVV"
                }
                value={cardDetails[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`w-full p-4 border rounded-lg ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border-customBlue peer`}
              />
              <label className="absolute left-3 -top-2.5 px-1 bg-white  font-medium text-gray-500 transition-all duration-200 peer-focus:-top-2.5 peer-focus:left-3">
                {field === "holder"
                  ? "Enter Name"
                  : field === "number"
                  ? "Enter Number"
                  : field === "expiry"
                  ? "Expiry Date"
                  : "CVV"}
              </label>
              {errors[field] && (
                <span className="text-xs text-red-500 mt-1">
                  {errors[field]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded border-2">
            Cancel
          </button>
          <button
            onClick={handlePay}
            className="px-4 py-2 rounded bg-customBlue text-white"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
