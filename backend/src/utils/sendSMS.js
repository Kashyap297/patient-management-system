const twilio = require("twilio");
const client = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (phoneNumber, message) => {
  return await client.messages.create({
    body: message,
    to: phoneNumber,
    from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
  });
};

module.exports = sendSMS;
