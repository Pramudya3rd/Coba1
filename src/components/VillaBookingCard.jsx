// src/components/VillaBookingCard.jsx
import React, { useState, useEffect } from "react"; // Import useEffect
import "../styles/VillaBookingCard.css";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import {
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaSwimmer,
  FaUserFriends,
  FaLayerGroup,
} from "react-icons/fa";
import api from "../api/axios"; // Import instance axios

const VillaBookingCard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Untuk mengambil data villa dari state
  const [bookingForm, setBookingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [villaDetails, setVillaDetails] = useState(null); // State untuk detail villa
  const [loadingVilla, setLoadingVilla] = useState(true);
  const [errorVilla, setErrorVilla] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Ambil ID villa dari location.state
  const villaId = location.state?.villaId;

  // Ambil informasi user dari localStorage untuk mengisi form awal
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setBookingForm((prevForm) => ({
          ...prevForm,
          firstName: user.name.split(" ")[0] || "",
          lastName: user.name.split(" ").slice(1).join(" ") || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  // Ambil detail villa saat komponen dimuat
  useEffect(() => {
    if (!villaId) {
      setErrorVilla("ID Villa tidak ditemukan untuk pemesanan.");
      setLoadingVilla(false);
      return;
    }

    const fetchVillaDetails = async () => {
      try {
        const response = await api.get(`/villas/${villaId}`);
        setVillaDetails(response.data.data);
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
    // Tambahkan 'async' di sini
    setMessage("");
    setIsError(false);

    // Validasi client-side dasar
    if (
      !bookingForm.firstName ||
      !bookingForm.lastName ||
      !bookingForm.email ||
      !bookingForm.phone ||
      !bookingForm.checkInDate ||
      !bookingForm.checkOutDate
    ) {
      setMessage("Semua field wajib diisi.");
      setIsError(true);
      return;
    }

    if (!villaDetails) {
      setMessage("Detail villa belum dimuat. Coba lagi.");
      setIsError(true);
      return;
    }

    // Pastikan user sudah login sebelum booking
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Anda harus login untuk melakukan pemesanan.");
      setIsError(true);
      alert("Anda harus login untuk melakukan pemesanan.");
      navigate("/login"); // Arahkan ke login
      return;
    }

    try {
      const dataToSend = {
        villaId: villaId,
        checkInDate: bookingForm.checkInDate,
        checkOutDate: bookingForm.checkOutDate,
        // totalPrice tidak perlu dikirim, akan dihitung di backend
      };

      const response = await api.post("/bookings", dataToSend);
      console.log("Pemesanan berhasil:", response.data);
      setMessage(response.data.message || "Pemesanan berhasil dibuat!");
      setIsError(false);
      alert(response.data.message);

      // Redirect ke halaman payment atau confirmation dengan data booking
      navigate("/payment", {
        state: { booking: response.data.data, villa: villaDetails },
      });
    } catch (err) {
      console.error(
        "Error saat membuat pemesanan:",
        err.response?.data || err.message
      );
      setMessage(
        err.response?.data?.message || "Pemesanan gagal. Terjadi kesalahan."
      );
      setIsError(true);
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
        <img src={villaDetails.mainImage} alt="Villa" className="villa-image" />
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
            {villaDetails.features?.map((feature, index) => (
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
              readOnly // Karena diambil dari data user login
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
              readOnly // Karena diambil dari data user login
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
              readOnly // Karena diambil dari data user login
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
              readOnly // Karena diambil dari data user login
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
