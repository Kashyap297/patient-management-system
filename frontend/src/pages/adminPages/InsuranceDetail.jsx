import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import api from "../../api/api"; // Import your API utility

const InsuranceDetail = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up">
        <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50">
          <div className="flex justify-between items-center mb-8 border-b border-gray-200/50 pb-6">
            <div className="flex items-center gap-4">
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="p-2.5 rounded-full bg-white shadow-sm hover:bg-gray-50 text-gray-600 transition-colors border border-gray-100 flex items-center justify-center"
              >
                <FaChevronLeft size={16} />
              </button>
              <h2 className="text-3xl font-extrabold text-secondary tracking-tight">
                Invoice Details
              </h2>
            </div>
            <div className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
              <span className="text-primary font-bold">Bill No:</span> 
              <span className="ml-2 text-secondary font-semibold">{invoiceData.billNumber}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Doctor Info */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-secondary mb-2">{`${invoiceData.doctor.firstName} ${invoiceData.doctor.lastName}`}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis nulla, finibus sodales erat porta eu.
              </p>
            </div>

            {/* Bill Details */}
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 backdrop-blur-md rounded-2xl p-6 border border-blue-100 shadow-inner flex flex-col justify-center space-y-3">
              <div className="flex justify-between items-center bg-white/50 px-4 py-2 rounded-xl">
                <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Bill No</span>
                <span className="font-semibold text-secondary">{invoiceData.billNumber}</span>
              </div>
              <div className="flex justify-between items-center bg-white/50 px-4 py-2 rounded-xl">
                <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Bill Date</span>
                <span className="font-semibold text-secondary">{new Date(invoiceData.billDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center bg-white/50 px-4 py-2 rounded-xl">
                <span className="text-gray-500 font-medium text-sm uppercase tracking-wider">Bill Time</span>
                <span className="font-semibold text-secondary">{invoiceData.billTime}</span>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-secondary mb-4 flex items-center">
              <span className="bg-primary/20 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </span>
              Patient Details
            </h4>
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Name</p>
                  <p className="font-medium text-secondary">{`${invoiceData.patient.firstName} ${invoiceData.patient.lastName}`}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Gender</p>
                  <p className="font-medium text-secondary">{invoiceData.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Age</p>
                  <p className="font-medium text-secondary">{invoiceData.age} Years</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Disease Name</p>
                  <p className="font-medium text-secondary">{invoiceData.diseaseName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Phone Number</p>
                  <p className="font-medium text-secondary">{invoiceData.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Payment Type</p>
                  <p className="font-medium text-secondary">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {invoiceData.paymentType}
                    </span>
                  </p>
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Address</p>
                  <p className="font-medium text-secondary">{invoiceData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          {invoiceData.items && invoiceData.items.length > 0 && (
            <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white/50 backdrop-blur-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200">
                    <th className="py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Description</th>
                    <th className="py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Amount</th>
                    <th className="py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider">Qty</th>
                    <th className="py-4 px-6 font-semibold text-gray-600 text-sm uppercase tracking-wider text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoiceData.items.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-gray-800">{item.description}</td>
                      <td className="py-4 px-6 text-gray-600">₹{item.amount}</td>
                      <td className="py-4 px-6 text-gray-600">{item.qty}</td>
                      <td className="py-4 px-6 text-secondary font-medium text-right">₹{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Insurance Details */}
            {invoiceData.insuranceDetails && invoiceData.insuranceDetails.insuranceCompany && (
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm">
                <h4 className="text-lg font-bold text-secondary mb-4 flex items-center border-b border-gray-200/50 pb-3">
                  <span className="bg-blue-100 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </span>
                  Insurance Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium text-sm">Company</span>
                    <span className="font-semibold text-secondary">{invoiceData.insuranceDetails.insuranceCompany}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium text-sm">Plan</span>
                    <span className="font-semibold text-secondary">{invoiceData.insuranceDetails.insurancePlan}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium text-sm">Claim Amount</span>
                    <span className="font-semibold text-secondary">₹{invoiceData.insuranceDetails.claimAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium text-sm">Claimed Amount</span>
                    <span className="font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">₹{invoiceData.insuranceDetails.claimedAmount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Total Summary */}
            <div className={`bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-sm ${!invoiceData.insuranceDetails?.insuranceCompany ? 'lg:col-start-2' : ''}`}>
              <h4 className="text-lg font-bold text-secondary mb-4 border-b border-gray-200/50 pb-3">Payment Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Subtotal Amount</span>
                  <span className="font-medium text-gray-700">₹{invoiceData.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Discount</span>
                  <span className="font-medium text-red-500">- ₹{invoiceData.discount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Tax</span>
                  <span className="font-medium text-gray-700">+ ₹{invoiceData.tax}</span>
                </div>
                <div className="pt-4 mt-2 border-t border-gray-200/80 flex justify-between items-center">
                  <span className="text-gray-800 font-bold text-lg">Total Amount</span>
                  <span className="text-primary text-2xl font-black bg-primary/10 px-4 py-1 rounded-xl shadow-inner border border-primary/20">₹{invoiceData.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetail;
