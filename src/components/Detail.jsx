// src/components/Detail.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaTv,
  FaWifi,
  FaSnowflake,
  FaThermometerHalf,
  FaBath,
  FaUserFriends,
  FaRulerCombined,
  FaBed,
} from "react-icons/fa";

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read all dynamic data from location.state
  const {
    name = "De Santika Nirwana",
    location: loc = "Ubud, Bali",
    price = 5000000,
    image = "https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    description = "Villa eksklusif dengan fasilitas premium...",
    guests = 6,
    size = "24m²", // Changed from area to size
    bedType = "One King Bed",
    features = [
      "TV",
      "Free Wifi",
      "Air Conditioner",
      "Heater",
      "Private Bathroom",
    ],
    roomImages = [
      // Use actual roomImages if passed, otherwise fallback to hardcoded
      "https://i.pinimg.com/73x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
      "https://i.pinimg.com/73x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg",
      "https://i.pinimg.com/73x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg",
    ],
  } = location.state || {};

  const handleBooking = () => {
    navigate("/booking", {
      state: { name, price },
    });
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Main image and thumbnails */}
        <div className="col-md-6">
          <img src={image} alt={name} className="img-fluid rounded-4 mb-3" />
          <div className="row g-3">
            {roomImages &&
              roomImages.map(
                (
                  img,
                  i // Ensure roomImages exists before mapping
                ) => (
                  <div className="col-4" key={i}>
                    <img
                      src={img}
                      alt={`${name}-room-${i}`}
                      className="img-fluid img-thumbnail rounded-4"
                      style={{
                        height: "80px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                )
              )}
          </div>
        </div>

        {/* Villa Detail Info */}
        <div className="col-md-6">
          <h3 className="fw-bold">{name}</h3>
          <p className="mb-2">
            <span className="text-warning">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            <span className="ms-2">
              4.9 <span className="text-muted">(20 Reviews)</span>
            </span>
          </p>
          <h5 className="fw-bold text-dark mb-3">
            Rp. {price.toLocaleString("id-ID")}{" "}
            <span className="fw-normal text-muted">/ night</span>
          </h5>
          <p className="text-muted">{description}</p>

          <h6 className="fw-bold mt-4 mb-2">Room Features</h6>
          <div className="row row-cols-2 mb-3 text-muted">
            {features &&
              features.map(
                (
                  feature,
                  i // Ensure features exist before mapping
                ) => (
                  <div className="col mb-2" key={i}>
                    {/* Icons for features would need a mapping if needed from feature string */}
                    {feature === "TV" && <FaTv className="me-2" />}
                    {feature === "Free Wifi" && <FaWifi className="me-2" />}
                    {feature === "Air Conditioner" && (
                      <FaSnowflake className="me-2" />
                    )}
                    {feature === "Heater" && (
                      <FaThermometerHalf className="me-2" />
                    )}
                    {feature === "Private Bathroom" && (
                      <FaBath className="me-2" />
                    )}
                    {feature}
                  </div>
                )
              )}
            <div className="col mb-2">
              <FaUserFriends className="me-2" />
              Max Guests: {guests}
            </div>
            <div className="col mb-2">
              <FaRulerCombined className="me-2" />
              Size: {size}
            </div>
            <div className="col mb-2">
              <FaBed className="me-2" />
              Bed Type: {bedType}
            </div>
          </div>

          <h6 className="fw-bold mt-4 mb-2">Children and Extra Beds</h6>
          <p className="text-muted mb-4">
            Children are welcome to stay. Extra beds are available upon request
            and may incur additional charges.
          </p>

          <button
            className="btn rounded-pill text-white w-100 py-2"
            style={{ backgroundColor: "#5a7684" }}
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
