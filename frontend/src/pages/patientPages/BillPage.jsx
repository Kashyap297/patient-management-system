import React, { useEffect, useState } from "react";
import PaymentTypeModal from "../../components/Patient/PaymentTypeModal";
import InvoiceModal from "../../components/Patient/InvoiceModal";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { FaEye } from "react-icons/fa";
import api from "../../api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showPaymentType, setShowPaymentType] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [activeTab, setActiveTab] = useState("unpaid");
  const { updateBreadcrumb } = useBreadcrumb();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateBreadcrumb([{ label: "Bills", path: "/patient/bills" }]);
  }, []);

  useEffect(() => {
    const fetchUserBills = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await api.get("/invoice/user/invoice", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userBills = response.data.data || [];
        setBills(userBills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBills();
  }, []);

  const handlePayNow = (bill) => {
    setSelectedBill(bill);
    setShowPaymentType(true);
  };

  const handleViewInvoice = (bill) => {
    setSelectedBill(bill);
    setShowInvoice(true);
  };

  const filteredBills = bills.filter((bill) =>
    activeTab === "paid" ? bill.status === "Paid" : bill.status === "Unpaid"
  );

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl h-full">
      {/* Tabs for Unpaid and Paid Bills */}
      <div className="mb-4 flex flex-wrap space-x-4 md:space-x-6 border-b">
        <button
          onClick={() => setActiveTab("unpaid")}
          className={`text-lg font-semibold py-2 px-3 md:px-4 ${
            activeTab === "unpaid"
              ? "text-customBlue border-b-4 border-customBlue"
              : "text-gray-500"
          }`}
        >
          Unpaid Bills
        </button>
        <button
          onClick={() => setActiveTab("paid")}
          className={`text-lg font-semibold py-2 px-3 md:px-4 ${
            activeTab === "paid"
              ? "text-customBlue border-b-4 border-customBlue"
              : "text-gray-500"
          }`}
        >
          Paid Bills
        </button>
      </div>

      {/* Bills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="p-4 border rounded-xl bg-white shadow-sm">
                <Skeleton height={20} width="60%" className="mb-2" />
                <Skeleton height={15} width="80%" />
                <Skeleton height={15} width="70%" className="my-1" />
                <Skeleton height={15} width="50%" />
                <Skeleton height={30} width="100%" className="mt-3" />
              </div>
            ))
          : filteredBills.map((bill) => (
              <div
                key={bill._id}
                className="p-4 border rounded-xl bg-white shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between bg-gray-100 p-2 rounded-t-md">
                  {bill.doctor ? (
                    <p className="font-semibold">
                      Dr. {bill.doctor.firstName} {bill.doctor.lastName}
                    </p>
                  ) : (
                    <p className="font-semibold">Doctor Information Unavailable</p>
                  )}
                  <button
                    onClick={() => handleViewInvoice(bill)}
                    className="text-lg p-1 bg-white text-customBlue"
                  >
                    <FaEye />
                  </button>
                </div>
                <div className="p-2">
                  <p className="text-gray-500 flex justify-between">
                    <strong>Hospital Name</strong> {bill.hospital.name}
                  </p>
                  <p className="text-gray-500 flex justify-between">
                    <strong>Bill Created Date</strong>{" "}
                    {new Date(bill.billDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 flex justify-between">
                    <strong>Bill Created Time</strong> {bill.billTime}
                  </p>
                  <p className="text-red-500 font-semibold flex justify-between">
                    <strong className="font-medium text-gray-500">
                      Total Bill Amount
                    </strong>{" "}
                    ₹{bill.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-end mt-2">
                  {bill.status === "Unpaid" && (
                    <button
                      className="bg-customBlue text-white py-2 px-4 rounded-xl font-semibold w-full md:w-auto"
                      onClick={() => handlePayNow(bill)}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>

      {/* Modals for Invoice and Payment Type */}
      {showInvoice && selectedBill && (
        <InvoiceModal
          bill={selectedBill}
          onClose={() => setShowInvoice(false)}
          onPay={() => {
            setShowInvoice(false);
            setShowPaymentType(true);
          }}
          showPayButton={selectedBill.status === "Unpaid"}
        />
      )}

      {showPaymentType && selectedBill && (
        <PaymentTypeModal
          bill={selectedBill}
          onClose={() => setShowPaymentType(false)}
        />
      )}
    </div>
  );
};

export default BillPage;
