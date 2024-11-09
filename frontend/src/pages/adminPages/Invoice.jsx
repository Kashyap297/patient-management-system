import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoiceData();
  }, [billId]);

  return (
    <div className="bg-white rounded-2xl max-w-3xl mx-auto shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="relative overflow-hidden mb-6">
        <div
          className="absolute top-0 left-0 bg-[#87d5f5] p-2 w-5/12 h-4"
          style={{
            clipPath: "polygon(0 0, 90% 0, 85% 100%, 0% 100%)",
          }}
        ></div>
        <div className="absolute top-[-150px] right-[-20px] w-72 h-72 bg-[#e7f7fd] rounded-full bg-opacity-50"></div>
        <div className="flex justify-between items-center mt-12 px-6">
          <div className="flex flex-col">
            {loading ? (
              <Skeleton height={50} width={200} />
            ) : (
              <img src={logo} alt="Hospital Logo" className="w-64" />
            )}
          </div>
          <h1 className="absolute right-[25px] top-[20px] text-6xl font-semibold text-[#0eabeb] z-10">
            {loading ? <Skeleton width={150} /> : "Invoice"}
          </h1>
        </div>
      </div>

      <div className="px-8">
        {/* Hospital and Patient Details */}
        <div className="flex justify-between mb-3 px-5">
          <div className="w-2/3">
            <h2 className="font-semibold text-lg text-gray-700">
              {loading ? <Skeleton width={120} /> : `Dr. ${invoiceData?.doctor?.firstName} ${invoiceData?.doctor?.lastName}`}
            </h2>
            <p className="text-sm text-gray-600">
              {loading ? <Skeleton width={150} /> : invoiceData?.doctor?.doctorDetails?.description}
            </p>
          </div>
          <div>
            <p>
              <strong>Bill No:</strong> {loading ? <Skeleton width={100} /> : invoiceData?.billNumber}
            </p>
            <p>
              <strong>Bill Date:</strong> {loading ? <Skeleton width={100} /> : new Date(invoiceData?.billDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Bill Time:</strong> {loading ? <Skeleton width={100} /> : invoiceData?.billTime}
            </p>
          </div>
        </div>

        {/* Doctor and Patient Information */}
        <div className="bg-gray-100 p-4 rounded-xl mb-6 px-5">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Name :</strong> {loading ? <Skeleton width={120} /> : `${invoiceData?.patient?.firstName} ${invoiceData?.patient?.lastName}`}
            </p>
            <p>
              <strong>Disease Name :</strong> {loading ? <Skeleton width={120} /> : invoiceData?.diseaseName}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p>
              <strong>Gender :</strong> {loading ? <Skeleton width={120} /> : invoiceData?.gender}
            </p>
            <p>
              <strong>Phone Number :</strong> {loading ? <Skeleton width={120} /> : invoiceData?.phoneNumber}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <p>
              <strong>Age :</strong> {loading ? <Skeleton width={80} /> : `${invoiceData?.patient?.age} Years`}
            </p>
            <p>
              <strong>Payment Type :</strong> <span className="text-blue-500">{loading ? <Skeleton width={100} /> : invoiceData?.paymentType}</span>
            </p>
          </div>
          <div className="mt-2">
            <p>
              <strong>Address :</strong> {loading ? <Skeleton width={200} /> : invoiceData?.address}
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <table className="w-full bg-white rounded-xl mb-6 overflow-hidden">
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
              <td className="px-4 py-2">{loading ? <Skeleton width={150} /> : invoiceData.description}</td>
              <td className="px-4 py-2">{loading ? <Skeleton width={80} /> : `₹ ${invoiceData.amount}`}</td>
              <td className="px-4 py-2">{loading ? <Skeleton width={50} /> : "1"}</td>
              <td className="px-4 py-2">{loading ? <Skeleton width={80} /> : `₹ ${invoiceData.amount}`}</td>
            </tr>
          </tbody>
        </table>

        {/* Summary with Conditional Insurance Section */}
        <div className="flex justify-between px-4">
          {invoiceData?.insuranceDetails?.insuranceCompany && (
            <div className="mb-4 text-left">
              <p><strong>Insurance Company :</strong> {loading ? <Skeleton width={150} /> : invoiceData.insuranceDetails.insuranceCompany}</p>
              <p><strong>Insurance Plan :</strong> {loading ? <Skeleton width={150} /> : invoiceData.insuranceDetails.insurancePlan}</p>
              <p><strong>Claim Amount :</strong> {loading ? <Skeleton width={100} /> : `₹ ${invoiceData.insuranceDetails.claimAmount}`}</p>
              <p><strong>Claimed Amount :</strong> {loading ? <Skeleton width={100} /> : `₹ ${invoiceData.insuranceDetails.claimedAmount}`}</p>
            </div>
          )}
          <div>
            <p><strong>Amount :</strong> {loading ? <Skeleton width={80} /> : `₹ ${invoiceData?.amount}`}</p>
            <p><strong>Discount 5% :</strong> {loading ? <Skeleton width={80} /> : `₹ ${invoiceData?.discount}`}</p>
            <p><strong>Tax :</strong> {loading ? <Skeleton width={80} /> : `₹ ${invoiceData?.tax}`}</p>
            <p className="font-semibold text-[#0EABEB]"><strong>Total Amount :</strong> {loading ? <Skeleton width={100} /> : `₹ ${invoiceData?.totalAmount}`}</p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-6 px-4">
          <h3 className="font-semibold">Terms & Conditions :</h3>
          <p className="text-gray-600 text-sm">
            {loading ? <Skeleton count={3} /> : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis nulla, finibus sodales erat porta eu."}
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
