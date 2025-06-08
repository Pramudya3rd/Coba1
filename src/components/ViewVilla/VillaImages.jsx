// src/components/ViewVilla/VillaImages.jsx
import React from "react";
import { BACKEND_URL } from "../../api/axios";

const VillaImages = ({ mainImage, title, roomImages }) => (
  <div className="col-md-6">
    <img
      src={`${BACKEND_URL}${mainImage}`}
      alt={title}
      className="img-fluid rounded-4 mb-3"
    />
    <div className="row g-3">
      {roomImages.map((img, i) => (
        <div className="col-4" key={i}>
          <img
            src={`${BACKEND_URL}${img}`}
            alt={`room-${i}`}
            className="img-fluid img-thumbnail rounded-4"
            style={{ height: "80px", objectFit: "cover", width: "100%" }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default VillaImages;
