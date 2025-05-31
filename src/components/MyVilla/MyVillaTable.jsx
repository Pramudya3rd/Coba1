// src/components/MyVilla/MyVillaTable.jsx
import React from "react";
import MyVillaRow from "./MyVillaRow";

const villas = [
  {
    id: 1,
    name: "Grand Barca Nirwana",
    address: "Yogyakarta", // Changed from location to address
    status: "Verified",
    price: 7500000, // Added price for consistent passing
    image:
      "https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    description: "This is a dummy villa description for Grand Barca Nirwana.",
    guests: 8,
    area: "30m²",
    bedType: "Two King Beds",
    features: ["TV", "Free Wifi", "Air Conditioner", "Private Pool"],
    roomImages: [
      "https://i.pinimg.com/73x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
      "https://i.pinimg.com/73x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg",
    ],
  },
  {
    id: 2,
    name: "Grand Barca Nirwana",
    address: "Yogyakarta", // Changed from location to address
    status: "Pending",
    price: 5000000,
    image:
      "https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    description: "Another dummy villa description.",
    guests: 6,
    area: "24m²",
    bedType: "One King Bed",
    features: ["TV", "Free Wifi"],
    roomImages: [],
  },
  {
    id: 3,
    name: "Grand Barca Nirwana",
    address: "Yogyakarta", // Changed from location to address
    status: "Rejected",
    price: 4000000,
    image:
      "http://i.pinimg.com/73x/28/a8/8d/28a88d79127329f7f6cb7be2a18ad2f0.jpg",
    description: "Yet another dummy villa description.",
    guests: 4,
    area: "20m²",
    bedType: "One Queen Bed",
    features: ["Kitchen"],
    roomImages: [],
  },
];

const MyVillaTable = () => {
  return (
    <table className="villa-table">
      <thead>
        <tr>
          <th>Villa Name</th>
          <th>Address</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {villas.map((villa) => (
          <MyVillaRow key={villa.id} villa={villa} />
        ))}
      </tbody>
    </table>
  );
};

export default MyVillaTable;
