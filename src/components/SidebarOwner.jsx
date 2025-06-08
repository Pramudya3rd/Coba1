import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo-kamar-tamu.png';
import "../styles/SideBar.css";

const SidebarOwner = ({ setActiveMenu }) => {
  return (
    <div className="sidebar" style={{ alignItems: 'center', padding: 0 }}>
      {/* LOGO */}
      <Link to="/" style={{ padding: 0, margin: 0 }}>
        <img src={logo} alt="Logo" style={{ height: '75px' }} />
      </Link>

      {/* MENU */}
      <div className="sidebar-menu" style={{ marginTop: '30px', width: '100%' }}>
        <button className="sidebar-btn" onClick={() => setActiveMenu("dashboard")}>
          DASHBOARD
        </button>

        <button className="sidebar-btn" onClick={() => setActiveMenu("villa")}>
          MY VILLA
        </button>

        <button className="sidebar-btn" onClick={() => setActiveMenu("booking")}>
          BOOKING
        </button>
      </div>
    </div>
  );
};

export default SidebarOwner;
