const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoice,
  updateInvoice,
  getAllInvoices,
  getUserInvoices,
} = require("../controllers/invoiceController");
const { protect, admin } = require("../middlewares/authMiddleware");
const upload = require("../utils/multerConfig");

// Route to create an invoice by Admin only
router.post("/", protect, admin, upload.single("logo"), createInvoice);

// Route to get an invoice (populating doctor and patient)
router.get("/:id", protect, admin, getInvoice);
router.patch("/:id", protect, admin, upload.single("logo"), updateInvoice);

// Route to get all invoices
router.get("/", protect, getAllInvoices);

// Route to get invoices for the logged-in patient
router.get("/user/invoice", protect, getUserInvoices); // No 'admin' middleware here

module.exports = router;
