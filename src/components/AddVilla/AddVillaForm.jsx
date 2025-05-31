// src/components/AddVilla/AddVillaForm.jsx
import React, { useState, useEffect } from "react";

const AddVillaForm = () => {
  const [formData, setFormData] = useState({
    name: "", // Changed from villaName
    location: "", // Changed from address
    description: "",
    guests: "", // Changed from capacity
    price: "",
    size: "", // Added
    bedType: "", // Added
    mainImage: null, // Changed from image
    additionalImages: [], // Added for consistency, though not fully utilized in current AddVilla logic
  });

  const [previewMainImage, setPreviewMainImage] = useState(null); // Changed from previewImage
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]); // For storing Blob URLs
  const [features, setFeatures] = useState([]); // Changed from roomFeatures
  const [newFeature, setNewFeature] = useState("");

  // Cleanup preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewMainImage) {
        URL.revokeObjectURL(previewMainImage);
      }
      previewAdditionalImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewMainImage, previewAdditionalImages]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "mainImage" && files.length > 0) {
      // Changed name from 'image'
      const file = files[0];
      setFormData({ ...formData, mainImage: file });
      setPreviewMainImage(URL.createObjectURL(file));
    } else if (name === "additionalImages" && files.length > 0) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, ...newFiles],
      }));
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewAdditionalImages((prev) => [...prev, ...newPreviews]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureChange = (e) => {
    setNewFeature(e.target.value);
  };

  const addFeature = () => {
    if (newFeature.trim() !== "" && !features.includes(newFeature.trim())) {
      // Changed roomFeatures to features
      setFeatures([...features, newFeature.trim()]); // Changed roomFeatures to features
      setNewFeature("");
    }
  };

  const removeFeature = (feature) => {
    setFeatures(features.filter((f) => f !== feature)); // Changed roomFeatures to features
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeData = {
      ...formData,
      features: features, // Changed roomFeatures to features
      guests: parseInt(formData.guests), // Ensure number type
      price: parseFloat(formData.price), // Ensure number type
    };
    console.log("Data to submit:", completeData);
    alert("Villa data uploaded!");
    // Tambahkan request ke backend di sini
  };

  return (
    <div className="add-villa-container">
      <form onSubmit={handleSubmit} className="add-villa-form">
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
              multiple // Allow multiple file selection
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
              name="guests"
              placeholder="Capacity"
              value={formData.guests}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
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
            {features.map((feature, index) => (
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
