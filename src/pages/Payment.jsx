import React from 'react';
import NavbarProfile from '../components/NavbarProfile';
import StepProgress from '../components/StepProgress';
import PaymentPage from '../components/PaymentPage';






export default function Payment() {
  return (
    <>
      <NavbarProfile />
        <StepProgress currentStep={2} />
        <PaymentPage />
    </>
  );
}
