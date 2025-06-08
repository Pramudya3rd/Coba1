// src/pages/ViewVilla.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewVillaHeader from "../components/ViewVilla/ViewHeader";
import VillaImages from "../components/ViewVilla/VillaImages";
import VillaDetails from "../components/ViewVilla/VillaDetails";
import "../styles/view-villa.css";
import api from "../api/axios";

// Get the base URL for static assets from the environment variable
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const ViewVilla = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const villaId = location.state?.id;

  useEffect(() => {
    console.log("ViewVilla Page: Received villaId from state:", villaId);

    if (!villaId) {
      console.error("ViewVilla Page Error: villaId is undefined or null.");
      setError(
        "ID Villa tidak ditemukan. Mengarahkan kembali ke halaman Owner..."
      );
      setLoading(false);
      setTimeout(() => {
        navigate("/owner-page");
      }, 2000);
      return;
    }

    const fetchVillaDetails = async () => {
      try {
        console.log(
          `ViewVilla Page: Attempting to fetch villa details for ID: ${villaId}`
        );
        const response = await api.get(`/villas/${villaId}`);
        console.log(
          "ViewVilla Page: Successfully fetched villa data:",
          response.data.data
        );
        setVilla(response.data.data);
      } catch (err) {
        console.error(
          "ViewVilla Page Error fetching villa details:",
          err.response?.data || err.message
        );
        setError(
          err.response?.data?.message ||
            "Gagal memuat detail villa. Pastikan ID villa valid dan server berjalan."
        );
        setTimeout(() => {
          navigate("/owner-page");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };
    fetchVillaDetails();
  }, [villaId, navigate]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Memuat detail villa...</span>
        </div>
        <p className="ms-3">Memuat detail villa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-5" role="alert">
        {error}
      </div>
    );
  }

  if (!villa) {
    return <div className="text-center my-5">Detail villa tidak tersedia.</div>;
  }

  const handleEdit = () => {
    navigate("/edit-villa", {
      state: { id: villa.id },
    });
  };

  const {
    name,
    location: villaLocation,
    pricePerNight,
    mainImage,
    description,
    features,
    guestCapacity,
    size,
    bedType,
    additionalImages,
  } = villa;

  // Pastikan additionalImages adalah array sebelum digunakan
  const ensuredAdditionalImages = Array.isArray(additionalImages)
    ? additionalImages
    : [];

  const allImages = mainImage
    ? [mainImage, ...ensuredAdditionalImages]
    : ensuredAdditionalImages;
  const roomImagesForThumbnails =
    allImages.length > 1 ? allImages.slice(1, 4) : [];

  return (
    <>
      <ViewVillaHeader />

      <div className="container py-5">
        <div className="row g-5">
          <VillaImages
            mainImage={mainImage ? `${backendBaseUrl}${mainImage}` : ""}
            title={name}
            roomImages={roomImagesForThumbnails.map(
              (imgUrl) => `${backendBaseUrl}${imgUrl}`
            )}
          />
          <VillaDetails
            title={name}
            location={villaLocation}
            price={pricePerNight}
            description={description}
            features={Array.isArray(features) ? features : []}
            guestCapacity={guestCapacity}
            size={size}
            bedType={bedType}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};

export default ViewVilla;
