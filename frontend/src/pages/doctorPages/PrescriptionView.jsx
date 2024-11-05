import { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import patientImage from "../../assets/images/user.png";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";
import NoDataFound from "../../assets/images/NoDataFound.png";
import moment from "moment";

const PrescriptionView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [patient, setPatient] = useState(null);
  const [files, setFiles] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const { id: patientId } = useParams();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const doctorId = decodedToken.id;

  useEffect(() => {
    const fetchPatientDataFromAppointments = async () => {
      try {
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const patientAppointments = response.data.data.filter(
          (appointment) => appointment.patientId === patientId
        );

        if (patientAppointments.length > 0) {
          const firstAppointment = patientAppointments[0];
          setPatient({
            firstName: firstAppointment.patientName,
            lastName: "", // Assuming last name is not provided
            phoneNumber: firstAppointment.patientPhoneNumber,
            age: firstAppointment.patientAge,
            patientIssue: firstAppointment.patientIssue,
            gender: firstAppointment.patientGender,
            appointmentType: firstAppointment.appointmentType,
            address: firstAppointment.patientAddress,
            lastAppointmentDate: moment(
              firstAppointment.appointmentDate
            ).format("D MMM, YYYY"),
            lastAppointmentTime: firstAppointment.appointmentTime,
            doctorName: firstAppointment.doctorName,
            profileImage: firstAppointment.profileImage,
          });
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    const fetchRecords = async () => {
      try {
        const response = await api.get(
          `/patients/patient/records/${patientId}/${doctorId}`
        );
        setFiles(response.data.data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const response = await api.get("/prescription"); // Fetch all prescriptions
        const filteredPrescriptions = response.data.prescriptions.filter(
          (prescription) => prescription.patient._id === patientId
        );
        setPrescriptions(filteredPrescriptions); // Filter by patientId and set state
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };
    fetchPatientDataFromAppointments();
    fetchRecords();
    fetchPrescriptions();
  }, [patientId, doctorId]);
  console.log(prescriptions);
  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  return (
    <div className="p-8 bg-white h-full shadow-lg rounded-xl">
      {/* Patient Information */}
      <div className="bg-white rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl  font-semibold">Patient Details</h2>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 border border-4 border-[#DFE0EB] rounded-full">
            <img
              src={
                patient.profileImage
                  ? `http://localhost:8000/${patient.profileImage}`
                  : patientImage
              }
              alt="Patient"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="flex-grow ml-6">
            <div className="grid grid-cols-5 gap-x-12 gap-y-4">
              <div className=" leading-5">
                <p className="text-gray-400">Patient Name</p>{" "}
                {patient.firstName} {patient.lastName}
              </div>
              <div className=" leading-5">
                <p className="text-gray-400">Patient Number</p>{" "}
                {patient.phoneNumber}
              </div>
              <div className=" leading-5">
                <p className="text-gray-400">Patient Issue</p>{" "}
                {patient.patientIssue}
              </div>
              <div className=" leading-5">
                <p className="text-gray-400">Patient Gender</p> {patient.gender}
              </div>
              <div className=" leading-5">
                <p className="text-gray-400">Last Appointment Date</p>{" "}
                {patient.lastAppointmentDate}
              </div>
              <div className=" leading-5">
                <p className="text-gray-400">Doctor Name</p> Dr.{" "}
                {patient.doctorName}
              </div>

              <div className=" leading-5">
                <p className="text-gray-400">Patient Age</p> {patient.age} Years
              </div>

              <div className=" leading-5">
                <p className="text-gray-400">Appointment Type</p>{" "}
                {patient.appointmentType}
              </div>
              <div className=" leading-5">
                <p className="text-gray-400">Patient Address</p>{" "}
                {patient.address}
              </div>
              <div className=" leading-5">
                <p className="text-gray-400">Last Appointment Time</p>{" "}
                {patient.lastAppointmentTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Documents, Prescriptions, Description */}
      <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
        <TabList className="flex border-b-2 my-4">
          <Tab
            className={`px-4 py-2 cursor-pointer outline-none ${
              activeTab === 0
                ? "border-b-2 border-[#0eabeb] text-[#0eabeb]"
                : "text-gray-500"
            }`}
          >
            All Documents
          </Tab>
          <Tab
            className={`px-4 py-2 cursor-pointer outline-none ${
              activeTab === 1
                ? "border-b-2 border-[#0eabeb] text-[#0eabeb]"
                : "text-gray-500"
            }`}
          >
            All Prescriptions
          </Tab>
          <Tab
            className={`px-4 py-2 cursor-pointer outline-none ${
              activeTab === 2
                ? "border-b-2 border-[#0eabeb] text-[#0eabeb]"
                : "text-gray-500"
            }`}
          >
            Description
          </Tab>
        </TabList>
        <div className="custom-scroll overflow-y-auto h-[470px]">
          {/* Documents Tab */}
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div key={index} className="rounded-xl shadow border">
                    <div className="flex justify-between bg-[#f6f8fb] rounded-t-xl px-4 py-3 items-center ">
                      <span className="text-[#4F4F4F]  font-semibold">
                        Created Date
                      </span>
                      <span className="text-gray-500">
                        {moment(file.createdAt).format("D MMM, YYYY")}
                      </span>
                    </div>
                    <div className="px-4 py-4">
                      <div className="border rounded-lg  overflow-hidden">
                        <img
                          src={`http://localhost:8000/${file.url}`}
                          alt="Document"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center">
                  <img
                    src={NoDataFound}
                    alt="No record found"
                    className="w-3/4"
                  />
                </div>
              )}
            </div>
          </TabPanel>

          {/* Prescriptions Tab */}
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {prescriptions.length > 0 ? (
                prescriptions.map((prescription, index) => (
                  <div key={index} className="rounded-xl shadow border">
                    {/* Header with Created Date */}
                    <div className="flex justify-between bg-[#f6f8fb] rounded-t-xl px-4 py-3 items-center">
                      <span className="text-[#4F4F4F] font-semibold">
                        Created Date
                      </span>
                      <span className="text-gray-500">
                        {moment(prescription.createdAt).format("D MMM, YYYY")}
                      </span>
                    </div>

                    <div className="px-4 py-4">
                      {/* Hospital and Doctor Information */}
                      <div className="flex justify-between mb-4">
                        <div>
                          <h2 className="text-sm  font-bold text-blue-600">
                            Hospital
                          </h2>
                          <p className="text-sm ">{prescription.appointmentId.hospital}</p>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm  text-blue-600">
                            {prescription.doctor.firstName}{" "}
                            {prescription.doctor.lastName}
                          </h3>
                        </div>
                      </div>

                      {/* Medicines Table */}
                      <div className="mt-4 shadow-sm">
                        <table className="w-full text-left text-xs rounded-lg table-fixed">
                          <thead className="rounded-t-xl">
                            <tr className="bg-[#f6f8fb] rounded-t-xl">
                              <th className="font-semibold py-2 px-2">
                                Medicine Name
                              </th>
                              <th className="font-semibold py-2 px-2">
                                Strength
                              </th>
                              <th className="font-semibold py-2 px-2">Dose</th>
                              <th className="font-semibold py-2 px-2">
                                Duration
                              </th>
                              <th className="font-semibold py-2 px-2">
                                When to Take
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {prescription.medicines.map((medicine, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="py-2 px-4">{medicine.name}</td>
                                <td className="py-2 px-4">
                                  {medicine.strength}
                                </td>
                                <td className="py-2 px-4">{medicine.dose}</td>
                                <td className="py-2 px-4">
                                  <span className="bg-green-100 text-green-700 text-xs w-100 px-2 py-1 rounded-full inline-block">
                                    {medicine.duration}
                                  </span>
                                </td>
                                <td className="py-2 px-4">
                                  <span className="bg-blue-100 text-blue-600 text-xs w-100 px-2 py-1 rounded-full inline-block">
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
                        <h3 className="text-sm font-semibold mb-2">
                          Additional Note
                        </h3>
                        <p className="text-gray-600 text-sm ">
                          {prescription.additionalNote ||
                            "No additional notes provided."}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center">
                  <img
                    src={NoDataFound}
                    alt="No record found"
                    className="w-3/4"
                  />
                </div>
              )}
            </div>
          </TabPanel>

          {/* Description Tab */}
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div key={index} className="rounded-xl shadow border">
                    <div className="flex justify-between bg-[#f6f8fb] rounded-t-xl px-4 py-3 items-center">
                      <span className="text-[#4F4F4F] font-semibold">
                        Created Date
                      </span>
                      <span className="text-gray-500">
                        {moment(file.createdAt).format("D MMM, YYYY")}
                      </span>
                    </div>
                    <div className="px-4 py-4">
                      <div className="border rounded-lg overflow-hidden p-4 bg-white">
                        <p className="text-gray-700">{file.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center">
                  <img
                    src={NoDataFound}
                    alt="No record found"
                    className="w-3/4"
                  />
                </div>
              )}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default PrescriptionView;
