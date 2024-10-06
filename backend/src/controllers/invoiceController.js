const Invoice = require("../models/invoiceModel");
const User = require("../models/userModel"); // Assuming patients and doctors are users
const Hospital = require("../models/hospitalModel"); // Assuming you have a hospital model

// Create Invoice by Admin
exports.createInvoice = async (req, res) => {
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
    otherText, // Add otherText to be captured
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
  } = req.body;

  try {
    // Validate if hospital, patient, and doctor exist
    const patientExists = await User.findById(patient);
    const doctorExists = await User.findById(doctor);
    const hospitalExists = await Hospital.findById(hospital);

    if (!patientExists || !hospitalExists || !doctorExists) {
      return res
        .status(404)
        .json({ message: "Hospital, Doctor, or Patient not found" });
    }

    // Handle the uploaded logo file
    const logoUrl = req.file ? `./src/uploads/${req.file.filename}` : null;

    // Create Invoice
    const newInvoice = new Invoice({
      hospital,
      patient,
      doctor,
      doctorName, // Can use doctorExists.name instead of doctorName if populated with full details
      diseaseName,
      billDate,
      billTime,
      billNumber,
      phoneNumber,
      email,
      address,
      otherText, // Add otherText to the invoice data
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
      logoUrl, // Save the uploaded logo URL
    });

    await newInvoice.save();

    res.status(201).json({
      message: "Invoice created successfully",
      invoice: newInvoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error while creating invoice",
      error,
    });
  }
};

// Get Invoice (Example for populating doctor and patient)
exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("doctor", "firstName lastName email") // Populating doctor with selected fields
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
      otherText, // Add otherText to be captured
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
    } = req.body;
  
    try {
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
  
      // If a new logo is uploaded, update the logo URL
      const logoUrl = req.file ? `./src/uploads/${req.file.filename}` : invoice.logoUrl;
  
      // Update the invoice details
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
      invoice.logoUrl = logoUrl; // Update logo if needed
  
      // Save the updated invoice
      await invoice.save();
  
      res.status(200).json({
        message: "Invoice updated successfully",
        invoice,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error updating invoice",
        error,
      });
    }
  };
