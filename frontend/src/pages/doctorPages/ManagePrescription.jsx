import React, { useState, useEffect } from "react";
import PrescriptionModal from "../../components/modals/PrescriptionModal";
import api from "../../api/api";
import { FaEye, FaFemale, FaMale } from "react-icons/fa";
import NoDataFound from "../../assets/images/NoDataFound.png";

const ManagePrescription = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [todayPrescriptions, setTodayPrescriptions] = useState([]);
  const [olderPrescriptions, setOlderPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Fetch prescriptions for today and older ones
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get("/prescription");
        const prescriptions = response.data.prescriptions;

        const today = new Date().setHours(0, 0, 0, 0);
        const todayData = prescriptions.filter(
          (pres) => new Date(pres.createdAt).setHours(0, 0, 0, 0) === today
        );
        const olderData = prescriptions.filter(
          (pres) => new Date(pres.createdAt).setHours(0, 0, 0, 0) < today
        );

        setTodayPrescriptions(todayData);
        setOlderPrescriptions(olderData);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  // Handle modal open with prescription details
  const handleModalOpen = (prescriptionId) => {
    const prescription =
      todayPrescriptions.find((pres) => pres._id === prescriptionId) ||
      olderPrescriptions.find((pres) => pres._id === prescriptionId);

    if (prescription) {
      setSelectedPrescription(prescription);
      setModalOpen(true);
    } else {
      console.error("Prescription not found.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPrescription(null);
  };

  const appointmentTypeStyles = {
    Online: "bg-yellow-100 text-yellow-600",
    Onsite: "bg-blue-100 text-blue-600",
  };

  // Choose the appropriate data based on the active tab
  const currentPrescriptions =
    activeTab === 0 ? todayPrescriptions : olderPrescriptions;

  // Filter the prescription data based on search input
  const filteredPrescriptions = currentPrescriptions.filter(
    (prescription) =>
      prescription.patient.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.patient.phoneNumber.includes(searchTerm) ||
      prescription.patient.age.toString().includes(searchTerm)
  );
  console.log(filteredPrescriptions);

  return (
    <div className="bg-gray-100 h-full">
      <div className="bg-white p-4 rounded-lg h-full shadow-md">
        {/* Tabs */}
        <div className="flex space-x-4 mb-4 border-b">
          {["Today's Prescriptions", "Older Prescriptions"].map(
            (tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`py-2 px-4 ${
                  activeTab === index
                    ? "border-b-2 border-[#0eabeb] text-[#0eabeb]"
                    : "text-[#667080]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Search Field */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold ms-3">
            {activeTab === 0 ? "Today's Prescriptions" : "Older Prescriptions"}
          </h2>
          <div className="flex items-center bg-[#f6f8fb] rounded-full px-4 py-2 w-full max-w-md">
            <input
              type="text"
              placeholder="Search Patient"
              className="bg-[#f6f8fb] focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Prescription Table */}
        <div className="max-h-[620px] overflow-y-auto custom-scroll rounded-t-2xl">
          <table className="min-w-full bg-white table-auto rounded-t-2xl bg-[#F6F8FB]">
            <thead className="sticky top-0 rounded-t-2xl bg-[#F6F8FB]">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Appointment Date
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Appointment Time
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Age
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Gender
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredPrescriptions.length > 0 ? (
                filteredPrescriptions.map((prescription, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">
                      {prescription.patient.firstName}{" "}
                      {prescription.patient.lastName}
                    </td>
                    <td className="px-6 py-4">
                      {prescription.patient.phoneNumber}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-2 rounded-full ${
                          appointmentTypeStyles[prescription.appointmentId.appointmentType]
                        }`}
                      >
                        {prescription.appointmentId.appointmentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-blue-600">
                      <span className="px-4 py-2 rounded-full bg-[#f6f8fb]">
                        {prescription.appointmentId.appointmentTime}
                      </span>
                    </td>
                    <td className="px-6 py-4">{prescription.patient.age}</td>
                    <td className="px-6 py-4 m-auto">
                      {prescription.patient.gender === "Male" ? (
                        <FaMale className="text-blue-500 w-5 h-5 m-auto" />
                      ) : (
                        <FaFemale className="text-red-500 w-5 h-5 m-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleModalOpen(prescription._id)}
                        className="text-blue-600"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <img
                        src={NoDataFound}
                        alt="No Prescription Found"
                        className="w-80 mb-4"
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prescription Modal */}
      {selectedPrescription && (
        <PrescriptionModal
          open={modalOpen}
          handleClose={handleModalClose}
          prescriptionData={selectedPrescription}
        />
      )}
    </div>
  );
};

export default ManagePrescription;
