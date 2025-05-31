import React from "react";
import NavbarProfile from "../components/NavbarProfile";
import ProfileCard from "../components/ProfileCard";
import ActivityCard from "../components/ActivityCard";

import avatarImg from "../assets/profile.jpg";
import "../styles/profile.css";

const ProfilePage = () => {
  const user = {
    avatar: avatarImg,
    name: "Narajengga Alugara",
    email: "narajengga@gmail.com",
    phone: "081888333777",
  };

  const activities = [
    { date: "26", month: "AUG", name: "De Santika Nirwana", status: "BOOKED", price: "Rp 5.000.000" },
    { date: "12", month: "JUL", name: "", status: "", price: "" },
    { date: "08", month: "JUN", name: "", status: "", price: "" },
    { date: "30", month: "MAY", name: "", status: "", price: "" },
  ];

  return (
    <>
      <NavbarProfile />
      <div className="profile-page">
        <ProfileCard user={user} />
        <ActivityCard activities={activities} />
      </div>
    </>
  );
};

export default ProfilePage;
