// src/components/VillaBookingCard.jsx
import React, { useState, useEffect } from "react";
import "../styles/VillaBookingCard.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaBed, FaRulerCombined, FaUserFriends } from "react-icons/fa";
import api from "../api/axios"; // Pastikan ini diimpor dengan benar. BACKEND_URL tidak perlu diimpor dari sini, karena axios sudah menggunakannya di config base URL.

const VillaBookingCard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Logging untuk debugging, bisa dihapus setelah masalah teratasi
  console.log("VillaBookingCard - Full location object:", location);
  console.log(
    "VillaBookingCard - Location state saat masuk BookingPage:",
    location.state
  );

  const [bookingForm, setBookingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [villaDetails, setVillaDetails] = useState(null);
  const [loadingVilla, setLoadingVilla] = useState(true);
  const [errorVilla, setErrorVilla] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const villaId = location.state?.villaId;
  console.log(
    "VillaBookingCard - Villa ID yang diterima (dari state):",
    villaId
  );

  // Ambil URL dasar backend dari axios.js, ini lebih konsisten
  const backendBaseUrl = api.defaults.baseURL.replace("/api", "");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const userNameParts = user.name.split(" ");
        const fetchedFirstName = userNameParts[0] || "";
        const fetchedLastName = userNameParts.slice(1).join(" ") || "";

        setBookingForm((prevForm) => ({
          ...prevForm,
          firstName: fetchedFirstName,
          lastName: fetchedLastName,
          email: user.email || "",
          phone: user.phone || "",
        }));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!villaId) {
      setErrorVilla("ID Villa tidak ditemukan untuk pemesanan.");
      setLoadingVilla(false);
      return;
    }

    const fetchVillaDetails = async () => {
      try {
        const response = await api.get(`/villas/${villaId}`);
        const fetchedVilla = response.data.data;
        // Memastikan features di-parse jika datang sebagai string JSON
        if (
          fetchedVilla.features &&
          typeof fetchedVilla.features === "string"
        ) {
          try {
            fetchedVilla.features = JSON.parse(fetchedVilla.features);
          } catch (e) {
            console.error("Error parsing villa features:", e);
            fetchedVilla.features = [];
          }
        }
        setVillaDetails(fetchedVilla);
      } catch (err) {
        console.error("Error fetching villa details for booking:", err);
        setErrorVilla(
          err.response?.data?.message ||
            "Gagal memuat detail villa untuk pemesanan."
        );
      } finally {
        setLoadingVilla(false);
      }
    };
    fetchVillaDetails();
  }, [villaId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    setMessage("");
    setIsError(false);

    // Validasi input form di sisi klien
    if (
      !bookingForm.firstName ||
      !bookingForm.email ||
      !bookingForm.checkInDate ||
      !bookingForm.checkOutDate ||
      !bookingForm.phone
    ) {
      const clientSideErrorMessage =
        "Semua field wajib diisi (kecuali Last Name jika nama Anda satu kata).";
      setMessage(clientSideErrorMessage);
      setIsError(true);
      alert(clientSideErrorMessage); // Notifikasi langsung ke pengguna
      return;
    }

    if (!villaDetails) {
      const villaDetailsErrorMessage = "Detail villa belum dimuat. Coba lagi.";
      setMessage(villaDetailsErrorMessage);
      setIsError(true);
      alert(villaDetailsErrorMessage); // Notifikasi langsung ke pengguna
      return;
    }

    // Pengecekan login
    const token = localStorage.getItem("token");
    if (!token) {
      const loginRequiredMessage =
        "Anda harus login untuk melakukan pemesanan.";
      setMessage(loginRequiredMessage);
      setIsError(true);
      alert(loginRequiredMessage); // Notifikasi langsung ke pengguna
      navigate("/login");
      return;
    }

    try {
      const dataToSend = {
        villaId: villaId,
        checkInDate: bookingForm.checkInDate,
        checkOutDate: bookingForm.checkOutDate,
      };

      const response = await api.post("/bookings", dataToSend);
      console.log("Pemesanan berhasil:", response.data);
      setMessage(response.data.message || "Pemesanan berhasil dibuat!");
      setIsError(false);
      alert(response.data.message); // Notifikasi sukses

      navigate("/payment", {
        state: { booking: response.data.data, villa: villaDetails },
      });
    } catch (err) {
      console.error(
        "Error saat membuat pemesanan:",
        err.response?.data || err.message
      );
      // Tangani pesan error dari backend
      const errorMessage =
        err.response?.data?.message || "Pemesanan gagal. Terjadi kesalahan.";
      setMessage(errorMessage);
      setIsError(true);
      alert(errorMessage); // Notifikasi langsung ke pengguna untuk error dari backend
    }
  };

  if (loadingVilla) {
    return <div className="text-center my-5">Memuat detail villa...</div>;
  }

  if (errorVilla) {
    return (
      <div className="alert alert-danger text-center my-5">{errorVilla}</div>
    );
  }

  if (!villaDetails) {
    return (
      <div className="text-center my-5">
        Detail villa tidak tersedia untuk pemesanan.
      </div>
    );
  }

  return (
    <div className="villa-booking-container">
      {/* Villa Card */}
      <div className="villa-card">
        <img
          src={`${backendBaseUrl}${villaDetails.mainImage}`} // Menggunakan backendBaseUrl
          alt="Villa"
          className="villa-image"
        />
        <div className="villa-content">
          <p className="villa-tagline">THE CHOICE OF FAMILIES</p>
          <h5 className="villa-title">{villaDetails.name}</h5>
          <div className="villa-rating">
            <span className="text-warning">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
            <span className="rating-text">4.9 (20 Review)</span>
          </div>
          <hr />
          <div className="villa-features">
            {Array.isArray(villaDetails.features) &&
              villaDetails.features.map((feature, index) => (
                <div key={index}>{feature}</div>
              ))}
            <div>
              <FaBed /> Beds <strong>{villaDetails.bedType || "N/A"}</strong>
            </div>
            <div>
              <FaRulerCombined /> Area{" "}
              <strong>{villaDetails.size || "N/A"}</strong>
            </div>
            <div>
              <FaUserFriends /> Guest{" "}
              <strong>{villaDetails.guestCapacity}</strong>
            </div>
          </div>
          <p className="mt-3 text-muted">
            Price: Rp.{" "}
            {parseFloat(villaDetails.pricePerNight).toLocaleString("id-ID")} /
            Night
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="booking-form">
        <h5 className="form-title">ENTER YOUR DETAILS</h5>
        {message && (
          <div
            className={`alert mb-3 py-2 px-3 ${
              isError ? "alert-danger" : "alert-success"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={bookingForm.firstName}
              onChange={handleFormChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={bookingForm.lastName}
              onChange={handleFormChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={bookingForm.email}
              onChange={handleFormChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={bookingForm.phone}
              onChange={handleFormChange}
              readOnly
            />
          </div>
          <div className="form-group full-width">
            <label>Check-In</label>
            <input
              type="date"
              name="checkInDate"
              value={bookingForm.checkInDate}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group full-width">
            <label>Check-Out</label>
            <input
              type="date"
              name="checkOutDate"
              value={bookingForm.checkOutDate}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <button className="submit-button" onClick={handleBooking}>
          Request To Book
        </button>
      </div>
    </div>
  );
};

export default VillaBookingCard;
