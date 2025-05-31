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
    name: "Arya Manurung",
    email: "arya@example.com",
    phone: "081234567890",
    villaName: "The Sun Rise",
  },
  {
    name: "Christifan Tius",
    email: "tius@example.com",
    phone: "081234567891",
    villaName: "Jasmine The Ae",
  },
  {
    name: "Bai Khaba",
    email: "khaba@example.com",
    phone: "087555666999",
    villaName: "Lime on Tea",
  },
];

const dummyVillas = [
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
  },
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
  },
  {
    name: "Grand Barca Nirwana",
    address: "Yogyakarta",
    owner: "Arya Manurung",
  },
];

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

const dummyBooking = [
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
    title: "De Santika Nirwana",
    checkin: "30-05-2025",
    checkout: "01-06-2025",
    price: "Rp. 5.000.000",
    status: "Booked",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
    title: "De Santika Nirwana",
    checkin: "30-05-2025",
    checkout: "01-06-2025",
    price: "Rp. 5.000.000",
    status: "Pending",
  },
  {
    name: "Grand Barca Nirwana",
    email: "Yogyakarta",
    phone: "Arya Manurung",
    address: "Jl Bandung, Jawa Barat",
    title: "De Santika Nirwana",
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
                  <th>Villa Name</th>
                </tr>
              </thead>
              <tbody>
                {dummyOwners.map((owner, index) => (
                  <tr key={index}>
                    <td>{owner.name}</td>
                    <td>{owner.email}</td>
                    <td>{owner.phone}</td>
                    <td>{owner.villaName}</td>
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
                  <th>Address</th>
                  <th>Owner</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyVillas.map((villa, index) => (
                  <tr key={index}>
                    <td>{villa.name}</td>
                    <td>{villa.address}</td>
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
              {villas.map((villa, index) => (
                <VillaCard
                  key={index}
                  title={villa.title}
                  location={villa.location}
                  price={villa.price}
                  image={villa.image}
                  onBookNow={() =>
                    navigate("/villa-detail", { state: { ...villa } })
                  }
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
                    <td>{booking.address}</td>
                    <td>{booking.title}</td>
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
