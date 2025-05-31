// src/pages/Owner.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SidebarOwner from "../components/SidebarOwner";
import MyVillaTable from "../components/MyVilla/MyVillaTable";
import "../styles/owner.css";

const dummyBooking = [
  {
    name: "Arya Manurung",
    email: "arya@gmail.com",
    phone: "085000444000",
    address: "Jl Bumi, Jawa Tengah", // Changed from location to address
    villaName: "Graha Amerta", // Changed from title to villaName for clarity in booking context
    checkin: "30-05-2025",
    checkout: "01-06-2025",
    price: "Rp. 5.000.000",
    status: "Booked",
  },
  {
    name: "Christifan Tius",
    email: "Tius@gmail.com",
    phone: "085222000111",
    address: "Jl Bandung, Jawa Barat", // Changed from location to address
    villaName: "De Santika Nirwana", // Changed from title
    checkin: "30-05-2025",
    checkout: "01-06-2025",
    price: "Rp. 5.000.000",
    status: "Pending",
  },
  {
    name: "Bai Khaba",
    email: "Khaba@gmail.com",
    phone: "087555666999",
    address: "Yogyakarta", // Changed from location to address
    villaName: "Java de Villa", // Changed from title
    checkin: "30-05-2025",
    checkout: "01-06-2025",
    price: "Rp. 5.000.000",
    status: "Cancel",
  },
];

const Owner = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const handleAddVilla = () => {
    navigate("/add-villa");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="owner-page">
      <SidebarOwner setActiveMenu={setActiveMenu} />
      <div className="main-content">
        <div
          className="header d-flex justify-content-end align-items-center position-relative"
          ref={profileRef}
        >
          <FaUserCircle
            size={32}
            className="text-dark cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Profile"
          />

          {showProfileMenu && (
            <div className="dropdown-menu show position-absolute end-0 mt-0 shadow bg-white rounded py-2">
              <button
                className="dropdown-item px-4 py-1 text-start"
                onClick={handleLogout}
                style={{ color: "inherit", fontWeight: "normal" }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {activeMenu === "dashboard" && (
          <div className="welcome-message">
            <h2>Welcome, Owner</h2>
          </div>
        )}

        {activeMenu === "villa" && (
          <div className="villa-section">
            <button className="add-villa-btn" onClick={handleAddVilla}>
              Add Villa
            </button>
            <MyVillaTable />
          </div>
        )}

        {activeMenu === "booking" && (
          <div className="booking-section">
            <h3>Booking List</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Villa</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
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

export default Owner;
