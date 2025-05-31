import React, { useState } from "react";

const AddVillaForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    guestCapacity: "",
    price: "",
    size: "",
    bedType: "",
    mainImage: null,
    additionalImages: [],
  });

  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]);
  const [roomFeatures, setRoomFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "mainImage" && files.length > 0) {
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
    if (newFeature.trim() !== "" && !roomFeatures.includes(newFeature.trim())) {
      setRoomFeatures([...roomFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature) => {
    setRoomFeatures(roomFeatures.filter((f) => f !== feature));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const completeData = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      guestCapacity: parseInt(formData.guestCapacity),
      price: parseFloat(formData.price),
      size: formData.size,
      bedType: formData.bedType,
      mainImage: formData.mainImage ? "placeholder_main_image_url" : null, // Replace with actual upload logic
      additionalImages: formData.additionalImages.map(
        () => "placeholder_additional_image_url"
      ), // Replace with actual upload logic
      features: roomFeatures,
    };
    console.log("Data to submit:", completeData);
    alert("Villa data uploaded!");
    // In a real application, you would send completeData to your backend.
    // For example, using fetch or axios. This would involve handling image uploads
    // separately to get their URLs before sending the full villa data.
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
              name="price"
              placeholder="Price per night"
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
