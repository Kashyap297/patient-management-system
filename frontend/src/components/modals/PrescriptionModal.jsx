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
import { FaDownload } from "react-icons/fa";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import signature from "../../assets/images/signature.svg";
import logo from "../../assets/images/logo.png";

const PrescriptionModal = ({ open, handleClose, prescriptionData }) => {
  const handleDownload = async () => {
    const input = document.getElementById('prescription-modal-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 10;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    pdf.save(`Prescription_${prescriptionData.patient.firstName}_${prescriptionData.patient.lastName}.pdf`);
  };

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
        <div className="p-4" id="prescription-modal-content">
          {/* Header Section */}
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="py-2">
                <img src={logo} alt="Hospital Logo" className="w-48 mx-auto mb-4" />
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  Dr. {prescriptionData.doctor.firstName} {prescriptionData.doctor.lastName}
                </p>
                <p className="text-gray-500">{prescriptionData.doctor.specialty}</p>
              </div>
            </div>

            <div className="grid gap-4 text-sm mb-4">
              {/* Row 1 */}
              <div className="flex justify-between items-center">
                <p className="flex items-center">
                  <strong>Hospital Name :</strong>
                  <span className="ml-2 text-gray-600">{prescriptionData.appointmentId.hospital}</span>
                </p>
                <p className="flex items-center">
                  <strong>Prescription Date :</strong>
                  <span className="ml-2 text-gray-600">
                    {new Date(prescriptionData.prescriptionDate).toLocaleDateString()}
                  </span>
                </p>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between items-center">
                <p className="flex items-center">
                  <strong>Patient Name :</strong>
                  <span className="ml-2 text-gray-600">
                    {prescriptionData.patient.firstName} {prescriptionData.patient.lastName}
                  </span>
                </p>
                <p className="flex items-center">
                  <strong>Age :</strong>
                  <span className="ml-2 text-gray-600">{prescriptionData.patient.age} Years</span>
                </p>
              </div>

              {/* Row 3 */}
              <div className="flex justify-between items-start">
                <p className="flex items-center">
                  <strong>Gender :</strong>
                  <span className="ml-2 text-gray-600">{prescriptionData.patient.gender}</span>
                </p>
              </div>

              {/* Row 4 */}
              <div>
                <p className="flex items-start">
                  <strong>Address :</strong>
                  <span className="ml-2 text-gray-600">{prescriptionData.patient.address}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Prescription Table */}
          <div className="overflow-x-auto mb-4 rounded-lg">
            <Table className="w-full text-left rounded-lg">
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell>Medicine Name</TableCell>
                  <TableCell>Strength</TableCell>
                  <TableCell>Dose</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>When to Take</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptionData.medicines.map((medicine, index) => (
                  <TableRow key={index} className="border-b-2">
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.strength}</TableCell>
                    <TableCell>{medicine.dose}</TableCell>
                    <TableCell>
                      <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full inline-block">
                        {medicine.duration}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full inline-block">
                        {medicine.whenToTake}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Additional Note */}
          <div className="mt-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Additional Note</h3>
            <p className="text-gray-600">{prescriptionData.additionalNote}</p>
          </div>

          {/* Doctor Signature and Download Button */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm italic">Doctor Signature</p>
              <img src={signature} alt="Doctor Signature" className="mt-2" />
            </div>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-2 rounded flex items-center space-x-2"
            >
              <FaDownload />
              <span>Download</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionModal;
