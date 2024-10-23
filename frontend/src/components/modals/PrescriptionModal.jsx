import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import signature from "../../assets/images/signature.svg";

const PrescriptionModal = ({ open, handleClose, prescriptionData }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <span>Prescription</span>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton> 
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="p-4">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold text-blue-600">Hospital</h2>
              <p>{prescriptionData.appointmentId.hospital}</p>
            </div>
            <div>
              <h3 className="font-bold text-blue-600">{prescriptionData.doctor.firstName} {prescriptionData.doctor.lastName}</h3>
              <p>{prescriptionData.doctor.specialty}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Patient Name: {prescriptionData.patient.firstName} {prescriptionData.patient.lastName}</div>
              <div>Prescription Date: {new Date(prescriptionData.prescriptionDate).toLocaleDateString()}</div>
              <div>Gender: {prescriptionData.patient.gender}</div>
              <div>Age: {prescriptionData.patient.age}</div>
              <div>Address: {prescriptionData.patient.address}</div>
            </div>
          </div>

          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableCell>Medicine Name</TableCell>
                <TableCell>Strength</TableCell>
                <TableCell>Dose</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>When to Take</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptionData.medicines.map((medicine, index) => (
                <TableRow key={index}>
                  <TableCell>{medicine.name}</TableCell>
                  <TableCell>{medicine.strength}</TableCell>
                  <TableCell>{medicine.dose}</TableCell>
                  <TableCell>{medicine.duration}</TableCell>
                  <TableCell>{medicine.whenToTake}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4">
            <h3 className="font-bold">Additional Note:</h3>
            <p>{prescriptionData.additionalNote}</p>
          </div>

          <div className="mt-4 flex justify-between">
            <div className="border-t w-32 mt-4">
              <img src={signature} alt="Signature" />
            </div>
            <p>Doctor Signature</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionModal;
