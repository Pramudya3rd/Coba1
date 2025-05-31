// src/components/ViewVilla/VillaImages.jsx
import React from "react";

const VillaImages = (
  { mainImage, name, roomImages } // Changed title to name
) => (
  <div className="col-md-6">
    <img src={mainImage} alt={name} className="img-fluid rounded-4 mb-3" />
    <div className="row g-3">
      {roomImages &&
        roomImages.map(
          (
            img,
            i // Ensure roomImages exists before mapping
          ) => (
            <div className="col-4" key={i}>
              <img
                src={img}
                alt={`${name}-room-${i}`}
                className="img-fluid img-thumbnail rounded-4"
                style={{ height: "80px", objectFit: "cover", width: "100%" }}
              />
            </div>
          )
        )}
    </div>
  </div>
);

export default VillaImages;
