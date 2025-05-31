// src/components/ViewVilla/VillaDetails.jsx
import React from "react";

const VillaDetails = ({
  name, // Changed from title
  address, // Changed from location to address
  price,
  description,
  features,
  guests,
  area, // Changed from size to area
  bedType,
  onEdit,
}) => (
  <div className="col-md-6">
    <h3 className="fw-bold">{name}</h3>
    <h6 className="text-muted mb-1">{address}</h6>{" "}
    {/* Changed from location to address */}
    <h5 className="fw-bold text-dark mb-3">
      Rp. {price.toLocaleString("id-ID")}{" "}
      <span className="fw-normal text-muted">/ night</span>
    </h5>
    <p className="text-muted">{description}</p>
    <h6 className="fw-bold mt-4 mb-2">Room Features</h6>
    <ul className="text-muted mb-3">
      {features &&
        features.map(
          (
            f,
            idx // Ensure features exist before mapping
          ) => <li key={idx}>{f}</li>
        )}
      <li>Max Guests: {guests}</li>
      <li>Area: {area}</li> {/* Changed from Size to Area */}
      <li>Bed Type: {bedType}</li>
    </ul>
    <button
      className="btn rounded-pill text-white w-100 py-2"
      style={{ backgroundColor: "#5a7684" }}
      onClick={onEdit}
    >
      Edit
    </button>
  </div>
);

export default VillaDetails;
