import { useParams } from 'react-router-dom';

const InsuranceDetail = () => {
  const { id } = useParams(); // Get the bill ID from the URL

  // Simulating the data for the invoice based on the ID
  const invoiceData = {
    billNo: id,
    doctorName: 'Dr. Bharat Patel',
    patientName: 'Miracle Kenter',
    diseaseName: 'Stomach Ache',
    gender: 'Male',
    age: 36,
    phoneNumber: '9957 96557',
    paymentType: 'Insurance',
    address: 'B-105 Virat Bungalows Punagam Motavaracha Jamnagar',
    items: [
      { description: 'Neuromuscular blockers', amount: '₹12000.00', qty: 2, total: '₹24000.00' },
      { description: 'Neuromuscular blockers', amount: '₹800.00', qty: 2, total: '₹1600.00' },
      { description: 'Leucovorin with high dose methotrexate (HDMTX)', amount: '₹1000.00', qty: 2, total: '₹2000.00' },
      { description: 'Hydroxyurea for sickle cell disease', amount: '₹20.00', qty: 2, total: '₹40.00' }
    ],
    insuranceCompany: 'HDFC Life Insurance',
    insurancePlan: 'Health Insurance',
    claimAmount: '₹2000.00',
    claimedAmount: '₹2500.00',
    totalAmount: '₹24,668.00',
    discount: '5%',
    tax: '₹120.00',
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Invoice for Bill No: {invoiceData.billNo}</h2>
      </div>
      <div className="bg-white shadow-lg rounded p-4">
        {/* Invoice Header */}
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-bold">{invoiceData.doctorName}</h3>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis nulla, finibus sodales erat porta eu.
            </p>
          </div>
          <div>
            <p><strong>Bill No:</strong> {invoiceData.billNo}</p>
            <p><strong>Bill Date:</strong> 20 June, 2020</p>
            <p><strong>Bill Time:</strong> 10:45 PM</p>
          </div>
        </div>

        {/* Patient Details */}
        <div className="mt-4">
          <h4 className="font-bold">Patient Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> {invoiceData.patientName}</p>
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
            {invoiceData.items.map((item, index) => (
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
          <p><strong>Insurance Company:</strong> {invoiceData.insuranceCompany}</p>
          <p><strong>Insurance Plan:</strong> {invoiceData.insurancePlan}</p>
          <p><strong>Claim Amount:</strong> {invoiceData.claimAmount}</p>
          <p><strong>Claimed Amount:</strong> {invoiceData.claimedAmount}</p>
        </div>

        {/* Total Summary */}
        <div className="mt-6 flex justify-end">
          <div>
            <p><strong>Amount:</strong> ₹25,840.00</p>
            <p><strong>Discount 5%:</strong> ₹1,292.00</p>
            <p><strong>Tax:</strong> ₹120.00</p>
            <p className="text-blue-600 text-lg font-bold"><strong>Total Amount:</strong> {invoiceData.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetail;
