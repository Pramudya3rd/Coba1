// src/pages/Owner.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SidebarOwner from "../components/SidebarOwner";
import MyVillaTable from "../components/MyVilla/MyVillaTable";
import "../styles/owner.css";
import api from "../api/axios"; // Import axios

const Owner = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const [bookings, setBookings] = useState([]); // State untuk booking
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorBookings, setErrorBookings] = useState(null);

  const handleAddVilla = () => {
    navigate("/add-villa");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fungsi untuk mengambil daftar booking untuk owner
  const fetchOwnerBookings = async () => {
    setLoadingBookings(true);
    setErrorBookings(null);
    try {
      // Backend akan otomatis memfilter berdasarkan ownerId dari token
      const response = await api.get("/bookings");
      setBookings(response.data.data);
    } catch (err) {
      console.error("Error fetching owner's bookings:", err);
      setErrorBookings("Gagal memuat daftar pemesanan Anda.");
    } finally {
      setLoadingBookings(false);
    }
  };

  // Efek untuk memuat booking saat menu "booking" aktif
  useEffect(() => {
    if (activeMenu === "booking") {
      fetchOwnerBookings();
    }
  }, [activeMenu]); // Jalankan ketika activeMenu berubah

  // Close dropdown jika klik di luar icon dan dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fungsi untuk mengupdate status booking
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert(`Status booking berhasil diubah menjadi ${newStatus}.`);
      fetchOwnerBookings(); // Refresh daftar booking setelah update
    } catch (err) {
      console.error(
        "Error updating booking status:",
        err.response?.data || err.message
      );
      alert(
        `Gagal mengubah status booking: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  return (
    <div className="owner-page">
      <SidebarOwner setActiveMenu={setActiveMenu} />
      <div className="main-content">
        <div
          className="header d-flex justify-content-end align-items-center position-relative"
          ref={profileRef}
        >
          <FaUserCircle
            size={32}
            className="text-dark cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Profile"
          />

          {showProfileMenu && (
            <div className="dropdown-menu show position-absolute end-0 mt-0 shadow bg-white rounded py-2">
              <button
                className="dropdown-item px-4 py-1 text-start"
                onClick={handleLogout}
                style={{ color: "inherit", fontWeight: "normal" }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {activeMenu === "dashboard" && (
          <div className="welcome-message">
            <h2>Welcome, Owner</h2>
          </div>
        )}

        {activeMenu === "villa" && (
          <div className="villa-section">
            <button className="add-villa-btn" onClick={handleAddVilla}>
              Add Villa
            </button>
            <MyVillaTable /> {/* MyVillaTable akan fetch datanya sendiri */}
          </div>
        )}

        {activeMenu === "booking" && (
          <div className="booking-section">
            <h3>Booking List</h3>
            {loadingBookings ? (
              <div className="text-center">Memuat pemesanan...</div>
            ) : errorBookings ? (
              <div className="alert alert-danger text-center">
                {errorBookings}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center">
                Tidak ada pemesanan untuk villa Anda.
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nama Pengguna</th>
                    <th>Email Pengguna</th>
                    <th>Telepon Pengguna</th>
                    <th>Villa</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Harga Total</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.user.name}</td>
                      <td>{booking.user.email}</td>
                      <td>{booking.user.phone}</td>
                      <td>{booking.villa.name}</td>
                      <td>
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </td>
                      <td>
                        Rp.{" "}
                        {parseFloat(booking.totalPrice).toLocaleString("id-ID")}
                      </td>
                      <td>{booking.status}</td>
                      <td>
                        {booking.status === "pending" && (
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() =>
                              handleUpdateBookingStatus(booking.id, "confirmed")
                            }
                          >
                            Konfirmasi
                          </button>
                        )}
                        {booking.status !== "cancelled" && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleUpdateBookingStatus(booking.id, "cancelled")
                            }
                          >
                            Batal
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Owner;
