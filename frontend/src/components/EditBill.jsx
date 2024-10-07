import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditBill = () => {
  const { id } = useParams(); // Get the bill ID from the route
  const navigate = useNavigate();

  // Sample initial form data (you will fetch this from an API in a real app)
  const [formData, setFormData] = useState({
    patientName: "Sliver Medical Center",
    phoneNumber: "99130 23830",
    gender: "Male",
    age: "22 Years",
    doctorName: "Dr. Marcus Philips",
    diseaseName: "Meningococcal Disease",
    description: "Lorem ipsum dolor sit amet, consectetur",
    paymentType: "Online",
    billDate: "2 Jan, 2022",
    billTime: "12:19 PM",
    billNumber: id, // Using the id from the URL
    discount: "10%",
    tax: "₹ 256",
    amount: "₹ 2,520",
    totalAmount: "₹ 2,520",
    address: "501, Shamruddh Avenue",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here (e.g., API call to save the bill data)
    alert("Bill updated successfully");
    navigate("/billing-process"); // Navigate back after saving
  };

  return (
    <div className="p-6 m-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Bills</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <TextField
          label="Patient Name"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          select
          required
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>

        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <TextField
          label="Doctor Name"
          name="doctorName"
          value={formData.doctorName}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Disease Name"
          name="diseaseName"
          value={formData.diseaseName}
          onChange={handleInputChange}
          required
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <TextField
          label="Payment Type"
          name="paymentType"
          value={formData.paymentType}
          onChange={handleInputChange}
          select
        >
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Cash">Cash</MenuItem>
          <MenuItem value="Card">Card</MenuItem>
        </TextField>

        <TextField
          label="Bill Date"
          name="billDate"
          value={formData.billDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          type="date"
        />
        <TextField
          label="Bill Time"
          name="billTime"
          value={formData.billTime}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          type="time"
        />
        <TextField
          label="Bill Number"
          name="billNumber"
          value={formData.billNumber}
          onChange={handleInputChange}
          disabled
        />
        <TextField
          label="Discount (%)"
          name="discount"
          value={formData.discount}
          onChange={handleInputChange}
        />
        <TextField
          label="Tax"
          name="tax"
          value={formData.tax}
          onChange={handleInputChange}
        />

        <TextField
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <TextField
          label="Total Amount"
          name="totalAmount"
          value={formData.totalAmount}
          onChange={handleInputChange}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />

        <div className="col-span-3 flex justify-end">
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBill;
