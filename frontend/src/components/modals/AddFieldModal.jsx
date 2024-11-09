import React, { useState } from 'react';

const AddFieldModal = ({ open, handleClose, handleAddField }) => {
  const [fieldType, setFieldType] = useState('Dropdown');
  const [selectionType, setSelectionType] = useState('Single');
  const [dropdownOptions, setDropdownOptions] = useState(['']);
  const [textFieldLabel, setTextFieldLabel] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...dropdownOptions];
    newOptions[index] = value;
    setDropdownOptions(newOptions);
  };

  const addOptionField = () => {
    setDropdownOptions([...dropdownOptions, '']);
  };

  const handleAdd = () => {
    handleAddField({
      type: fieldType,
      options: dropdownOptions.filter(Boolean),
      label: textFieldLabel,
    });
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Field</h2>

        <div className="mb-4">
          <label className="font-medium">Field Type</label>
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Dropdown"
                checked={fieldType === 'Dropdown'}
                onChange={(e) => setFieldType(e.target.value)}
                className="form-radio"
              />
              <span>Dropdown</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Text Field"
                checked={fieldType === 'Text Field'}
                onChange={(e) => setFieldType(e.target.value)}
                className="form-radio"
              />
              <span>Text Field</span>
            </label>
          </div>
        </div>

        {fieldType === 'Dropdown' && (
          <>
            <div className="mb-4">
              <label className="block font-medium">Selection Type</label>
              <select
                value={selectionType}
                onChange={(e) => setSelectionType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl mt-1"
              >
                <option value="Single">Single</option>
                <option value="Multiple">Multiple</option>
              </select>
            </div>

            {dropdownOptions.map((option, index) => (
              <div className="relative mb-4" key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addOptionField}
              className="text-blue-500 hover:text-blue-600"
            >
              + Add Option
            </button>
          </>
        )}

        {fieldType === 'Text Field' && (
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Enter Text Field Label"
              value={textFieldLabel}
              onChange={(e) => setTextFieldLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl"
            />
            <label className="absolute left-3 -top-3 px-1 bg-white text-sm font-medium">
              Text Field Label
            </label>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
