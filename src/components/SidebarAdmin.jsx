import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo-kamar-tamu.png';
import "../styles/SideBar.css";

const Sidebar = ({ setActiveMenu }) => {
  const [manageOpen, setManageOpen] = useState(false);
  const [villaOpen, setVillaOpen] = useState(false);

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

        <button className="sidebar-btn" onClick={() => setManageOpen(!manageOpen)}>
          MANAGE ▾
        </button>
        {manageOpen && (
          <div className="dropdown">
            <div className="dropdown-item" onClick={() => setActiveMenu("user")}>USER</div>
            <div className="dropdown-item" onClick={() => setActiveMenu("owner")}>OWNER</div>
          </div>
        )}

        <button className="sidebar-btn" onClick={() => setVillaOpen(!villaOpen)}>
          VILLA ▾
        </button>
        {villaOpen && (
          <div className="dropdown">
            <div className="dropdown-item" onClick={() => setActiveMenu("villaList")}>DAFTAR VILLA</div>
            <div className="dropdown-item" onClick={() => setActiveMenu("updateVilla")}>UPDATE VILLA</div>
          </div>
        )}

        <button className="sidebar-btn" onClick={() => setActiveMenu("booking")}>
          BOOKING
        </button>

      
      </div>
    </div>
  );
};

export default Sidebar;
