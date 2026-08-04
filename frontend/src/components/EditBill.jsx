import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { FaChevronLeft } from "react-icons/fa";
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
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up max-w-6xl mx-auto">
        <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-200/50 pb-6">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-full bg-white shadow-sm hover:bg-gray-50 text-gray-600 transition-colors border border-gray-100 flex items-center justify-center"
            >
              <FaChevronLeft size={16} />
            </button>
            <h2 className="text-3xl font-extrabold text-secondary tracking-tight">Edit Bill Details</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/60 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                { label: "Address", name: "address", type: "text", fullWidth: true },
              ].map((field, index) => (
                <div className={`relative group ${field.fullWidth ? 'lg:col-span-4' : ''}`} key={index}>
                  {field.type === "select" ? (
                    <>
                      <select
                        name={field.name}
                        className="peer w-full px-4 py-3.5 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700"
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        disabled={field.disabled}
                      >
                        <option value="">{`Select ${field.label}`}</option>
                        {field.options.map((option) => (
                          <option value={option} key={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      className={`peer w-full px-4 py-3.5 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent ${field.disabled ? 'opacity-70 cursor-not-allowed bg-gray-50/50' : ''}`}
                      placeholder={field.label}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      disabled={field.disabled}
                    />
                  )}
                  <label className={`absolute left-4 top-3.5 text-sm transition-all duration-300 pointer-events-none
                    ${field.type === 'select' ? '-top-2.5 text-xs text-primary bg-white/80 backdrop-blur-sm px-1 rounded' : 'text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded'}
                  `}>
                    {field.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button type="submit" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 text-lg">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBill;
