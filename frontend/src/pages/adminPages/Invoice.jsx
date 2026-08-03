import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../../api/api";
import logo from "../../assets/images/logo.png";

const Invoice = () => {
  const { billId } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await api.get(`/invoice/${billId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setInvoiceData(response.data.invoice);
        console.log(response.data.invoice);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoiceData();
  }, [billId]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl max-w-4xl w-full shadow-xl border border-white/50 overflow-hidden relative animate-slide-up">
        {/* Decorative blur elements */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

        {/* Header */}
        <div className="relative overflow-hidden mb-8 p-8 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
            <div className="flex flex-col">
              {loading ? (
                <Skeleton height={50} width={200} className="rounded-xl" />
              ) : (
                <img src={invoiceData?.logoUrl || logo} alt="Hospital Logo" className="h-16 object-contain" />
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
              {loading ? <Skeleton width={150} /> : "INVOICE"}
            </h1>
          </div>
        </div>

        <div className="px-8 pb-8 relative z-10">
          {/* Hospital and Patient Details */}
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
            <div className="w-full md:w-2/3">
              <h2 className="font-extrabold text-xl text-gray-800 mb-1">
                {loading ? <Skeleton width={120} /> : `Dr. ${invoiceData?.doctor?.firstName} ${invoiceData?.doctor?.lastName}`}
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                {loading ? <Skeleton width={150} /> : invoiceData?.doctor?.doctorDetails?.description}
              </p>
            </div>
            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 min-w-[200px]">
              <div className="space-y-2 text-sm">
                <p className="flex justify-between"><span className="text-gray-500 font-medium">Bill No:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={60} /> : invoiceData?.billNumber}</span></p>
                <p className="flex justify-between"><span className="text-gray-500 font-medium">Date:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={60} /> : new Date(invoiceData?.billDate).toLocaleDateString()}</span></p>
                <p className="flex justify-between"><span className="text-gray-500 font-medium">Time:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={60} /> : invoiceData?.billTime}</span></p>
              </div>
            </div>
          </div>

          {/* Patient Information Box */}
          <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-2xl mb-8 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <p className="flex justify-between md:justify-start md:gap-2"><span className="text-gray-500 font-medium w-28">Name:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={120} /> : `${invoiceData?.patient?.firstName} ${invoiceData?.patient?.lastName}`}</span></p>
              <p className="flex justify-between md:justify-start md:gap-2"><span className="text-gray-500 font-medium w-28">Disease:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={120} /> : invoiceData?.diseaseName}</span></p>
              <p className="flex justify-between md:justify-start md:gap-2"><span className="text-gray-500 font-medium w-28">Gender:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={60} /> : invoiceData?.gender}</span></p>
              <p className="flex justify-between md:justify-start md:gap-2"><span className="text-gray-500 font-medium w-28">Phone:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={100} /> : invoiceData?.phoneNumber}</span></p>
              <p className="flex justify-between md:justify-start md:gap-2"><span className="text-gray-500 font-medium w-28">Age:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={40} /> : `${invoiceData?.age} Yrs`}</span></p>
              <p className="flex justify-between md:justify-start md:gap-2"><span className="text-gray-500 font-medium w-28">Payment Type:</span> <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{loading ? <Skeleton width={80} /> : invoiceData?.paymentType}</span></p>
              <p className="flex justify-between md:justify-start md:gap-2 md:col-span-2"><span className="text-gray-500 font-medium w-28">Address:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={200} /> : invoiceData?.address}</span></p>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="overflow-hidden rounded-2xl border border-gray-100 mb-8 shadow-sm">
            <table className="w-full text-left table-auto">
              <thead className="bg-gradient-to-r from-primary to-blue-500 text-white">
                <tr>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Description</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Amount</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-center">Qty</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs text-right">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800 font-medium">{loading ? <Skeleton width={150} /> : invoiceData.description}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium text-right">{loading ? <Skeleton width={60} /> : `₹ ${invoiceData.amount}`}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium text-center">{loading ? <Skeleton width={20} /> : "1"}</td>
                  <td className="px-6 py-4 text-gray-800 font-bold text-right">{loading ? <Skeleton width={60} /> : `₹ ${invoiceData.amount}`}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 border-t border-gray-100 pt-8">
            <div className="w-full md:w-1/2">
              {invoiceData?.insuranceDetails?.insuranceCompany && (
                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                  <h3 className="font-bold text-primary mb-3 text-sm uppercase tracking-wider">Insurance Details</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between"><span className="text-gray-500">Company:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={100} /> : invoiceData.insuranceDetails.insuranceCompany}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Plan:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={100} /> : invoiceData.insuranceDetails.insurancePlan}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Claim Amount:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={80} /> : `₹ ${invoiceData.insuranceDetails.claimAmount}`}</span></p>
                    <p className="flex justify-between"><span className="text-gray-500">Claimed:</span> <span className="font-bold text-green-600">{loading ? <Skeleton width={80} /> : `₹ ${invoiceData.insuranceDetails.claimedAmount}`}</span></p>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full md:w-80 space-y-3 text-sm bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
              <p className="flex justify-between"><span className="text-gray-500 font-medium">Subtotal:</span> <span className="font-bold text-gray-800">{loading ? <Skeleton width={80} /> : `₹ ${invoiceData?.amount}`}</span></p>
              <p className="flex justify-between"><span className="text-gray-500 font-medium">Discount (5%):</span> <span className="font-bold text-green-500">{loading ? <Skeleton width={80} /> : `- ₹ ${invoiceData?.discount}`}</span></p>
              <p className="flex justify-between pb-3 border-b border-gray-200"><span className="text-gray-500 font-medium">Tax:</span> <span className="font-bold text-red-500">{loading ? <Skeleton width={80} /> : `+ ₹ ${invoiceData?.tax}`}</span></p>
              <p className="flex justify-between items-center pt-2"><span className="text-gray-800 font-extrabold text-lg">Total:</span> <span className="font-extrabold text-2xl text-primary">{loading ? <Skeleton width={100} /> : `₹ ${invoiceData?.totalAmount}`}</span></p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-8">
            <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wider">Terms & Conditions</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {loading ? <Skeleton count={2} /> : "Payment is due within 30 days of the invoice date. Please make checks payable to the hospital. Thank you for choosing our services."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-primary to-blue-500 p-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-white/90 text-sm font-medium">
          <p className="flex items-center gap-2">
            <span className="bg-white/20 p-1.5 rounded-lg"><FaPhoneAlt className="w-4 h-4" /></span>
            {invoiceData?.phoneNumber || "+91 00000 00000"}
          </p>
          <p className="flex items-center gap-2">
            <span className="bg-white/20 p-1.5 rounded-lg">@</span>
            {invoiceData?.email || "hospital@example.com"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
