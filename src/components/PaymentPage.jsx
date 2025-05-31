import React from "react";
import "../styles/villa-booking-common.css"; // Import file CSS umum yang baru
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaSwimmer,
  FaUserFriends,
  FaLayerGroup,
} from "react-icons/fa";

const PaymentPage = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/Confirmation");
  };

  return (
    <div className="villa-booking-container">
      {/* Villa Card */}
      <div className="villa-card">
        <img
          src="https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg"
          alt="Villa"
          className="villa-image"
        />
        <div className="villa-content">
          <p className="villa-tagline">THE CHOICE OF FAMILIES</p>
          <h5 className="villa-title">De Santika Nirwana</h5>
          <div className="villa-rating">
            <span className="text-warning">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
            <span className="rating-text">4.9 (20 Review)</span>
          </div>
          <hr />
          <div className="villa-features">
            <div>
              <FaBed /> Beds <strong>4</strong>
            </div>
            <div>
              <FaBath /> Bathrooms <strong>2</strong>
            </div>
            <div>
              <FaRulerCombined /> Area <strong>24m²</strong>
            </div>
            <div>
              <FaSwimmer /> Swimming Pool <strong>1</strong>
            </div>
            <div>
              <FaUserFriends /> Guest <strong>6</strong>
            </div>
            <div>
              <FaLayerGroup /> Floor <strong>2</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="reservation-summary">
        <h5 className="form-title">RESERVATION SUMMARY</h5>

        <div className="summary-rows">
          <div className="summary-row">
            <span>First Name</span>
            <span>
              <strong>Jamaludin Al Jamal</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Email Address</span>
            <span>
              <strong>Jamal@gmail.com</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Phone Number</span>
            <span>
              <strong>+62 123 456 789</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Duration</span>
            <span>
              <strong>1 Night</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Check-In</span>
            <span>
              <strong>19 June 2025</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Check-Out</span>
            <span>
              <strong>20 June 2025</strong>
            </span>
          </div>
        </div>

        {/* Contact Section as Card */}
        <div className="upload-section">
          <p>
            <strong>CONTACT VILLA</strong>
          </p>
          <div className="contact-card">
            <a
              href="https://wa.me/62122334556"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>+62 122 334 556</strong>
            </a>
          </div>
        </div>

        <button className="PaymentPage-button" onClick={handleBooking}>
          Payment Page
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
