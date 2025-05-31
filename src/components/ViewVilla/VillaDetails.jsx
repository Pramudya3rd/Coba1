import React from "react";
import { FaUserFriends, FaRulerCombined, FaBed } from "react-icons/fa";

const VillaDetails = ({
  title,
  location,
  price,
  description,
  features,
  guestCapacity,
  size,
  bedType,
  onEdit,
}) => (
  <div className="col-md-6">
    <h3 className="fw-bold">{title}</h3>
    <h6 className="text-muted mb-1">{location}</h6>

    <h5 className="fw-bold text-dark mb-3">
      Rp. {price.toLocaleString("id-ID")}{" "}
      <span className="fw-normal text-muted">/ night</span>
    </h5>

    <p className="text-muted">{description}</p>

    <h6 className="fw-bold mt-4 mb-2">Room Features</h6>
    <ul className="text-muted mb-3">
      {features && features.map((f, idx) => <li key={idx}>{f}</li>)}
      <li>
        <FaUserFriends className="me-2" />
        Max Guests: <strong>{guestCapacity}</strong>
      </li>
      <li>
        <FaRulerCombined className="me-2" />
        Size: <strong>{size}</strong>
      </li>
      <li>
        <FaBed className="me-2" />
        Bed Type: <strong>{bedType}</strong>
      </li>
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
