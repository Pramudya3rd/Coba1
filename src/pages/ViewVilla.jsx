// src/pages/ViewVilla.jsx
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
    id, // Added ID for navigation to edit
    name = "De Santika Nirwana", // Changed from title
    location: loc = "Ubud, Bali",
    price = 5000000,
    image = "https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    description = "Villa eksklusif dengan fasilitas premium...",
    guests = 6,
    size = "24m²", // Changed from area to size
    bedType = "One King Bed",
    features = [
      "TV",
      "Free Wifi",
      "Air Conditioner",
      "Heater",
      "Private Bathroom",
    ],
    roomImages = [
      // Use actual roomImages if passed, otherwise fallback to hardcoded
      "https://i.pinimg.com/73x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
      "https://i.pinimg.com/73x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg",
      "https://i.pinimg.com/73x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg",
    ],
  } = location.state || {};

  const handleEdit = () => {
    navigate(`/edit-villa/${id}`, {
      // Pass ID in URL, and full villa data in state
      state: {
        id,
        name, // Changed from title
        location: loc,
        price,
        image,
        description,
        guests,
        area: size, // For EditVillaForm to map correctly
        bedType,
        features,
        roomImages, // Pass all room images
      },
    });
  };

  return (
    <>
      <ViewVillaHeader />

      <div className="container py-5">
        <div className="row g-5">
          <VillaImages mainImage={image} name={name} roomImages={roomImages} />{" "}
          {/* Changed title to name */}
          <VillaDetails
            name={name} // Changed title to name
            location={loc}
            price={price}
            description={description}
            features={features}
            guests={guests}
            size={size} // Changed area to size
            bedType={bedType}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};

export default ViewVilla;
