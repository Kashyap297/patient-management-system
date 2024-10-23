import React, { useState } from 'react';
import { Button } from '@mui/material';
import api from "../../api/api"; // Adjust the path according to your project structure

const AddRecordModal = ({ open, onClose, patientId, doctorId, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
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
    formData.append('file', file);
    formData.append('description', description);
    formData.append('patientId', patientId);
    formData.append('doctorId', doctorId);
    console.log("pid",patientId)
    console.log("did",doctorId)
    console.log("dec",description)
    console.log("file",file)

    try {
      const response = await api.post('/patients/patient/records', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });

      console.log('Record added successfully:', response.data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error uploading record:', error.response ? error.response.data : error.message);
      alert("Error uploading record: " + (error.response ? error.response.data.message : "Failed to upload the record"));
    }
  };

  return (
    <div className={`modal ${open ? 'block' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Add Record</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upload File</label>
              <div className="mt-2">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".png, .jpg, .jpeg, .gif"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
                rows={3}
                required
              />
            </div>

            {uploadProgress > 0 && (
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <span className="text-sm">{uploadProgress}%</span>
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outlined" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={!file}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecordModal;
