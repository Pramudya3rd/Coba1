import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo-kamar-tamu.png";
import "../styles/main.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // logika logout

    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-primary-bg" // Menggunakan class CSS baru
      style={{
        paddingTop: "1px",
        paddingBottom: "1px",
        minHeight: "40px",
      }}
    >
      <div
        className="container"
        style={{ alignItems: "center", padding: 0, minHeight: "40px" }}
      >
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ padding: 0, margin: 0 }}
        >
          <img src={logo} alt="Logo" style={{ height: "75px" }} />
        </Link>

        <div className="collapse navbar-collapse justify-content-center">
          <ul
            className="navbar-nav mb-0 gap-5"
            style={{
              alignItems: "center",
              lineHeight: "1",
              fontSize: "15px",
            }}
          >
            <li className="nav-item">
              <Link className="nav-link fw-bold p-0" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold p-0" to="/about">
                ABOUT US
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold p-0" to="/our-villa">
                OUR VILLA
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold p-0" to="/faq">
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold p-0" to="/contact">
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {/* Profile Icon & Dropdown */}
        <div
          className="profile-icon position-relative d-flex align-items-center"
          ref={dropdownRef}
        >
          <FaUserCircle
            size={28}
            className="text-dark cursor-pointer"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div
              className="dropdown-menu show position-absolute end-0 mt-2 shadow bg-white rounded py-2"
              style={{ zIndex: 1000 }}
            >
              <Link className="dropdown-item px-4 py-2" to="/profile">
                Profile
              </Link>
              <button
                className="dropdown-item px-4 py-2 text-start"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
