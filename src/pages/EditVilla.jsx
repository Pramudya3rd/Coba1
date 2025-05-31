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
    if (!villaId) {
      setError("ID Villa tidak ditemukan. Kembali ke halaman Owner.");
      setLoading(false);
      navigate("/owner-page"); // Arahkan kembali jika tidak ada ID
      return;
    }

    const fetchVillaForEdit = async () => {
      try {
        const response = await api.get(`/villas/${villaId}`);
        setVillaData(response.data.data);
      } catch (err) {
        console.error("Error fetching villa for edit:", err);
        setError(
          err.response?.data?.message || "Gagal memuat data villa untuk diedit."
        );
        navigate("/owner-page"); // Arahkan kembali jika gagal fetch
      } finally {
        setLoading(false);
      }
    };
    fetchVillaForEdit();
  }, [villaId, navigate]); // Dependensi villaId dan navigate

  if (loading) {
    return (
      <div className="text-center my-5">Memuat data villa untuk diedit...</div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
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
