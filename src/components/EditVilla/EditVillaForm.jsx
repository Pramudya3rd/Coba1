// src/components/EditVilla/EditVillaForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

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
    // mainImage dan additionalImages sekarang akan disimpan sebagai URL string yang ada dari DB
    // mainImageFile dan additionalImageFiles untuk file baru yang diupload
    mainImage: "",
    additionalImages: [],
    mainImageFile: null, // Untuk file baru yang diunggah
    additionalImageFiles: [], // Untuk file baru yang diunggah
  });

  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);
  const [roomFeatures, setRoomFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Gunakan useEffect untuk mengisi form saat villaData props berubah
  useEffect(() => {
    if (villaData) {
      setFormData({
        name: villaData.name || "",
        location: villaData.location || "",
        description: villaData.description || "",
        guestCapacity: villaData.guestCapacity || "",
        pricePerNight: villaData.pricePerNight || "",
        size: villaData.size || "",
        bedType: villaData.bedType || "",
        mainImage: villaData.mainImage || "", // URL gambar lama dari DB
        additionalImages: villaData.additionalImages || [], // URL gambar lama dari DB
        mainImageFile: null, // Reset file baru
        additionalImageFiles: [], // Reset file baru
      });
      setRoomFeatures(villaData.features || []);
      // Set preview dari URL gambar yang ada atau yang baru diunggah
      setPreviewMainImage(villaData.mainImage || null);
      setPreviewAdditionalImages(villaData.additionalImages || []);
    }
  }, [villaData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mainImage" && files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, mainImageFile: file, mainImage: "" })); // Hapus URL lama jika ada file baru
      setPreviewMainImage(URL.createObjectURL(file));
    } else if (name === "additionalImages" && files) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        additionalImageFiles: [...prev.additionalImageFiles, ...newFiles], // Gabungkan File objek baru
        additionalImages: prev.additionalImages, // Pertahankan URL lama
      }));
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewAdditionalImages((prev) => [...prev, ...newPreviews]);
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

      // Hanya append file baru jika ada
      if (formData.mainImageFile) {
        data.append("mainImage", formData.mainImageFile);
      } else if (formData.mainImage) {
        // Jika tidak ada file baru tapi ada URL lama, kirim URL lama
        data.append("mainImage", formData.mainImage);
      }

      // Append file tambahan baru
      formData.additionalImageFiles.forEach((file, index) => {
        data.append(`additionalImages`, file);
      });
      // Append URL gambar tambahan lama (jika ada dan tidak diganti dengan file baru)
      formData.additionalImages.forEach((url, index) => {
        if (
          !formData.additionalImageFiles.some(
            (file) => URL.createObjectURL(file) === url
          )
        ) {
          // Cek jika bukan preview dari file baru
          data.append(`additionalImages`, url);
        }
      });
      // NOTE: Logika di atas untuk additionalImages mungkin perlu penyesuaian lebih lanjut
      // tergantung bagaimana Anda ingin menangani penambahan/penghapusan gambar tambahan di UI.
      // Saat ini, file baru akan ditambahkan, dan URL lama juga akan dikirim ulang.
      // Jika ingin hapus gambar lama, UI perlu punya tombol hapus gambar tambahan.

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
