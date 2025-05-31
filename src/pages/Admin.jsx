// src/pages/Admin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarAdmin";
import VillaCard from "../components/VillaCard";
import "../styles/SideBar.css";
import api from "../api/axios"; // Import axios

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]); // Owners adalah user dengan role 'owner'
  const [villasToUpdate, setVillasToUpdate] = useState([]); // Villa dengan status pending/rejected
  const [allVillas, setAllVillas] = useState([]); // Semua villa untuk daftar umum
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint, setter) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(endpoint);
      setter(response.data.data);
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}:`, err);
      setError(`Gagal memuat data dari ${endpoint}.`);
      setter([]); // Kosongkan data jika gagal
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeMenu === "user") {
      fetchData("/users", setUsers);
    } else if (activeMenu === "owner") {
      // Filter owners dari semua user, atau jika ada endpoint khusus
      fetchData("/users", (data) => {
        setOwners(data.filter((user) => user.role === "owner"));
      });
    } else if (activeMenu === "updateVilla") {
      // Admin melihat semua villa, dan kita bisa filter di frontend untuk status pending/rejected
      fetchData("/villas", (data) => {
        setVillasToUpdate(data.filter((villa) => villa.status !== "verified"));
      });
    } else if (activeMenu === "villaList") {
      // Admin melihat semua villa
      fetchData("/villas", setAllVillas);
    } else if (activeMenu === "booking") {
      fetchData("/bookings", setBookings);
    }
  }, [activeMenu]); // Tambahkan dependensi activeMenu

  // Fungsi untuk mengubah status villa (Approve/Reject)
  const handleUpdateVillaStatus = async (villaId, newStatus) => {
    try {
      await api.put(`/villas/${villaId}/status`, { status: newStatus });
      alert(`Status villa berhasil diubah menjadi ${newStatus}.`);
      // Refresh daftar villa yang perlu diupdate
      fetchData("/villas", (data) => {
        setVillasToUpdate(data.filter((villa) => villa.status !== "verified"));
      });
      // Refresh daftar semua villa juga, jika relevan
      fetchData("/villas", setAllVillas);
    } catch (err) {
      console.error(
        "Error updating villa status:",
        err.response?.data || err.message
      );
      alert(
        `Gagal mengubah status villa: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  // Fungsi untuk mengubah status booking (Konfirmasi/Batal/Selesai)
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert(`Status booking berhasil diubah menjadi ${newStatus}.`);
      fetchData("/bookings", setBookings); // Refresh daftar booking
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
    <div className="admin-wrapper">
      <Sidebar setActiveMenu={setActiveMenu} />

      <div className="content-area">
        {activeMenu === "dashboard" && (
          <div className="welcome-message">
            <h2>Welcome, Admin</h2>
          </div>
        )}

        {activeMenu === "user" && (
          <div className="user-table">
            <h4>USER</h4>
            {loading ? (
              <div className="text-center">Memuat daftar user...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : users.length === 0 ? (
              <div className="text-center">Tidak ada user terdaftar.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th> {/* Tambahkan kolom Role */}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeMenu === "owner" && (
          <div className="user-table">
            <h4>OWNER VILLA</h4>
            {loading ? (
              <div className="text-center">Memuat daftar owner...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : owners.length === 0 ? (
              <div className="text-center">Tidak ada owner terdaftar.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Villa Name</th>{" "}
                    {/* Kolom ini akan sulit diisi jika owner punya banyak villa */}
                  </tr>
                </thead>
                <tbody>
                  {owners.map((owner) => (
                    <tr key={owner.id}>
                      <td>{owner.name}</td>
                      <td>{owner.email}</td>
                      <td>{owner.phone}</td>
                      {/* Untuk "Villa Name", Anda perlu fetch villa milik owner secara terpisah
                          atau modifikasi backend untuk menyertakan daftar villa per owner.
                          Untuk sementara, kita bisa biarkan kosong atau tampilkan pesan. */}
                      <td>{/* Owner villa name from data, if available */}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeMenu === "updateVilla" && (
          <div className="user-table">
            <h4>UPDATE VILLA</h4>
            {loading ? (
              <div className="text-center">Memuat villa untuk diupdate...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : villasToUpdate.length === 0 ? (
              <div className="text-center">
                Tidak ada villa yang menunggu verifikasi.
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Villa Name</th>
                    <th>Address</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {villasToUpdate.map((villa) => (
                    <tr key={villa.id}>
                      <td>{villa.name}</td>
                      <td>{villa.location}</td>
                      <td>{villa.owner?.name || "N/A"}</td>{" "}
                      {/* Tampilkan nama owner */}
                      <td>{villa.status}</td>
                      <td>
                        <button
                          className="btn-approve"
                          onClick={() =>
                            handleUpdateVillaStatus(villa.id, "verified")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() =>
                            handleUpdateVillaStatus(villa.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeMenu === "villaList" && (
          <div className="villa-list-section">
            <h4>LIST VILLA</h4>
            {loading ? (
              <div className="text-center">Memuat daftar villa...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : allVillas.length === 0 ? (
              <div className="text-center">Tidak ada villa terdaftar.</div>
            ) : (
              <div className="row g-4 justify-content-center">
                {allVillas.map((villa) => (
                  <VillaCard
                    key={villa.id}
                    id={villa.id}
                    title={villa.name}
                    location={villa.location}
                    price={villa.pricePerNight}
                    image={villa.mainImage}
                    onBookNow={() =>
                      navigate("/villa-detail", { state: { id: villa.id } })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeMenu === "booking" && (
          <div className="user-table">
            <h4>LIST BOOKING</h4>
            {loading ? (
              <div className="text-center">Memuat daftar booking...</div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : bookings.length === 0 ? (
              <div className="text-center">Tidak ada booking.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nama Pengguna</th>
                    <th>Email Pengguna</th>
                    <th>Villa</th>
                    <th>Check-in</th>
                    <th>Check-Out</th>
                    <th>Harga Total</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.user?.name || "N/A"}</td>
                      <td>{booking.user?.email || "N/A"}</td>
                      <td>{booking.villa?.name || "N/A"}</td>
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
                        {booking.status === "confirmed" && (
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() =>
                              handleUpdateBookingStatus(booking.id, "completed")
                            }
                          >
                            Selesai
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

export default Admin;
