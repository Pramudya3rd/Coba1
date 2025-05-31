import React, { useState } from "react"; // Impor useState
import "../styles/villa-booking-common.css"; // Pastikan ini terimpor
import "../styles/Confirmation.css"; // Pastikan ini terimpor juga untuk gaya spesifik tombol
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaSwimmer,
  FaUserFriends,
  FaLayerGroup,
  FaCloudUploadAlt, // Impor ikon untuk upload
} from "react-icons/fa";

const Confirmation = () => {
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState(null); // State baru untuk nama file

  const handleBooking = () => {
    navigate("/Invoice");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      // Di sini Anda bisa menambahkan logika untuk mengunggah file ke server
      console.log("File selected:", file.name);
    } else {
      setSelectedFileName(null);
    }
  };

  return (
    <div className="villa-booking-container">
      {/* Villa Card */}
      <div className="villa-card">
        <img
          src="https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg"
          alt="Villa"
          className="villa-image"
        />
        <div className="villa-content">
          <p className="villa-tagline">THE CHOICE OF FAMILIES</p>
          <h5 className="villa-title">De Santika Nirwana</h5>
          <div className="villa-rating">
            <span className="text-warning">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
            </span>
            <span className="rating-text">4.9 (20 Review)</span>
          </div>
          <hr />
          <div className="villa-features">
            <div>
              <FaBed /> Beds <strong>4</strong>
            </div>
            <div>
              <FaBath /> Bathrooms <strong>2</strong>
            </div>
            <div>
              <FaRulerCombined /> Area <strong>24m²</strong>
            </div>
            <div>
              <FaSwimmer /> Swimming Pool <strong>1</strong>
            </div>
            <div>
              <FaUserFriends /> Guest <strong>6</strong>
            </div>
            <div>
              <FaLayerGroup /> Floor <strong>2</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Summary */}
      <div className="reservation-summary">
        <h5 className="form-title">RESERVATION SUMMARY</h5>
        <div className="summary-rows">
          <div className="summary-row">
            <span>First Name</span>
            <span>
              <strong>Jamaludin Al Jamal</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Email Address</span>
            <span>
              <strong>Jamal@gmail.com</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Phone Number</span>
            <span>
              <strong>+62 123 456 789</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Duration</span>
            <span>
              <strong>1 Night</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Check-In</span>
            <span>
              <strong>19 June 2025</strong>
            </span>
          </div>
          <div className="summary-row">
            <span>Check-Out</span>
            <span>
              <strong>20 June 2025</strong>
            </span>
          </div>
        </div>

        <div className="upload-section">
          <p>
            <strong>UPLOAD FILE PAYMENT</strong>
          </p>
          <label htmlFor="file-upload" className="upload-box">
            <FaCloudUploadAlt className="upload-icon" />
            <span className="upload-text">
              {selectedFileName ? selectedFileName : "Choose File"}{" "}
              {/* Tampilkan nama file atau "Choose File" */}
            </span>
            {selectedFileName && (
              <span className="selected-file-name">
                {selectedFileName}{" "}
                {/* Opsional: tampilkan nama file di bawahnya lagi */}
              </span>
            )}
            <input
              type="file"
              id="file-upload"
              className="file-input"
              onChange={handleFileChange} // Tambahkan event handler
            />
          </label>
        </div>

        <button className="confirmation-button" onClick={handleBooking}>
          Confirmation
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
