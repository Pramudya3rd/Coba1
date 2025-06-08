// src/components/ListVilla.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VillaCard from "./VillaCard";
import "../styles/VillaCard.css";
import api from "../api/axios";

// Get the base URL for static assets from the environment variable
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const ListVilla = () => {
  const navigate = useNavigate();
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await api.get("/villas");
        setVillas(response.data.data);
      } catch (err) {
        console.error("Error fetching villas:", err);
        setError("Gagal memuat daftar villa.");
      } finally {
        setLoading(false);
      }
    };
    fetchVillas();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Memuat villa...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (villas.length === 0) {
    return (
      <div className="text-center my-5">
        Tidak ada villa yang tersedia saat ini.
      </div>
    );
  }

  return (
    <section className="container pb-5">
      <h2 className="section-title">Our Villa</h2>
      <p className="section-subtitle">Happy Holiday, Enjoy Your Staycation</p>
      <div className="row g-4 justify-content-center">
        {villas.map((villa) => (
          <VillaCard
            key={villa.id}
            id={villa.id}
            title={villa.name}
            location={villa.location}
            price={villa.pricePerNight}
            image={villa.mainImage}
            // Hapus sepenuhnya baris onBookNow={...} di sini
            // onBookNow={() => navigate("/villa-detail", { state: { ...villa } })} <-- PASTIKAN BARIS INI TIDAK ADA
          />
        ))}
      </div>
    </section>
  );
};

export default ListVilla;
