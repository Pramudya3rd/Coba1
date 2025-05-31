// src/components/MostViewed.jsx
import React from "react";
import VillaCard from "./VillaCard";

const villas = [
  {
    id: 1, // Added ID
    name: "De Santika Nirwana", // Changed from title
    address: "Ubud, Bali", // Changed from location to address
    price: "Rp. 5.000.000 / Night",
    image:
      "https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    description: "Villa eksklusif dengan fasilitas premium...", // Added description
    guests: 6, // Added guests
    area: "24m²", // Changed from size to area
    bedType: "One King Bed", // Added bedType
    features: [
      "TV",
      "Free Wifi",
      "Air Conditioner",
      "Heater",
      "Private Bathroom",
    ], // Added features
    roomImages: [
      // Added roomImages
      "https://i.pinimg.com/73x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
      "https://i.pinimg.com/73x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg",
      "https://i.pinimg.com/73x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg",
    ],
  },
  {
    id: 2, // Added ID
    name: "Grand Lavanya Hills", // Changed from title
    address: "Ubud, Bali", // Changed from location to address
    price: "Rp. 8.500.000 / Night",
    image:
      "https://i.pinimg.com/73x/b3/1d/ac/b31dac2e3bf41b30d84f5e454e293b13.jpg",
    description: "Villa mewah dengan pemandangan bukit yang menakjubkan.",
    guests: 8,
    area: "30m²", // Changed from size to area
    bedType: "Two King Beds",
    features: ["TV", "Free Wifi", "Private Pool", "Kitchen"],
    roomImages: [
      "https://i.pinimg.com/73x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
      "https://i.pinimg.com/73x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg",
    ],
  },
  {
    id: 3, // Added ID
    name: "Samudra Biru Tropika", // Changed from title
    address: "Ubud, Bali", // Changed from location to address
    price: "Rp. 4.500.000 / Night",
    image:
      "http://i.pinimg.com/73x/28/a8/8d/28a88d79127329f7f6cb7be2a18ad2f0.jpg",
    description: "Nikmati ketenangan di villa dekat pantai.",
    guests: 4,
    area: "20m²", // Changed from size to area
    bedType: "One Queen Bed",
    features: ["TV", "Free Wifi"],
    roomImages: [
      "https://i.pinimg.com/73x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg",
    ],
  },
];

const MostViewed = () => (
  <section className="container pb-5">
    <h2 className="section-title">MOST VIEWED</h2>
    <p className="section-subtitle">
      Discover our top-rated villas by our guests
    </p>
    <div className="row g-4 justify-content-center">
      {villas.map((villa, index) => (
        <VillaCard key={index} {...villa} />
      ))}
    </div>
  </section>
);

export default MostViewed;
