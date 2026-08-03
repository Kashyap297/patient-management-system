import React from "react";
import logo from "../../assets/images/logo.png"; // Hospital logo

const InvoiceTemplate1 = () => {
  return (
    <div className="bg-white rounded-2xl max-w-4xl mx-auto shadow-xl overflow-hidden font-sans border border-gray-100">
      {/* Header */}
      <div className="relative overflow-hidden mb-8 bg-gradient-to-r from-primary/10 to-transparent p-6 md:p-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-white/60 backdrop-blur-sm">
            <img src={logo} alt="Hospital Logo" className="h-16 w-auto object-contain" />
          </div>
          <div className="text-left md:text-right">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight uppercase">
              Invoice
            </h1>
            <p className="text-gray-500 mt-2 font-medium">#INV-1234-2020</p>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 pb-10">
        {/* Hospital and Patient Details */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Doctor Details</h2>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h3 className="font-bold text-xl text-secondary">Dr. Bharat Patel</h3>
              <p className="text-primary font-medium">General Practitioner</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Bill No:</span>
              <span className="font-bold text-secondary">1234</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 font-medium">Date:</span>
              <span className="font-bold text-secondary">20/06/2020</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Time:</span>
              <span className="font-bold text-secondary">10:45 PM</span>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Patient Information</h2>
          <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Name</p>
                <p className="font-bold text-secondary">Miracle Kenter</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Disease</p>
                <p className="font-bold text-secondary">Stomach Ache</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Payment Type</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  Insurance
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Gender / Age</p>
                <p className="font-medium text-gray-800">Male / 36 Yrs</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="font-medium text-gray-800">+91 99579 65570</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="font-medium text-gray-800 text-sm">B-105 Virat Bungalows Punagam, Jamnagar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-5 font-bold text-gray-600 text-xs uppercase tracking-wider">Description</th>
                <th className="py-3 px-5 font-bold text-gray-600 text-xs uppercase tracking-wider text-right">Amount</th>
                <th className="py-3 px-5 font-bold text-gray-600 text-xs uppercase tracking-wider text-center">Qty</th>
                <th className="py-3 px-5 font-bold text-gray-600 text-xs uppercase tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5 text-gray-800 font-medium">Neuromuscular blockers</td>
                <td className="py-4 px-5 text-gray-600 text-right">₹12,000.00</td>
                <td className="py-4 px-5 text-gray-600 text-center">2</td>
                <td className="py-4 px-5 text-secondary font-bold text-right">₹24,000.00</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5 text-gray-800 font-medium">Leucovorin (HDMTX)</td>
                <td className="py-4 px-5 text-gray-600 text-right">₹1,000.00</td>
                <td className="py-4 px-5 text-gray-600 text-center">2</td>
                <td className="py-4 px-5 text-secondary font-bold text-right">₹2,000.00</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5 text-gray-800 font-medium">Hydroxyurea</td>
                <td className="py-4 px-5 text-gray-600 text-right">₹20.00</td>
                <td className="py-4 px-5 text-gray-600 text-center">2</td>
                <td className="py-4 px-5 text-secondary font-bold text-right">₹40.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Insurance Details</h2>
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Company:</span>
                <span className="font-semibold text-secondary">HDFC Life Insurance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Plan:</span>
                <span className="font-semibold text-secondary">Health Insurance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Claim Amount:</span>
                <span className="font-semibold text-secondary">₹2,000.00</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600 font-medium">Claimed Amount:</span>
                <span className="font-bold text-green-600">₹2,500.00</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-medium">₹25,840.00</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Discount (5%):</span>
                <span className="font-medium">- ₹1,292.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span className="font-medium">+ ₹120.00</span>
              </div>
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-primary/20">
                <span className="text-gray-800 font-bold text-lg">Total Amount:</span>
                <span className="text-primary text-2xl font-black">₹24,668.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Terms & Conditions:</h3>
          <p className="text-gray-500 text-xs leading-relaxed max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis nulla, finibus sodales erat porta eu. Ut eu dolor diam. Pellentesque quis mollis nulla. Suspendisse blandit odio in odio porta euismod. All payments are final and non-refundable.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-secondary text-white py-4 px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          <span>+91 90854 22354</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <span>hello@hospital.com</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate1;
