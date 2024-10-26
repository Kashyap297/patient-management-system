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
        // Filter doctors based on query
        if (filterOption === "Doctor" || filterOption === "All") {
            const filtered = results.doctors.filter((doctor) =>
                `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredDoctors(filtered);
        }

        // Filter patients based on query
        if (filterOption === "Patient" || filterOption === "All") {
            const filtered = results.patients.filter((patient) =>
                patient.patientName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPatients(filtered);
        }
    }, [query, results, filterOption]);

    return (
        <div className="p-4 bg-white shadow rounded mt-4 h-80 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Search Results</h2>

            {/* Display Doctor Table */}
            {(filterOption === "Doctor" || filterOption === "All") && (
                <div className="mb-4">
                    <h3 className="text-md font-semibold mb-2">Doctor</h3>
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>Gender</th>
                                <th>Qualification</th>
                                <th>Specialty</th>
                                <th>Working Time</th>
                                <th>Patient Check Up Time</th>
                                <th>Break Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doctor) => (
                                <tr key={doctor._id}>
                                    <td>
                                        <img src={doctor.profileImage} alt="Doctor" className="w-8 h-8 rounded-full inline-block mr-2" />
                                        Dr. {doctor.firstName} {doctor.lastName}
                                    </td>
                                    <td>{doctor.gender}</td>
                                    <td>{doctor.doctorDetails?.qualification || "N/A"}</td>
                                    <td>{doctor.doctorDetails?.specialtyType || "N/A"}</td>
                                    <td>{doctor.doctorDetails?.workingHours?.workingTime || "N/A"}</td>
                                    <td>{doctor.doctorDetails?.workingHours?.checkupTime || "N/A"}</td>
                                    <td>{doctor.doctorDetails?.workingHours?.breakTime || "N/A"}</td>
                                    <td>
                                        <button className="text-green-500 mr-2">✔️</button>
                                        <button className="text-blue-500 mr-2">👁️</button>
                                        <button className="text-red-500">🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Display Patient Table */}
            {(filterOption === "Patient" || filterOption === "All") && (
                <div>
                    <h3 className="text-md font-semibold mb-2">Patient</h3>
                    <table className="w-full border">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Patient Issue</th>
                                <th>Doctor Name</th>
                                <th>Disease Name</th>
                                <th>Appointment Time</th>
                                <th>Appointment Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.patientName}</td>
                                    <td>{item.patientIssue}</td>
                                    <td>{item.doctorName}</td>
                                    <td>{item.diseaseName}</td>
                                    <td>{new Date(item.appointmentDate).toLocaleTimeString()}</td>
                                    <td>{item.appointmentType}</td>
                                    <td>
                                        <button className="text-blue-600">View</button>
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
