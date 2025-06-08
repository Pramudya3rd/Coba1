// src/pages/EditVilla.jsx
import React, { useEffect, useState } from "react";
import EditVillaHeader from "../components/EditVilla/EditHeader";
import EditVillaForm from "../components/EditVilla/EditVillaForm";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios"; // Import axios

const EditVilla = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [villaData, setVillaData] = useState(null); // Gunakan state untuk data villa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const villaId = location.state?.id; // Ambil ID dari state

  useEffect(() => {
    // --- DEBUG LOG: Pastikan ID villa diterima di halaman ini ---
    console.log("EditVilla Page: Received villaId from state:", villaId);
    // --- END DEBUG LOG ---

    if (!villaId) {
      setError(
        "ID Villa tidak ditemukan. Mengarahkan kembali ke halaman Owner..."
      );
      setLoading(false);
      // Memberi sedikit waktu agar pesan error terlihat sebelum redirect
      setTimeout(() => {
        navigate("/owner-page"); // Arahkan kembali jika tidak ada ID
      }, 2000); // Redirect setelah 2 detik
      return;
    }

    const fetchVillaForEdit = async () => {
      try {
        const response = await api.get(`/villas/${villaId}`);
        setVillaData(response.data.data);
      } catch (err) {
        console.error("Error fetching villa for edit:", err);
        setError(
          err.response?.data?.message ||
            "Gagal memuat data villa untuk diedit. Pastikan ID villa valid."
        );
        // Memberi sedikit waktu agar pesan error terlihat sebelum redirect
        setTimeout(() => {
          navigate("/owner-page"); // Arahkan kembali jika gagal fetch
        }, 3000); // Redirect setelah 3 detik
      } finally {
        setLoading(false);
      }
    };
    fetchVillaForEdit();
  }, [villaId, navigate]); // Dependensi villaId dan navigate

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">
            Memuat data villa untuk diedit...
          </span>
        </div>
        <p className="ms-3">Memuat data villa untuk diedit...</p>
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

  if (!villaData) {
    return (
      <div className="text-center my-5">
        Data villa tidak tersedia untuk diedit.
      </div>
    );
  }

  return (
    <>
      <EditVillaHeader />
      <div className="add-villa-container" style={{ marginTop: "20px" }}>
        {villaData && <EditVillaForm villaData={villaData} />}
      </div>
    </>
  );
};

export default EditVilla;
