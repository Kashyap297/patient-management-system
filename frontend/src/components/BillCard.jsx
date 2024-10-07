import { IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BillCard = ({ bill }) => {
  const navigate = useNavigate();

  const handleViewInvoice = () => {
    navigate(`/admin/invoice/${bill.id}/${bill.patientName}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">
          Bill No: <a href="#">{bill.id}</a>
        </span>
        <IconButton color="primary" onClick={handleViewInvoice}>
          <Visibility />
        </IconButton>
      </div>
      <div className="text-sm">
        <p className="text-gray-600">Bill Date: {bill.date}</p>
        <p>
          Patient Name: <strong>{bill.patientName}</strong>
        </p>
        <p>
          Phone Number: <strong>{bill.phoneNumber}</strong>
        </p>
      </div>
    </div>
  );
};

export default BillCard;
