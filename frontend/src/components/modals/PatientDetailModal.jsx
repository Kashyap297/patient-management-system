import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PatientDetailsModal = ({ open, handleClose, patient }) => {
  if (!patient) return null; // Ensure a patient is selected before rendering

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Patient Details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          <strong>Appointment Type:</strong>{" "}
          <span
            className={`badge px-2 py-1 rounded ${
              patient?.appointmentType === "Online"
                ? "bg-yellow-200 text-yellow-600"
                : "bg-blue-200 text-blue-600"
            }`}
          >
            {patient?.appointmentType}
          </span>
        </Typography>
        <Typography gutterBottom>
          <strong>Appointment Date:</strong> {patient?.appointmentDate}
        </Typography>
        <Typography gutterBottom>
          <strong>Appointment Time:</strong> {patient?.appointmentTime}
        </Typography>
        <Typography gutterBottom>
          <strong>Patient Name:</strong> {patient?.patientName}
        </Typography>
        <Typography gutterBottom>
          <strong>Patient Phone Number:</strong> {patient?.phoneNumber}
        </Typography>
        <Typography gutterBottom>
          <strong>Patient Age:</strong> {patient?.age}
        </Typography>
        <Typography gutterBottom>
          <strong>Patient Gender:</strong> {patient?.gender}
        </Typography>
        <Typography gutterBottom>
          <strong>Patient Issue:</strong> {patient?.patientIssue}
        </Typography>
        <Typography gutterBottom>
          <strong>Disease Name:</strong> {patient?.diseaseName}
        </Typography>
        <Typography gutterBottom>
          <strong>Doctor Name:</strong> {patient?.doctorName}
        </Typography>
        <Typography gutterBottom>
          <strong>Patient Address:</strong> {patient?.address}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
