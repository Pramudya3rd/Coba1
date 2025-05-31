import React from "react";
import NavbarProfile from "../components/NavbarProfile";
import StepProgress from "../components/StepProgress";
import PaymentPage from "../components/PaymentPage";

import "../styles/villa-booking-common.css"; // Pastikan ini terimpor
import "../styles/Payment.css"; // Pastikan CSS spesifik juga diimpor

export default function Payment() {
  return (
    <>
      <NavbarProfile />
      <StepProgress currentStep={2} />
      <PaymentPage />
    </>
  );
}
