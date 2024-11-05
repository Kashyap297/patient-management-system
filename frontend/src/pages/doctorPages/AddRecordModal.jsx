import React, { useState } from "react";
import api from "../../api/api"; // Adjust the path according to your project structure
import { FaImage, FaUpload } from "react-icons/fa";

const AddRecordModal = ({ open, onClose, patientId, doctorId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadProgress(0); // Reset upload progress
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("patientId", patientId);
    formData.append("doctorId", doctorId);

    try {
      const response = await api.post("/patients/patient/records", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });

      console.log("Record added successfully:", response.data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error(
        "Error uploading record:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error uploading record: " +
          (error.response
            ? error.response.data.message
            : "Failed to upload the record")
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto ${
        open ? "flex" : "hidden"
      } items-center justify-center bg-black bg-opacity-50`}
    >
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-[#030229] mb-4">Add Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg, .gif"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center text-blue-500 cursor-pointer"
              >
                <FaImage className="text-2xl mb-2" />
                <span className="text-lg font-bold text-[#4f4f4f]">
                  {" "}
                  <span className="text-[#0eabeb]">Upload a file </span> or drag
                  and drop{" "}
                </span>
                <p className="text-gray-400 text-sm mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>
            </div>
          </div>

          <div className="relative mb-6">
            <textarea
              id="description"
              name="description"
              className="peer w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-gray-700 resize-none"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            ></textarea>
            <label
              htmlFor="description"
              className="absolute left-4 -top-2.5 px-1 bg-white text-sm font-medium text-[#030229] peer-placeholder-shown:left-4 peer-focus:-top-2.5 peer-focus:left-4"
            >
              Description <span className="text-red-500">*</span>
            </label>
          </div>

          {uploadProgress > 0 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="text-sm">{uploadProgress}%</span>
            </div>
          )}

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 text-gray-700 border rounded-xl font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-1/2 py-2 rounded-xl font-semibold text-white ${
                file
                  ? "bg-[#0eabeb] hover:bg-[#0eabeb]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!file}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecordModal;
