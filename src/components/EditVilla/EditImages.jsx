import React from "react";

const EditImages = ({ previewMainImage, previewAdditionalImages, handleChange }) => (
  <div className="upload-section">
    <label>EDIT VILLA IMAGES</label>
    <div className="mb-3">
      <label htmlFor="mainImage" className="form-label">Main Image</label>
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
      <label htmlFor="additionalImages" className="form-label">Additional Images</label>
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
);

export default EditImages;
