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
    component: <InvoiceTemplate2 />,
  },
  {
    id: 2,
    name: "Template 2",
    image: template2Image,
    component: <InvoiceTemplate1 />,
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
    <div className="p-4 md:p-8 bg-white rounded-xl shadow-lg min-h-screen">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-start">
        Select Invoice Theme
      </h1>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
        {templateData.map((template) => (
          <div
            key={template.id}
            className={`p-2 md:p-4 border-2 cursor-pointer rounded-xl ${
              selectedTemplate && selectedTemplate.id === template.id
                ? "border-blue-500"
                : "border-gray-200"
            } shadow-md transition-all duration-300`}
            onClick={() => handleSelectTemplate(template)}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded"
            />
            <h2 className="text-center text-base md:text-lg font-semibold mt-2 md:mt-4">
              {template.name}
            </h2>
          </div>
        ))}
      </div>

      {/* Show "Select Template" button if a template is selected */}
      {selectedTemplate && (
        <div className="flex justify-center mt-6 md:mt-8">
          <button
            className="bg-blue-500 text-white py-2 px-4 md:px-6 rounded-xl text-sm md:text-lg"
            onClick={handleConfirmSelection}
          >
            Select {selectedTemplate.name}
          </button>
        </div>
      )}

      {/* Render the selected invoice template component */}
      {selectedTemplate && (
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg md:text-xl font-semibold text-center mb-4">
            Preview of {selectedTemplate.name}
          </h2>
          <div className="rounded-xl">
            {selectedTemplate.component}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectTemplate;
