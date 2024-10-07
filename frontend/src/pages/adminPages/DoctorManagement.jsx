import { useState } from "react";
import { Button, IconButton, TextField, InputAdornment } from "@mui/material";
import { Edit, Visibility, Delete, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeleteDoctorModal from "../../components/modals/DeleteDoctorModal";

const DoctorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteDoctor = () => {
    console.log("Deleting doctor:", selectedDoctor);
    setOpenDeleteModal(false);
  };
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: "Dr. Marcus Philips",
      gender: "Male",
      qualification: "MBBS",
      specialty: "Internal Medicine",
      workingTime: "6 Hour",
      checkupTime: "4 Hour",
      breakTime: "1 Hour",
    },
    {
      id: 2,
      name: "Dr. Haylie Schleifer",
      gender: "Female",
      qualification: "BDS",
      specialty: "Anesthesiology",
      workingTime: "5 Hour",
      checkupTime: "4 Hour",
      breakTime: "2 Hour",
    },
    {
      id: 3,
      name: "Dr. Roger Carder",
      gender: "Male",
      qualification: "B.U.M.S.",
      specialty: "Surgery",
      workingTime: "8 Hour",
      checkupTime: "5 Hour",
      breakTime: "2 Hour",
    },
    // Add more doctors
  ];

  // Filter doctors based on the search term
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Doctor Management</h2>
        <Button
          variant="contained"
          color="primary"
          className="!text-sm"
          onClick={() => navigate("/admin/add-new-doctor")}
        >
          + Add New Doctor
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <TextField
          variant="outlined"
          placeholder="Search Doctor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">
                Doctor Name
              </th>
              <th className="p-3 text-left text-sm font-semibold">Gender</th>
              <th className="p-3 text-left text-sm font-semibold">
                Qualification
              </th>
              <th className="p-3 text-left text-sm font-semibold">Specialty</th>
              <th className="p-3 text-left text-sm font-semibold">
                Working Time
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Patient Check Up Time
              </th>
              <th className="p-3 text-left text-sm font-semibold">
                Break Time
              </th>
              <th className="p-3 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{doctor.name}</td>
                <td className="p-3">{doctor.gender}</td>
                <td className="p-3">{doctor.qualification}</td>
                <td className="p-3">{doctor.specialty}</td>
                <td className="p-3">{doctor.workingTime}</td>
                <td className="p-3">{doctor.checkupTime}</td>
                <td className="p-3">{doctor.breakTime}</td>
                <td className="p-3 flex space-x-2">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/admin/edit-doctor/${doctor.id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => navigate(`/admin/view-doctor/${doctor.id}`)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(doctor)}
                  >
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteDoctorModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteDoctor}
      />
    </div>
  );
};

export default DoctorManagement;
