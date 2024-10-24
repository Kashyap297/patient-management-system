const express = require('express');
const router = express.Router();
const { createPayment, executePayment, cancelPayment } = require('../controllers/paymentController');

router.post('/create', createPayment);  // Create a payment
router.get('/success', executePayment);  // Handle success after PayPal approval
// router.get('/cancel', cancelPayment);    // Handle canceled payments

module.exports = router;
