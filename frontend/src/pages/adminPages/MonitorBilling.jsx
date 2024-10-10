import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // Import your API utility

const MonitorBilling = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [billingData, setBillingData] = useState([]); // State for fetched data
  const navigate = useNavigate();

  // Fetch billing data from API
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await api.get("/invoice", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBillingData(response.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchBillingData();
  }, []);

  // Filtered data based on search term
  const filteredBillingData = billingData.filter(
    (entry) =>
      `${entry.patient?.firstName} ${entry.patient?.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      entry.diseaseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.phoneNumber?.includes(searchTerm)
  );

  const handleViewInvoice = (bill) => {
    navigate(`/admin/invoice/${bill._id}/${bill.patient?.firstName}`);
  };

  const statusStyles = {
    Paid: "bg-green-100 text-green-600 font-medium px-3 py-1 rounded-full",
    Unpaid: "bg-red-100 text-red-600 font-medium px-3 py-1 rounded-full",
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md m-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Monitor Billing</h2>
        <div className="flex space-x-2">
          <Button
            variant="outlined"
            color="primary"
            className="text-sm"
            onClick={() =>
              navigate("/admin/select-template", { state: { editMode: true } })
            }
          >
            Edit Design Invoice
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="text-sm"
            onClick={() =>
              navigate("/admin/select-template", { state: { editMode: false } })
            }
          >
            Create Bills
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <TextField
          variant="outlined"
          placeholder="Search Patient"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </div>

      {/* Billing Table */}
      <TableContainer>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Bill Number</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Disease Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBillingData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button variant="text" color="primary">
                    {entry.billNumber}
                  </Button>
                </TableCell>
                <TableCell>
                  {entry.patient
                    ? `${entry.patient.firstName} ${entry.patient.lastName}`
                    : "N/A"}
                </TableCell>
                <TableCell>{entry.diseaseName}</TableCell>
                <TableCell>{entry.phoneNumber}</TableCell>
                <TableCell>
                  <span className={statusStyles[entry.status]}>
                    {entry.status || "Unpaid"}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(entry.billDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{entry.billTime}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewInvoice(entry)}
                  >
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MonitorBilling;
