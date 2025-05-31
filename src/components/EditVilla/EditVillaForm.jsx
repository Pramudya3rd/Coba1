// src/components/EditVilla/EditVillaForm.jsx
import React, { useState, useEffect } from "react";
import EditImages from "./EditImages";
import EditFeatures from "./EditFeatures";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditVillaForm = ({ villaData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "", // Changed from villaName to name
    location: "", // Changed from address to location
    description: "",
    guests: "", // Changed from capacity to guests
    price: "",
    size: "",
    bedType: "",
    mainImage: null, // This will hold the File object for a newly selected main image
    additionalImages: [], // This will hold File objects for newly selected additional images
  });

  const [previewMainImage, setPreviewMainImage] = useState(null); // This will hold the URL for the main image preview
  const [previewAdditionalImages, setPreviewAdditionalImages] = useState([]); // This will hold URLs for additional images preview
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(false);

  // Cleanup preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (
        previewMainImage &&
        typeof previewMainImage === "string" &&
        previewMainImage.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previewMainImage);
      }
      previewAdditionalImages.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previewMainImage, previewAdditionalImages]);

  useEffect(() => {
    if (villaData) {
      setFormData({
        name: villaData.name || "", // Mapping from 'name'
        location: villaData.location || "", // Already consistent
        description: villaData.description || "",
        guests: villaData.guests ? villaData.guests.toString() : "", // Mapping from 'guests'
        price: villaData.price ? villaData.price.toString() : "",
        size: villaData.area || "", // Mapping from 'area' to 'size'
        bedType: villaData.bedType || "",
        mainImage: null, // Reset file input
        additionalImages: [], // Reset file input, new files will be added
      });

      // Set initial previews from villaData
      setPreviewMainImage(villaData.image || null);
      setPreviewAdditionalImages(villaData.roomImages || []); // Assuming villaData.roomImages holds URLs for additional images
      setFeatures(villaData.features || []);
    }
  }, [villaData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mainImage" && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, mainImage: file }));
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
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    const formDataImage = new FormData();
    formDataImage.append("image", file);

    const response = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formDataImage,
    });

    if (!response.ok) throw new Error("Image upload failed");

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let mainImageUrl = previewMainImage; // Keep existing image if no new one is selected
      const additionalImageUrls = [...previewAdditionalImages]; // Keep existing additional images

      if (formData.mainImage) {
        // If a new main image file is selected
        mainImageUrl = await uploadImage(formData.mainImage);
      }

      for (const file of formData.additionalImages) {
        // Upload newly selected additional images
        const url = await uploadImage(file);
        additionalImageUrls.push(url);
      }

      const updatedData = {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        guests: parseInt(formData.guests),
        price: parseFloat(formData.price),
        mainImage: mainImageUrl,
        images: additionalImageUrls, // Send all image URLs (existing + new)
        features: features,
        area: formData.size, // Sending as 'area' as per backend expectation based on previous EditVilla analysis
        bedType: formData.bedType,
      };

      //fetch
      const res = await fetch(`${BASE_URL}/api/villas/${villaData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Update villa failed");

      alert("Villa updated successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Update error:", err);
      alert("Update error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    const trimmed = newFeature.trim();
    if (trimmed && !features.includes(trimmed)) {
      setFeatures([...features, trimmed]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  return (
    <form onSubmit={handleSubmit} className="add-villa-form">
      <EditImages
        previewMainImage={previewMainImage}
        previewAdditionalImages={previewAdditionalImages}
        handleChange={handleChange}
      />

      <div className="details-section">
        <label>EDIT DETAILS</label>
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
          placeholder="Bed Type"
          value={formData.bedType}
          onChange={handleChange}
          required
        />

        <EditFeatures
          roomFeatures={features}
          newFeature={newFeature}
          setNewFeature={setNewFeature}
          addFeature={addFeature}
          removeFeature={removeFeature}
        />

        <button
          type="submit"
          className="upload-btn full-width-btn"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Villa"}
        </button>
      </div>
    </form>
  );
};

export default EditVillaForm;
