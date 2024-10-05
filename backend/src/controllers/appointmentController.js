const Appointment = require('../models/appointmentModel');

// @desc    Create a new appointment
// @route   POST /api/appointment
// @access  Public or Private (Based on your needs)
exports.createappointment = async (req, res) => {
    const { specialty, country, state, city, appointmentDate, hospital, doctor } = req.body;


    try {
        // Create the appointment
        const newAppointment = await Appointment.create({
            specialty,
            country,
            state,
            city,
            appointmentDate,
            hospital,
            doctor,
        });


        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating appointment', error });
    }

};
