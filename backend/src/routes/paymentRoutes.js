const express = require('express');
const router = express.Router();
const { createPayment, executePayment, cancelPayment } = require('../controllers/paymentController');

// Route to create a payment
router.post('/', createPayment);

// Route for successful payment
router.get('/success', executePayment);

// Route for canceled payment
router.get('/cancel', cancelPayment);

module.exports = router;
