// src/components/Confirmation.jsx
import React, { useState, useEffect } from "react";
import "../styles/Confirmation.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import api, { BACKEND_URL } from "../api/axios";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const [villaDetails, setVillaDetails] = useState(null);
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [fileName, setFileName] = useState("Choose File");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const { booking, villa } = location.state || {};
    if (booking && villa) {
      setBookingData(booking);
      setVillaDetails(villa);
    } else {
      setMessage(
        "Data pemesanan tidak ditemukan. Silakan kembali ke halaman pembayaran."
      );
      setIsError(true);
    }
  }, [location.state, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProofFile(file);
      setFileName(file.name);
    } else {
      setPaymentProofFile(null);
      setFileName("Choose File");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleConfirmation = async () => {
    setMessage("");
    setIsError(false);

    if (!bookingData) {
      setMessage("Data pemesanan tidak ditemukan. Tidak dapat mengkonfirmasi.");
      setIsError(true);
      return;
    }

    if (!paymentProofFile) {
      setMessage("Mohon unggah bukti pembayaran.");
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append("status", "pending"); // Ini status yang dikirim saat upload bukti bayar
    formData.append("paymentProof", paymentProofFile);

    try {
      const response = await api.put(
        `/bookings/${bookingData.id}/status`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Konfirmasi pemesanan berhasil:", response.data);
      setMessage(
        response.data.message ||
          "Pemesanan dikonfirmasi dan menunggu verifikasi."
      );
      setIsError(false);
      alert(response.data.message);

      navigate("/invoice", {
        state: { booking: response.data.data, villa: villaDetails },
      });
    } catch (err) {
      console.error(
        "Error saat konfirmasi pemesanan:",
        err.response?.data || err.message
      );
      setMessage(
        err.response?.data?.message ||
          "Konfirmasi pemesanan gagal. Terjadi kesalahan."
      );
      setIsError(true);
    }
  };

  if (!bookingData || !villaDetails) {
    return (
      <div className="text-center my-5">
        {message || "Data booking tidak tersedia."}
      </div>
    );
  }

  const {
    checkInDate,
    checkOutDate,
    totalPrice,
    user: bookingUser,
  } = bookingData;

  const { name: villaName, mainImage, pricePerNight } = villaDetails;

  const currentUser = bookingUser || JSON.parse(localStorage.getItem("user"));
  const firstName = currentUser?.name?.split(" ")[0] || "";
  const email = currentUser?.email || "";
  const phone = currentUser?.phone || "";

  return (
    <div className="villa-booking-container">
      <div className="villa-card">
        <img
          src={`${BACKEND_URL}${mainImage}`}
          alt={villaName}
          className="villa-image"
        />
        <div className="villa-content">
          <p className="villa-tagline">THE CHOICE OF FAMILIES</p>
          <h5 className="villa-title">{villaName}</h5>
          <p className="mt-3 text-muted">
            Price: Rp. {parseFloat(pricePerNight).toLocaleString("id-ID")} /
            Night
          </p>
        </div>
      </div>

      <div className="reservation-summary">
        <h5 className="form-title">RESERVATION SUMMARY</h5>
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
        <div className="summary-rows">
          <div className="summary-row">
            <span>First Name</span>
            <span>
              <strong>{firstName}</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Email Address</span>
            <span>
              <strong>{email}</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Phone Number</span>
            <span>
              <strong>{phone}</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Check-In</span>
            <span>
              <strong>
                {new Date(checkInDate).toLocaleDateString("id-ID")}
              </strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Check-Out</span>
            <span>
              <strong>
                {new Date(checkOutDate).toLocaleDateString("id-ID")}
              </strong>
            </span>
          </div>
          <hr />
          <div className="summary-row">
            <span>Total Price</span>
            <span>
              <strong>
                Rp. {parseFloat(totalPrice).toLocaleString("id-ID")}
              </strong>
            </span>
          </div>
        </div>

        <div className="upload-section">
          <p>
            <strong>UPLOAD FILE PAYMENT</strong>
          </p>
          <div className="upload-box" onClick={handleUploadClick}>
            <FaCloudUploadAlt className="upload-icon" />
            <span className="upload-text">
              {fileName === "Choose File"
                ? "Drag and drop your file here, or click to browse"
                : fileName}
            </span>
            {fileName !== "Choose File" && (
              <span className="selected-file-name">{fileName}</span>
            )}
            <input
              type="file"
              className="file-input"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        <button className="confirmation-button" onClick={handleConfirmation}>
          Confirmation
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
