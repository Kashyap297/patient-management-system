import { Modal, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const CancelAppointmentModal = ({ open, onClose }) => {

  const handleCancel = () => {
    // Handle appointment cancellation logic
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[320px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-red-500">Cancel Online Appointment?</h2>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>
        <p className="mb-4 text-center">
          If you cancel the appointment, you will need to return the payment.
        </p>
        <div className="flex justify-between">
          <Button variant="outlined" onClick={onClose}>No</Button>
          <Button variant="contained" color="primary" onClick={handleCancel}>Payment Return</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelAppointmentModal;
