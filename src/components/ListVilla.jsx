// src/components/ListVilla.jsx
import React, { useState, useEffect } from "react"; // Import useState dan useEffect
import { useNavigate } from "react-router-dom";
import VillaCard from "./VillaCard";
import "../styles/VillaCard.css";
import api from "../api/axios"; // Import instance axios

const ListVilla = () => {
  const navigate = useNavigate();
  const [villas, setVillas] = useState([]); // State untuk menyimpan daftar villa
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await api.get("/villas"); // Mengambil data villa dari backend
        setVillas(response.data.data); // Asumsi data villa ada di response.data.data
      } catch (err) {
        console.error("Error fetching villas:", err);
        setError("Gagal memuat daftar villa.");
      } finally {
        setLoading(false);
      }
    };
    fetchVillas();
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

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
            key={villa.id} // Gunakan ID unik dari backend
            id={villa.id} // Teruskan ID
            title={villa.name} // Sesuaikan dengan nama properti dari backend
            location={villa.location}
            price={villa.pricePerNight} // Sesuaikan dengan nama properti dari backend
            image={villa.mainImage} // Sesuaikan dengan nama properti dari backend
            onBookNow={() => navigate("/villa-detail", { state: { ...villa } })}
          />
        ))}
      </div>
    </section>
  );
};

export default ListVilla;
