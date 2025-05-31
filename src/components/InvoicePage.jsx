// src/components/InvoicePage.jsx
import React, { useState, useEffect } from "react";
import "../styles/Invoice.css";
import { useLocation } from "react-router-dom";

const InvoicePage = () => {
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const [villaDetails, setVillaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { booking, villa } = location.state || {};
    if (booking && villa) {
      setBookingData(booking);
      setVillaDetails(villa);
      setLoading(false);
    } else {
      setError(
        "Data invoice tidak ditemukan. Silakan kembali ke halaman sebelumnya."
      );
      setLoading(false);
    }
  }, [location.state]);

  if (loading) {
    return <div className="text-center my-5">Memuat invoice...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (!bookingData || !villaDetails) {
    return <div className="text-center my-5">Invoice tidak tersedia.</div>;
  }

  const {
    checkInDate,
    checkOutDate,
    totalPrice,
    user: bookingUser,
    paymentProof, // <-- AMBIL INI DARI BOOKING DATA
  } = bookingData;

  const { name: villaName, pricePerNight } = villaDetails;

  const currentUser = bookingUser || JSON.parse(localStorage.getItem("user"));
  const firstName = currentUser?.name?.split(" ")[0] || "";
  const lastName = currentUser?.name?.split(" ").slice(1).join(" ") || "";
  const email = currentUser?.email || "";
  const phone = currentUser?.phone || "";

  const formattedCheckIn = new Date(checkInDate).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedCheckOut = new Date(checkOutDate).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTotalPrice = parseFloat(totalPrice).toLocaleString("id-ID");
  const formattedPricePerNight =
    parseFloat(pricePerNight).toLocaleString("id-ID");

  const cityTaxRate = 0.1;
  const cityTax =
    parseFloat(pricePerNight) *
    ((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)) *
    cityTaxRate; // Hitung tax berdasarkan total malam
  const formattedCityTax = cityTax.toLocaleString("id-ID");

  const finalTotal = parseFloat(totalPrice) + cityTax;
  const formattedFinalTotal = finalTotal.toLocaleString("id-ID");

  const handleDownloadInvoice = () => {
    alert("Fungsi download invoice belum diimplementasikan.");
  };

  const backendBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", ""); // Untuk mengakses static files

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <h2 className="invoice-title">RESERVATION SUMMARY</h2>

        <div className="reservation-details">
          <div className="reservation-row">
            <span className="label">First Name</span>
            <span className="value">
              <strong>{firstName}</strong>
            </span>
          </div>
          <div className="reservation-row">
            <span className="label">Last Name</span>
            <span className="value">
              <strong>{lastName}</strong>
            </span>
          </div>
          <div className="reservation-row">
            <span className="label">Email Address</span>
            <span className="value">
              <strong>{email}</strong>
            </span>
          </div>
          <div className="reservation-row">
            <span className="label">Phone Number</span>
            <span className="value">
              <strong>{phone}</strong>
            </span>
          </div>
          <div className="reservation-row">
            <span className="label">Check-In</span>
            <span className="value">
              <strong>{formattedCheckIn}</strong>
            </span>
          </div>
          <div className="reservation-row">
            <span className="label">Check-Out</span>
            <span className="value">
              <strong>{formattedCheckOut}</strong>
            </span>
          </div>
        </div>

        <div className="price-summary">
          <h3 className="price-title">YOUR PRICE SUMMARY</h3>

          <div className="reservation-row">
            <span className="label">{villaName}</span>
            <span className="value">
              <strong>Rp. {formattedPricePerNight} / Night</strong>
            </span>
          </div>
          <div className="reservation-row">
            <span className="label">Total Nights</span>
            <span className="value">
              <strong>
                {(new Date(checkOutDate) - new Date(checkInDate)) /
                  (1000 * 60 * 60 * 24)}
              </strong>
            </span>
          </div>
          <div className="reservation-row">
            <span className="label">Subtotal</span>
            <span className="value">
              <strong>Rp. {formattedTotalPrice}</strong>
            </span>
          </div>
          <div className="reservation-row">
            <span className="label">City Tax (10%)</span>
            <span className="value">
              <strong>Rp. {formattedCityTax}</strong>
            </span>
          </div>
          <div className="reservation-row total">
            <span className="label">Total Payment Due</span>
            <span className="value">
              <strong>Rp. {formattedFinalTotal}</strong>
            </span>
          </div>

          {/* Tampilkan Bukti Pembayaran jika ada */}
          {paymentProof && (
            <div className="mt-4">
              <h6 className="fw-bold">Payment Proof:</h6>
              <img
                src={`<span class="math-inline">\{backendBaseUrl\}</span>{paymentProof}`} // <-- Menggunakan URL dari backend
                alt="Payment Proof"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="download-container">
        <button className="download-btn" onClick={handleDownloadInvoice}>
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
