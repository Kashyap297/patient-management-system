import React, { useState, useRef, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  label, 
  error, 
  name,
  styleVariant = "main" // "main" or "modal"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define styles based on variant
  const triggerStyles = styleVariant === "main" 
    ? "px-4 py-4 bg-white/50 border-2 rounded-2xl hover:bg-white focus:shadow-lg focus-within:bg-white" 
    : "px-4 py-3 bg-gray-50 border-2 rounded-xl hover:bg-white focus-within:bg-white";

  const labelStyles = styleVariant === "main"
    ? "left-4 -top-2.5 px-2 bg-white rounded-md text-sm font-semibold"
    : "left-4 -top-2.5 px-2 bg-white text-sm font-semibold";

  return (
    <div className={`relative group ${isOpen ? "z-[100]" : (styleVariant === "main" ? "z-10" : "z-20")}`} ref={dropdownRef}>
      <div
        className={`peer w-full outline-none transition-all duration-300 text-gray-700 flex justify-between items-center ${triggerStyles} ${
          error ? "border-red-500/50 focus-within:border-red-500" : "border-transparent focus-within:border-primary"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <input
          type="text"
          className="w-full bg-transparent outline-none font-medium text-gray-700 placeholder-gray-400 cursor-text"
          placeholder={selectedOption ? selectedOption.label : placeholder}
          value={isOpen ? searchTerm : (selectedOption ? selectedOption.label : "")}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <HiChevronDown 
          className={`transition-transform duration-300 ml-2 cursor-pointer p-0.5 rounded-full hover:bg-gray-100 ${isOpen ? "rotate-180 text-primary" : "text-gray-500"}`} 
          size={24}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        />
      </div>
      <label className={`absolute pointer-events-none transition-all ${labelStyles} ${error ? 'text-red-500' : 'text-primary'}`}>
        {label}<span className="text-red-500">*</span>
      </label>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl max-h-60 overflow-y-auto shadow-xl z-50 animate-fade-in custom-scroll">
          <div className="p-2 space-y-1">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                  value === option.value ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                {option.label}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center font-medium">No options available</div>
            )}
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-xs font-semibold mt-1 ml-2">{error}</p>}
    </div>
  );
};

export default CustomDropdown;
