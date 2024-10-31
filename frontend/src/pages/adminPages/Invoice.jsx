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

  return (
    <div className="bg-white rounded-2xl max-w-3xl mx-auto shadow-md border border-gray-200 overflow-hidden">
      {/* Header with Background and Polygon Design */}
      <div className="relative overflow-hidden mb-6">
        {/* Blue bar with right-side polygon cut */}
        <div
          className="absolute top-0 left-0 bg-[#87d5f5] p-2 w-5/12 h-4"
          style={{
            clipPath: "polygon(0 0, 90% 0, 85% 100%, 0% 100%)",
          }}
        ></div>
        
        {/* Light blue circle in background */}
        <div className="absolute top-[-150px] right-[-20px] w-72 h-72 bg-[#e7f7fd] rounded-full bg-opacity-50"></div>
        
        <div className="flex justify-between items-center mt-12 px-6">
          <div className="flex flex-col">
            <img src={logo} alt="Hospital Logo" className="w-64" />
          </div>
          <h1 className="absolute right-[25px] top-[20px] text-6xl font-semibold text-[#0eabeb] z-10">
            Invoice
          </h1>
        </div>
      </div>

      <div className="px-8">
        {/* Hospital and Patient Details */}
        <div className="flex justify-between mb-3 px-5">
          <div className="w-2/3">
            <h2 className="font-semibold text-lg text-gray-700">
              Dr. {invoiceData?.doctor?.firstName} {invoiceData?.doctor?.lastName}
            </h2>
            <p className="text-sm text-gray-600">{invoiceData?.doctor?.doctorDetails?.description}</p>
          </div>
          <div>
            <p><strong>Bill No:</strong> {invoiceData?.billNumber}</p>
            <p><strong>Bill Date:</strong> {new Date(invoiceData?.billDate).toLocaleDateString()}</p>
            <p><strong>Bill Time:</strong> {invoiceData?.billTime}</p>
          </div>
        </div>

        {/* Doctor and Patient Information */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6 px-5">
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name :</strong> {invoiceData?.patient?.firstName} {invoiceData?.patient?.lastName}</p>
            <p><strong>Disease Name :</strong> {invoiceData?.diseaseName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p><strong>Gender :</strong> {invoiceData?.gender}</p>
            <p><strong>Phone Number :</strong> {invoiceData?.phoneNumber}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p><strong>Age :</strong> {invoiceData?.patient?.age} Years</p>
            <p><strong>Payment Type :</strong> <span className="text-blue-500">{invoiceData?.paymentType}</span></p>
          </div>
          <div className="mt-2">
            <p><strong>Address :</strong> {invoiceData?.address}</p>
          </div>
        </div>

        {/* Invoice Table */}
        <table className="w-full bg-white rounded-lg mb-6 overflow-hidden">
          <thead className="bg-[#0EABEB] text-white text-left">
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
        <div className="flex justify-between px-4">
          {invoiceData?.insuranceDetails?.insuranceCompany && (
            <div className="mb-4 text-left">
              <p><strong>Insurance Company :</strong> {invoiceData.insuranceDetails.insuranceCompany}</p>
              <p><strong>Insurance Plan :</strong> {invoiceData.insuranceDetails.insurancePlan}</p>
              <p><strong>Claim Amount :</strong> ₹ {invoiceData.insuranceDetails.claimAmount}</p>
              <p><strong>Claimed Amount :</strong> ₹ {invoiceData.insuranceDetails.claimedAmount}</p>
            </div>
          )}
          <div>
            <p><strong>Amount :</strong> ₹ {invoiceData?.amount}</p>
            <p><strong>Discount 5% :</strong> ₹ {invoiceData?.discount}</p>
            <p><strong>Tax :</strong> ₹ {invoiceData?.tax}</p>
            <p className="font-semibold text-[#0EABEB]"><strong>Total Amount :</strong> ₹ {invoiceData?.totalAmount}</p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-6 px-4">
          <h3 className="font-semibold">Terms & Conditions :</h3>
          <p className="text-gray-600 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis nulla, finibus sodales erat porta eu.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm bg-[#0EABEB] p-2 rounded-b-lg text-white flex justify-between px-8 mt-4">
        <p>Call: +90854 22354</p>
        <p>Email: Hello@Gmail.com</p>
      </div>
    </div>
  );
};

export default Invoice;
