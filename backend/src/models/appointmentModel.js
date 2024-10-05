const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        specialty: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        hospital: {
            type: String,
            required: true,
        },
        doctor: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
