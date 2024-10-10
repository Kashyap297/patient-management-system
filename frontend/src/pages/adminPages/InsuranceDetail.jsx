import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../../api/api"; // Import your API utility

const InsuranceDetail = () => {
  const { id } = useParams(); // Get the invoice ID from the URL
  const [invoiceData, setInvoiceData] = useState(null); // State to store the fetched invoice data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the invoice data from the API using the ID
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await api.get(`/invoice/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setInvoiceData(response.data.invoice); // Assuming the data structure has the invoice in `invoice` key
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!invoiceData) {
    return <p>No invoice details found.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Invoice for Bill No: {invoiceData.billNumber}</h2>
      </div>
      <div className="bg-white shadow-lg rounded p-4">
        {/* Invoice Header */}
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-bold">{`${invoiceData.doctor.firstName} ${invoiceData.doctor.lastName}`}</h3>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis nulla, finibus sodales erat porta eu.
            </p>
          </div>
          <div>
            <p><strong>Bill No:</strong> {invoiceData.billNumber}</p>
            <p><strong>Bill Date:</strong> {new Date(invoiceData.billDate).toLocaleDateString()}</p>
            <p><strong>Bill Time:</strong> {invoiceData.billTime}</p>
          </div>
        </div>

        {/* Patient Details */}
        <div className="mt-4">
          <h4 className="font-bold">Patient Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> {`${invoiceData.patient.firstName} ${invoiceData.patient.lastName}`}</p>
            <p><strong>Gender:</strong> {invoiceData.gender}</p>
            <p><strong>Age:</strong> {invoiceData.age} Years</p>
            <p><strong>Disease Name:</strong> {invoiceData.diseaseName}</p>
            <p><strong>Phone Number:</strong> {invoiceData.phoneNumber}</p>
            <p><strong>Payment Type:</strong> {invoiceData.paymentType}</p>
            <p><strong>Address:</strong> {invoiceData.address}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="min-w-full table-auto mt-6">
          <thead>
            <tr>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items && invoiceData.items.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{item.description}</td>
                <td className="p-3">{item.amount}</td>
                <td className="p-3">{item.qty}</td>
                <td className="p-3">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Insurance and Summary */}
        <div className="mt-6">
          <p><strong>Insurance Company:</strong> {invoiceData.insuranceDetails.insuranceCompany}</p>
          <p><strong>Insurance Plan:</strong> {invoiceData.insuranceDetails.insurancePlan}</p>
          <p><strong>Claim Amount:</strong> ₹{invoiceData.insuranceDetails.claimAmount}</p>
          <p><strong>Claimed Amount:</strong> ₹{invoiceData.insuranceDetails.claimedAmount}</p>
        </div>

        {/* Total Summary */}
        <div className="mt-6 flex justify-end">
          <div>
            <p><strong>Amount:</strong> ₹{invoiceData.amount}</p>
            <p><strong>Discount:</strong> ₹{invoiceData.discount}</p>
            <p><strong>Tax:</strong> ₹{invoiceData.tax}</p>
            <p className="text-blue-600 text-lg font-bold"><strong>Total Amount:</strong> ₹{invoiceData.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetail;
