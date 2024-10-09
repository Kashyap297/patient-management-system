import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material';

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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Field</DialogTitle>
      <DialogContent>
        <RadioGroup value={fieldType} onChange={(e) => setFieldType(e.target.value)}>
          <FormControlLabel value="Dropdown" control={<Radio />} label="Dropdown" />
          <FormControlLabel value="Text Field" control={<Radio />} label="Text Field" />
        </RadioGroup>

        {fieldType === 'Dropdown' && (
          <>
            <Select
              value={selectionType}
              onChange={(e) => setSelectionType(e.target.value)}
              fullWidth
              style={{ marginBottom: '16px' }}
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Multiple">Multiple</MenuItem>
            </Select>

            {dropdownOptions.map((option, index) => (
              <TextField
                key={index}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                margin="normal"
                placeholder={`Value ${index + 1}`}
              />
            ))}
            <Button onClick={addOptionField}>Add Option</Button>
          </>
        )}

        {fieldType === 'Text Field' && (
          <TextField
            fullWidth
            label="Text Field Label"
            value={textFieldLabel}
            onChange={(e) => setTextFieldLabel(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFieldModal;
