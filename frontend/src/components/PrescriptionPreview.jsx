import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import signature from "../assets/images/signature.svg";
import logo from "../assets/images/logo.png";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const PrescriptionPreview = ({ prescriptionData, appointmentId }) => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const doctorId = decodedToken.id;

          const response = await api.get(`/users/doctors/${doctorId}`);
          setDoctorDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleSendPrescription = async () => {
    try {
      const payload = {
        appointmentId: appointmentId,
        medicines: prescriptionData.medicines
          .filter((med) => med.isEnabled)
          .map((med) => ({
            name: med.medicineName,
            strength: med.strength,
            dose: med.dose,
            duration: med.duration,
            whenToTake: med.whenToTake,
          })),
        additionalNote: prescriptionData.additionalNote,
      };

      await api.post("/prescription", payload);
      await api.patch(`/appointments/${appointmentId}`, { status: "Completed" });
      alert("Prescription created successfully and appointment marked as Completed");
      navigate(`/doctor/prescription-tools/manage`);
    } catch (error) {
      console.error("Error creating prescription or updating appointment status:", error);
    }
  };

  return (
    <div className="bg-white w-full flex flex-col h-full justify-between">
      {/* Header Section */}
      <div className="bg-[#f6f8fb] p-3 mb-3 rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <img src={logo} alt="Hospital Logo" className="w-64 mb-2" />
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-[#48beef]">
              {doctorDetails
                ? `Dr. ${doctorDetails.firstName} ${doctorDetails.lastName}`
                : "Doctor Name"}
            </p>
            <p className="text-sm text-gray-500">
              {doctorDetails?.doctorDetails.specialtyType || "Specialty"}
            </p>
          </div>
        </div>

        {/* Patient and Prescription Details */}
        <div className="p-4 rounded-md bg-gray-50">
          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
            <div>
              <div className="flex">
                <p className="font-semibold">Hospital Name :</p>
                <p className="text-gray-500 ml-2">
                  {doctorDetails?.doctorDetails.hospital.hospitalName || "Medical Center"}
                </p>
              </div>
              <div className="flex mt-2">
                <p className="font-semibold">Patient Name :</p>
                <p className="text-gray-500 ml-2">{prescriptionData?.patientName}</p>
              </div>
              <div className="flex mt-2">
                <p className="font-semibold">Gender :</p>
                <p className="text-gray-500 ml-2">{prescriptionData?.patientGender}</p>
              </div>
              <div className="flex mt-2 col-12">
                <p className="font-semibold">Address :</p>
                <p className="text-gray-500 ml-2">
                  {doctorDetails?.doctorDetails.hospital.hospitalAddress}
                </p>
              </div>
            </div>

            <div>
              <div className="flex">
                <p className="font-semibold">Prescription Date :</p>
                <p className="text-gray-500 ml-2">
                  {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex mt-2">
                <p className="font-semibold">Age :</p>
                <p className="text-gray-500 ml-2">{prescriptionData?.patientAge} Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medicines Table */}
      <div className="mb-6 rounded-lg overflow-hidden flex-grow">
        <table className="w-full text-left">
          <thead className="bg-[#f6f8fb]">
            <tr>
              <th className="px-4 py-2 border-b font-semibold text-sm text-gray-700">Medicine Name</th>
              <th className="px-4 py-2 border-b font-semibold text-sm text-gray-700">Strength</th>
              <th className="px-4 py-2 border-b font-semibold text-sm text-gray-700">Dose</th>
              <th className="px-4 py-2 border-b font-semibold text-sm text-gray-700">Duration</th>
              <th className="px-4 py-2 border-b font-semibold text-sm text-gray-700">When to take</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData?.medicines
              .filter((medicine) => medicine.isEnabled)
              .map((medicine, index) => (
                <tr key={index} className="text-sm text-gray-700">
                  <td className="px-4 py-2 border-b">{medicine.medicineName}</td>
                  <td className="px-4 py-2 border-b">{medicine.strength}</td>
                  <td className="px-4 py-2 border-b">{medicine.dose}</td>
                  <td className="px-4 py-2 border-b">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">{medicine.duration}</span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{medicine.whenToTake}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Additional Note */}
      <div className="mt-6 mb-6">
        <h4 className="font-semibold">Additional Note</h4>
        <p className="text-gray-600 text-sm">
          {prescriptionData?.additionalNote || "No additional notes provided."}
        </p>
      </div>

      {/* Doctor Signature and Send Button at the Bottom */}
      <div className="flex justify-between items-center mt-8 p-4 bg-white sticky bottom-0">
        <div className="text-center">
          <img
            src={doctorDetails?.signatureImage ? `http://localhost:8000/${doctorDetails.signatureImage}` : signature}
            alt="Doctor's Signature"
            className="w-24 mx-auto"
          />
          <p className="text-gray-500 text-sm">Doctor Signature</p>
        </div>
        <button
          onClick={handleSendPrescription}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PrescriptionPreview;
