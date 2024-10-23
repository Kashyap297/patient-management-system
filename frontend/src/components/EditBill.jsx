import { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // Import your API utility or adjust the import path

const EditBill = () => {
  const { id } = useParams(); // Get the bill ID from the route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    phoneNumber: "",
    gender: "",
    age: "",
    doctorName: "",
    diseaseName: "",
    description: "",
    paymentType: "",
    billDate: "",
    billTime: "",
    billNumber: id, // Using the id from the URL
    discount: "",
    tax: "",
    amount: "",
    totalAmount: "",
    address: "",
  });

  // Fetch the existing bill data when the component mounts
  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await api.get(`/invoice/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const invoiceData = response.data.invoice;

        setFormData({
          patient: invoiceData.patient._id, // Use the _id here
          doctor: invoiceData.doctor._id,   // Use the _id here
          patientName: `${invoiceData.patient.firstName} ${invoiceData.patient.lastName}`,
          phoneNumber: invoiceData.phoneNumber,
          gender: invoiceData.gender,
          age: parseInt(invoiceData.age, 10) || "",
          doctorName: `${invoiceData.doctor.firstName} ${invoiceData.doctor.lastName}`,
          diseaseName: invoiceData.diseaseName,
          description: invoiceData.description,
          paymentType: invoiceData.paymentType,
          billDate: new Date(invoiceData.billDate).toISOString().split("T")[0],
          billTime: invoiceData.billTime,
          billNumber: invoiceData.billNumber,
          discount: invoiceData.discount,
          tax: invoiceData.tax,
          amount: invoiceData.amount,
          totalAmount: invoiceData.totalAmount,
          address: invoiceData.address,
        });
      } catch (error) {
        console.error("Error fetching bill data:", error);
      }
    };

    fetchBillData();
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Convert age to a number if it's a string like "55 Years"
    if (name === "age") {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || "", // convert to number or keep it empty if not a number
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (formData.amount && formData.tax && formData.discount !== null) {
      const amount = parseFloat(formData.amount) || 0;
      const tax = parseFloat(formData.tax) || 0;
      const discount = parseFloat(formData.discount) || 0;

      const calculatedTotal = amount + (amount * (tax / 100)) - discount;

      setFormData((prevValues) => ({
        ...prevValues,
        totalAmount: calculatedTotal.toFixed(2), // Round to 2 decimal places
      }));
    }
  }, [formData.amount, formData.tax, formData.discount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Add this line to debug

    try {
      await api.patch(`/invoice/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Bill updated successfully");
      navigate("/billing-process"); // Navigate back after saving
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Failed to update the bill. Please try again.");
    }
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
          disabled
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
          <MenuItem value="Other">Other</MenuItem>
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
          disabled
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
          <MenuItem value="Insurance">Insurance</MenuItem>
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
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleInputChange}
        />
        <TextField
          label="Tax (%)"
          name="tax"
          type="number"
          value={formData.tax}
          onChange={handleInputChange}
        />
        <TextField
          label="Discount"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleInputChange}
        />
        <TextField
          label="Total Amount"
          name="totalAmount"
          value={formData.totalAmount}
          disabled
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
