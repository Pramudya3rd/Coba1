// src/components/MyVilla/MyVillaTable.jsx
import React, { useState, useEffect } from "react";
import MyVillaRow from "./MyVillaRow";
import api from "../../api/axios"; // Import axios

const MyVillaTable = () => {
  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyVillas = async () => {
      try {
        // Mengambil villa yang dimiliki oleh user yang sedang login
        // Backend akan otomatis memfilter berdasarkan ownerId dari token
        const response = await api.get("/villas");
        setVillas(response.data.data);
      } catch (err) {
        console.error("Error fetching owner's villas:", err);
        setError("Gagal memuat daftar villa Anda.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyVillas();
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

  // Fungsi untuk refresh daftar villa setelah delete/update
  const refreshVillas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/villas");
      setVillas(response.data.data);
    } catch (err) {
      console.error("Error refreshing owner's villas:", err);
      setError("Gagal memperbarui daftar villa.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center my-5">Memuat villa Anda...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (villas.length === 0) {
    return <div className="text-center my-5">Anda belum memiliki villa.</div>;
  }

  return (
    <table className="villa-table">
      <thead>
        <tr>
          <th>Villa Name</th>
          <th>Address</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {villas.map((villa) => (
          <MyVillaRow
            key={villa.id}
            villa={villa}
            onDeleteSuccess={refreshVillas} // Teruskan fungsi refresh
          />
        ))}
      </tbody>
    </table>
  );
};

export default MyVillaTable;
