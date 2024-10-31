import React from "react";
import { FaTimes } from "react-icons/fa";
import bg from "../../assets/images/Maskgroup.png";
import logo from "../../assets/images/logo.png";

const InvoiceModal = ({ bill, onClose, onPay, showPayButton }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`, // Use the imported image variable
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-2/5 relative z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          <FaTimes size={20} />
        </button>
        
        {/* Hospital and Patient Details */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <img src={logo} alt="logo" />
            <h2 className="text-6xl font-semibold text-customBlue">Invoice</h2>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-2xl">Dr. {bill.doctor.firstName} {bill.doctor.lastName}</p>
              <p className="text-gray-600">{bill.hospital.name}</p>
            </div>
            <div>
              <p>
                <strong>Bill No:</strong> {bill.billNumber}
              </p>
              <p>
                <strong>Bill Date:</strong> {new Date(bill.billDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Bill Time:</strong> {bill.billTime}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-2 mb-4 bg-gray-50 rounded-lg p-4">
          {/* First Column */}
          <div>
            <p className="py-1">
              <strong>Name:</strong> {bill.patient.firstName} {bill.patient.lastName}
            </p>
            <p className="py-1">
              <strong>Disease Name:</strong> {bill.diseaseName}
            </p>
            <p className="py-1">
              <strong>Gender:</strong> {bill.gender}
            </p>
          </div>

          {/* Second Column */}
          <div>
            <p className="py-1">
              <strong>Phone Number:</strong> {bill.phoneNumber}
            </p>
            <p className="py-1">
              <strong>Age:</strong> {bill.age} Years
            </p>
            <p className="py-1 text-customBlue">
              <strong className="text-black">Payment Type:</strong> {bill.paymentType}
            </p>
          </div>

          {/* Last Row Spanning Full Width */}
          <div className="col-span-2">
            <p className="py-1">
              <strong>Address:</strong> {bill.address}
            </p>
          </div>
        </div>

        {/* Itemized List of Services */}
        {/* For demonstration, I assume that the `bill.description` contains the service description.
            Adjust the data here according to your object structure. */}
        <div className="rounded-md mb-4">
          <table className="w-full text-left rounded-t-lg">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-customBlue">
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-2">{bill.description}</td>
                <td>₹ {bill.amount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p>
              <strong>Insurance Company:</strong> {bill.insuranceDetails.insuranceCompany || "N/A"}
            </p>
            <p>
              <strong>Insurance Plan:</strong> {bill.insuranceDetails.insurancePlan || "N/A"}
            </p>
            <p>
              <strong>Claim Amount:</strong> ₹ {bill.insuranceDetails.claimAmount || 0}
            </p>
            <p>
              <strong>Claimed Amount:</strong> ₹ {bill.insuranceDetails.claimedAmount || 0}
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>Amount:</strong> ₹ {bill.amount.toLocaleString()}
            </p>
            <p>
              <strong>Discount:</strong> -₹ {bill.discount.toLocaleString()}
            </p>
            <p>
              <strong>Tax:</strong> ₹ {bill.tax.toLocaleString()}
            </p>
            <p className="text-xl font-semibold">
              <strong>Total:</strong> ₹ {bill.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Footer with Pay Now Button */}
        {showPayButton && (
          <div className="text-center">
            <button
              className="bg-customBlue text-white py-2 px-6 rounded"
              onClick={onPay}
            >
              Pay Now
            </button>
          </div>
        )}

        {/* Contact Info */}
        <div className="text-center mt-6">
          <p>Call: +1111111111 | Email: hello@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
