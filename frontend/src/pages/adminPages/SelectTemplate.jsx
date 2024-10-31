import React, { useState } from "react";
import template1Image from "../../assets/images/template1.png";
import template2Image from "../../assets/images/template2.png";
import InvoiceTemplate1 from "./InvoiceTemplate1"; 
import { useNavigate, useLocation } from "react-router-dom";
import InvoiceTemplate2 from "./InvoiceTemplate2";

const templateData = [
  {
    id: 1,
    name: "Template 1",
    image: template1Image,
    component: <InvoiceTemplate2 />, // Assigning the component to render
  },
  {
    id: 2,
    name: "Template 2",
    image: template2Image,
    component: <InvoiceTemplate1 />, // Assigning the component to render
  },
];

const SelectTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = location.state?.editMode || false;

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const handleConfirmSelection = () => {
    if (editMode) {
      navigate("/admin/monitor-billing");
    } else {
      navigate("/admin/create-bill");
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Select Invoice Theme
      </h1>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        {templateData.map((template) => (
          <div
            key={template.id}
            className={`p-4 border-2 cursor-pointer rounded-lg ${
              selectedTemplate && selectedTemplate.id === template.id
                ? "border-blue-500"
                : "border-gray-200"
            } shadow-md transition-all duration-300`}
            onClick={() => handleSelectTemplate(template)}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-auto h-[450px] object-cover"
            />
            <h2 className="text-lg font-semibold text-center mt-4">
              {template.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Show "Select Template" button if a template is selected */}
      {selectedTemplate && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg"
            onClick={handleConfirmSelection}
          >
            Select {selectedTemplate.name}
          </button>
        </div>
      )}

      {/* Render the selected invoice template component */}
      {selectedTemplate && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-center mb-4">
            Preview of {selectedTemplate.name}
          </h2>
          <div className="rounded-lg">
            {selectedTemplate.component}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTemplate;
