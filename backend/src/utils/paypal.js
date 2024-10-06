const paypal = require("paypal-rest-sdk");

// Configure PayPal with your credentials
paypal.configure({
  mode: "sandbox", // 'sandbox' for testing or 'live' for production
  client_id:
    "AbBvw2_XUvhfKmOWafxTS77MS2lxpmMxJAOYcwRK1ZtRWrMG9XFhUWM1qSAoT1RBf-8RtjTur3mtQ0gT", // Replace with your actual client ID
  client_secret:
    "EDRKbUQf82m9qi9SaUuUrbrf7hWPyvKregYDSfByYbLS7sQ7r84tsm1U2C0P0ySPwZVuTAFeJj-cr8gX", // Replace with your actual client secret
});
