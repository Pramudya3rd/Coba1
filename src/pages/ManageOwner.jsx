import React, { useState } from "react";
import Sidebar from "../components/SidebarAdmin";
import "../styles/SideBar.css";

const dummyOwner = [
  {
    name: "Arya Manurung",
    email: "arya@example.com",
    phone: "085000444000",
    villaName: "The Sun Rise",
  },
  {
    name: "Christifan Tius",
    email: "tius@example.com",
    phone: "085222000111",
    villaName: "Jasmine The Ae",
  },
  {
    name: "Bai Khaba",
    email: "khaba@example.com",
    phone: "087555666999",
    villaName: "Lime on Tea",
  },
];

const ManageOwner = () => {
  const [activeMenu, setActiveMenu] = useState("owner");

  return (
    <div className="ManageOwner-wrapper">
      <Sidebar setActiveMenu={setActiveMenu} />

      <div className="content-area">
        <div className="header">
          <span>Manage Owner</span>
          <span role="img" aria-label="profile">
            👤
          </span>
        </div>

        {activeMenu === "owner" && (
          <div className="user-table">
            <h4>OWNER</h4>
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
                {dummyOwner.map((owner, index) => (
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
      </div>
    </div>
  );
};

export default ManageOwner;
