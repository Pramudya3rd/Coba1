import React from 'react';
import NavbarProfile from '../components/NavbarProfile';
import InvoicePage from '../components/InvoicePage';
import StepProgress from '../components/StepProgress';



export default function Invoice() {
  return (
    <>
      <NavbarProfile />
      <StepProgress currentStep={3} />
      <InvoicePage />
    </>
  );
}
