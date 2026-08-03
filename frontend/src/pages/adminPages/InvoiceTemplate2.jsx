import React from "react";
import logo from "../../assets/images/whitelogo.png"; // Hospital logo

const InvoiceTemplate2 = () => {
  return (
    <div className="bg-white rounded-2xl max-w-4xl mx-auto shadow-xl border border-gray-100 overflow-hidden font-sans">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary to-blue-600 text-white p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-50 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
          <img src={logo} alt="Hospital Logo" className="h-16 w-auto object-contain" />
          <div className="text-left md:text-right">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-wider uppercase mb-1">Invoice</h2>
            <p className="text-blue-100 font-medium">Invoice No: #INV-1234</p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="p-8 md:p-12 pb-6">
        <div className="flex flex-col md:flex-row justify-between gap-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="w-full md:w-1/2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Invoice To</p>
            <h3 className="text-xl font-bold text-secondary mb-1">PLK Madhuvan Bank</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                +1 234 456 7890
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                www.hospital.com
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                123 Anywhere Street, Any City
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Invoice Date</p>
              <p className="text-gray-800 font-medium">30 May, 2020</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Due</p>
              <p className="text-3xl text-primary font-black">$ 1,251.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="px-8 md:px-12 mb-8 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-primary">
              <th className="py-4 px-2 font-bold text-secondary text-sm uppercase tracking-wider">Description</th>
              <th className="py-4 px-2 font-bold text-secondary text-sm uppercase tracking-wider text-center">Qty</th>
              <th className="py-4 px-2 font-bold text-secondary text-sm uppercase tracking-wider text-right">Price</th>
              <th className="py-4 px-2 font-bold text-secondary text-sm uppercase tracking-wider text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...Array(4)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 text-gray-800 font-medium">Payment transferred</td>
                <td className="py-4 px-2 text-gray-600 text-center">2</td>
                <td className="py-4 px-2 text-gray-600 text-right">$ 200.00</td>
                <td className="py-4 px-2 text-secondary font-bold text-right">$ 400.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="px-8 md:px-12 mb-10 flex flex-col md:flex-row justify-end">
        <div className="w-full md:w-5/12 bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span className="font-medium">Sub Total:</span>
            <span>$ 1600.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="font-medium">Tax (5%):</span>
            <span>$ 80.00</span>
          </div>
          <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
            <span className="text-gray-800 font-bold text-lg">Total:</span>
            <span className="text-primary text-2xl font-black">$ 1680.00</span>
          </div>
        </div>
      </div>

      {/* Terms and Conditions & Signature */}
      <div className="px-8 md:px-12 mb-12 flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="w-full md:w-1/2">
          <h3 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wider">Terms and Conditions</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis turpis nulla, finibus sodales erat porta eu. Payment is due within 30 days.
          </p>
        </div>
        <div className="w-full md:w-64 text-center">
          <div className="border-b-2 border-gray-300 w-full mb-2 h-16 relative">
             <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 font-signature text-2xl text-gray-400 opacity-50">Dr. Smith</span>
          </div>
          <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">Signature</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 py-6 px-8 md:px-12 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
        <p className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          +123-456-7890
        </p>
        <span className="hidden sm:inline text-gray-600">•</span>
        <p className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          hello@hospital.com
        </p>
      </div>
    </div>
  );
};

export default InvoiceTemplate2;
