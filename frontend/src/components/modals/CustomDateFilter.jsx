import { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const CustomDateFilter = ({ open, onClose, onApply, onReset }) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleApply = () => {
        if (fromDate || toDate) {
            onApply(fromDate, toDate);  // Send the selected dates back to the parent component
        }
        onClose();  // Close the modal
    };

    const handleReset = () => {
        setFromDate('');  // Clear the from date
        setToDate('');    // Clear the to date
        onReset();        // Call the parent component's reset function
        onClose();        // Close the modal
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    width: '300px',
                    margin: '100px auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <h3>Custom Date</h3>

                {/* From Date Input */}
                <TextField
                    label="From Date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* To Date Input */}
                <TextField
                    label="To Date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button variant="outlined" onClick={handleReset}>Reset</Button>
                    <Button variant="contained" color="primary" onClick={handleApply}>Apply</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default CustomDateFilter;