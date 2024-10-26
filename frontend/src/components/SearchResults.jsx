import React, { useEffect, useState } from "react";
import api from "../api/api";

const SearchResults = ({ query, filterOption }) => {
    const [results, setResults] = useState({ doctors: [], patients: [] });
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (filterOption === "Doctor") {
                    const response = await api.get(`/users/doctors`, {
                        params: { firstName: query, lastName: query },
                    });
                    setResults({ doctors: response.data, patients: [] });
                } else if (filterOption === "Patient") {
                    const response = await api.get(`/appointments`, {
                        params: { patientName: query, role: "patient" },
                    });
                    setResults({ doctors: [], patients: response.data.data });
                } else if (filterOption === "All") {
                    const doctorData = await api.get(`/users/doctors`, {});
                    const patientData = await api.get(`/appointments`, {
                        params: { role: "patient" },
                    });
                    setResults({ doctors: doctorData.data, patients: patientData.data.data });
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        if (query || filterOption === "All") {
            fetchData();
        }
    }, [query, filterOption]);

    useEffect(() => {
        if (filterOption === "Doctor" || filterOption === "All") {
            const filtered = results.doctors.filter((doctor) =>
                `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }

        if (filterOption === "Patient" || filterOption === "All") {
            const filtered = results.patients.filter((patient) =>
                patient.patientName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPatients(filtered);
        }
    }, [query, results, filterOption]);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg mt-6 h-96 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Search Results</h2>

            {/* Doctor Table */}
            {(filterOption === "Doctor" || filterOption === "All") && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Doctor</h3>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                                <th className="p-4 font-medium">Doctor Name</th>
                                <th className="p-4 font-medium">Gender</th>
                                <th className="p-4 font-medium">Qualification</th>
                                <th className="p-4 font-medium">Specialty</th>
                                <th className="p-4 font-medium">Working Time</th>
                                <th className="p-4 font-medium">Check-Up Time</th>
                                <th className="p-4 font-medium">Break Time</th>
                                <th className="p-4 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doctor) => (
                                <tr key={doctor._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 flex items-center">
                                        <img src={doctor.profileImage} alt="Doctor" className="w-10 h-10 rounded-full mr-3" />
                                        Dr. {doctor.firstName} {doctor.lastName}
                                    </td>
                                    <td className="p-4">{doctor.gender}</td>
                                    <td className="p-4">{doctor.doctorDetails?.qualification || "N/A"}</td>
                                    <td className="p-4">{doctor.doctorDetails?.specialtyType || "N/A"}</td>
                                    <td className="p-4 text-blue-500">{doctor.doctorDetails?.workingHours?.workingTime || "N/A"}</td>
                                    <td className="p-4 text-blue-500">{doctor.doctorDetails?.workingHours?.checkupTime || "N/A"}</td>
                                    <td className="p-4 text-blue-500">{doctor.doctorDetails?.workingHours?.breakTime || "N/A"}</td>
                                    <td className="p-4 flex space-x-3">
                                        <button className="text-green-500">✔️</button>
                                        <button className="text-blue-500">👁️</button>
                                        <button className="text-red-500">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Patient Table */}
            {(filterOption === "Patient" || filterOption === "All") && (
                <div>
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Patient</h3>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                                <th className="p-4 font-medium">Patient Name</th>
                                <th className="p-4 font-medium">Patient Issue</th>
                                <th className="p-4 font-medium">Doctor Name</th>
                                <th className="p-4 font-medium">Disease Name</th>
                                <th className="p-4 font-medium">Appointment Time</th>
                                <th className="p-4 font-medium">Appointment Type</th>
                                <th className="p-4 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.patientName}</td>
                                    <td className="p-4">{item.patientIssue}</td>
                                    <td className="p-4">{item.doctorName}</td>
                                    <td className="p-4">{item.diseaseName}</td>
                                    <td className="p-4 text-blue-500">{new Date(item.appointmentDate).toLocaleTimeString()}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full ${item.appointmentType === "Onsite" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"}`}>
                                            {item.appointmentType}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-blue-600">👁️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
