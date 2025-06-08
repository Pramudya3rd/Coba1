// src/components/EditVilla/EditVillaForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaTimesCircle } from "react-icons/fa"; // Import icon silang

// Get the base URL for static assets from the environment variable
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

const EditVillaForm = ({ villaData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    guestCapacity: "",
    pricePerNight: "",
    size: "",
    bedType: "",
    mainImage: "", // This will still hold the relative path string for main image
    mainImageFile: null, // This will hold the File object for a new main image
  });

  // State baru untuk mengelola semua gambar tambahan (URL lama dan file baru)
  const [additionalImagesData, setAdditionalImagesData] = useState([]);
  const [previewMainImage, setPreviewMainImage] = useState(null);

  const [roomFeatures, setRoomFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Gunakan useEffect untuk mengisi form saat villaData props berubah
  useEffect(() => {
    if (villaData) {
      console.log("EditVillaForm: Received villaData:", villaData);

      // Pastikan additionalImages adalah array. Jika string, coba parse JSON.
      const ensuredAdditionalImages = Array.isArray(villaData.additionalImages)
        ? villaData.additionalImages
        : typeof villaData.additionalImages === "string" &&
          villaData.additionalImages.trim() !== ""
        ? JSON.parse(villaData.additionalImages)
        : [];

      // Pastikan features adalah array. Jika string, coba parse JSON.
      const ensuredFeatures = Array.isArray(villaData.features)
        ? villaData.features
        : typeof villaData.features === "string" &&
          villaData.features.trim() !== ""
        ? JSON.parse(villaData.features)
        : [];

      setFormData({
        name: villaData.name || "",
        location: villaData.location || "",
        description: villaData.description || "",
        guestCapacity: villaData.guestCapacity || "",
        pricePerNight: villaData.pricePerNight || "",
        size: villaData.size || "",
        bedType: villaData.bedType || "",
        mainImage: villaData.mainImage || "", // Keep original relative path
        mainImageFile: null, // No new file initially
      });
      setRoomFeatures(ensuredFeatures);

      // Inisialisasi additionalImagesData dengan gambar yang sudah ada
      const initialAdditionalImages = ensuredAdditionalImages.map((imgUrl) => ({
        id: imgUrl, // Use URL as unique ID for existing images
        type: "url",
        value: imgUrl, // Store relative path
        preview: `${backendBaseUrl}${imgUrl}`, // Full URL for display
      }));
      setAdditionalImagesData(initialAdditionalImages);

      // Set preview untuk mainImage
      const newPreviewMainImage = villaData.mainImage
        ? `${backendBaseUrl}${villaData.mainImage}`
        : null;
      setPreviewMainImage(newPreviewMainImage);

      console.log(
        "EditVillaForm: Constructed mainImage URL:",
        newPreviewMainImage
      );
      console.log(
        "EditVillaForm: Initial additionalImagesData:",
        initialAdditionalImages
      );
    }
  }, [villaData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mainImage" && files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, mainImageFile: file, mainImage: "" })); // Clear old URL if new file
      setPreviewMainImage(URL.createObjectURL(file)); // For new file, use createObjectURL
    } else if (name === "additionalImages" && files) {
      const newFiles = Array.from(files);
      const newImageObjects = newFiles.map((file) => ({
        id: URL.createObjectURL(file), // Use blob URL as ID for new files
        type: "file",
        value: file, // Store File object
        preview: URL.createObjectURL(file), // For new file, use createObjectURL
      }));
      setAdditionalImagesData((prev) => [...prev, ...newImageObjects]);
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

  // Fungsi untuk menghapus gambar tambahan
  const removeAdditionalImage = (idToRemove) => {
    setAdditionalImagesData((prevImages) =>
      prevImages.filter((img) => img.id !== idToRemove)
    );
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

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("guestCapacity", formData.guestCapacity);
      data.append("pricePerNight", formData.pricePerNight);
      data.append("size", formData.size);
      data.append("bedType", formData.bedType);
      data.append("features", JSON.stringify(roomFeatures));

      // Append main image (either new file or old URL)
      if (formData.mainImageFile) {
        data.append("mainImage", formData.mainImageFile);
      } else if (formData.mainImage) {
        data.append("mainImage", formData.mainImage);
      }

      // Append additional images based on their type
      additionalImagesData.forEach((img) => {
        data.append("additionalImages", img.value); // img.value will be either relative path (string) or File object
      });

      const response = await api.put(`/villas/${villaData.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Villa berhasil diperbarui:", response.data);
      setMessage(response.data.message || "Villa berhasil diperbarui!");
      setIsError(false);
      alert(response.data.message);
      navigate("/owner-page");
    } catch (err) {
      console.error("Error updating villa:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message ||
          "Gagal memperbarui villa. Terjadi kesalahan."
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
          <label>EDIT VILLA IMAGES</label>
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
              onChange={handleChange}
              accept="image/*"
              className="form-control"
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
              {/* Tampilkan preview gambar yang sudah ada dan yang baru diunggah */}
              {additionalImagesData.map((img, index) => (
                <div
                  key={img.id} // Gunakan ID unik dari objek gambar
                  style={{
                    width: "100px",
                    height: "100px",
                    position: "relative",
                  }}
                >
                  <img
                    src={img.preview} // Gunakan URL preview
                    alt={`Additional ${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(img.id)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "rgba(0, 0, 0, 0.5)", // Warna latar belakang semi-transparan hitam
                      color: "white",
                      borderRadius: "50%",
                      border: "none",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "12px",
                      padding: 0,
                      zIndex: 10,
                    }}
                    title="Remove image"
                  >
                    <FaTimesCircle />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="details-section">
          <label>EDIT YOUR DETAILS</label>
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVillaForm;
