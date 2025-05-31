import React from 'react';
import NavbarProfile from '../components/NavbarProfile';
import StepProgress from '../components/StepProgress';
import VillaBookingCard from '../components/VillaBookingCard';





export default function Booking() {
  return (
    <>
      <NavbarProfile />
        <StepProgress currentStep={1} />
      <VillaBookingCard />
    </>
  );
}
