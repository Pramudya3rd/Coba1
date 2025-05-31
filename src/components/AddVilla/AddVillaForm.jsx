// src/components/AddVilla/AddVillaForm.jsx
import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddVillaForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    guestCapacity: "",
    pricePerNight: "",
    size: "",
    bedType: "",
    // mainImage dan additionalImages sekarang akan disimpan sebagai File objek untuk sementara
    // sebelum dikirim via FormData
    mainImageFile: null,
    additionalImageFiles: [],
  });

  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);
  const [roomFeatures, setRoomFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mainImage" && files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, mainImageFile: file })); // Simpan File objek
      setPreviewMainImage(URL.createObjectURL(file)); // Untuk preview
    } else if (name === "additionalImages" && files) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        additionalImageFiles: [...prev.additionalImageFiles, ...newFiles], // Gabungkan File objek
      }));
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewAdditionalImages((prev) => [...prev, ...newPreviews]); // Untuk preview
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (e) => {
    setNewFeature(e.target.value);
  };

  const addFeature = () => {
    if (newFeature.trim() !== "" && !roomFeatures.includes(newFeature.trim())) {
      setRoomFeatures([...roomFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature) => {
    setRoomFeatures(roomFeatures.filter((f) => f !== feature));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (
      !formData.name ||
      !formData.location ||
      !formData.description ||
      !formData.guestCapacity ||
      !formData.pricePerNight
    ) {
      setMessage("Mohon lengkapi semua informasi dasar villa.");
      setIsError(true);
      return;
    }
    if (!formData.mainImageFile) {
      // Validasi gambar utama wajib
      setMessage("Gambar utama villa wajib diunggah.");
      setIsError(true);
      return;
    }

    try {
      const data = new FormData(); // Gunakan FormData untuk mengirim file
      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("guestCapacity", formData.guestCapacity);
      data.append("pricePerNight", formData.pricePerNight);
      data.append("size", formData.size);
      data.append("bedType", formData.bedType);
      data.append("features", JSON.stringify(roomFeatures)); // Kirim fitur sebagai string JSON

      if (formData.mainImageFile) {
        data.append("mainImage", formData.mainImageFile); // Tambahkan file gambar utama
      }
      formData.additionalImageFiles.forEach((file, index) => {
        data.append(`additionalImages`, file); // Tambahkan file gambar tambahan
      });

      const response = await api.post("/villas", data, {
        headers: {
          "Content-Type": "multipart/form-data", // PENTING: Set header ini
        },
      });

      console.log("Villa berhasil ditambahkan:", response.data);
      setMessage(response.data.message || "Villa berhasil ditambahkan!");
      setIsError(false);
      alert(response.data.message);
      navigate("/owner-page");
    } catch (err) {
      console.error("Error adding villa:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message ||
          "Gagal menambahkan villa. Terjadi kesalahan."
      );
      setIsError(true);
    }
  };

  return (
    <div className="add-villa-container">
      <form
        onSubmit={handleSubmit}
        className="add-villa-form"
        encType="multipart/form-data"
      >
        {/* UPLOAD SECTION */}
        <div className="upload-section">
          <label>UPLOAD IMAGES</label>
          <div className="mb-3">
            <label htmlFor="mainImage" className="form-label">
              Main Image
            </label>
            <div className="image-placeholder">
              {previewMainImage ? (
                <img src={previewMainImage} alt="Main Preview" />
              ) : (
                <span>No main image selected</span>
              )}
            </div>
            <input
              type="file"
              name="mainImage"
              id="mainImage"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
              required // Gambar utama wajib
            />
          </div>

          <div className="mb-3">
            <label htmlFor="additionalImages" className="form-label">
              Additional Images
            </label>
            <input
              type="file"
              name="additionalImages"
              id="additionalImages"
              onChange={handleChange}
              accept="image/*"
              multiple
              className="form-control"
            />
            <div className="d-flex flex-wrap mt-2 gap-2">
              {previewAdditionalImages.map((preview, index) => (
                <div
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                    position: "relative",
                  }}
                >
                  <img
                    src={preview}
                    alt={`Additional ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="details-section">
          <label>FILL YOUR DETAILS</label>
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
          <input
            type="text"
            name="name"
            placeholder="Villa Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Address"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div className="inline-inputs">
            <input
              type="number"
              name="guestCapacity"
              placeholder="Guest Capacity"
              value={formData.guestCapacity}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="pricePerNight"
              placeholder="Price per night"
              value={formData.pricePerNight}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="size"
            placeholder="Size (e.g., 24m²)"
            value={formData.size}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="bedType"
            placeholder="Bed Type (e.g., One King Bed)"
            value={formData.bedType}
            onChange={handleChange}
            required
          />

          {/* FEATURES */}
          <label>ROOM FEATURES</label>
          <div className="inline-inputs">
            <input
              type="text"
              className="feature-input"
              placeholder="Add a feature (e.g., TV, AC)"
              value={newFeature}
              onChange={handleFeatureChange}
            />
            <button
              type="button"
              className="add-feature-btn"
              onClick={addFeature}
            >
              Add
            </button>
          </div>

          <ul className="features-list">
            {roomFeatures.map((feature, index) => (
              <li key={index}>
                {feature}
                <button type="button" onClick={() => removeFeature(feature)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button type="submit" className="upload-btn full-width-btn">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVillaForm;
