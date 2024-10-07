import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PatientDetailsModal = ({ open, handleClose, patient }) => {
  if (!patient) return null; // In case there's no patient selected

  return (
    <Dialog open={open} onClose={handleClose}>
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
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Appointment Type:</strong>{" "}
          <span className="badge bg-yellow-200 text-yellow-600 px-2 py-1 rounded">
            {patient?.appointmentType}
          </span>
        </Typography>
        <Typography>
          <strong>Appointment Date:</strong> {patient?.appointmentDate}
        </Typography>
        <Typography>
          <strong>Appointment Time:</strong> {patient?.appointmentTime}
        </Typography>
        <Typography>
          <strong>Patient Name:</strong> {patient?.patientName}
        </Typography>
        <Typography>
          <strong>Patient Phone Number:</strong> {patient?.phoneNumber}
        </Typography>
        <Typography>
          <strong>Patient Age:</strong> {patient?.age}
        </Typography>
        <Typography>
          <strong>Patient Gender:</strong> {patient?.gender}
        </Typography>
        <Typography>
          <strong>Patient Issue:</strong> {patient?.patientIssue}
        </Typography>
        <Typography>
          <strong>Disease Name:</strong> {patient?.diseaseName}
        </Typography>
        <Typography>
          <strong>Doctor Name:</strong> {patient?.doctorName}
        </Typography>
        <Typography>
          <strong>Patient Address:</strong> {patient?.address}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
