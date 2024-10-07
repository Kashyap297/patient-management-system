import { useState } from "react";
import { IconButton } from "@mui/material";
import { Visibility, Payment, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CashPaymentModal from "../../components/modals/CashPaymentModal";

const PaymentProcess = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const billingData = [
    {
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Colds and Flu",
      phoneNumber: "89564 25462",
      status: "Unpaid",
      date: "2 Jan, 2024",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Nolan Botosh",
      diseaseName: "Mononucleosis",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "3 Jan, 2024",
      time: "5:30 PM",
    },
    {
      billNumber: "5655",
      patientName: "Evelyn Stone",
      diseaseName: "Hypertension",
      phoneNumber: "98765 43210",
      status: "Unpaid",
      date: "4 Jan, 2024",
      time: "6:30 PM",
    },
    {
      billNumber: "5656",
      patientName: "Liam Chen",
      diseaseName: "Asthma",
      phoneNumber: "12345 67890",
      status: "Paid",
      date: "5 Jan, 2024",
      time: "7:30 PM",
    },
    {
      billNumber: "5657",
      patientName: "Ava Lee",
      diseaseName: "Diabetes",
      phoneNumber: "55555 55555",
      status: "Unpaid",
      date: "6 Jan, 2024",
      time: "8:30 PM",
    },
    {
      billNumber: "5658",
      patientName: "Oliver Brown",
      diseaseName: "Arthritis",
      phoneNumber: "77777 77777",
      status: "Paid",
      date: "7 Jan, 2024",
      time: "9:30 PM",
    },
    {
      billNumber: "5659",
      patientName: "Isabella Garcia",
      diseaseName: "Hypothyroidism",
      phoneNumber: "99999 99999",
      status: "Unpaid",
      date: "8 Jan, 2024",
      time: "10:30 PM",
    },
    {
      billNumber: "5660",
      patientName: "Ethan Hall",
      diseaseName: "Osteoporosis",
      phoneNumber: "66666 66666",
      status: "Paid",
      date: "9 Jan, 2024",
      time: "11:30 PM",
    },
    {
      billNumber: "5661",
      patientName: "Sophia Patel",
      diseaseName: "Gastroesophageal Reflux",
      phoneNumber: "44444 44444",
      status: "Unpaid",
      date: "10 Jan, 2024",
      time: "12:30 PM",
    },
    {
      billNumber: "5662",
      patientName: "Mia Kim",
      diseaseName: "Chronic Obstructive",
      phoneNumber: "33333 33333",
      status: "Paid",
      date: "11 Jan, 2024",
      time: "1:30 PM",
    },
    {
      billNumber: "5663",
      patientName: "Alexander Martin",
      diseaseName: "Hypertension",
      phoneNumber: "22222 22222",
      status: "Unpaid",
      date: "12 Jan, 2024",
      time: "2:30 PM",
    },
    {
      billNumber: "5664",
      patientName: "Benjamin Brooks",
      diseaseName: "Asthma",
      phoneNumber: "11111 11111",
      status: "Paid",
      date: "13 Jan, 2024",
      time: "3:30 PM",
    },
    {
      billNumber: "5665",
      patientName: "Charlotte Lee",
      diseaseName: "Diabetes",
      phoneNumber: "88888 88888",
      status: "Unpaid",
      date: "14 Jan, 2024",
      time: "4:30 PM",
    },
    {
      billNumber: "5666",
      patientName: "Julian Kim",
      diseaseName: "Arthritis",
      phoneNumber: "66666 66666",
      status: "Paid",
      date: "15 Jan, 2024",
      time: "5:30 PM",
    },
    {
      billNumber: "5667",
      patientName: "Gabriel Martin",
      diseaseName: "Hypothyroidism",
      phoneNumber: "99999 99999",
      status: "Unpaid",
      date: "16 Jan, 2024",
      time: "6:30 PM",
    },
    {
      billNumber: "5668",
      patientName: "Elijah Brooks",
      diseaseName: "Osteoporosis",
      phoneNumber: "77777 77777",
      status: "Paid",
      date: "17 Jan, 2024",
      time: "7:30 PM",
    },
    {
      billNumber: "5669",
      patientName: "Abigail Lee",
      diseaseName: "Gastroesophageal Reflux",
      phoneNumber: "44444 44444",
      status: "Unpaid",
      date: "18 Jan, 2024",
      time: "8:30 PM",
    },
    {
      billNumber: "5670",
      patientName: "Landon Kim",
      diseaseName: "Chronic Obstructive",
      phoneNumber: "33333 33333",
      status: "Paid",
      date: "19 Jan, 2024",
      time: "9:30 PM",
    },
    {
      billNumber: "5671",
      patientName: "Aiden Hall",
      diseaseName: "Hypertension",
      phoneNumber: "22222 22222",
      status: "Unpaid",
      date: "20 Jan, 2024",
      time: "10:30 PM",
    },
  ];

  const handleOpenPaymentModal = (bill) => {
    setSelectedBill(bill);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedBill(null); // Reset the selected bill after closing
  };

  const handlePayment = (amount) => {
    console.log(
      `Payment of ₹${amount} made for bill number ${selectedBill.billNumber}`
    );
    // Handle the payment logic here (e.g., API call)
  };

  // Filter data based on the search term
  const filteredBillingData = billingData.filter(
    (bill) =>
      bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Billing Details</h2>
        <input
          type="text"
          placeholder="Quick Search"
          className="border p-2 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Billing Table */}
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-sm font-semibold">Bill Number</th>
            <th className="p-3 text-left text-sm font-semibold">
              Patient Name
            </th>
            <th className="p-3 text-left text-sm font-semibold">
              Disease Name
            </th>
            <th className="p-3 text-left text-sm font-semibold">
              Phone Number
            </th>
            <th className="p-3 text-left text-sm font-semibold">Status</th>
            <th className="p-3 text-left text-sm font-semibold">Date</th>
            <th className="p-3 text-left text-sm font-semibold">Time</th>
            <th className="p-3 text-left text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBillingData.length > 0 ? (
            filteredBillingData.map((bill, index) => (
              <tr key={index} className="border-t">
                <td className="p-3 text-blue-600">{bill.billNumber}</td>
                <td className="p-3">{bill.patientName}</td>
                <td className="p-3">{bill.diseaseName}</td>
                <td className="p-3">{bill.phoneNumber}</td>
                <td
                  className={`p-3 ${
                    bill.status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {bill.status}
                </td>
                <td className="p-3">{bill.date}</td>
                <td className="p-3">{bill.time}</td>
                <td className="p-3">
                  <IconButton color="primary">
                    <Visibility
                      onClick={() =>
                        navigate(
                          `/admin/invoice/${bill.id}/${bill.patientName}`
                        )
                      }
                    />
                  </IconButton>
                  <IconButton color="secondary">
                    <Edit
                      onClick={() =>
                        navigate(`/admin/payment/edit/${bill.billNumber}`)
                      }
                    />
                  </IconButton>
                  <IconButton>
                    <Payment
                      color="primary"
                      onClick={() => handleOpenPaymentModal(bill)}
                    />
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-3 text-center text-gray-500">
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedBill && (
        <CashPaymentModal
          open={isPaymentModalOpen}
          handleClose={handleClosePaymentModal}
          handlePayment={handlePayment}
        />
      )}
    </div>
  );
};

export default PaymentProcess;
