import React from "react";
import "../styles/SideBar.css";

const SidebarOwner = ({ setActiveMenu }) => {
  return (
    <div className="sidebar">
      <div className="logo">LOGO</div>

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
  );
};

export default SidebarOwner;
