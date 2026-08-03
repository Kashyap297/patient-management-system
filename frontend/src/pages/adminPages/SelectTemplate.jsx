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
    <div className="min-h-screen bg-background p-6 md:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 animate-slide-up">
        <div className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-b border-gray-200/50 pb-6">
            <h1 className="text-3xl font-extrabold text-secondary tracking-tight">
              Select Invoice Theme
            </h1>
            {selectedTemplate && (
              <button
                className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-primary/90 transition-colors duration-300 animate-fade-in"
                onClick={handleConfirmSelection}
              >
                Select {selectedTemplate.name}
              </button>
            )}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mb-12">
            {templateData.map((template) => (
              <div
                key={template.id}
                className={`w-full group cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${
                  selectedTemplate && selectedTemplate.id === template.id
                    ? "ring-4 ring-primary ring-opacity-50 scale-[1.02]"
                    : "hover:shadow-xl"
                }`}
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm h-full flex flex-col">
                  <div className="overflow-hidden rounded-xl border border-gray-100 mb-4 bg-white/50 flex-grow">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="text-center text-lg font-bold text-secondary">
                    {template.name}
                  </h2>
                  <div className="flex justify-center mt-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                       selectedTemplate && selectedTemplate.id === template.id ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {selectedTemplate && selectedTemplate.id === template.id && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Render the selected invoice template component */}
          {selectedTemplate && (
            <div className="mt-8 animate-fade-in border-t border-gray-200/50 pt-10">
              <h2 className="text-2xl font-bold text-center text-secondary mb-8">
                Preview: {selectedTemplate.name}
              </h2>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200/50">
                {selectedTemplate.component}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectTemplate;
