import React from "react";
import "../styles/Invoice.css";

const InvoicePage = () => {
  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <h2 className="invoice-title">RESERVATION SUMMARY</h2>

        <div className="reservation-details">
          <div className="reservation-row">
            <span className="label">First Name</span>
            <span className="value"><strong>Jamaludin Al Jamal</strong></span>
          </div>
          <div className="reservation-row">
            <span className="label">Email Address</span>
            <span className="value"><strong>Jamal@gmail.com</strong></span>
          </div>
          <div className="reservation-row">
            <span className="label">Phone Number</span>
            <span className="value"><strong>+62 123 456 789</strong></span>
          </div>
          <div className="reservation-row">
            <span className="label">Duration</span>
            <span className="value"><strong>1 Night</strong></span>
          </div>
          <div className="reservation-row">
            <span className="label">Check-In</span>
            <span className="value"><strong>19 June 2025</strong></span>
          </div>
          <div className="reservation-row">
            <span className="label">Check-Out</span>
            <span className="value"><strong>20 June 2025</strong></span>
          </div>
        </div>

        <div className="price-summary">
          <h3 className="price-title">YOUR PRICE SUMMERY</h3>

          <div className="reservation-row">
            <span className="label">King bed Stylist Villa with loft style family</span>
            <span className="value"><strong>Rp. 5.000.000 / Night</strong></span>
          </div>
          <div className="reservation-row">
            <span className="label">City Tax</span>
            <span className="value"><strong>Rp. 500.000</strong></span>
          </div>
          <div className="reservation-row total">
            <span className="label">Total</span>
            <span className="value"><strong>Rp. 5.500.000</strong></span>
          </div>
        </div>
      </div>

      <div className="download-container">
        <button className="download-btn">Download Invoice</button>
      </div>
    </div>
  );
};

export default InvoicePage;
