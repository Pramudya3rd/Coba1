// src/components/VillaBookingCard.jsx
import React from "react";
import "../styles/VillaBookingCard.css";
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

const VillaBookingCard = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/payment");
  };

  return (
    <div className="villa-booking-container">
      {/* Villa Card */}
      <div className="villa-card">
        <img
          src="https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg"
          alt="Villa"
          className="villa-image"
        />
        <div className="villa-content">
          <p className="villa-tagline">THE CHOICE OF FAMILIES</p>
          <h5 className="villa-title">De Santika Nirwana</h5>{" "}
          {/* This remains 'villa-title' for display purposes */}
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
              <FaRulerCombined /> Area <strong>24m²</strong>{" "}
              {/* Pastikan ini mengacu pada 'area' */}
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

      {/* Booking Form */}
      <div className="booking-form">
        <h5 className="form-title">ENTER YOUR DETAILS</h5>
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="First Name" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Phone Number" />
          </div>
          <div className="form-group full-width">
            <label>Duration</label>
            <input type="text" placeholder="Duration (e.g., 2 Nights)" />
          </div>
          <div className="form-group">
            <label>Check-In</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Check-Out</label>
            <input type="date" />
          </div>
        </div>
        <button className="submit-button" onClick={handleBooking}>
          Request To Book
        </button>
      </div>
    </div>
  );
};

export default VillaBookingCard;
