import React from "react";
import NavbarProfile from "../components/NavbarProfile";
import StepProgress from "../components/StepProgress";
import ConfirmationPage from "../components/Confirmation"; // Memastikan import komponen ConfirmationPage sudah benar

import "../styles/villa-booking-common.css"; // Pastikan ini terimpor
import "../styles/Confirmation.css"; // Pastikan CSS spesifik juga diimpor

export default function Confirmation() {
  return (
    <>
      <NavbarProfile />
      <StepProgress currentStep={2} />
      <ConfirmationPage />
    </>
  );
}
