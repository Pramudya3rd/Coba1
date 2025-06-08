import React, { useState, useEffect } from "react"; // Tambahkan useState dan useEffect
import NavbarProfile from "../components/NavbarProfile";
import ProfileCard from "../components/ProfileCard";
import ActivityCard from "../components/ActivityCard";
import api from "../api/axios"; // Import instance axios Anda

import avatarImg from "../assets/profile.jpg"; // Tetap gunakan gambar avatar statis untuk saat ini
import "../styles/profile.css";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null); // State untuk menyimpan data profil pengguna
  const [activities, setActivities] = useState([]); // State untuk menyimpan aktivitas/booking pengguna
  const [loading, setLoading] = useState(true); // State untuk indikator loading
  const [error, setError] = useState(null); // State untuk pesan error

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // 1. Ambil data pengguna dari localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Mengambil nama depan dan belakang jika nama lengkap disimpan
          const userNameParts = parsedUser.name.split(" ");
          const firstName = userNameParts[0] || "";
          const lastName = userNameParts.slice(1).join(" ") || "";

          setUserProfile({
            avatar: avatarImg, // Gunakan avatar statis
            name: parsedUser.name,
            email: parsedUser.email,
            phone: parsedUser.phone,
            firstName: firstName, // Tambahkan ini jika ProfileCard perlu
            lastName: lastName, // Tambahkan ini jika ProfileCard perlu
          });
        } else {
          // Jika tidak ada user di localStorage, mungkin arahkan ke login atau tampilkan pesan
          setError("Data pengguna tidak ditemukan. Silakan login kembali.");
          setLoading(false);
          return;
        }

        // 2. Ambil data aktivitas/booking dari backend
        // Endpoint /api/bookings akan otomatis memfilter berdasarkan user yang login
        const bookingsResponse = await api.get("/bookings");
        const fetchedBookings = bookingsResponse.data.data;

        // Map data booking agar sesuai dengan format ActivityItem
        const formattedActivities = fetchedBookings.map((booking) => {
          const checkInDate = new Date(booking.checkInDate);
          const monthNames = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ];
          const date = checkInDate.getDate().toString();
          const month = monthNames[checkInDate.getMonth()];
          const villaName = booking.villa?.name || "Nama Villa Tidak Diketahui";
          // Sesuaikan status yang ditampilkan. Misalnya, 'pending' menjadi 'PENDING', 'confirmed' menjadi 'BOOKED'
          const displayStatus = booking.status.toUpperCase();
          const price = `Rp ${parseFloat(booking.totalPrice).toLocaleString(
            "id-ID"
          )}`;

          return {
            date: date,
            month: month,
            name: villaName,
            status: displayStatus,
            price: price,
          };
        });

        setActivities(formattedActivities);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(
          err.response?.data?.message ||
            "Gagal memuat data profil atau aktivitas."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat komponen dimuat

  if (loading) {
    return (
      <>
        <NavbarProfile />
        <div className="text-center my-5">Memuat data profil...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarProfile />
        <div className="alert alert-danger text-center my-5">{error}</div>
      </>
    );
  }

  // Jika tidak ada userProfile setelah loading (misal, localStorage kosong)
  if (!userProfile) {
    return (
      <>
        <NavbarProfile />
        <div className="text-center my-5">
          Tidak dapat memuat profil pengguna.
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarProfile />
      <div className="profile-page">
        {/* Mengirim userProfile ke ProfileCard */}
        <ProfileCard user={userProfile} />
        {/* Mengirim activities ke ActivityCard */}
        <ActivityCard activities={activities} />
      </div>
    </>
  );
};

export default ProfilePage;
