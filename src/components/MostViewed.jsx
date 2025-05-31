// src/components/MostViewed.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VillaCard from "./VillaCard";
import api from "../api/axios"; // Import instance axios

const MostViewed = () => {
  const navigate = useNavigate();
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await api.get("/villas"); // Mengambil data villa dari backend
        // Anda bisa menambahkan logika untuk memilih "most viewed" di sini
        // Untuk saat ini, kita tampilkan semua yang terverifikasi
        setVillas(response.data.data);
      } catch (err) {
        console.error("Error fetching most viewed villas:", err);
        setError("Gagal memuat villa terpopuler.");
      } finally {
        setLoading(false);
      }
    };
    fetchVillas();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Memuat villa terpopuler...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (villas.length === 0) {
    return (
      <div className="text-center my-5">Tidak ada villa populer saat ini.</div>
    );
  }

  return (
    <section className="container pb-5">
      <h2 className="section-title">MOST VIEWED</h2>
      <p className="section-subtitle">
        Discover our top-rated villas by our guests
      </p>
      <div className="row g-4 justify-content-center">
        {villas.map((villa) => (
          <VillaCard
            key={villa.id}
            id={villa.id}
            title={villa.name}
            location={villa.location}
            price={villa.pricePerNight}
            image={villa.mainImage}
            onBookNow={() => navigate("/villa-detail", { state: { ...villa } })}
          />
        ))}
      </div>
    </section>
  );
};

export default MostViewed;
