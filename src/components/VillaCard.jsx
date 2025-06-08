// src/components/VillaCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VillaCard.css";
import { FaStar } from "react-icons/fa";

// Get the base URL for static assets from the environment variable
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const VillaCard = ({ id, title, location, price, image, onBookNow }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (onBookNow) {
      console.log(
        "VillaCard: onBookNow prop exists. Executing onBookNow from parent. (INI TIDAK SEHARUSNYA MUNCUL JIKA SUDAH DIHAPUS DARI PARENT)"
      );
      onBookNow();
    } else {
      console.log(
        "VillaCard: onBookNow prop is NOT provided. Defaulting to /villa-detail navigation."
      );
      // --- BARIS PERBAIKAN: Ubah kunci dari 'villaId' menjadi 'id' ---
      navigate(`/villa-detail`, {
        state: { id: id, title, location, price, mainImage: image }, // Pastikan kunci adalah 'id'
      });
      // --- AKHIR BARIS PERBAIKAN ---
    }
  };

  return (
    <div className="col-md-4 d-flex">
      <div className="card villa-card border-0 shadow-sm rounded-4 flex-fill">
        <img
          src={image ? `${backendBaseUrl}${image}` : ""} // Prepend base URL
          className="card-img-top rounded-top-4 villa-image"
          alt={title}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-semibold">{title}</h5>
          <p className="text-muted mb-2">{location}</p>

          <div className="mb-2">
            <span className="text-warning">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
            <small className="text-muted ms-2">4.9 (20 Reviews)</small>
          </div>

          <p className="mb-1 small text-muted">Start From</p>
          <p className="fw-bold fs-6">
            Rp. {parseFloat(price).toLocaleString("id-ID")} / Night{" "}
          </p>

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
