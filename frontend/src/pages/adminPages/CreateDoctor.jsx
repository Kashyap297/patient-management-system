import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineClockCircle } from "react-icons/ai"; // Icons
import { FiUpload } from "react-icons/fi"; // Upload icon

const CreateDoctor = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    specialtyType: "",
    checkUpTime: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
    onlineConsultationRate: "",
    doctorQualification: "",
    gender: "",
    workOn: "",
    state: "",
    city: "",
    doctorAddress: "",
    description: "",
    hospitalName: "",
    hospitalAddress: "",
    emergencyContact: "",
    hospitalWebsite: "",
    experience: "",
    workingTime: "",
    breakTime: "",
    age: "",
    doctorEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up">
        <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50">
          <h2 className="text-3xl font-extrabold text-secondary tracking-tight mb-8">Add New Doctor</h2>

          {/* Flex container for Profile, Signature, and Doctor Fields */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Left side (Profile photo and Upload Signature) */}
            <div className="flex flex-col lg:w-1/4 gap-6">
              {/* Profile Photo */}
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-sm flex flex-col items-center justify-center">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-inner overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <AiOutlineCamera className="text-gray-400 text-4xl group-hover:text-primary transition-colors" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-semibold">Upload</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    name="profile"
                    onChange={(e) => {
                      // Handle file upload
                    }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-secondary mt-4">Profile Photo</h3>
                <p className="text-xs text-gray-500 text-center mt-1">Upload a clear portrait</p>
              </div>

              {/* Upload Signature */}
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-sm flex flex-col items-center justify-center h-48">
                <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-white/50 transition-all duration-300 group">
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors mb-3">
                    <FiUpload className="text-gray-500 text-xl group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors">
                    Upload Signature
                  </span>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
                  <input
                    type="file"
                    className="hidden"
                    name="signature"
                    onChange={(e) => {
                      // Handle file upload
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Right side (Doctor fields) */}
            <div className="lg:w-3/4">
              <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-white/60 shadow-sm h-full">
                <h3 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200/50 pb-3">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Doctor Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="doctorName"
                      name="doctorName"
                      className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                      placeholder="Enter Doctor Name"
                      value={formData.doctorName}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="doctorName"
                      className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none"
                    >
                      Doctor Name<span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Doctor Qualification */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="doctorQualification"
                      name="doctorQualification"
                      className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                      placeholder="Enter Doctor Qualification"
                      value={formData.doctorQualification}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="doctorQualification"
                      className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none"
                    >
                      Doctor Qualification<span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Specialty Type */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="specialtyType"
                      name="specialtyType"
                      className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                      placeholder="Enter Specialty Type"
                      value={formData.specialtyType}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="specialtyType"
                      className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none"
                    >
                      Specialty Type<span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Work On */}
                  <div className="relative group">
                    <select
                      id="workOn"
                      name="workOn"
                      className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 appearance-none text-gray-700"
                      value={formData.workOn}
                      onChange={handleChange}
                    >
                      <option value="">Select Work On</option>
                      <option value="Online">Online</option>
                      <option value="Onsite">Onsite</option>
                      <option value="Both">Both</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 group-hover:text-primary transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <label
                      htmlFor="workOn"
                      className="absolute left-3 -top-2.5 px-1 bg-gradient-to-b from-white/0 to-white/80 backdrop-blur-sm text-xs font-semibold text-gray-500 uppercase tracking-wider rounded"
                    >
                      Work On<span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Check-Up Time */}
                  <div className="relative group">
                    <input
                      type="text"
                      id="checkUpTime"
                      name="checkUpTime"
                      className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent pr-10"
                      placeholder="Enter Checkup Time"
                      value={formData.checkUpTime}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="checkUpTime"
                      className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none"
                    >
                      Check-Up Time<span className="text-red-500">*</span>
                    </label>
                    <AiOutlineClockCircle className="absolute right-4 top-3.5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital fields below */}
          <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl border border-white/60 shadow-sm mb-8">
            <h3 className="text-xl font-bold text-secondary mb-6 border-b border-gray-200/50 pb-3">Hospital Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Hospital Name */}
              <div className="relative group lg:col-span-2">
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Hospital Name"
                  value={formData.hospitalName}
                  onChange={handleChange}
                />
                <label
                  htmlFor="hospitalName"
                  className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none"
                >
                  Hospital Name
                </label>
              </div>

              {/* Hospital Website */}
              <div className="relative group lg:col-span-2">
                <input
                  type="text"
                  id="hospitalWebsite"
                  name="hospitalWebsite"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Hospital Website Link"
                  value={formData.hospitalWebsite}
                  onChange={handleChange}
                />
                <label
                  htmlFor="hospitalWebsite"
                  className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none"
                >
                  Hospital Website
                </label>
              </div>

              {/* Emergency Contact */}
              <div className="relative group lg:col-span-2">
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Emergency Contact Number"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
                <label
                  htmlFor="emergencyContact"
                  className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none"
                >
                  Emergency Contact
                </label>
              </div>

              {/* Hospital Address */}
              <div className="relative group lg:col-span-4">
                <input
                  type="text"
                  id="hospitalAddress"
                  name="hospitalAddress"
                  className="peer w-full px-4 py-3 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all duration-300 placeholder-transparent"
                  placeholder="Enter Hospital Address"
                  value={formData.hospitalAddress}
                  onChange={handleChange}
                />
                <label
                  htmlFor="hospitalAddress"
                  className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-white/80 peer-focus:backdrop-blur-sm peer-focus:px-1 peer-focus:rounded peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-500 peer-[&:not(:placeholder-shown)]:bg-white/80 peer-[&:not(:placeholder-shown)]:backdrop-blur-sm peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:rounded pointer-events-none"
                >
                  Hospital Address
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="py-3 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 text-lg">
              Add Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDoctor;
