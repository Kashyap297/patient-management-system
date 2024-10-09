import { useState, useEffect } from "react";
import { Button, IconButton, TextField, InputAdornment } from "@mui/material";
import { Edit, Visibility, Delete, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DeleteDoctorModal from "../../components/modals/DeleteDoctorModal";
import api from "../../api/api"; // Your centralized API instance
import DoctorDetailsDrawer from "../../components/modals/DoctorDetailsDrawer";

const DoctorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]); // State to hold the doctors
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors data from the API
    const fetchDoctors = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        // Make API request with Authorization header
        const response = await api.get("/users/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data); // Log the response to see its structure

        // Assuming the response is directly the array of doctors:
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDeleteModal(true);
  };

  const handleEditClick = (id) => {
    navigate(`/admin/edit-doctor/${id}`);
  };

  const handleDrawerOpen = (doctor) => {
    console.log(doctor);
    setSelectedDoctor(doctor);
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteDoctor = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/users/doctors/${selectedDoctor._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(doctors.filter((doctor) => doctor._id !== selectedDoctor._id));
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  // Filter doctors based on the search term
  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.firstName} ${doctor.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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
                <td className="p-3">{`${doctor.firstName} ${doctor.lastName}`}</td>
                <td className="p-3">{doctor.gender}</td>
                <td className="p-3">{doctor.doctorDetails?.qualification}</td>
                <td className="p-3">{doctor.doctorDetails?.specialtyType}</td>
                <td className="p-3">
                  {doctor.doctorDetails?.workingHours?.checkupTime}
                </td>
                <td className="p-3">
                  {doctor.doctorDetails?.workingHours?.checkupTime}
                </td>
                <td className="p-3">
                  {doctor.doctorDetails?.workingHours?.breakTime}
                </td>
                <td className="p-3 flex space-x-2">
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(doctor._id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDrawerOpen(doctor)}
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
      <DoctorDetailsDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        doctor={selectedDoctor}
      />
      <DeleteDoctorModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteDoctor}
      />
    </div>
  );
};

export default DoctorManagement;
