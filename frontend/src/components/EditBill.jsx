import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const EditBill = () => {
  const { id } = useParams();
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
    billNumber: id,
    discount: "",
    tax: "",
    amount: "",
    totalAmount: "",
    address: "",
  });

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
          patient: invoiceData.patient._id,
          doctor: invoiceData.doctor._id,
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

    if (name === "age") {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || "",
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
        totalAmount: calculatedTotal.toFixed(2),
      }));
    }
  }, [formData.amount, formData.tax, formData.discount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/invoice/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Bill updated successfully");
      navigate("/admin/payment-process");
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Failed to update the bill. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Bill</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 border rounded-xl p-5">
        <div className="relative mb-4">
          <input
            type="text"
            name="patientName"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleInputChange}
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Patient Name
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="phoneNumber"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Phone Number
          </label>
        </div>
        <div className="relative mb-4">
          <select
            name="gender"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Gender
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="number"
            name="age"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Age
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="doctorName"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Doctor Name"
            value={formData.doctorName}
            onChange={handleInputChange}
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Doctor Name
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="diseaseName"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Disease Name"
            value={formData.diseaseName}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Disease Name
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            name="description"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Description
          </label>
        </div>
        <div className="relative mb-4">
          <select
            name="paymentType"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            value={formData.paymentType}
            onChange={handleInputChange}
          >
            <option value="">Select Payment Type</option>
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Insurance">Insurance</option>
          </select>
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Payment Type
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="date"
            name="billDate"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            value={formData.billDate}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Bill Date
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="time"
            name="billTime"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            value={formData.billTime}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Bill Time
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="billNumber"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Bill Number"
            value={formData.billNumber}
            onChange={handleInputChange}
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Bill Number
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="number"
            name="amount"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Amount
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="number"
            name="tax"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Tax (%)"
            value={formData.tax}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Tax (%)
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="number"
            name="discount"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Discount"
            value={formData.discount}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Discount
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="totalAmount"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Total Amount"
            value={formData.totalAmount}
            disabled
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Total Amount
          </label>
        </div>
        <div className="relative mb-4 ">
          <input
            type="text"
            name="address"
            className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
            Address
          </label>
        </div>

        <div className="col-span-4 flex justify-end">
          <button type="submit" className="px-6 py-2 bg-[#0eabeb] text-white rounded-lg ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBill;
