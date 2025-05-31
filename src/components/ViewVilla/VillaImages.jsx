import React from 'react';

const VillaImages = ({ mainImage, title, roomImages }) => (
  <div className="col-md-6">
    <img src={mainImage} alt={title} className="img-fluid rounded-4 mb-3" />
    <div className="row g-3">
      {roomImages.map((img, i) => (
        <div className="col-4" key={i}>
          <img
            src={img}
            alt={`room-${i}`}
            className="img-fluid img-thumbnail rounded-4"
            style={{ height: '80px', objectFit: 'cover', width: '100%' }}
          />
        </div>
      ))}
    </div>
  </div>
);

export default VillaImages;
