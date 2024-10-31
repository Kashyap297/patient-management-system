import React from "react";
import logo from "../../assets/images/whitelogo.png"; // Hospital logo

const InvoiceTemplate2 = () => {
  return (
    <div className="bg-white rounded-2xl max-w-3xl mx-auto shadow-md border border-gray-200">
      {/* Header with Background Color */}
      <div className="relative bg-[#0EABEB] text-white rounded-t-2xl p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
              <img src={logo} alt="Hospital Logo" className="w-64" />
            </div>
          <div className="text-right">
            <h2 className="text-3xl font-semibold">Invoice</h2>
            <p className="text-sm">Invoice No : 1234</p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="px-4 mb-4">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500">Invoice To :</p>
            <h3 className="font-semibold text-lg text-gray-800">PLK Madhuvan Bank</h3>
            <p className="text-sm text-gray-600">+123-456-7890</p>
            <p className="text-sm text-gray-600">www.gallery.com</p>
            <p className="text-sm text-gray-600">123 Anywhere Street, Any City</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Invoice Date : 30 May, 2020</p>
            <p className="text-gray-500">Total Due :</p>
            <p className="text-2xl text-[#0EABEB] font-semibold">$ 1,251</p>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="px-4 mb-4">
        <table className="w-full bg-white rounded-lg overflow-hidden border border-gray-200">
          <thead className="bg-[#0EABEB] text-white">
            <tr>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Qty.</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="px-4 py-2">Payment transferred</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">$ 200</td>
                <td className="px-4 py-2">$ 3525</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="px-4 mb-4 flex justify-end">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between text-gray-600">
            <p>Sub Total :</p>
            <p>$ 2110.00</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Tax :</p>
            <p>$ 25.00</p>
          </div>
          <div className="flex justify-between text-[#0EABEB] font-semibold text-lg">
            <p>Total :</p>
            <p>$ 2254.00</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions & Signature */}
      <div className="flex items-center" >

      <div className="px-4 mb-4">
        <p className="font-semibold">Terms and Conditions</p>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis nulla, finibus sodales erat porta eu.
        </p>
      </div>
      
      <div className="px-4 flex justify-end">
        <div className="text-center">
          <p>Signature</p>
          <div className="border-t-2 border-gray-400 w-32 mx-auto mt-2"></div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm bg-[#0EABEB] p-2 rounded-b-2xl text-white flex justify-between px-4 mt-4">
        <p>Call: +123-456-7890</p>
        <p>Email: hello@gmail.com</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate2;
