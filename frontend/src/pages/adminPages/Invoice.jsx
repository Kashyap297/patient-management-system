import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api"; // Ensure your API utility is correctly imported

const Invoice = () => {
  const { billId } = useParams(); // Retrieve the dynamic parameter
  const [invoiceData, setInvoiceData] = useState(null); // State for storing invoice data

  useEffect(() => {
    // Fetch invoice data by ID
    const fetchInvoiceData = async () => {
      try {
        const response = await api.get(`/invoice/${billId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is required
          },
        });
        setInvoiceData(response.data.invoice);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };
    fetchInvoiceData();
  }, [billId]);

  if (!invoiceData) {
    return <p>Loading...</p>; // Show a loading message while data is being fetched
  }

  return (
    <div className="p-6 bg-white min-h-screen shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold">Invoice</h1>
          <h2 className="text-xl font-semibold text-blue-600">
            Dr. {invoiceData.doctor.firstName} {invoiceData.doctor.lastName}
          </h2>
          <p>
            {new Date(invoiceData.billDate).toLocaleDateString()} |{" "}
            {invoiceData.billTime}
          </p>
        </div>
      </div>

      {/* Patient Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
        <p>
          <strong>Name:</strong> {invoiceData.patient.firstName}{" "}
          {invoiceData.patient.lastName}
        </p>
        <p>
          <strong>Gender:</strong> {invoiceData.gender}
        </p>
        <p>
          <strong>Age:</strong> {invoiceData.age}
        </p>
        <p>
          <strong>Address:</strong> {invoiceData.address}
        </p>
        <p>
          <strong>Disease Name:</strong> {invoiceData.diseaseName}
        </p>
        <p>
          <strong>Phone Number:</strong> {invoiceData.phoneNumber}
        </p>
        <p>
          <strong>Payment Type:</strong> {invoiceData.paymentType}
        </p>
        <p>
          <strong>Status:</strong> {invoiceData.status}
        </p>
      </div>

      {/* Invoice Table */}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg mb-6">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 text-left font-semibold">Description</th>
            <th className="p-3 text-left font-semibold">Amount</th>
            <th className="p-3 text-left font-semibold">Qty</th>
            <th className="p-3 text-left font-semibold">Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Assuming `items` is a field in your API response */}
          <tr>
            <td className="p-3">{invoiceData.description}</td>
            <td className="p-3">₹ {invoiceData.amount}</td>
            <td className="p-3">1</td>
            <td className="p-3">₹ {invoiceData.amount}</td>
          </tr>
        </tbody>
      </table>

      {/* Summary */}
      <div className="text-right">
        <p className="text-lg">
          <strong>Amount: </strong>₹ {invoiceData.amount}
        </p>
        <p className="text-lg">
          <strong>Discount: </strong>₹ {invoiceData.discount}
        </p>
        <p className="text-lg">
          <strong>Tax: </strong>₹ {invoiceData.tax}
        </p>
        <p className="text-2xl font-semibold text-blue-600">
          <strong>Total Amount: </strong>₹ {invoiceData.totalAmount}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between text-sm">
        <p>Call: +90854 22354</p>
        <p>Email: Hello@Gmail.com</p>
      </div>
    </div>
  );
};

export default Invoice;
