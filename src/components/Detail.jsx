// src/components/Detail.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Ini adalah objek lokasi dari react-router-dom
import {
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaUserFriends,
} from "react-icons/fa";
import api from "../api/axios";

const Detail = () => {
  const location = useLocation(); // Ini adalah objek lokasi dari react-router-dom
  const navigate = useNavigate();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const villaId = location.state?.id;

  useEffect(() => {
    if (!villaId) {
      setError("ID Villa tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchVillaDetails = async () => {
      try {
        const response = await api.get(`/villas/${villaId}`);
        setVilla(response.data.data);
      } catch (err) {
        console.error("Error fetching villa details:", err);
        setError(err.response?.data?.message || "Gagal memuat detail villa.");
      } finally {
        setLoading(false);
      }
    };

    fetchVillaDetails();
  }, [villaId]);

  if (loading) {
    return <div className="text-center my-5">Memuat detail villa...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (!villa) {
    return <div className="text-center my-5">Detail villa tidak tersedia.</div>;
  }

  const handleBooking = () => {
    navigate("/booking", {
      state: {
        villaId: villa.id,
        title: villa.name,
        pricePerNight: villa.pricePerNight,
        mainImage: villa.mainImage,
      },
    });
  };

  const {
    name,
    location: villaLocation, // <--- UBAH INI
    pricePerNight,
    mainImage,
    description,
    features,
    guestCapacity,
    size,
    bedType,
    additionalImages,
  } = villa;

  const allImages = mainImage
    ? [mainImage, ...additionalImages]
    : additionalImages;
  const roomImagesForThumbnails =
    allImages.length > 1 ? allImages.slice(1) : [];

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-md-6">
          <img
            src={mainImage}
            alt={name}
            className="img-fluid rounded-4 mb-3"
          />
          <div className="row g-3">
            {roomImagesForThumbnails.map((img, i) => (
              <div className="col-4" key={i}>
                <img
                  src={img}
                  alt={`room-${i}`}
                  className="img-fluid img-thumbnail rounded-4"
                  style={{ height: "80px", objectFit: "cover", width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>

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
            Rp. {parseFloat(pricePerNight).toLocaleString("id-ID")}{" "}
            <span className="fw-normal text-muted">/ night</span>
          </h5>
          <p className="text-muted">{description}</p>

          <h6 className="fw-bold mt-4 mb-2">Room Features</h6>
          <div className="row row-cols-2 mb-3 text-muted">
            {features &&
              features.map((feature, i) => (
                <div className="col mb-2" key={i}>
                  {feature}
                </div>
              ))}
            <div className="col mb-2">
              <FaUserFriends className="me-2" />
              Max Guests: <strong>{guestCapacity}</strong>
            </div>
            <div className="col mb-2">
              <FaRulerCombined className="me-2" />
              Size: <strong>{size}</strong>
            </div>
            <div className="col mb-2">
              <FaBed className="me-2" />
              Bed Type: <strong>{bedType}</strong>
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
