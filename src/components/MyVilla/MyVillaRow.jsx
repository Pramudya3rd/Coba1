// src/components/MyVilla/MyVillaRow.jsx
import React from "react";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Import axios

const MyVillaRow = ({ villa, onDeleteSuccess }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    // Mengganti window.confirm dengan modal kustom jika diperlukan di masa depan
    if (
      window.confirm(`Apakah Anda yakin ingin menghapus villa "${villa.name}"?`)
    ) {
      try {
        await api.delete(`/villas/${villa.id}`); // Panggil endpoint delete villa
        alert("Villa berhasil dihapus.");
        onDeleteSuccess(); // Panggil fungsi refresh di parent
      } catch (err) {
        console.error("Error deleting villa:", err);
        alert(
          `Gagal menghapus villa: ${err.response?.data?.message || err.message}`
        );
      }
    }
  };

  return (
    <tr className="villa-row">
      <td>{villa.name}</td>
      <td>{villa.location}</td> {/* Menggunakan location sebagai Address */}
      <td>{villa.status}</td>
      <td className="action-buttons">
        <button
          title="View"
          onClick={() => {
            // --- DEBUG LOG: Pastikan ID villa ada sebelum navigasi ---
            console.log(
              "MyVillaRow: Navigating to view villa with ID:",
              villa.id
            );
            // --- END DEBUG LOG ---
            navigate(`/view-villa`, { state: { id: villa.id } }); // Kirim ID saja
          }}
        >
          <FaRegEye />
        </button>

        <button
          title="Edit"
          onClick={() => {
            // --- DEBUG LOG: Pastikan ID villa ada sebelum navigasi ---
            console.log(
              "MyVillaRow: Navigating to edit villa with ID:",
              villa.id
            );
            // --- END DEBUG LOG ---
            navigate(`/edit-villa`, { state: { id: villa.id } }); // Kirim ID saja
          }}
        >
          <FaEdit />
        </button>

        <button title="Delete" onClick={handleDelete}>
          {" "}
          {/* Tambahkan onClick handler */}
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default MyVillaRow;
