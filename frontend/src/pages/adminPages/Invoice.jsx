import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaPrint, FaChevronLeft } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import api from "../../api/api";
import logo from "../../assets/images/logo.png";

const Invoice = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
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
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoiceData();
  }, [billId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 flex flex-col items-center">
      
      {/* Top Action Bar (Hidden on Print) */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 print:hidden animate-slide-up">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors font-medium"
        >
          <FaChevronLeft size={14} /> Back
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl shadow-md hover:bg-primary/90 transition-colors font-bold tracking-wide"
        >
          <FaPrint size={16} /> Print Invoice
        </button>
      </div>

      {/* Main Invoice Card */}
      <div className="bg-white rounded-[2rem] max-w-4xl w-full shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative animate-slide-up bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] print:shadow-none print:border-none print:w-full print:max-w-full">
        
        {/* Header Section */}
        <div className="p-10 md:p-12 border-b border-gray-100 bg-white/90 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
            {/* Logo & Hospital Info */}
            <div>
              {loading ? (
                <Skeleton height={60} width={180} className="rounded-xl mb-4" />
              ) : (
                <img src={invoiceData?.logoUrl || logo} alt="Hospital Logo" className="h-14 object-contain mb-4" />
              )}
              <h2 className="text-xl font-bold text-gray-800">
                {loading ? <Skeleton width={200} /> : "Hospital Management System"}
              </h2>
              <p className="text-gray-500 text-sm mt-1 max-w-xs">
                {loading ? <Skeleton width={250} /> : "Providing world-class healthcare services and advanced medical treatments."}
              </p>
            </div>

            {/* Invoice Details */}
            <div className="text-left md:text-right w-full md:w-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4">
                {loading ? <Skeleton width={150} /> : "INVOICE"}
              </h1>
              
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 inline-block text-left min-w-[220px]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Invoice No</span>
                  <span className="font-extrabold text-gray-800">{loading ? <Skeleton width={80} /> : invoiceData?.billNumber}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Date</span>
                  <span className="font-bold text-gray-700">{loading ? <Skeleton width={80} /> : new Date(invoiceData?.billDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Time</span>
                  <span className="font-bold text-gray-700">{loading ? <Skeleton width={80} /> : invoiceData?.billTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 md:p-12 bg-white/95 backdrop-blur-sm relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {/* Bill To (Patient) */}
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-primary/50"></span> Bill To
              </h3>
              {loading ? (
                <Skeleton count={4} className="mb-2" />
              ) : (
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-800">{`${invoiceData?.patient?.firstName} ${invoiceData?.patient?.lastName}`}</h4>
                  <p className="text-gray-500 font-medium pt-1">Gender: {invoiceData?.gender} | Age: {invoiceData?.age} Yrs</p>
                  <p className="text-gray-500">{invoiceData?.phoneNumber}</p>
                  <p className="text-gray-500 max-w-sm pt-2">{invoiceData?.address}</p>
                </div>
              )}
            </div>

            {/* Doctor Info */}
            <div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-blue-400/50"></span> Treated By
              </h3>
              {loading ? (
                <Skeleton count={3} className="mb-2" />
              ) : (
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-gray-800">Dr. {`${invoiceData?.doctor?.firstName} ${invoiceData?.doctor?.lastName}`}</h4>
                  <p className="text-primary font-semibold">{invoiceData?.doctor?.doctorDetails?.specialtyType || "Specialist"}</p>
                  <p className="text-gray-500 pt-1">Treatment: <span className="font-medium text-gray-700">{invoiceData?.diseaseName}</span></p>
                </div>
              )}
            </div>
          </div>

          {/* Invoice Table */}
          <div className="rounded-2xl border border-gray-100 overflow-hidden mb-10 shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">Description</th>
                  <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100 text-center">Qty</th>
                  <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100 text-right">Price</th>
                  <th className="px-6 py-4 font-bold text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="group hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-5 text-gray-800 font-semibold">{loading ? <Skeleton width={150} /> : invoiceData?.description || "Consultation & Treatment"}</td>
                  <td className="px-6 py-5 text-gray-600 text-center">{loading ? <Skeleton width={20} /> : "1"}</td>
                  <td className="px-6 py-5 text-gray-600 text-right">{loading ? <Skeleton width={60} /> : `₹${invoiceData?.amount}`}</td>
                  <td className="px-6 py-5 text-gray-800 font-bold text-right">{loading ? <Skeleton width={60} /> : `₹${invoiceData?.amount}`}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary & Insurance Section */}
          <div className="flex flex-col md:flex-row justify-between gap-10">
            {/* Insurance details or payment type */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Payment Info</h3>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Payment Method</span>
                  <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">{loading ? <Skeleton width={60} /> : invoiceData?.paymentType}</span>
                </div>
                
                {invoiceData?.insuranceDetails?.insuranceCompany ? (
                  <div className="space-y-2 mt-4">
                    <p className="font-bold text-gray-800 text-sm mb-2">Insurance Applied</p>
                    <p className="flex justify-between text-sm"><span className="text-gray-500">Provider:</span> <span className="font-semibold text-gray-700">{invoiceData.insuranceDetails.insuranceCompany}</span></p>
                    <p className="flex justify-between text-sm"><span className="text-gray-500">Plan:</span> <span className="font-semibold text-gray-700">{invoiceData.insuranceDetails.insurancePlan}</span></p>
                    <p className="flex justify-between text-sm"><span className="text-gray-500">Covered:</span> <span className="font-bold text-green-600">₹{invoiceData.insuranceDetails.claimedAmount}</span></p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">No insurance applied for this billing cycle.</p>
                )}
              </div>
            </div>

            {/* Calculations */}
            <div className="w-full md:w-80">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold">{loading ? <Skeleton width={80} /> : `₹${invoiceData?.amount}`}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-medium">Discount (5%)</span>
                  <span className="font-semibold text-green-500">{loading ? <Skeleton width={80} /> : `- ₹${invoiceData?.discount}`}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-medium">Tax</span>
                  <span className="font-semibold">{loading ? <Skeleton width={80} /> : `+ ₹${invoiceData?.tax}`}</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                  <div>
                    <span className="block text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Grand Total</span>
                  </div>
                  <span className="font-black text-3xl text-primary">{loading ? <Skeleton width={100} /> : `₹${invoiceData?.totalAmount}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
            <p className="text-gray-400 text-xs font-medium text-center md:text-left max-w-md">
              Payment is due within 30 days of the invoice date. Please make checks payable to the hospital. Thank you for choosing our services.
            </p>
            <div className="flex gap-6 text-sm font-semibold text-gray-500">
              <span className="flex items-center gap-2"><FaPhoneAlt className="text-primary/70" /> {invoiceData?.phoneNumber || "+91 00000 00000"}</span>
              <span className="flex items-center gap-2"><FaEnvelope className="text-primary/70" /> {invoiceData?.email || "billing@hospital.com"}</span>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default Invoice;
