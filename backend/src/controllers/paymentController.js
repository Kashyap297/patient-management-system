const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // 'sandbox' for testing, 'live' for production
  client_id: "AbBvw2_XUvhfKmOWafxTS77MS2lxpmMxJAOYcwRK1ZtRWrMG9XFhUWM1qSAoT1RBf-8RtjTur3mtQ0gT",  // Replace with your client ID
  client_secret: "EDRKbUQf82m9qi9SaUuUrbrf7hWPyvKregYDSfByYbLS7sQ7r84tsm1U2C0P0ySPwZVuTAFeJj-cr8gX",  // Replace with your client secret
});

// Route for creating a payment
// paymentController.js
exports.createPayment = (req, res) => {
  const { totalAmount } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Hospital Bill Payment",
              sku: "001",
              price: totalAmount,
              currency: "USD", // Change this to the correct currency code
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD", // Ensure this matches the accepted currency in your PayPal account
          total: totalAmount,
        },
        description: "Payment for Hospital Bill",
      },
    ],
  };
  

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error("Error creating PayPal payment:", error.response); // Log the actual error response
      return res.status(500).json({ message: "Payment creation failed", error });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          return res.status(200).json({ forwardLink: payment.links[i].href });
        }
      }
    }
  });
};


// Route for executing the payment
exports.executePayment = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const { totalAmount } = req.body;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [{ amount: { currency: "USD", total: totalAmount } }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error("Payment execution error", error);
      res.status(500).send(error);
    } else {
      res.json({ payment });
    }
  });
};
