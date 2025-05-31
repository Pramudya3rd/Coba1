// src/components/VillaCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VillaCard.css";
import { FaStar } from "react-icons/fa";

// Add all relevant villa properties as props
const VillaCard = ({
  id,
  name,
  location,
  price,
  image,
  description,
  guests,
  size,
  bedType,
  features,
  roomImages,
  onBookNow,
}) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(); // use the function passed from outside
    } else {
      // Default fallback if onBookNow is not provided.
      // Pass all relevant villa details to the detail page.
      navigate("/villa-detail", {
        state: {
          id, // Include ID if available
          name,
          location,
          price: parseFloat(price.replace(/[Rp. /Night]/g, "").trim()), // Ensure price is a number
          image,
          description,
          guests,
          size,
          bedType,
          features,
          roomImages,
        },
      });
    }
  };

  return (
    <div className="col-md-4 d-flex">
      <div className="card villa-card border-0 shadow-sm rounded-4 flex-fill">
        <img
          src={image}
          className="card-img-top rounded-top-4 villa-image"
          alt={name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-semibold">{name}</h5>
          <p className="text-muted mb-2">{location}</p>

          <div className="mb-2">
            <span className="text-warning">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
            <small className="text-muted ms-2">4.9 (20 Reviews)</small>
          </div>

          <p className="mb-1 small text-muted">Start From</p>
          <p className="fw-bold fs-6">{price}</p>

          <button
            className="btn custom-btn rounded-pill mt-3 w-100"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VillaCard;
