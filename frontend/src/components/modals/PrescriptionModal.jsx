import React from 'react';
import { FaDownload } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import signature from "../../assets/images/signature.svg";
import logo from "../../assets/images/logo.png";

const PrescriptionModal = ({ open, handleClose, prescriptionData }) => {
  if (!open) return null;

  const handleDownload = async () => {
    const input = document.getElementById('prescription-modal-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`Prescription_${prescriptionData.patient.firstName}_${prescriptionData.patient.lastName}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Prescription</h2>
          <button onClick={handleClose} className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">X</button>
        </div>
        <div className="p-6" id="prescription-modal-content">
          {/* Header Section */}
          <div className="p-6 bg-[#f6f8fb] rounded-lg mb-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="py-2">
                <img src={logo} alt="Hospital Logo" className="w-32 mx-auto mb-2" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#0eabeb]">
                  Dr. {prescriptionData.doctor.firstName} {prescriptionData.doctor.lastName}
                </p>
                <p className="text-gray-500">{prescriptionData.doctor.specialty}</p>
              </div>
            </div>

            <div className="grid gap-4 text-sm">
              <div className="flex justify-between">
                <p><strong>Hospital Name :</strong> <span className="text-gray-600">{prescriptionData.appointmentId.hospital}</span></p>
                <p><strong>Prescription Date :</strong> <span className="text-gray-600">{new Date(prescriptionData.prescriptionDate).toLocaleDateString()}</span></p>
              </div>
              <div className="flex justify-between">
                <p><strong>Patient Name :</strong> <span className="text-gray-600">{prescriptionData.patient.firstName} {prescriptionData.patient.lastName}</span></p>
                <p><strong>Age :</strong> <span className="text-gray-600">{prescriptionData.patient.age} Years</span></p>
              </div>
              <div className="flex justify-between">
                <p><strong>Gender :</strong> <span className="text-gray-600">{prescriptionData.patient.gender}</span></p>
              </div>
              <div>
                <p><strong>Address :</strong> <span className="text-gray-600">{prescriptionData.patient.address}</span></p>
              </div>
            </div>
          </div>

          {/* Prescription Table */}
          <div className="overflow-x-auto mb-6 rounded-lg">
            <table className="w-full text-left rounded-lg shadow-sm">
              <thead>
                <tr className="bg-[#f6f8fb]">
                  <th className="font-semibold py-2 px-4">Medicine Name</th>
                  <th className="font-semibold py-2 px-4">Strength</th>
                  <th className="font-semibold py-2 px-4">Dose</th>
                  <th className="font-semibold py-2 px-4">Duration</th>
                  <th className="font-semibold py-2 px-4">When to Take</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionData.medicines.map((medicine, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{medicine.name}</td>
                    <td className="py-2 px-4">{medicine.strength}</td>
                    <td className="py-2 px-4">{medicine.dose}</td>
                    <td className="py-2 px-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full inline-block">
                        {medicine.duration}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full inline-block">
                        {medicine.whenToTake}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Note */}
          <div className="mt-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Additional Note</h3>
            <p className="text-gray-600">{prescriptionData.additionalNote || "No additional notes provided."}</p>
          </div>

          {/* Doctor Signature and Download Button */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t">
            <div className="text-center">
              <img src={signature} alt="Doctor Signature" className="w-24 mx-auto" />
              <p className="text-gray-500 text-sm">Doctor Signature</p>
            </div>
            <button
              onClick={handleDownload}
              className="bg-[#0eabeb] text-white px-6 py-2 rounded flex items-center space-x-2"
            >
              <FaDownload />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
