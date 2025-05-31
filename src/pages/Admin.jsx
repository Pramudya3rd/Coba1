// src/pages/Admin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarAdmin";
import VillaCard from "../components/VillaCard";
import "../styles/SideBar.css";

const dummyUsers = [
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
  },
];

const dummyOwners = [
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    villa: "The Sun Rise",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    villa: "Jasmine The Ae",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    villa: "Lime on Tea",
  },
];

const dummyVillasForAdmin = [
  // Renamed to avoid conflict and clearly define purpose
  {
    id: 1,
    name: "Grand Barca Nirwana",
    address: "Yogyakarta", // Changed from location to address
    owner: "Arya Manurung",
    status: "Pending",
  },
  {
    id: 2,
    name: "De Santika Nirwana",
    address: "Ubud, Bali", // Changed from location to address
    owner: "Budi Santoso",
    status: "Verified",
  },
  {
    id: 3,
    name: "Samudra Biru Tropika",
    address: "Canggu, Bali", // Changed from location to address
    owner: "Citra Dewi",
    status: "Rejected",
  },
];

const villasListForDisplay = [
  // Data for "LIST VILLA"
  {
    id: 1,
    name: "De Santika Nirwana", // Changed from title
    address: "Ubud, Bali", // Changed from location to address
    price: "Rp. 5.000.000/Night",
    image:
      "https://i.pinimg.com/73x/89/c1/df/89c1dfaf3e2bf035718cf2a76a16fd38.jpg",
    description: "Villa eksklusif dengan fasilitas premium...",
    guests: 6,
    area: "24m²",
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
    id: 2,
    name: "Grand Lavanya Hills", // Changed from title
    address: "Ubud, Bali", // Changed from location to address
    price: "Rp. 8.500.000/Night",
    image:
      "https://i.pinimg.com/73x/b3/1d/ac/b31dac2e3bf41b30d84f5e454e293b13.jpg",
    description: "Villa mewah dengan pemandangan bukit yang menakjubkan.",
    guests: 8,
    area: "30m²",
    bedType: "Two King Beds",
    features: ["TV", "Free Wifi", "Private Pool", "Kitchen"],
    roomImages: [
      "https://i.pinimg.com/73x/a8/bc/50/a8bc50298db283746524f3c82bbd9465.jpg",
      "https://i.pinimg.com/73x/79/0b/56/790b56d61da6b4b2bd1301da3385b085.jpg",
    ],
  },
  {
    id: 3,
    name: "Samudra Biru Tropika", // Changed from title
    address: "Ubud, Bali", // Changed from location to address
    price: "Rp. 4.500.000/Night",
    image:
      "http://i.pinimg.com/73x/28/a8/8d/28a88d79127329f7f6cb7be2a18ad2f0.jpg",
    description: "Nikmati ketenangan di villa dekat pantai.",
    guests: 4,
    area: "20m²",
    bedType: "One Queen Bed",
    features: ["TV", "Free Wifi"],
    roomImages: [
      "https://i.pinimg.com/73x/47/96/a1/4796a1d06f323c31fd2c7407c43788b9.jpg",
    ],
  },
];

const dummyBooking = [
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat", // Changed from location to address
    villaName: "De Santika Nirwana",
    checkin: "30-05-2025",
    checkout: "01-06-2025",
    price: "Rp. 5.000.000",
    status: "Booked",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat", // Changed from location to address
    villaName: "De Santika Nirwana",
    checkin: "30-05-2025",
    checkout: "01-06-2025",
    price: "Rp. 5.000.000",
    status: "Pending",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat", // Changed from location to address
    villaName: "De Santika Nirwana",
    checkin: "30-05-2025",
    checkout: "01-06-2025",
    price: "Rp. 5.000.000",
    status: "Cancel",
  },
];

const Admin = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  const handleApprove = (villaName) => {
    alert(`Approved: ${villaName}`);
  };

  const handleReject = (villaName) => {
    alert(`Rejected: ${villaName}`);
  };

  return (
    <div className="admin-wrapper">
      <Sidebar setActiveMenu={setActiveMenu} />

      <div className="content-area">
        {activeMenu === "dashboard" && (
          <div className="welcome-message">
            <h2>Welcome, Admin</h2>
          </div>
        )}

        {activeMenu === "user" && (
          <div className="user-table">
            <h4>USER</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {dummyUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeMenu === "owner" && (
          <div className="user-table">
            <h4>OWNER VILLA</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Villa</th>
                </tr>
              </thead>
              <tbody>
                {dummyOwners.map((owner, index) => (
                  <tr key={index}>
                    <td>{owner.name}</td>
                    <td>{owner.email}</td>
                    <td>{owner.phone}</td>
                    <td>{owner.villa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeMenu === "updateVilla" && (
          <div className="user-table">
            <h4>UPDATE VILLA</h4>
            <table>
              <thead>
                <tr>
                  <th>Villa Name</th>
                  <th>Address</th>{" "}
                  {/* Display as Address for table, but data is 'address' */}
                  <th>Owner</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyVillasForAdmin.map((villa, index) => (
                  <tr key={index}>
                    <td>{villa.name}</td>
                    <td>{villa.address}</td>{" "}
                    {/* Changed from location to address */}
                    <td>{villa.owner}</td>
                    <td>
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(villa.name)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(villa.name)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeMenu === "villaList" && (
          <div className="villa-list-section">
            <h4>LIST VILLA</h4>
            <div className="row g-4 justify-content-center">
              {villasListForDisplay.map((villa, index) => (
                <VillaCard
                  key={index}
                  {...villa} // Pass all properties
                  onBookNow={() => navigate("/villa-detail", { state: villa })} // Pass the entire villa object
                />
              ))}
            </div>
          </div>
        )}

        {activeMenu === "booking" && (
          <div className="user-table">
            <h4>LIST BOOKING</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Villa</th>
                  <th>Check-in</th>
                  <th>Check-Out</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dummyBooking.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.address}</td>{" "}
                    {/* Changed from location to address */}
                    <td>{booking.villaName}</td> {/* Changed from title */}
                    <td>{booking.checkin}</td>
                    <td>{booking.checkout}</td>
                    <td>{booking.price}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
