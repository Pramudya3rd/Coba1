// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import "../styles/forgot-password.css";
import api from "../api/axios"; // Import axios instance

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    // Tambahkan async
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!email.trim()) {
      setMessage("Email is required.");
      setIsError(true);
      return; // Hentikan eksekusi jika email kosong
    }

    try {
      // Kirim permintaan ke backend
      const response = await api.post("/auth/forgot-password", { email });
      setMessage(
        response.data.message ||
          "Password reset link has been sent to your email."
      );
      setIsError(false);
    } catch (error) {
      console.error(
        "Error sending reset password link:",
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.message ||
          "Failed to send reset password link. Please try again."
      );
      setIsError(true);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h4 className="forgot-password-title">Forgot Your Password?</h4>

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
          <div className="form-group text-start">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control forgot-password-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Tambahkan required
            />
          </div>
          <button type="submit" className="forgot-password-btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
