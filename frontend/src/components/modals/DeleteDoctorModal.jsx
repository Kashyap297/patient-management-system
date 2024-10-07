import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";

const DeleteDoctorModal = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-doctor-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="delete-doctor-title" className="bg-red-100 text-center">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-red-500 p-3">
            <Delete className="!h-8 !w-8" />
          </div>
          <p className="mt-2 text-lg font-semibold">Delete Doctor Details?</p>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this doctor details?
          </p>
        </div>
      </DialogTitle>
      <DialogContent>{/* Content not needed for this modal */}</DialogContent>
      <DialogActions className="justify-center pb-6">
        <Button onClick={handleClose} variant="outlined" color="primary">
          No
        </Button>
        <Button onClick={handleDelete} variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDoctorModal;
