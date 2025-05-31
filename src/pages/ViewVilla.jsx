import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewVillaHeader from "../components/ViewVilla/ViewHeader";
import VillaImages from "../components/ViewVilla/VillaImages";
import VillaDetails from "../components/ViewVilla/VillaDetails";
import "../styles/view-villa.css";

const ViewVilla = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    id,
    title = "De Santika Nirwana",
    location: loc = "Ubud, Bali",
    price = 5000000,
    image:
      mainImage = "https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    images: additionalImages = [],
    description = "Villa eksklusif dengan fasilitas premium...",
    guests: guestCapacity = 6,
    area: size = "24m²",
    bedType = "One King Bed",
    features = [
      "TV",
      "Free Wifi",
      "Air Conditioner",
      "Heater",
      "Private Bathroom",
    ],
  } = location.state || {};

  const roomImagesForThumbnails = mainImage
    ? additionalImages
    : additionalImages.slice(1);

  const handleEdit = () => {
    navigate("/edit-villa", {
      state: {
        id,
        title,
        location: loc,
        price,
        image: mainImage,
        images: additionalImages,
        description,
        guests: guestCapacity,
        area: size,
        bedType,
        features,
      },
    });
  };

  return (
    <>
      <ViewVillaHeader />

      <div className="container py-5">
        <div className="row g-5">
          <VillaImages
            mainImage={mainImage}
            title={title}
            roomImages={roomImagesForThumbnails}
          />
          <VillaDetails
            title={title}
            location={loc}
            price={price}
            description={description}
            features={features}
            guestCapacity={guestCapacity}
            size={size}
            bedType={bedType}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};

export default ViewVilla;
