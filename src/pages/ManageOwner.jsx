import React, { useState } from "react";
import Sidebar from "../components/SidebarAdmin";
import "../styles/SideBar.css";

const dummyOwner = [
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

const ManageOwner = () => {
  const [activeMenu, setActiveMenu] = useState("user");

  return (
    <div className="ManageOwner-wrapper">
      <Sidebar setActiveMenu={setActiveMenu} />

      <div className="content-area">
        <div className="header">
          <span>ManageOwner</span>
          <span role="img" aria-label="profile">👤</span>
        </div>

        {activeMenu === "user" && (
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
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.villa}</td>
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
