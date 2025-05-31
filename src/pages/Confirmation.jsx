import React from 'react';
import NavbarProfile from '../components/NavbarProfile';
import StepProgress from '../components/StepProgress';
import ConfirmationPage from '../components/Confirmation';






export default function Confirmation() {
  return (
    <>
      <NavbarProfile />
        <StepProgress currentStep={2} />
        <ConfirmationPage />
    </>
  );
}
