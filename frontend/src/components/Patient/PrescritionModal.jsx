import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from "../../assets/images/logo.png";
import api from "../../api/api";
import signature from "../../assets/images/signature.svg";


const PrescriptionModal = ({ prescriptionId, closeModal }) => {
  const [prescriptionData, setPrescriptionData] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await api.get(`/prescription/${prescriptionId}`);
        setPrescriptionData(response.data.prescription);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    if (prescriptionId) {
      fetchPrescription();
    }
  }, [prescriptionId]);

  if (!prescriptionData) return null;

  const {
    doctor,
    patient,
    appointmentId,
    medicines,
    additionalNote,
    prescriptionDate,
  } = prescriptionData;

  const handleDownload = async () => {
    const input = document.getElementById('prescription-modal-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`Prescription_${patient.firstName}_${patient.lastName}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 overflow-y-auto" id="prescription-modal-content">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Prescription</h2>
          <button onClick={closeModal} className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">X</button>
        </div>

        {/* Header */}
        <div className="p-4 bg-gray-50 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="py-2">
              <img src={logo} alt="Hospital Logo" className="w-48 mx-auto mb-4" />
            </div>
            <div>
              <p className="text-3xl font-bold text-customBlue">
                Dr. {doctor.firstName} {doctor.lastName}
              </p>
              <p className="text-gray-500">{doctor.specialty}</p>
            </div>
          </div>

          <div className="grid gap-4 text-sm mb-4">
            <div className="flex justify-between items-center">
              <p className="flex items-center">
                <strong>Hospital Name :</strong>
                <span className="ml-2 text-gray-600">{appointmentId.hospital}</span>
              </p>
              <p className="flex items-center">
                <strong>Prescription Date :</strong>
                <span className="ml-2 text-gray-600">
                  {new Date(prescriptionDate).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="flex items-center">
                <strong>Patient Name :</strong>
                <span className="ml-2 text-gray-600">
                  {patient.firstName} {patient.lastName}
                </span>
              </p>
              <p className="flex items-center">
                <strong>Age :</strong>
                <span className="ml-2 text-gray-600">{patient.age} Years</span>
              </p>
            </div>
            <div className="flex justify-between items-start">
              <p className="flex items-center">
                <strong>Gender :</strong>
                <span className="ml-2 text-gray-600">{patient.gender}</span>
              </p>
            </div>
            <div>
              <p className="flex items-start">
                <strong>Address :</strong>
                <span className="ml-2 text-gray-600">{patient.address}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Prescription Details */}
        <div className="overflow-x-auto mb-4 rounded-lg">
          <table className="w-full text-left rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4">Medicine Name</th>
                <th className="py-2 px-4">Strength</th>
                <th className="py-2 px-4">Dose</th>
                <th className="py-2 px-4">Duration</th>
                <th className="py-2 px-4">When to Take</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med, index) => (
                <tr key={index} className="border-b-2">
                  <td className="py-2 px-4">{med.name}</td>
                  <td className="py-2 px-4">{med.strength}</td>
                  <td className="py-2 px-4">{med.dose}</td>
                  <td className="py-2 px-4">
                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full inline-block">
                      {med.duration}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full inline-block">
                      {med.whenToTake}
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
          <p className="text-gray-600">{additionalNote}</p>
        </div>

        {/* Doctor Signature and Download Button */}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm italic">Doctor Signature</p>
            <img
              src={signature}
              alt="Doctor Signature"
              className="mt-2"
            />
          </div>
          <button
            onClick={handleDownload}
            className="bg-customBlue text-white px-6 py-2 rounded flex items-center space-x-2"
          >
            <FaDownload />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
