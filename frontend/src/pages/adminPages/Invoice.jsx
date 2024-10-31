import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api"; // Ensure your API utility is correctly imported
import logo from "../../assets/images/logo.png"; // Hospital logo

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

  const items = invoiceData || []; // Get items for the invoice
  console.log(items)
  return (
    <div className="p-6 bg-white rounded-2xl max-w-3xl mx-auto shadow-md">
      {/* Logo and Header */}
      <div className="flex justify-between mb-6">
        <img src={logo} alt="Hospital Logo" className="w-48" />
        <h1 className="text-4xl font-semibold text-customBlue">Invoice</h1>
      </div>

      {/* Hospital and Patient Details */}
      <div className="flex justify-between mb-3">
        <div className="w-2/3">
          <h2 className="font-semibold text-lg text-gray-700">
            Dr. {invoiceData?.doctor?.firstName} {invoiceData?.doctor?.lastName}
          </h2>
          <p className="text-sm text-gray-600">
            {invoiceData?.doctor?.doctorDetails?.description}
          </p>
        </div>
        <div>
          <p>
            <strong>Bill No:</strong> {invoiceData?.billNumber}
          </p>
          <p>
            <strong>Bill Date:</strong> {new Date(invoiceData?.billDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Bill Time:</strong> {invoiceData?.billTime}
          </p>
        </div>
      </div>

      {/* Doctor and Patient Information */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Name : </strong> {invoiceData?.patient?.firstName} {invoiceData?.patient?.lastName}
          </p>
          <p>
            <strong>Disease Name : </strong> {invoiceData?.diseaseName}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <p>
            <strong>Gender : </strong> {invoiceData.gender}
          </p>
          <p>
            <strong>Phone Number : </strong> {invoiceData.phoneNumber}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <p>
            <strong>Age : </strong> {invoiceData?.patient?.age} Years
          </p>
          <p>
            <strong>Payment Type : </strong>
            <span className="text-blue-500">{invoiceData?.paymentType}</span>
          </p>
        </div>
        <div className="mt-2">
          <p>
            <strong>Address : </strong> {invoiceData.address}
          </p>
        </div>
      </div>

      {/* Invoice Table */}
      <table className="w-full bg-white rounded-lg mb-6 overflow-hidden">
        <thead className="bg-customBlue text-white text-left rounded-t-lg">
          <tr>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Qty</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>

          <tr className="border-b">
            <td className="px-4 py-2">{invoiceData.description}</td>
            <td className="px-4 py-2">₹ {invoiceData.amount}</td>
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">₹ {invoiceData.amount}</td>
          </tr>
        </tbody>
      </table>

      {/* Summary with Conditional Insurance Section */}
      <div className="flex justify-between">
        {invoiceData?.insuranceDetails?.insuranceCompany && (
          <div className="mb-4 text-left">
            <p>
              <strong>Insurance Company : </strong> {invoiceData.insuranceDetails.insuranceCompany}
            </p>
            <p>
              <strong>Insurance Plan : </strong> {invoiceData.insuranceDetails.insurancePlan}
            </p>
            <p>
              <strong>Claim Amount : </strong> ₹ {invoiceData.insuranceDetails.claimAmount}
            </p>
            <p>
              <strong>Claimed Amount : </strong> ₹ {invoiceData.insuranceDetails.claimedAmount}
            </p>
          </div>
        )}
        <div>
          <p>
            <strong>Amount : </strong> ₹ {invoiceData?.amount}
          </p>
          <p>
            <strong>Discount 5% : </strong> ₹ {invoiceData?.discount}
          </p>
          <p>
            <strong>Tax : </strong> ₹ {invoiceData?.tax}
          </p>
          <p className="font-semibold text-customBlue">
            <strong>Total Amount : </strong> ₹ {invoiceData?.totalAmount}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm bg-customBlue p-2 rounded-b-lg text-white flex justify-between mt-4">
        <p>Call: +7895461204</p>
        <p>Email: Hello@Gmail.com</p>
      </div>
    </div>
  );
};

export default Invoice;
