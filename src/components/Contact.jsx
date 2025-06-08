import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    persons: "",
    date: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        persons: "",
        date: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mt-5 mb-5">
      <h2 className="section-title">CONTACT US</h2>
      <div className="row">
        <div className="col-md-4">
          <p>
            <strong>LOCATION</strong>
            <br />
            Jl. Sunset Road No. 99, Bali
          </p>
          <p>
            <strong>CALL US</strong>
            <br />
            +62 123 456 789
          </p>
          <p>
            <strong>EMAIL</strong>
            <br />
            cs.penyewaanvillaimersa@gmail.com
          </p>
        </div>
        <div className="col-md-8">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="FULL NAME"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="persons"
                  className="form-control"
                  placeholder="PERSONS"
                  value={formData.persons}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <textarea
                  name="message"
                  className="form-control"
                  rows="3"
                  placeholder="MESSAGE"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="col-12 text-end">
                <button
                  type="submit"
                  className="btn btn-primary px-4"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
