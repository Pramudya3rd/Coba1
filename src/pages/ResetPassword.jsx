// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from "react"; // Import useEffect
import { useNavigate, useSearchParams } from "react-router-dom"; // Import useSearchParams
import "../styles/reset-password.css";
import api from "../api/axios"; // Import axios instance

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Hook untuk mengambil query params

  const token = searchParams.get("token"); // Ambil token dari URL
  const email = searchParams.get("email"); // Ambil email dari URL

  useEffect(() => {
    // Opsional: Validasi apakah token dan email ada saat komponen dimuat
    if (!token || !email) {
      setMessage("Link reset password tidak valid atau tidak lengkap.");
      setIsError(true);
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    // Tambahkan async
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!token || !email) {
      setMessage("Link reset password tidak valid atau tidak lengkap.");
      setIsError(true);
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage("Both password fields are required.");
      setIsError(true);
      return; // Hentikan eksekusi
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return; // Hentikan eksekusi
    }
    if (newPassword.length < 6) {
      // Contoh validasi kekuatan password
      setMessage("Password must be at least 6 characters long.");
      setIsError(true);
      return;
    }

    try {
      // Kirim permintaan ke backend
      const response = await api.post("/auth/reset-password", {
        token,
        email,
        newPassword,
      });
      setMessage(
        response.data.message || "Password has been reset successfully!"
      );
      setIsError(false);
      alert(response.data.message); // Tampilkan alert
      navigate("/password-updated"); // Arahkan ke halaman sukses
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
      setIsError(true);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h4 className="reset-password-title">Reset Your Password</h4>

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

        <form onSubmit={handleSubmit}>
          <div className="form-group text-start mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="form-control reset-password-input"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required // Tambahkan required
            />
          </div>
          <div className="form-group text-start mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control reset-password-input"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required // Tambahkan required
            />
          </div>
          <button type="submit" className="reset-password-btn">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
