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
              <p className="font-bold text-2xl">Dr. {bill.doctor}</p>
              <p className="text-gray-600">{bill.hospital}</p>
            </div>
            <div>
              <p>
                <strong>Bill No:</strong> 1234
              </p>
              <p>
                <strong>Bill Date:</strong> 20 June, 2020
              </p>
              <p>
                <strong>Bill Time:</strong> 10:45 PM
              </p>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="grid grid-cols-2 mb-4 bg-gray-50 rounded-lg p-4">
          {/* First Column */}
          <div>
            <p className="py-1">
              <strong>Name:</strong> Miracle Kenter
            </p>
            <p className="py-1">
              <strong>Disease Name:</strong> Stomach Pain
            </p>
            <p className="py-1">
              <strong>Gender:</strong> Male
            </p>
          </div>

          {/* Second Column */}
          <div>
            <p className="py-1">
              <strong>Phone Number:</strong> 995796557
            </p>
            <p className="py-1">
              <strong>Age:</strong> 36 Years
            </p>
            <p className="py-1 text-customBlue">
              <strong className="text-black">Payment Type:</strong> Insurance
            </p>
          </div>

          {/* Last Row Spanning Full Width */}
          <div className="col-span-2">
            <p className="py-1">
              <strong>Address:</strong> B-105 Virat Bungalows, Jamnagar
            </p>
          </div>
        </div>

        {/* Itemized List of Services */}
        <div className="rounded-md mb-4">
          <table className="w-full text-left rounded-t-lg">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-customBlue">
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-2">Neuromuscular blockers</td>
                <td>₹ 12,000.00</td>
                <td>2</td>
                <td>₹ 24,000.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">Neuromuscular blockers</td>
                <td>₹ 800.00</td>
                <td>2</td>
                <td>₹ 1,600.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">Methotrexate (HDMTX)</td>
                <td>₹ 1,000.00</td>
                <td>2</td>
                <td>₹ 2,000.00</td>
              </tr>
              <tr>
                <td className="p-2">Hydroxyurea for sickle cell</td>
                <td>₹ 20.00</td>
                <td>2</td>
                <td>₹ 40.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p>
              <strong>Insurance Company:</strong> HDFC Life Insurance
            </p>
            <p>
              <strong>Insurance Plan:</strong> Health Insurance
            </p>
            <p>
              <strong>Claim Amount:</strong> ₹ 2,000.00
            </p>
            <p>
              <strong>Claimed Amount:</strong> ₹ 2,500.00
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>Amount:</strong> ₹ 25,840.00
            </p>
            <p>
              <strong>Discount 5%:</strong> -₹ 1,292.00
            </p>
            <p>
              <strong>Tax:</strong> ₹ 120.00
            </p>
            <p className="text-xl font-semibold">
              <strong>Total:</strong> ₹ 24,668.00
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
          <p>Call: +90854 22354 | Email: hello@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
