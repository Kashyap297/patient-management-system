const Invoice = require("../models/invoiceModel");
const User = require("../models/userModel"); // Assuming patients and doctors are users
const Hospital = require("../models/hospitalModel"); // Assuming you have a hospital model
const cloudinary = require("cloudinary").v2;


// Create Invoice by Admin
exports.createInvoice = async (req, res) => {
  try {
    const {
      hospital,
      patient,
      doctor,
      doctorName,
      diseaseName,
      billDate,
      billTime,
      billNumber,
      phoneNumber,
      email,
      address,
      otherText,
      description,
      amount,
      tax,
      discount,
      totalAmount,
      paymentType,
      gender,
      age,
      insuranceCompany,
      insurancePlan,
      claimAmount,
      claimedAmount,
      status,
    } = req.body;

    // Validate if hospital, patient, and doctor exist
    const patientExists = await User.findById(patient);
    const doctorExists = await User.findById(doctor);
    const hospitalExists = await Hospital.findById(hospital);

    if (!patientExists || !doctorExists || !hospitalExists) {
      return res.status(404).json({ message: "Hospital, Doctor, or Patient not found" });
    }

    // Handle Logo Image Upload to Cloudinary
    let logoUrl = null;
    if (req.file) {
      try {
        const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path, {
          folder: "hospital-management/invoices",
        });
        logoUrl = cloudinaryUpload.secure_url; // Save Cloudinary URL
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({ message: "Error uploading invoice logo" });
      }
    }

    // Create Invoice
    const newInvoice = new Invoice({
      hospital,
      patient,
      doctor,
      doctorName,
      diseaseName,
      billDate,
      billTime,
      billNumber,
      phoneNumber,
      email,
      address,
      otherText,
      description,
      amount,
      tax,
      discount,
      totalAmount,
      paymentType,
      gender,
      age,
      insuranceDetails: {
        insuranceCompany,
        insurancePlan,
        claimAmount,
        claimedAmount,
      },
      logoUrl,
      status: status || "Unpaid",
    });

    await newInvoice.save();

    res.status(201).json({
      message: "Invoice created successfully",
      invoice: newInvoice,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      message: "Server error while creating invoice",
      error: error.message,
    });
  }
};


// Get Invoice (Example for populating doctor and patient)
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("doctor", "firstName lastName email doctorDetails") // Populating doctor with selected fields
      .populate("patient", "firstName lastName email");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({
      message: "Invoice fetched successfully",
      invoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching invoice",
      error,
    });
  }
};

// Update Invoice by Admin
exports.updateInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const {
      patient,
      doctor,
      doctorName,
      diseaseName,
      billDate,
      billTime,
      billNumber,
      phoneNumber,
      email,
      address,
      otherText,
      description,
      amount,
      tax,
      discount,
      totalAmount,
      paymentType,
      gender,
      age,
      insuranceCompany,
      insurancePlan,
      claimAmount,
      claimedAmount,
      status, // New field for updating status
    } = req.body;

    console.log("🔹 Received patient ID:", patient);
    console.log("🔹 Received doctor ID:", doctor);

    // Validate if patient and doctor exist
    const patientExists = await User.findById(patient);
    const doctorExists = await User.findById(doctor);
    if (!patientExists || !doctorExists) {
      return res.status(404).json({ message: "Doctor or Patient not found" });
    }

    // Find the invoice by ID
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // ✅ Handle Logo Image Upload to Cloudinary
    let logoUrl = invoice.logoUrl; // Keep existing logo if no new file is uploaded
    if (req.file) {
      try {
        const cloudinaryUpload = await cloudinary.uploader.upload(req.file.path, {
          folder: "hospital-management/invoices",
        });
        logoUrl = cloudinaryUpload.secure_url; // Save Cloudinary URL
      } catch (uploadError) {
        console.error("❌ Cloudinary Upload Error:", uploadError);
        return res.status(500).json({ message: "Error uploading invoice logo" });
      }
    }

    // ✅ Update Invoice Details
    invoice.patient = patient;
    invoice.doctor = doctor;
    invoice.doctorName = doctorName || invoice.doctorName;
    invoice.diseaseName = diseaseName || invoice.diseaseName;
    invoice.billDate = billDate || invoice.billDate;
    invoice.billTime = billTime || invoice.billTime;
    invoice.billNumber = billNumber || invoice.billNumber;
    invoice.phoneNumber = phoneNumber || invoice.phoneNumber;
    invoice.email = email || invoice.email;
    invoice.address = address || invoice.address;
    invoice.otherText = otherText || invoice.otherText;
    invoice.description = description || invoice.description;
    invoice.amount = amount || invoice.amount;
    invoice.tax = tax || invoice.tax;
    invoice.discount = discount || invoice.discount;
    invoice.totalAmount = totalAmount || invoice.totalAmount;
    invoice.paymentType = paymentType || invoice.paymentType;
    invoice.gender = gender || invoice.gender;
    invoice.age = age || invoice.age;
    invoice.insuranceDetails = {
      insuranceCompany: insuranceCompany || invoice.insuranceDetails.insuranceCompany,
      insurancePlan: insurancePlan || invoice.insuranceDetails.insurancePlan,
      claimAmount: claimAmount || invoice.insuranceDetails.claimAmount,
      claimedAmount: claimedAmount || invoice.insuranceDetails.claimedAmount,
    };
    invoice.logoUrl = logoUrl; // ✅ Updated Cloudinary logo URL
    invoice.status = status || invoice.status; // ✅ Update status if provided

    // ✅ Save the updated invoice
    await invoice.save();

    res.status(200).json({
      message: "✅ Invoice updated successfully",
      invoice,
    });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({
      message: "❌ Error updating invoice",
      error: error.message,
    });
  }
};


exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("doctor", "firstName lastName email description")
      .populate("patient", "firstName lastName email")
      .populate("hospital", "name address");

    res.status(200).json({
      message: "Invoices fetched successfully",
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching invoices",
      error,
    });
  }
};
// Get invoices for the logged-in patient
exports.getUserInvoices = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is set on the request object by the 'protect' middleware
    const invoices = await Invoice.find({ patient: userId })
      .populate("doctor", "firstName lastName email description")
      .populate("patient", "firstName lastName email")
      .populate("hospital", "name address"); 


    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No invoices found for this user" });
    }

    res.status(200).json({
      message: "Invoices fetched successfully",
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching user invoices:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
