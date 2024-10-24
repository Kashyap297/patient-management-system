import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import api from "../../api/api";

const PaymentSuccess = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const params = new URLSearchParams(location.search);
      const payerId = params.get("PayerID");
      const paymentId = params.get("paymentId");

      try {
        await api.get("/payment/success", { params: { PayerID: payerId, paymentId } });
        alert("Payment successful!");
        history.push("/patient/bills");  // Redirect after successful payment
      } catch (error) {
        console.error("Payment execution failed", error);
      }
    };

    if (location.search.includes("PayerID") && location.search.includes("paymentId")) {
      handlePaymentSuccess();
    }
  }, [location, history]);

  return <div>Processing Payment...</div>;
};

export default PaymentSuccess;
