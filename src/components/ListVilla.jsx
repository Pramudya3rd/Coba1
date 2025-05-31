import React from "react";
import { useNavigate } from "react-router-dom";
import VillaCard from "./VillaCard";
import "../styles/VillaCard.css";

const ListVilla = () => {
  const navigate = useNavigate();

  const villas = [
    {
      title: "De Santika Nirwana",
      location: "Ubud, Bali",
      price: 5000000,
      image:
        "https://i.pinimg.com/736x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    },
    {
      title: "Grand Lavanya Hills",
      location: "Ubud, Bali",
      price: 8500000,
      image:
        "https://i.pinimg.com/736x/b3/1d/ac/b31dac2e3bf41b30d84f5e454e293b13.jpg",
    },
    {
      title: "Samudra Biru Tropika",
      location: "Ubud, Bali",
      price: 4500000,
      image:
        "http://i.pinimg.com/736x/28/a8/8d/28a88d79127329f7f6cb7be2a18ad2f0.jpg",
    },
  ];

  return (
    <section className="container pb-5">
      <h2 className="section-title">Our Villa</h2>
      <p className="section-subtitle">Happy Holiday, Enjoy Your Staycation</p>
      <div className="row g-4 justify-content-center">
        {villas.map((villa, index) => (
          <VillaCard
            key={index}
            title={villa.title}
            location={villa.location}
            price={villa.price}
            image={villa.image}
            onBookNow={() => navigate("/villa-detail", { state: { ...villa } })}
          />
        ))}
      </div>
    </section>
  );
};

export default ListVilla;
