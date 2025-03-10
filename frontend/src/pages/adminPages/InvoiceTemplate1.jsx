import React from "react";
import logo from "../../assets/images/logo.png"; // Hospital logo

const InvoiceTemplate1 = () => {
  return (
    <>
      <div className="bg-white rounded-2xl max-w-3xl mx-auto shadow-md overflow-hidden p-4 sm:p-6 md:p-8">
        <div className="relative overflow-hidden mb-6">
          <div
            className="absolute top-0 left-0 bg-[#87d5f5] p-2 w-5/12 h-4"
            style={{
              clipPath: "polygon(0 0, 90% 0, 85% 100%, 0% 100%)",
            }}
          ></div>
          <div className="absolute top-[-100px] right-[-20px] w-40 h-40 md:w-72 md:h-72 bg-[#e7f7fd] rounded-full bg-opacity-50"></div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 px-6">
            <img src={logo} alt="Hospital Logo" className="w-40 md:w-64" />
            <h1 className="text-3xl md:text-6xl font-semibold text-[#0eabeb] mt-4 md:mt-0">
              Invoice
            </h1>
          </div>
        </div>

        <div className="px-4 sm:px-8">
          {/* Hospital and Patient Details */}
          <div className="flex flex-col md:flex-row justify-between mb-3 px-2 md:px-5">
            <div className="w-full md:w-2/3 mb-2 md:mb-0">
              <h2 className="font-semibold text-lg text-gray-700">
                Dr. Bharat Patel
              </h2>
              <p className="text-sm text-gray-600">General Practitioner</p>
            </div>
            <div>
              <p><strong>Bill No:</strong> 1234</p>
              <p><strong>Bill Date:</strong> 20/06/2020</p>
              <p><strong>Bill Time:</strong> 10:45 PM</p>
            </div>
          </div>

          {/* Doctor and Patient Information */}
          <div className="bg-gray-100 p-4 rounded-xl mb-6 px-3 md:px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <p><strong>Name:</strong> Miracle Kenter</p>
              <p><strong>Disease Name:</strong> Stomach Ache</p>
              <p><strong>Gender:</strong> Male</p>
              <p><strong>Phone Number:</strong> 9957 96557</p>
              <p><strong>Age:</strong> 36 Years</p>
              <p><strong>Payment Type:</strong> <span className="text-blue-500">Insurance</span></p>
              <p className="col-span-full"><strong>Address:</strong> B-105 Virat Bungalows Punagam Motavatracha Jamnagar.</p>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl mb-6">
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
                  <td className="px-4 py-2">Neuromuscular blockers</td>
                  <td className="px-4 py-2">₹ 12000.00</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">₹ 24000.00</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Leucovorin (HDMTX)</td>
                  <td className="px-4 py-2">₹ 1000.00</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">₹ 2000.00</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Hydroxyurea</td>
                  <td className="px-4 py-2">₹ 20.00</td>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">₹ 40.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary with Conditional Insurance Section */}
          <div className="flex flex-col md:flex-row justify-between px-2 md:px-4">
            <div className="mb-4 md:mb-0 text-left">
              <p><strong>Insurance Company:</strong> HDFC Life Insurance</p>
              <p><strong>Insurance Plan:</strong> Health Insurance</p>
              <p><strong>Claim Amount:</strong> ₹ 2000.00</p>
              <p><strong>Claimed Amount:</strong> ₹ 2500.00</p>
            </div>
            <div>
              <p><strong>Amount:</strong> ₹ 25,840.00</p>
              <p><strong>Discount 5%:</strong> ₹ 1,292.00</p>
              <p><strong>Tax:</strong> ₹ 120.00</p>
              <p className="font-semibold text-blue-500"><strong>Total Amount:</strong> ₹ 24,668.00</p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mt-6 px-2 md:px-4">
            <h3 className="font-semibold">Terms & Conditions:</h3>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              mattis turpis nulla, finibus sodales erat porta eu. Ut eu dolor
              diam. Pellentesque quis mollis nulla. Suspendisse blandit odio in
              odio porta euismod.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm bg-[#0EABEB] p-2 rounded-b-lg text-white flex flex-col md:flex-row justify-between mt-4">
          <p>Call: +90854 22354</p>
          <p>Email: Hello@Gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default InvoiceTemplate1;
