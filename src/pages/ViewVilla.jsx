// src/pages/ViewVilla.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewVillaHeader from "../components/ViewVilla/ViewHeader";
import VillaImages from "../components/ViewVilla/VillaImages";
import VillaDetails from "../components/ViewVilla/VillaDetails";
import "../styles/view-villa.css";
import api from "../api/axios";

const ViewVilla = () => {
  const location = useLocation(); // Ini adalah objek lokasi dari react-router-dom
  const navigate = useNavigate();
  const [villa, setVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const villaId = location.state?.id;

  useEffect(() => {
    if (!villaId) {
      setError("ID Villa tidak ditemukan. Kembali ke halaman Owner.");
      setLoading(false);
      navigate("/owner-page");
      return;
    }

    const fetchVillaDetails = async () => {
      try {
        const response = await api.get(`/villas/${villaId}`);
        setVilla(response.data.data);
      } catch (err) {
        console.error("Error fetching villa details for view:", err);
        setError(err.response?.data?.message || "Gagal memuat detail villa.");
        navigate("/owner-page");
      } finally {
        setLoading(false);
      }
    };
    fetchVillaDetails();
  }, [villaId, navigate]);

  if (loading) {
    return <div className="text-center my-5">Memuat detail villa...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (!villa) {
    return <div className="text-center my-5">Detail villa tidak tersedia.</div>;
  }

  const handleEdit = () => {
    navigate("/edit-villa", {
      state: { ...villa },
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
    allImages.length > 1 ? allImages.slice(1, 4) : [];

  return (
    <>
      <ViewVillaHeader />

      <div className="container py-5">
        <div className="row g-5">
          <VillaImages
            mainImage={mainImage}
            title={name}
            roomImages={roomImagesForThumbnails}
          />
          <VillaDetails
            title={name}
            location={villaLocation} // <--- UBAH PENGGUNAAN INI
            price={pricePerNight}
            description={description}
            features={features}
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
