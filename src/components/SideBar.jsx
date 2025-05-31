import React, { useState } from "react";
import "../styles/SideBar.css";

const Sidebar = ({ setActiveMenu }) => {
  const [manageOpen, setManageOpen] = useState(false);
  const [villaOpen, setVillaOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>

      <button className="sidebar-btn" onClick={() => setActiveMenu("dashboard")}>
       DASHBOARD
      </button>

      <button className="sidebar-btn" onClick={() => setManageOpen(!manageOpen)}>
        MANAGE ▾
      </button>
      {manageOpen && (
        <div className="dropdown">
          <div onClick={() => setActiveMenu("user")}>User</div>
          <div onClick={() => setActiveMenu("owner")}>Owner</div>
        </div>
      )}

      <button className="sidebar-btn" onClick={() => setVillaOpen(!villaOpen)}>
        VILLA ▾
      </button>
      {villaOpen && (
        <div className="dropdown">
          <div onClick={() => setActiveMenu("villaList")}>Daftar Villa</div>
          <div onClick={() => setActiveMenu("updateVilla")}>Update Villa</div>
        </div>
      )}

      <button className="sidebar-btn" onClick={() => setActiveMenu("booking")}>
        BOOKING
      </button>

      <button className="sidebar-btn logout">LOGOUT</button>
    </div>
  );
};

export default Sidebar;
