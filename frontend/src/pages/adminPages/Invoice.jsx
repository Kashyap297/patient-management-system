import { useParams } from "react-router-dom";

const Invoice = () => {
  const { billId, patientName } = useParams(); // Retrieve the dynamic parameters

  // Sample data for the invoice, you can fetch real data here based on billId and patientName
  const invoiceData = {
    doctorName: "Dr. Bharat Patel",
    patient: {
      name: "Miracle Kenter",
      gender: "Male",
      age: "36 Years",
      address: "B-105 Virat Bungalows Punagam Motavaracha Jamnagar",
      diseaseName: "Stomach Ach",
      phoneNumber: "9957 96557",
      paymentType: "Online",
    },
    bill: {
      id: billId,
      date: "20 June, 2020",
      time: "10:45 PM",
    },
    items: [
      {
        description: "Neuromuscular blockers",
        amount: "₹ 12000.00",
        qty: 2,
        total: "₹ 24000.00",
      },
      {
        description: "Neuromuscular blockers",
        amount: "₹ 800.00",
        qty: 2,
        total: "₹ 1600.00",
      },
      {
        description: "Leucovorin with high dose methotrexate (HDMTX)",
        amount: "₹ 1000.00",
        qty: 2,
        total: "₹ 2000.00",
      },
      {
        description: "Hydroxyurea for sickle cell disease",
        amount: "₹ 20.00",
        qty: 2,
        total: "₹ 40.00",
      },
    ],
    summary: {
      amount: "₹ 25,840.00",
      discount: "5% - ₹ 1,292.00",
      tax: "₹ 120.00",
      total: "₹ 24,668.00",
    },
  };

  return (
    <div className="p-6 bg-white min-h-screen shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold">Invoice</h1>
          <h2 className="text-xl font-semibold text-blue-600">
            Dr. {invoiceData.doctorName}
          </h2>
          <p>
            {invoiceData.bill.date} | {invoiceData.bill.time}
          </p>
        </div>
      </div>

      {/* Patient Details */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
        <p>
          <strong>Name:</strong> {invoiceData.patient.name}
        </p>
        <p>
          <strong>Gender:</strong> {invoiceData.patient.gender}
        </p>
        <p>
          <strong>Age:</strong> {invoiceData.patient.age}
        </p>
        <p>
          <strong>Address:</strong> {invoiceData.patient.address}
        </p>
        <p>
          <strong>Disease Name:</strong> {invoiceData.patient.diseaseName}
        </p>
        <p>
          <strong>Phone Number:</strong> {invoiceData.patient.phoneNumber}
        </p>
        <p>
          <strong>Payment Type:</strong> {invoiceData.patient.paymentType}
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
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td className="p-3">{item.description}</td>
              <td className="p-3">{item.amount}</td>
              <td className="p-3">{item.qty}</td>
              <td className="p-3">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="text-right">
        <p className="text-lg">
          <strong>Amount: </strong>
          {invoiceData.summary.amount}
        </p>
        <p className="text-lg">
          <strong>Discount: </strong>
          {invoiceData.summary.discount}
        </p>
        <p className="text-lg">
          <strong>Tax: </strong>
          {invoiceData.summary.tax}
        </p>
        <p className="text-2xl font-semibold text-blue-600">
          <strong>Total Amount: </strong>
          {invoiceData.summary.total}
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
