import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaDownload, FaEye, FaImage } from "react-icons/fa";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import PrescriptionModal from "../../components/Patient/PrescritionModal";
import api from "../../api/api";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import CustomDateFilter from "../../components/modals/CustomDateFilter";
import "react-loading-skeleton/dist/skeleton.css";

const PrescriptionAccessPage = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDates, setFilterDates] = useState({
    fromDate: null,
    toDate: null,
  });
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);

  useEffect(() => {
    updateBreadcrumb([
      { label: "Prescription Access", path: "/patient/prescription-access" },
    ]);
  }, []);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/prescription");
        if (response.data && response.data.prescriptions) {
          setPrescriptions(response.data.prescriptions);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setError("Failed to load prescriptions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const prescriptionDate = moment(prescription.prescriptionDate);
    return filterDates.fromDate && filterDates.toDate
      ? prescriptionDate.isBetween(
          moment(filterDates.fromDate).startOf("day"),
          moment(filterDates.toDate).endOf("day"),
          null,
          "[]"
        )
      : true;
  });

  const handleApplyDateFilter = (fromDate, toDate) => {
    setFilterDates({ fromDate, toDate });
    setOpenCustomDateModal(false);
  };

  const handleResetDateFilter = () => {
    setFilterDates({ fromDate: null, toDate: null });
    setOpenCustomDateModal(false);
  };

  const dateRangeLabel =
    filterDates.fromDate && filterDates.toDate
      ? `${moment(filterDates.fromDate).format("D MMM, YYYY")} - ${moment(
          filterDates.toDate
        ).format("D MMM, YYYY")}`
      : "Any Date";

  const openModal = (prescriptionId) => {
    setSelectedPrescriptionId(prescriptionId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPrescriptionId(null);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-semibold">Prescription Access</h2>
        <div
          className="flex items-center border border-gray-300 rounded-xl px-4 py-2 cursor-pointer"
          onClick={() => setOpenCustomDateModal(true)}
        >
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <span className="text-gray-800">{dateRangeLabel}</span>
          {filterDates.fromDate && filterDates.toDate && (
            <button
              className="ml-2 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleResetDateFilter();
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Prescription Cards */}
      <div className="overflow-y-auto h-[680px] custom-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="border rounded-xl shadow-md p-4">
                <Skeleton height={24} width="60%" className="mb-2" />
                <div className="flex space-x-2">
                  <Skeleton height={32} width={32} />
                  <Skeleton height={32} width={32} />
                </div>
                <Skeleton height={16} width="80%" className="my-2" />
                <Skeleton height={16} width="70%" />
                <Skeleton height={16} width="50%" />
              </div>
            ))
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : filteredPrescriptions.length > 0 ? (
            filteredPrescriptions.map((prescription) => (
              <div
                key={prescription._id}
                className="border rounded-xl shadow-md bg-white transition p-4 md:p-6"
              >
                {/* Card Header */}
                <div className="flex justify-between items-center pb-2 border-b mb-4">
                  <h4 className="font-semibold text-gray-800">
                    {prescription.doctor ? (
                      <>
                        Dr. {prescription.doctor.firstName}{" "}
                        {prescription.doctor.lastName}
                      </>
                    ) : (
                      <span className="text-red-500">Doctor info not available</span>
                    )}
                  </h4>
                  <div className="flex space-x-2">
                    <div className="text-customBlue text-lg cursor-pointer rounded-full bg-gray-100 p-2">
                      <FaDownload onClick={() => openModal(prescription._id)} />
                    </div>
                    <div className="text-customBlue text-lg cursor-pointer rounded-full bg-gray-100 p-2">
                      <FaEye onClick={() => openModal(prescription._id)} />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="text-sm text-gray-700 space-y-2">
                  <p className="flex justify-between font-semibold">
                    <span className="text-gray-500">Hospital Name</span>{" "}
                    {prescription.appointmentId
                      ? prescription.appointmentId.hospital
                      : "N/A"}
                  </p>
                  <p className="flex justify-between font-semibold">
                    <span className="text-gray-500">Disease Name</span>
                    {prescription.medicines && prescription.medicines.length > 0
                      ? prescription.medicines[0].name
                      : "N/A"}
                  </p>
                  <p className="flex justify-between font-semibold">
                    <span className="text-gray-500">Date</span>
                    {prescription.prescriptionDate
                      ? new Date(prescription.prescriptionDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="flex justify-between font-semibold">
                    <span className="text-gray-500">Time</span>{" "}
                    {prescription.appointmentId
                      ? prescription.appointmentId.appointmentTime
                      : "N/A"}
                  </p>
                </div>

                {/* Prescription File */}
                <div className="flex items-center border-2 m-4 rounded-xl p-2">
                  <div className="text-customBlue rounded-full p-4 text-3xl bg-gray-50">
                    <FaImage />
                  </div>
                  <div className="ml-2">
                    <p className="font-semibold">Prescription.jpg</p>
                    <p className="text-xs text-gray-500">5.09 MB</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No prescriptions found.</div>
          )}
        </div>
      </div>

      {/* Prescription Modal */}
      {showModal && selectedPrescriptionId && (
        <PrescriptionModal
          closeModal={closeModal}
          prescriptionId={selectedPrescriptionId}
        />
      )}

      <CustomDateFilter
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleApplyDateFilter}
        onReset={handleResetDateFilter}
      />
    </div>
  );
};

export default PrescriptionAccessPage;
