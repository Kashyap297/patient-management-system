const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital", // Assuming you have a Hospital model
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming patient is a user
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to doctor as a user
      required: true,
    },
    diseaseName: { type: String, required: true },
    billDate: { type: Date, required: true },
    billTime: { type: String, required: true },
    billNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    otherText: { type: String }, // Add otherText field
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // Optional field for discount
    totalAmount: { type: Number, required: true },
    paymentType: {
      type: String,
      enum: ["Cash", "Online", "Insurance"],
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    age: { type: Number, required: true },
    insuranceDetails: {
      insuranceCompany: { type: String },
      insurancePlan: { type: String },
      claimAmount: { type: Number },
      claimedAmount: { type: Number },
    }, // Optional fields for insurance
    logoUrl: { type: String }, // If you want to store hospital logo URL
    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
