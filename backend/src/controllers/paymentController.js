const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // 'sandbox' for testing, 'live' for production
  client_id: "Your-PayPal-Client-ID",  // Replace with your client ID
  client_secret: "Your-PayPal-Client-Secret",  // Replace with your client secret
});

// Route for creating a payment
exports.createPayment = (req, res) => {
  const { totalAmount } = req.body;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/payment/success",  // Your success URL
      cancel_url: "http://localhost:3000/payment/cancel",    // Your cancel URL
    },
    transactions: [{
      item_list: {
        items: [{
          name: "Hospital Bill Payment",
          sku: "001",
          price: totalAmount,
          currency: "USD",
          quantity: 1
        }]
      },
      amount: { currency: "USD", total: totalAmount },
      description: "Payment for Hospital Bill"
    }]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error("Error creating payment", error);
      res.status(500).send(error);
    } else {
      // Return the PayPal redirect URL to the front end
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.json({ forwardLink: payment.links[i].href });
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
