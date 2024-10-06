const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // 'sandbox' for testing or 'live' for production
  client_id:
    "AbBvw2_XUvhfKmOWafxTS77MS2lxpmMxJAOYcwRK1ZtRWrMG9XFhUWM1qSAoT1RBf-8RtjTur3mtQ0gT", // Replace with your actual client ID
  client_secret:
    "EDRKbUQf82m9qi9SaUuUrbrf7hWPyvKregYDSfByYbLS7sQ7r84tsm1U2C0P0ySPwZVuTAFeJj-cr8gX", // Replace with your actual client secret
});

// Create PayPal Payment
exports.createPayment = (req, res) => {
  const { totalAmount } = req.body; // Accept total amount from request body

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:8000/api/payment/success", // Success URL, change it for production
      cancel_url: "http://localhost:8000/api/payment/cancel", // Cancel URL, change it for production
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Hospital Bill Payment",
              sku: "001",
              price: totalAmount,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: totalAmount,
        },
        description: "Payment for Hospital Bill",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error("Error creating PayPal payment:", error.response);
      return res
        .status(500)
        .json({ message: "Payment creation failed", error });
    } else {
      // Find the approval link in PayPal's response and forward it to the client
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          return res.status(200).json({ forwardLink: payment.links[i].href });
        }
      }
    }
  });
};

// Execute PayPal Payment after approval
exports.executePayment = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "25.00", // You should replace this dynamically
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error("Error executing PayPal payment:", error.response);
      return res
        .status(500)
        .json({ message: "Payment execution failed", error });
    } else {
      console.log("Get Payment Response");
      console.log(payment);
      return res.status(200).json({ message: "Payment successful", payment });
    }
  });
};

// Cancel Payment Route
exports.cancelPayment = (req, res) => {
  return res.status(200).json({ message: "Payment was canceled." });
};
