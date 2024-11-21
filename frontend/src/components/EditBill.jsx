import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

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
      toast.success("Bill updated successfully!");
      navigate("/admin/payment-process");
    } catch (error) {
      console.error("Error updating bill:", error);
      toast.error("Failed to update the bill. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Edit Bill</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 border rounded-xl p-4 md:p-6">
        
        {[
          { label: "Patient Name", name: "patientName", type: "text", disabled: true },
          { label: "Phone Number", name: "phoneNumber", type: "text" },
          { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
          { label: "Age", name: "age", type: "number" },
          { label: "Doctor Name", name: "doctorName", type: "text", disabled: true },
          { label: "Disease Name", name: "diseaseName", type: "text" },
          { label: "Description", name: "description", type: "text" },
          { label: "Payment Type", name: "paymentType", type: "select", options: ["Online", "Cash", "Card", "Insurance"] },
          { label: "Bill Date", name: "billDate", type: "date" },
          { label: "Bill Time", name: "billTime", type: "time" },
          { label: "Bill Number", name: "billNumber", type: "text", disabled: true },
          { label: "Amount", name: "amount", type: "number" },
          { label: "Tax (%)", name: "tax", type: "number" },
          { label: "Discount", name: "discount", type: "number" },
          { label: "Total Amount", name: "totalAmount", type: "text", disabled: true },
          { label: "Address", name: "address", type: "text" },
        ].map((field, index) => (
          <div className="relative mb-4" key={index}>
            {field.type === "select" ? (
              <select
                name={field.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                value={formData[field.name]}
                onChange={handleInputChange}
              >
                <option value="">{`Select ${field.label}`}</option>
                {field.options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleInputChange}
                disabled={field.disabled}
              />
            )}
            <label className="absolute left-3 -top-2.5 px-1 bg-white text-sm font-medium text-gray-500">
              {field.label}
            </label>
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end">
          <button type="submit" className="px-4 py-2 bg-[#0eabeb] text-white rounded-xl ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBill;
