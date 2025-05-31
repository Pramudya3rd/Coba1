// src/pages/EditVilla.jsx
import React, { useEffect, useState } from "react";
import EditVillaHeader from "../components/EditVilla/EditHeader";
import EditVillaForm from "../components/EditVilla/EditVillaForm";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const EditVilla = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [villaData, setVillaData] = useState(location.state);

  useEffect(() => {
    if (!villaData && id) {
      console.log(`Fetching villa data for ID: ${id}`);
      const dummyVillas = [
        {
          id: 1,
          name: "Grand Barca Nirwana", // Changed from title
          location: "Yogyakarta",
          price: 7500000,
          image:
            "https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
          description:
            "This is a dummy villa description for Grand Barca Nirwana.",
          guests: 8,
          area: "30m²", // Using 'area' here to match previous backend analysis for EditVillaForm mapping
          bedType: "Two King Beds",
          features: ["TV", "Free Wifi", "Air Conditioner", "Private Pool"],
          roomImages: [
            // Added roomImages
            "https://i.pinimg.com/73x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
            "https://i.pinimg.com/73x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg",
          ],
        },
        {
          id: 2,
          name: "De Santika Nirwana", // Changed from title
          location: "Ubud, Bali",
          price: 5000000,
          image:
            "https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
          description: "Villa eksklusif dengan fasilitas premium...",
          guests: 6,
          area: "24m²", // Using 'area' here
          bedType: "One King Bed",
          features: [
            "TV",
            "Free Wifi",
            "Air Conditioner",
            "Heater",
            "Private Bathroom",
          ],
          roomImages: [
            "https://i.pinimg.com/73x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
            "https://i.pinimg.com/73x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg",
            "https://i.pinimg.com/73x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg",
          ],
        },
        {
          id: 3,
          name: "Samudra Biru Tropika", // Changed from title
          location: "Ubud, Bali",
          price: 4500000,
          image:
            "http://i.pinimg.com/73x/28/a8/8d/28a88d79127329f7f6cb7be2a18ad2f0.jpg",
          description: "Another luxurious villa with stunning views.",
          guests: 4,
          area: "20m²", // Using 'area' here
          bedType: "One Queen Bed",
          features: ["TV", "Free Wifi"],
          roomImages: [],
        },
      ];
      const foundVilla = dummyVillas.find((v) => v.id === parseInt(id));
      if (foundVilla) {
        setVillaData(foundVilla);
      } else {
        navigate("/not-found");
      }
    } else if (!id && !villaData) {
      // Also check if villaData is not present when ID is missing
      navigate("/owner-page");
    }
  }, [id, villaData, navigate, location.state]);

  return (
    <>
      <EditVillaHeader />
      <div className="add-villa-container" style={{ marginTop: "20px" }}>
        {villaData ? (
          <EditVillaForm villaData={villaData} />
        ) : (
          <div>Loading villa data...</div>
        )}
      </div>
    </>
  );
};

export default EditVilla;
