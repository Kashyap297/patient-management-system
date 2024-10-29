import { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

const CashPaymentModal = ({ open, handleClose, handlePayment, totalAmount, paidAmount }) => {
  const [amount, setAmount] = useState('');
  const [isPayEnabled, setIsPayEnabled] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(totalAmount - paidAmount);

  useEffect(() => {
    setRemainingAmount(totalAmount - paidAmount);
  }, [totalAmount, paidAmount]);

  // Validate payment amount and enable/disable Pay button
  const handleAmountChange = (e) => {
    const enteredAmount = parseFloat(e.target.value);
    setAmount(enteredAmount);
    setIsPayEnabled(enteredAmount > 0 && enteredAmount <= remainingAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPayEnabled) {
      handlePayment(amount);
      handleClose(); // Close the modal after payment
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="p-6 bg-white rounded-md shadow-lg w-80 mx-auto my-20">
        <Typography variant="h6" className="mb-4">
          Cash Payment
        </Typography>
        <Typography variant="body2" className="mb-2">
          Total Amount: ₹{totalAmount}
        </Typography>
        <Typography variant="body2" className="mb-2">
          Paid Amount: ₹{paidAmount}
        </Typography>
        <Typography variant="body2" className="mb-4">
          Remaining Amount: ₹{remainingAmount}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="₹ 00000"
            fullWidth
            required
          />
          <div className="flex justify-between items-center mt-4">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isPayEnabled}
            >
              Pay
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CashPaymentModal;
